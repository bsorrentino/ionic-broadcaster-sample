export interface Ports {
    port: number;
    livereloadPort: number;
    notificationPort: number;
}
/**
 * Convenience function for finding open ports of old-style projects.
 *
 * For `ionic-angular` and `ionic1`, Ionic provides the livereload server and
 * "dev logger" server.
 */
export declare function findOpenIonicPorts(address: string, ports: Ports): Promise<Ports>;
