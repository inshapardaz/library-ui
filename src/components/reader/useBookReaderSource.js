import { useEffect, useRef, useState } from "react";

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
//
// `format` optionally forces a specific BookFormat (from the book-page format picker)
// instead of the default epub > pdf > markdown > chapters priority.
export default function useBookReaderSource(libraryId, book, chapters, language, format) {
    const [source, setSource] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // `book`/`chapters` are re-fetched (new object identity) whenever any RTK Query tag
    // they depend on is invalidated for reasons unrelated to the reader (e.g. a favorite
    // toggle elsewhere). Only re-resolve the source when data that actually affects it
    // changes, tracked via these primitive keys - not the object references themselves.
    const hasChapters = chapters && chapters.length > 0;
    const epubContent = findContent(book, BookFormat.Epub);
    const pdfContent = findContent(book, BookFormat.Pdf);
    const markdownContent = findContent(book, BookFormat.Markdown) ?? findContent(book, BookFormat.Text) ?? findContent(book, BookFormat.Html);
    const chapterKey = hasChapters ? chapters.map((c) => c.chapterNumber).join(",") : "";

    const resolvedFormat =
        format ?? (epubContent ? BookFormat.Epub : pdfContent ? BookFormat.Pdf : markdownContent && !hasChapters ? BookFormat.Markdown : hasChapters ? BookFormat.Epub : null);

    const latest = useRef({ book, chapters });
    latest.current = { book, chapters };

    useEffect(() => {
        let cancelled = false;

        async function resolve() {
            const { book, chapters } = latest.current;
            if (!book || !resolvedFormat) {
                if (!cancelled) {
                    setSource(null);
                    setLoading(false);
                }
                return;
            }

            setLoading(true);
            setError(null);

            try {
                if (resolvedFormat === BookFormat.Epub && epubContent) {
                    const data = await fetchBinary(contentUrl(epubContent));
                    if (!cancelled) setSource({ type: "epub", data });
                    return;
                }

                if (resolvedFormat === BookFormat.Pdf && pdfContent) {
                    const data = await fetchBinary(contentUrl(pdfContent));
                    if (!cancelled) setSource({ type: "pdf", data });
                    return;
                }

                if (resolvedFormat === BookFormat.Markdown && markdownContent) {
                    const content = await fetchText(contentUrl(markdownContent));
                    if (!cancelled) setSource({ type: "markdown", content });
                    return;
                }

                if (resolvedFormat === BookFormat.Epub && hasChapters) {
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
        // Deliberately depends on content ids, not the epubContent/pdfContent/markdownContent
        // objects themselves - see the comment above `hasChapters` for why.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        libraryId,
        book?.id,
        hasChapters,
        chapterKey,
        epubContent?.id,
        pdfContent?.id,
        markdownContent?.id,
        language,
        resolvedFormat,
    ]);

    return { source, error, loading };
}
