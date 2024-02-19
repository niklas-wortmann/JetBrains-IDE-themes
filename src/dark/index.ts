import type {
    BundledThemeInfo,
    DynamicImportThemeRegistration,
} from '@shikijs/core';

export const darkTheme: BundledThemeInfo = {
    type: 'dark',
    id: 'jetbrains-dark',
    displayName: 'JetBrains IDE Dark',
    import: (() =>
        import('./dark.json')) as unknown as DynamicImportThemeRegistration,
};
