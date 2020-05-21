"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Debug = require("debug");
const net = require("net");
const os = require("os");
const debug = Debug('ionic:utils-network');
exports.DEFAULT_ADDRESSES = getDefaultAddresses();
function getDefaultAddresses() {
    const addresses = ['0.0.0.0'];
    try {
        const networkInterfaces = os.networkInterfaces();
        for (const device of Object.keys(networkInterfaces)) {
            const networkInterface = networkInterfaces[device];
            addresses.push(...networkInterface.map(i => i.address));
        }
    }
    catch (e) {
        // swallow
    }
    return addresses;
}
function getExternalIPv4Interfaces() {
    const networkInterfaces = os.networkInterfaces();
    const devices = [];
    for (const device of Object.keys(networkInterfaces)) {
        const networkInterface = networkInterfaces[device];
        for (const networkAddress of networkInterface) {
            if (!networkAddress.internal && networkAddress.family === 'IPv4') {
                devices.push({ device, ...networkAddress });
            }
        }
    }
    return devices;
}
exports.getExternalIPv4Interfaces = getExternalIPv4Interfaces;
/**
 * Attempts to locate a port number starting from `port` and incrementing by 1.
 *
 * This function looks through all internal network interfaces, attempting
 * host/port combinations until it finds an available port on all interfaces.
 *
 * @param port The port at which to start checking.
 */
async function findClosestOpenPort(port) {
    async function t(portToCheck) {
        if (await isPortAvailable(portToCheck)) {
            return portToCheck;
        }
        return t(portToCheck + 1);
    }
    return t(port);
}
exports.findClosestOpenPort = findClosestOpenPort;
/**
 * Checks whether a port is open or closed.
 *
 * This function looks through all internal network interfaces, checking
 * whether all host/port combinations are open. If one or more is not, the port
 * is not available.
 */
async function isPortAvailable(port) {
    let available = true;
    for (const address of exports.DEFAULT_ADDRESSES) {
        try {
            debug('checking for open port on %s:%d', address, port);
            available = await isPortAvailableForHost(address, port);
            if (!available) {
                return false;
            }
        }
        catch (e) {
            debug('error while checking %s:%d: %o', address, port, e);
        }
    }
    return available;
}
exports.isPortAvailable = isPortAvailable;
function isPortAvailableForHost(host, port) {
    return new Promise((resolve, reject) => {
        const tester = net.createServer()
            .once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(false); // host/port in use
            }
            else {
                reject(err);
            }
        })
            .once('listening', () => {
            tester.once('close', () => {
                resolve(true); // found available host/port
            })
                .close();
        })
            .on('error', (err) => {
            reject(err);
        })
            .listen(port, host);
    });
}
exports.isPortAvailableForHost = isPortAvailableForHost;
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
async function isHostConnectable(host, port, { timeout } = {}) {
    const tryConnect = async () => {
        return new Promise((resolve, reject) => {
            if (host === '0.0.0.0') {
                host = '127.0.0.1';
            }
            const sock = net.connect({ port, host });
            sock.on('connect', () => {
                sock.destroy();
                resolve(true);
            });
            sock.on('error', err => {
                reject(err);
            });
        });
    };
    return new Promise(async (resolve) => {
        let timer;
        let resolved = false;
        if (timeout) {
            timer = setTimeout(() => {
                debug('Timeout of %dms reached while waiting for host connectivity', timeout);
                resolve(false);
                resolved = true;
            }, timeout);
            timer.unref();
        }
        while (!resolved) {
            try {
                await tryConnect();
                if (timer) {
                    clearTimeout(timer);
                }
                resolve(true);
                resolved = true;
            }
            catch (e) {
                // try again
            }
        }
    });
}
exports.isHostConnectable = isHostConnectable;
