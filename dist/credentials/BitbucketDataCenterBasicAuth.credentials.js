"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitbucketDataCenterBasicAuth = void 0;
class BitbucketDataCenterBasicAuth {
    constructor() {
        this.name = 'bitbucketDataCenterBasicAuth';
        this.displayName = 'Bitbucket Data Center Basic Auth';
        this.documentationUrl = 'https://developer.atlassian.com/server/bitbucket/how-tos/example-basic-authentication/';
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
                displayName: 'Username',
                name: 'username',
                type: 'string',
                default: '',
                description: 'Your Bitbucket username',
                required: true,
            },
            {
                displayName: 'Password / Token',
                name: 'password',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                description: 'Your Bitbucket password or Personal Access Token',
                required: true,
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                auth: {
                    username: '={{$credentials.username}}',
                    password: '={{$credentials.password}}',
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
exports.BitbucketDataCenterBasicAuth = BitbucketDataCenterBasicAuth;
