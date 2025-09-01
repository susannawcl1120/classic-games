import { palette } from './colors';

export const theme = {
    colors: {
        // 基礎色系
        background: {
            primary: palette.neutral[0],
            secondary: palette.neutral[50],
            tertiary: palette.neutral[100],
            quaternary: palette.quaternary[50],
            neutral200: palette.neutral[200],
            secondary500: palette.secondary[500],
            primary100: palette.primary[100],
            primary200: palette.primary[200],
            primary300: palette.primary[300],
            primary400: palette.primary[400],
            primary500: palette.primary[500],
            button: palette.button[50],
            buttonDisable: palette.primary[300],
            danger50: palette.danger[50],
            danger300: palette.danger[300],
            danger500: palette.danger[500],
            success: palette.primary[100],
            info: palette.neutral[700],
            danger400: palette.danger[400],
            warning100: palette.warning[100],
            warning400: palette.warning[400]
        },
        text: {
            primary: palette.neutral[900],
            secondary: palette.neutral[600],
            tertiary: palette.neutral[400],
            quaternary: palette.quaternary[50],
            neutral500: palette.neutral[500],
            neutral1000: palette.neutral[1000],
            neutral300: palette.neutral[300],
            accent300: palette.accent[300],
            accent400: palette.accent[400],
            danger300: palette.danger[300],
            danger400: palette.danger[400],
            danger500: palette.danger[500],
            primary500: palette.primary[500],
            secondary200: palette.secondary[200],
            secondary300: palette.secondary[300],
            secondary500: palette.secondary[500],
            inverse: palette.neutral[0],
            black: palette.neutral[1000],
            warning50: palette.warning[50],
            warning100: palette.warning[100],
            warning200: palette.warning[200],
            warning300: palette.warning[300],
            warning400: palette.warning[400],
            warning500: palette.warning[500]
        },
        // svg fill
        fill: {
            primary: palette.neutral[1000],
            secondary: palette.neutral[400]
        },
        // 功能色系
        brand: {
            primary: palette.primary[400],
            secondary: palette.secondary[300]
        },
        status: {
            warning: palette.warning[300],
            danger: palette.danger[300],
            info: palette.accent[300]
        },
        // 邊框色系
        border: {
            lighter: palette.neutral[100],
            light: palette.neutral[200],
            default: palette.neutral[300],
            dark: palette.neutral[400],
            black: palette.neutral[1000],
            green: palette.primary[200],
            danger: palette.danger[100],
            primary500: palette.primary[500],
            secondary500: palette.secondary[500]
        },
        tabs: {
            base: palette.neutral[1000],
            line: palette.quaternary[50]
        }
    }
} as const;

export const orangeTheme = {
    primary: '#FF6B20',
    supportDark: '#0A0A0A'
};
