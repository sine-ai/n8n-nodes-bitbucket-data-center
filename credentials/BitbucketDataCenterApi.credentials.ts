import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class BitbucketDataCenterApi implements ICredentialType {
	name = 'bitbucketDataCenterApi';

	displayName = 'Bitbucket Data Center API';

	documentationUrl = 'https://confluence.atlassian.com/bitbucketserver/personal-access-tokens-939515499.html';

	icon: Icon = 'file:bitbucket.svg';

	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.server}}',
			url: '/rest/api/1.0/profile/recent/repos',
			method: 'GET',
		},
	};
}
