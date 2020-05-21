import { AilmentDeps } from '../../doctor';
import { AngularProject } from './';
export interface AngularAilmentDeps extends AilmentDeps {
    readonly project: AngularProject;
}
