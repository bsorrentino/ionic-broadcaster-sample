import * as SSHConfig from 'ssh-config';
export { SSHConfig };
export declare function loadFromPath(p: string): Promise<SSHConfig.SSHConfig>;
export declare function isDirective(entry: any): entry is SSHConfig.ConfigDirective;
export declare function isHostDirective(entry: SSHConfig.Config): entry is SSHConfig.ConfigHostDirective;
export declare function getConfigPath(): string;
export declare function findHostSection(conf: SSHConfig.SSHConfig, host: string): SSHConfig.ConfigHostDirective | null;
export declare function ensureHostAndKeyPath(conf: SSHConfig.SSHConfig, conn: {
    host: string;
    port?: number;
}, keyPath: string): void;
