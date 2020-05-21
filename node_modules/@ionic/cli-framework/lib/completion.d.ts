import { CommandMetadata, CommandMetadataInput, CommandMetadataOption, ICommand, INamespace } from '../definitions';
export declare function getCompletionWords<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption>(ns: N, argv: readonly string[]): Promise<string[]>;
export interface CompletionFormatterDeps<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> {
    readonly namespace: N;
}
export declare abstract class CompletionFormatter<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> {
    protected readonly namespace: N;
    constructor({ namespace }: CompletionFormatterDeps<C, N, M, I, O>);
    abstract format(): Promise<string>;
}
export declare class ZshCompletionFormatter<C extends ICommand<C, N, M, I, O>, N extends INamespace<C, N, M, I, O>, M extends CommandMetadata<I, O>, I extends CommandMetadataInput, O extends CommandMetadataOption> extends CompletionFormatter<C, N, M, I, O> {
    format(): Promise<string>;
}
