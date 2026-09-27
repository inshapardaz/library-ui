// Matches, in order of priority at each position:
//  1. an operator token with a quoted value, e.g. @"J.R.R. Tolkien"
//  2. an operator token with an unquoted value, e.g. @tolkien
//  3. any other whitespace-separated word (free text, or a bare/unknown operator)
const TOKEN_PATTERN = /([@#$:])"([^"]*)"|([@#$:])(\S+)|(\S+)/g;

const OPERATORS = {
    "@": "authorNames",
    "#": "tagNames",
    "$": "languages",
    ":": "seriesNames",
};

/**
 * Parses a free-form search query into per-filter arrays plus free text.
 *
 * Recognizes `@author`, `#tag`, `$language`, and `:series` tokens (combined
 * with AND against the API - multiple tokens of the same type all apply).
 * A value can be a single word (`@tolkien`) or a quoted, multi-word value
 * (`@"J.R.R. Tolkien"`). Everything else is free text (used for title
 * matching). A bare operator character with no attached value (`@` on its
 * own, or `@""`) is silently dropped rather than treated as free text or
 * an empty filter value.
 *
 * @param {string} query
 * @returns {{ authorNames: string[], tagNames: string[], languages: string[], seriesNames: string[], freeText: string }}
 */
const parseSearchQuery = (query) => {
    const result = {
        authorNames: [],
        tagNames: [],
        languages: [],
        seriesNames: [],
        freeText: "",
    };

    if (!query) {
        return result;
    }

    const freeTextWords = [];
    const matches = query.matchAll(TOKEN_PATTERN);

    for (const match of matches) {
        const [, quotedOperator, quotedValue, operator, value, word] = match;

        if (quotedOperator) {
            const trimmed = quotedValue.trim();
            if (trimmed) {
                result[OPERATORS[quotedOperator]].push(trimmed);
            }
            continue;
        }

        if (operator) {
            result[OPERATORS[operator]].push(value);
            continue;
        }

        // A lone operator character (e.g. a trailing "@" with nothing after it)
        // matches here as an ordinary word - drop it instead of polluting free text.
        if (!Object.prototype.hasOwnProperty.call(OPERATORS, word)) {
            freeTextWords.push(word);
        }
    }

    result.freeText = freeTextWords.join(" ");

    return result;
};

export default parseSearchQuery;
