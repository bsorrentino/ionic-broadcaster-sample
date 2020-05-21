import { IProject, IonicContext, IonicEnvironment } from '../definitions';
export declare function generateIonicEnvironment(ctx: IonicContext, pargv: string[]): Promise<{
    env: IonicEnvironment;
    project?: IProject;
}>;
