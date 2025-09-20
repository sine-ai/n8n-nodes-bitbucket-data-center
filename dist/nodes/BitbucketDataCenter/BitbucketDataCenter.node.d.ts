import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
export declare class BitbucketDataCenter implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
    methods: {
        loadOptions: {
            getProjects(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
            getRepositories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]>;
        };
    };
}
