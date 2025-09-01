import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const scale = SCREEN_WIDTH / DESIGN_WIDTH;

const px = (value: number) => Math.round(PixelRatio.roundToNearestPixel(value * scale));

export const fontSize = {
    8: { fontSize: px(8) },
    9: { fontSize: px(9) },
    10: { fontSize: px(10) },
    11: { fontSize: px(11) },
    12: { fontSize: px(12) },
    13: { fontSize: px(13) },
    14: { fontSize: px(14) },
    15: { fontSize: px(15) },
    16: { fontSize: px(16) },
    17: { fontSize: px(17) },
    18: { fontSize: px(18) },
    20: { fontSize: px(20) },
    22: { fontSize: px(22) },
    24: { fontSize: px(24) },
    26: { fontSize: px(26) },
    28: { fontSize: px(28) },
    30: { fontSize: px(30) },
    42: { fontSize: px(42) },
    46: { fontSize: px(46) },
    60: { fontSize: px(60) }
} as const;

export const typography = {
    regular: {
        caption3: {
            fontSize: 10
        },
        caption2: {
            fontSize: 11
        },
        caption1: {
            fontSize: 12
        },
        body2: {
            fontSize: 14
        },
        body1: {
            fontSize: 16
        },
        subtitle: {
            fontSize: 18
        },
        h3: {
            fontSize: 20
        },
        h2: {
            fontSize: 22
        },
        h1: {
            fontSize: 26
        }
    },
    bold: {
        caption3: {
            ...fontSize[10],
            fontWeight: 600
        },
        caption2: {
            ...fontSize[11],
            fontWeight: 600
        },
        caption1: {
            ...fontSize[12],
            fontWeight: 600
        },
        body2: {
            ...fontSize[14],
            fontWeight: 600
        },
        body1: {
            ...fontSize[16],
            fontWeight: 600
        },
        subtitle: {
            ...fontSize[18],
            fontWeight: 600
        },
        h3: {
            ...fontSize[20],
            fontWeight: 600
        },
        h2: {
            ...fontSize[22],
            fontWeight: 600
        },
        h1: {
            ...fontSize[26],
            fontWeight: 600
        }
    }
} as const;
