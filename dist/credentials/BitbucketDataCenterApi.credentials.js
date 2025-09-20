"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitbucketDataCenterApi = void 0;
class BitbucketDataCenterApi {
    constructor() {
        this.name = 'bitbucketDataCenterApi';
        this.displayName = 'Bitbucket Data Center API';
        this.documentationUrl = 'https://confluence.atlassian.com/bitbucketserver/personal-access-tokens-939515499.html';
        this.icon = 'file:bitbucket.svg';
        this.properties = [
            {
                displayName: 'Server URL',
                name: 'server',
                type: 'string',
                default: 'https://bitbucket.example.com',
                placeholder: 'https://bitbucket.example.com',
                description: 'The base URL of your Bitbucket Data Center server',
                required: true,
            },
            {
                displayName: 'Personal Access Token',
                name: 'accessToken',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                description: 'Personal Access Token for authenticating with Bitbucket Data Center API',
                required: true,
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.accessToken}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.server}}',
                url: '/rest/api/1.0/profile/recent/repos',
                method: 'GET',
            },
        };
    }
}
exports.BitbucketDataCenterApi = BitbucketDataCenterApi;
