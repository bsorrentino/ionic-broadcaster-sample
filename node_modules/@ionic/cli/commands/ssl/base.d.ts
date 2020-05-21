import { Command } from '../../lib/command';
export declare abstract class SSLBaseCommand extends Command {
    checkForOpenSSL(): Promise<void>;
}
