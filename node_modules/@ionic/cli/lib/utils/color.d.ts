export interface RGB {
    b: number;
    g: number;
    r: number;
}
export interface HSL {
    h: number;
    l: number;
    s: number;
}
export declare class Color {
    readonly hex: string;
    readonly hsl: HSL;
    readonly rgb: RGB;
    readonly yiq: number;
    constructor(value: string | RGB | HSL);
    static isColor(value: string): boolean;
    contrast: (threshold?: number) => Color;
    mix: (from: string | RGB | HSL | Color, amount?: number) => Color;
    shade: (weight?: number) => Color;
    tint: (weight?: number) => Color;
    toList(): string;
}
