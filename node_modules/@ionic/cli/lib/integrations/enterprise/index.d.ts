import { BaseConfig } from '@ionic/cli-framework';
import { BaseIntegration } from '../';
import { App, EnterpriseProjectIntegration, IntegrationAddDetails, IntegrationName } from '../../../definitions';
interface ProductKey {
    id: number;
    key: string;
    registries: string[];
    updated: string;
    created: string;
    org: any;
    app: any;
    packages: any[];
}
export declare class EnterpriseIntegrationConfig extends BaseConfig<EnterpriseProjectIntegration> {
    provideDefaults(c: Partial<Readonly<EnterpriseProjectIntegration>>): EnterpriseProjectIntegration;
}
export declare class Integration extends BaseIntegration<EnterpriseProjectIntegration> {
    readonly name: IntegrationName;
    readonly summary = "Ionic Enterprise Edition provides premier native solutions, UI, & support for companies building cross-platform apps.";
    readonly archiveUrl: undefined;
    enable(config?: EnterpriseProjectIntegration): Promise<void>;
    add(details: IntegrationAddDetails): Promise<void>;
    protected validatePK(pk: string, appId?: string): Promise<EnterpriseProjectIntegration>;
    protected chooseAppToLink(org: any): Promise<string>;
    protected registerKey(key: ProductKey, appId: string): Promise<ProductKey>;
    protected getAppClient(): Promise<import("../../app").AppClient>;
    protected createNewApp(org: any): Promise<string>;
    protected chooseApp(apps: App[], org: any): Promise<string>;
    protected getPK(pk: string): Promise<ProductKey>;
    protected updateNPMRC(): Promise<void>;
    get config(): EnterpriseIntegrationConfig;
}
export {};
