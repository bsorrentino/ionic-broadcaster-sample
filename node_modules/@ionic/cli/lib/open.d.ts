export interface OpenUrlOptions {
    app?: string | readonly string[];
}
export declare function openUrl(target: string, options?: OpenUrlOptions): Promise<void>;
