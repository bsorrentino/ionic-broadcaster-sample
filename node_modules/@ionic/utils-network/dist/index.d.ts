/// <reference types="node" />
import * as os from 'os';
export declare const DEFAULT_ADDRESSES: readonly string[];
export declare type NetworkInterface = {
    device: string;
} & os.NetworkInterfaceInfo;
export declare function getExternalIPv4Interfaces(): NetworkInterface[];
/**
 * Attempts to locate a port number starting from `port` and incrementing by 1.
 *
 * This function looks through all internal network interfaces, attempting
 * host/port combinations until it finds an available port on all interfaces.
 *
 * @param port The port at which to start checking.
 */
export declare function findClosestOpenPort(port: number): Promise<number>;
/**
 * Checks whether a port is open or closed.
 *
 * This function looks through all internal network interfaces, checking
 * whether all host/port combinations are open. If one or more is not, the port
 * is not available.
 */
export declare function isPortAvailable(port: number): Promise<boolean>;
export declare function isPortAvailableForHost(host: string, port: number): Promise<boolean>;
/**
 * Continuously attempt TCP connections.
 *
 * By default, this function will only ever resolve once a host is connectable.
 * This behavior can be changed with the `timeout` option, which resolves with
 * `false` if the timeout is reached.
 *
 * @param host The host to connect to.
 * @param port The port to connect to.
 * @param options.timeout Optionally define a timeout, in milliseconds.
 */
export declare function isHostConnectable(host: string, port: number, { timeout }?: {
    timeout?: number;
}): Promise<boolean>;
