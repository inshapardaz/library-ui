import JSZip from "jszip";
import MarkdownIt from "markdown-it";

// Mirrors the backend's own chapter-id scheme (see MarkdownToEpubConverter.cs:
// manifest item id `chap{i+1}`, file `chapter{i+1}.xhtml`), so a chapter's 1-based
// position within a book's chapter list can be recovered from the id qari reports
// back through onProgressChange/onBookmarkCreate/onNoteChange, whether the epub was
// published server-side or assembled here client-side.
const CHAPTER_ID_PATTERN = /^chap(\d+)$/;

export function chapterIdToPosition(chapterId) {
    const match = CHAPTER_ID_PATTERN.exec(chapterId ?? "");
    return match ? parseInt(match[1], 10) : null;
}

export function positionToChapterId(position) {
    return `chap${position}`;
}

const md = new MarkdownIt();

function escapeXml(value) {
    return String(value ?? "").replace(/[<>&'"]/g, (c) => ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
    }[c]));
}

// Assembles an in-memory EPUB from a book's chapters, for books that have chapter
// content but no admin-published `application/epub+zip` content entry yet. Structure
// mirrors the backend's MarkdownToEpubConverter so qari's chapter ids line up the same
// way regardless of which source produced the epub.
export async function buildEpubFromChapters(book, chapters) {
    const direction = book.language === "ur" ? "rtl" : "ltr";
    const zip = new JSZip();

    zip.file("mimetype", "application/epub+zip", { compression: "STORE" });

    zip.file(
        "META-INF/container.xml",
        `<?xml version="1.0" encoding="utf-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
    );

    const oebps = zip.folder("OEBPS");
    oebps.file(
        "styles.css",
        `body { direction: ${direction}; unicode-bidi: embed; font-family: serif; line-height: 1.6; }`
    );

    const manifest = [];
    const spine = [];
    const navItems = [];
    manifest.push(`<item id="css" href="styles.css" media-type="text/css"/>`);

    chapters.forEach((chapter, index) => {
        const position = index + 1;
        const itemId = positionToChapterId(position);
        const fileName = `chapter${position}.xhtml`;
        const html = md.render(chapter.content ?? "");

        oebps.file(
            fileName,
            `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${book.language}" dir="${direction}">
  <head>
    <title>${escapeXml(chapter.title)}</title>
    <link rel="stylesheet" type="text/css" href="styles.css"/>
  </head>
  <body>
    ${html}
  </body>
</html>`
        );

        manifest.push(`<item id="${itemId}" href="${fileName}" media-type="application/xhtml+xml"/>`);
        spine.push(`<itemref idref="${itemId}"/>`);
        navItems.push(`<li><a href="${fileName}">${escapeXml(chapter.title)}</a></li>`);
    });

    oebps.file(
        "nav.xhtml",
        `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${book.language}" dir="${direction}">
  <head><title>${escapeXml(book.title)}</title></head>
  <body>
    <nav epub:type="toc" id="toc">
      <ol>${navItems.join("")}</ol>
    </nav>
  </body>
</html>`
    );
    manifest.push(`<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>`);

    const authorsXml = (book.authors ?? []).map((a) => `<dc:creator>${escapeXml(a.name)}</dc:creator>`).join("\n");
    const uniqueId = `urn:uuid:${crypto.randomUUID()}`;

    oebps.file(
        "content.opf",
        `<?xml version="1.0" encoding="utf-8"?>
<package version="3.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" xml:lang="${book.language}">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">${uniqueId}</dc:identifier>
    <dc:title>${escapeXml(book.title)}</dc:title>
    <dc:language>${book.language}</dc:language>
    ${authorsXml}
  </metadata>
  <manifest>
    ${manifest.join("\n    ")}
  </manifest>
  <spine page-progression-direction="${direction}">
    ${spine.join("\n    ")}
  </spine>
</package>`
    );

    return zip.generateAsync({ type: "arraybuffer" });
}
