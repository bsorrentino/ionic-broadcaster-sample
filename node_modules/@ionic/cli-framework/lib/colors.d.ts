import { MetadataGroup } from '../definitions';
import { LoggerLevel } from './logger';
export declare type ColorFunction = (...text: string[]) => string;
export declare type LoggerColors = {
    [L in LoggerLevel]: ColorFunction;
};
export declare type HelpGroupColors = {
    [G in Exclude<MetadataGroup, MetadataGroup.HIDDEN | MetadataGroup.ADVANCED>]: ColorFunction;
};
export interface HelpColors {
    /**
     * Used to color the section titles in help output.
     */
    title: ColorFunction;
    group: HelpGroupColors;
}
export interface Colors {
    /**
     * Used to mark text as important. Comparable to HTML's <strong>.
     */
    strong: ColorFunction;
    /**
     * Used to mark text as less important.
     */
    weak: ColorFunction;
    /**
     * Used to mark text as input such as commands, inputs, options, etc.
     */
    input: ColorFunction;
    /**
     * Used to mark text as successful.
     */
    success: ColorFunction;
    /**
     * Used to mark text as failed.
     */
    failure: ColorFunction;
    /**
     * Used to mark text as ancillary or supportive.
     */
    ancillary: ColorFunction;
    log: LoggerColors;
    help: HelpColors;
}
export declare const DEFAULT_COLORS: Colors;
export declare const NO_COLORS: Colors;
