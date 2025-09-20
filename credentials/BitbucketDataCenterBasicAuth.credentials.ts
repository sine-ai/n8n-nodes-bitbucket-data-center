import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class BitbucketDataCenterBasicAuth implements ICredentialType {
	name = 'bitbucketDataCenterBasicAuth';

	displayName = 'Bitbucket Data Center Basic Auth';

	documentationUrl = 'https://developer.atlassian.com/server/bitbucket/how-tos/example-basic-authentication/';

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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
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
