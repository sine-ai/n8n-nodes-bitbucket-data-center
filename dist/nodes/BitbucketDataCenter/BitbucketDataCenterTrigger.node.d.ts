import type { IHookFunctions, IWebhookFunctions, INodeType, INodeTypeDescription, IWebhookResponseData, ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
export declare class BitbucketDataCenterTrigger implements INodeType {
    description: INodeTypeDescription;
    webhookMethods: {
        default: {
            checkExists(this: IHookFunctions): Promise<boolean>;
            create(this: IHookFunctions): Promise<boolean>;
            delete(this: IHookFunctions): Promise<boolean>;
        };
    };
    methods: {
        loadOptions: {
            getProjects(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getRepositories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
    webhook(this: IWebhookFunctions): Promise<IWebhookResponseData>;
}
