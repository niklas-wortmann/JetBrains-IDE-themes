import { expect, it } from 'vitest';
import { getJetBrainsHighlighter } from './util/jetbrains-themed-instance';

it('renders typescript properly in dark theme', async () => {
    const shiki = await getJetBrainsHighlighter();
    const out = await shiki.codeToHtml(
        `
export const RESOURCE = "resource";
export type RESOURCE_TYPE = typeof RESOURCE;

export const ALL_RESOURCES = [
    TIP_RESOURCE,
    ARTICLE_RESOURCE,
    TUTORIAL_RESOURCE,
    TUTORIAL_STEP_RESOURCE,
    PLAYLIST_RESOURCE,
    CHANNEL_RESOURCE,
    PAGE_RESOURCE,
    LINK_RESOURCE,
    TOPIC_RESOURCE,
    AUTHOR_RESOURCE,
    RESOURCE,
] as const;

export type ALL_RESOURCE_TYPES = Array<typeof ALL_RESOURCES>;

export type RESOURCE_TYPES = (typeof ALL_RESOURCES)[number];
`,
        { theme: 'Jetbrains Dark Theme', lang: 'ts' }
    );

    expect(out).toMatchFileSnapshot('./out/ts.html');
});
