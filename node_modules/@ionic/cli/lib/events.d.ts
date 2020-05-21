import { ServeDetails } from '../definitions';
export interface IPCEvent<E extends string, D extends object> {
    type: 'event';
    event: E;
    data: D;
}
export declare function emit(event: 'serve:ready', data: ServeDetails): boolean;
