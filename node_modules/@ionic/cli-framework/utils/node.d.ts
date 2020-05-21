import { PackageJson } from '../definitions';
export declare const ERROR_INVALID_PACKAGE_JSON = "INVALID_PACKAGE_JSON";
export declare const ERROR_BIN_NOT_FOUND = "BIN_NOT_FOUND";
/**
 * Lightweight version of https://github.com/npm/validate-npm-package-name
 */
export declare function isValidPackageName(name: string): boolean;
export declare function readPackageJsonFile(p: string): Promise<PackageJson>;
export declare function compileNodeModulesPaths(filePath: string): string[];
export interface ResolveOptions {
    paths?: string[];
}
export declare function resolveBin(m: string, bin: string, options?: ResolveOptions): string;
