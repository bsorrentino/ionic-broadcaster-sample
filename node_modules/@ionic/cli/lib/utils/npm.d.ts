import { PackageJson } from '@ionic/cli-framework';
import { NpmClient } from '../../definitions';
export declare type PkgManagerCommand = 'dedupe' | 'rebuild' | 'install' | 'uninstall' | 'run' | 'info';
export interface PkgManagerOptions {
    command: PkgManagerCommand;
    pkg?: string;
    script?: string;
    scriptArgs?: string[];
    global?: boolean;
    save?: boolean;
    saveDev?: boolean;
    saveExact?: boolean;
    json?: boolean;
}
/**
 * Resolves pkg manager intent with command args.
 *
 * TODO: this is a weird function and should be split up
 *
 * @return Promise<args> If the args is an empty array, it means the pkg manager doesn't have that command.
 */
export declare function pkgManagerArgs(npmClient: NpmClient, options: PkgManagerOptions): Promise<string[]>;
/**
 * @return Promise<package.json on registry or `undefined`>
 */
export declare function pkgFromRegistry(npmClient: NpmClient, options: Partial<PkgManagerOptions>): Promise<PackageJson | undefined>;
