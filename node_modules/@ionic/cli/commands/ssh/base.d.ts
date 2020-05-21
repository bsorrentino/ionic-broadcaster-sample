import { Command } from '../../lib/command';
export declare abstract class SSHBaseCommand extends Command {
    checkForOpenSSH(): Promise<void>;
}
