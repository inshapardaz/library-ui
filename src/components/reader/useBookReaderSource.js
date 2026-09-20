import { useEffect, useState } from "react";

// Local imports
import { axiosPrivate } from "@/utils/axios.helpers";
import BookFormat from "@/models/bookFormat";
import { buildEpubFromChapters } from "@/utils/epubBuilder";

async function fetchBinary(url) {
    const response = await axiosPrivate({ url, method: "get", responseType: "arraybuffer" });
    return response.data;
}

async function fetchText(url) {
    const response = await axiosPrivate({ url, method: "get", responseType: "text" });
    return response.data;
}

function findContent(book, mimeType) {
    return book?.contents?.find((c) => c.mimeType === mimeType);
}

function contentUrl(content) {
    return content?.links?.download ?? content?.links?.self;
}

// Resolves a book + its chapters (if any) into a `source` prop for qari's <Reader>,
// preferring an already-published epub/pdf/markdown content file over assembling one
// client-side. See epubBuilder.js for why chapter-based books with no published epub
// get one built on the fly instead of streamed chapter-by-chapter.
export default function useBookReaderSource(libraryId, book, chapters, language) {
    const [source, setSource] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const hasChapters = chapters && chapters.length > 0;
    const epubContent = findContent(book, BookFormat.Epub);
    const pdfContent = findContent(book, BookFormat.Pdf);
    const markdownContent = !hasChapters
        ? findContent(book, BookFormat.Markdown) ?? findContent(book, BookFormat.Text) ?? findContent(book, BookFormat.Html)
        : null;

    useEffect(() => {
        let cancelled = false;

        async function resolve() {
            if (!book) {
                return;
            }

            setLoading(true);
            setError(null);

            try {
                if (epubContent) {
                    const data = await fetchBinary(contentUrl(epubContent));
                    if (!cancelled) setSource({ type: "epub", data });
                    return;
                }

                if (pdfContent) {
                    const data = await fetchBinary(contentUrl(pdfContent));
                    if (!cancelled) setSource({ type: "pdf", data });
                    return;
                }

                if (markdownContent) {
                    const content = await fetchText(contentUrl(markdownContent));
                    if (!cancelled) setSource({ type: "markdown", content });
                    return;
                }

                if (hasChapters) {
                    const chapterContents = await Promise.all(
                        chapters.map((chapter) =>
                            axiosPrivate({
                                url: `/libraries/${libraryId}/books/${book.id}/chapters/${chapter.chapterNumber}/contents`,
                                method: "get",
                                params: { language },
                            }).then((response) => ({ title: chapter.title, content: response.data?.text ?? "" }))
                        )
                    );
                    const data = await buildEpubFromChapters(book, chapterContents);
                    if (!cancelled) setSource({ type: "epub", data });
                    return;
                }

                if (!cancelled) setSource(null);
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        resolve();

        return () => {
            cancelled = true;
        };
    }, [libraryId, book, hasChapters, epubContent, pdfContent, markdownContent, chapters, language]);

    return { source, error, loading };
}
