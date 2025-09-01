import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/** 設計稿基準尺寸 */
const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

/** 間距常量 */
const SPACING = {
    /** 超小間距: 4px */
    xs: 4,
    /** 小間距: 8px */
    sm: 8,
    /** 基本間距: 12px */
    base: 12,
    /** 中等間距: 16px */
    md: 16,
    /** 大間距: 24px */
    lg: 24,
    /** 超大間距: 32px */
    xl: 32
} as const;

/** 圓角常量 */
const BORDER_RADIUS = {
    /** 小圓角: 4px */
    sm: 4,
    /** 中等圓角: 8px */
    md: 8,
    /** 大圓角: 16px */
    lg: 16
} as const;

/** 計算比例 */
export const metrics = {
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT,

    /**
     * 按設計寬度比例計算實際寬度
     * @param designWidth - 設計稿中的寬度
     */
    wp: (designWidth: number) => (designWidth / DESIGN_WIDTH) * SCREEN_WIDTH,

    /**
     * 按設計高度比例計算實際高度
     * @param designHeight - 設計稿中的高度
     */
    hp: (designHeight: number) => (designHeight / DESIGN_HEIGHT) * SCREEN_HEIGHT,

    /** 常用間距 */
    spacing: SPACING,

    /** 常用圓角 */
    borderRadius: BORDER_RADIUS
};
