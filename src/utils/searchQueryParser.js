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

// A prefix character standing alone (surrounded by whitespace/string edges) or
// immediately followed by an empty quoted value ("") - the two "operator typed
// but no value given" shapes the parser above silently drops. Exposed so the
// search box can surface a hint ("@ has no value") instead of just discarding
// it with no feedback at all.
const BARE_OPERATOR_PATTERN = /(?:^|\s)([@#$:])(?=\s|$)/g;
const EMPTY_QUOTED_OPERATOR_PATTERN = /([@#$:])""/g;

/**
 * Returns the set of operator prefixes (a subset of "@#$:") that appear in
 * the query with no value attached, e.g. a trailing "@" or an empty `#""`.
 *
 * @param {string} query
 * @returns {string[]}
 */
export const findIncompleteOperators = (query) => {
    if (!query) {
        return [];
    }

    const found = new Set();
    for (const match of query.matchAll(BARE_OPERATOR_PATTERN)) {
        found.add(match[1]);
    }
    for (const match of query.matchAll(EMPTY_QUOTED_OPERATOR_PATTERN)) {
        found.add(match[1]);
    }

    return [...found];
};

/**
 * Removes every token of the given operator type (quoted or not, including a
 * bare/empty one) from a query string, e.g. removing "@" from
 * `@tolkien #fantasy @"J.R.R. Tolkien"` yields `#fantasy`. Used to let a user
 * dismiss a resolved filter chip in the search box UI without hand-editing
 * the raw query text themselves.
 *
 * @param {string} query
 * @param {string} operator one of "@#$:"
 * @returns {string}
 */
export const removeOperatorTokens = (query, operator) => {
    if (!query) {
        return query ?? "";
    }

    const escaped = operator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`${escaped}(?:"[^"]*"|\\S*)`, "g");

    return query.replace(pattern, "").replace(/\s+/g, " ").trim();
};

export default parseSearchQuery;
