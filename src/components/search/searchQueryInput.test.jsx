// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';

import i18n from '@/i18n';
import SearchQueryInput from './searchQueryInput';

// RTL's automatic per-test cleanup only kicks in when `afterEach` is a
// global (vitest's `globals: true`), which this project doesn't enable -
// tests here import it explicitly instead - so it's wired up by hand.
afterEach(cleanup);

const renderInput = (props = {}) =>
    render(
        <MantineProvider>
            <SearchQueryInput onQueryChanged={vi.fn()} {...props} />
        </MantineProvider>
    );

beforeAll(async () => {
    await i18n.changeLanguage('en');
});

describe('SearchQueryInput', () => {
    it('shows no filter chips for plain free text', () => {
        renderInput();

        expect(screen.queryByText(/^Author:/)).not.toBeInTheDocument();
        expect(screen.queryByText(/^Tag:/)).not.toBeInTheDocument();
    });

    it('shows resolved filter chips as the user types mixed operators + free text, in any order', async () => {
        const user = userEvent.setup();
        renderInput();

        const input = screen.getByPlaceholderText('Search by title, author, keyword');
        await user.type(input, '#fantasy @tolkien hobbit $en :lotr');

        expect(screen.getByText('Author: tolkien')).toBeInTheDocument();
        expect(screen.getByText('Tag: fantasy')).toBeInTheDocument();
        expect(screen.getByText('Language: en')).toBeInTheDocument();
        expect(screen.getByText('Series: lotr')).toBeInTheDocument();
        expect(input).toHaveValue('#fantasy @tolkien hobbit $en :lotr');
    });

    it('flags an incomplete (bare) operator as its own chip instead of silently dropping it', async () => {
        const user = userEvent.setup();
        renderInput();

        const input = screen.getByPlaceholderText('Search by title, author, keyword');
        await user.type(input, '@tolkien #fantasy $ :lotr hobbit');

        expect(screen.getByText('Author: tolkien')).toBeInTheDocument();
        expect(screen.getByText('Tag: fantasy')).toBeInTheDocument();
        expect(screen.getByText('Series: lotr')).toBeInTheDocument();
        expect(screen.queryByText(/^Language:/)).not.toBeInTheDocument();
        expect(screen.getByText('"$" has no value and will be ignored')).toBeInTheDocument();
    });

    it('removing a resolved filter chip strips that operator from the text and re-submits', async () => {
        const user = userEvent.setup();
        const onQueryChanged = vi.fn();
        renderInput({ onQueryChanged });

        const input = screen.getByPlaceholderText('Search by title, author, keyword');
        await user.type(input, '@tolkien #fantasy hobbit');

        const authorPill = screen.getByText('Author: tolkien').closest('[class*="pill"]') ?? screen.getByText('Author: tolkien').parentElement;
        // Mantine's Pill remove button is aria-hidden (its own accessibility
        // story is keyboard removal via backspace inside a PillsInput, not
        // this standalone usage), so it must be looked up with hidden: true.
        await user.click(within(authorPill).getByRole('button', { hidden: true }));

        expect(screen.queryByText(/^Author:/)).not.toBeInTheDocument();
        expect(screen.getByText('Tag: fantasy')).toBeInTheDocument();
        expect(input).toHaveValue('#fantasy hobbit');
        expect(onQueryChanged).toHaveBeenCalledWith('#fantasy hobbit');
    });

    it('removing an incomplete-operator chip strips the bare operator from the text', async () => {
        const user = userEvent.setup();
        const onQueryChanged = vi.fn();
        renderInput({ onQueryChanged });

        const input = screen.getByPlaceholderText('Search by title, author, keyword');
        await user.type(input, '@tolkien $ hobbit');

        const incompletePill = screen.getByText('"$" has no value and will be ignored').closest('[class*="pill"]')
            ?? screen.getByText('"$" has no value and will be ignored').parentElement;
        await user.click(within(incompletePill).getByRole('button', { hidden: true }));

        expect(screen.queryByText(/has no value/)).not.toBeInTheDocument();
        expect(input).toHaveValue('@tolkien hobbit');
        expect(onQueryChanged).toHaveBeenCalledWith('@tolkien hobbit');
    });

    it('submits the raw query text on Enter', async () => {
        const user = userEvent.setup();
        const onQueryChanged = vi.fn();
        renderInput({ onQueryChanged });

        const input = screen.getByPlaceholderText('Search by title, author, keyword');
        await user.type(input, '@tolkien hobbit{Enter}');

        expect(onQueryChanged).toHaveBeenCalledWith('@tolkien hobbit');
    });

    it('clears the text and submits an empty query when the clear button is clicked', async () => {
        const user = userEvent.setup();
        const onQueryChanged = vi.fn();
        renderInput({ onQueryChanged });

        const input = screen.getByPlaceholderText('Search by title, author, keyword');
        await user.type(input, '@tolkien hobbit');
        await user.click(screen.getByRole('button', { name: 'Close' }));

        expect(input).toHaveValue('');
        expect(onQueryChanged).toHaveBeenCalledWith('');
    });

    it('shows a help affordance explaining the @ # $ : syntax', () => {
        renderInput();

        expect(
            screen.getByRole('button', {
                name: 'Filter books as you search: @author, #tag, $language, :series - e.g. @tolkien #fantasy $en :lotr hobbit',
            })
        ).toBeInTheDocument();
    });
});
