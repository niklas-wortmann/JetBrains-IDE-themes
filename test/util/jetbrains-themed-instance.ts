import { bundledLanguages, getHighlighter } from 'shiki';
import { darkTheme } from '../../src';

export const getJetBrainsHighlighter = async () => {
    const highlighter = await getHighlighter({
        themes: [darkTheme],
        langs: Object.keys(bundledLanguages),
    });

    // // optionally, load themes and languages after creation
    // await highlighter.loadTheme(import('shiki/themes/vitesse-light.mjs'));

    return highlighter;
};
