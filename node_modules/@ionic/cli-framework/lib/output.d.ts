/// <reference types="node" />
import { LogUpdate } from 'log-update';
import { Colors } from './colors';
import { TaskChain } from './tasks';
export interface OutputStrategy {
    readonly stream: NodeJS.WritableStream;
    createTaskChain(): TaskChain;
}
export interface RedrawLine {
    redrawLine(msg?: string): void;
}
export interface StreamOutputStrategyOptions {
    readonly stream: NodeJS.WritableStream;
    readonly colors?: Colors;
}
export declare class StreamOutputStrategy implements OutputStrategy {
    readonly stream: NodeJS.WritableStream;
    protected readonly colors: Colors;
    constructor({ stream, colors }: StreamOutputStrategyOptions);
    createTaskChain(): TaskChain;
}
export interface LogUpdateOutputStrategyOptions {
    readonly stream?: NodeJS.WritableStream;
    readonly colors?: Colors;
}
export declare class LogUpdateOutputStrategy implements OutputStrategy, RedrawLine {
    readonly stream: NodeJS.WritableStream;
    protected readonly colors: Colors;
    protected readonly logUpdate: LogUpdate;
    constructor({ stream, colors }?: LogUpdateOutputStrategyOptions);
    redrawLine(msg?: string): void;
    createTaskChain(): TaskChain;
}
