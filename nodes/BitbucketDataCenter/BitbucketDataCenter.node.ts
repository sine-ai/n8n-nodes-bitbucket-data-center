import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	IRequestOptions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class BitbucketDataCenter implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bitbucket Data Center',
		name: 'bitbucketDataCenter',
		icon: 'file:bitbucket.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Bitbucket Data Center API',
		defaults: {
			name: 'Bitbucket Data Center',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'bitbucketDataCenterApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['accessToken'],
					},
				},
			},
			{
				name: 'bitbucketDataCenterBasicAuth',
				required: true,
				displayOptions: {
					show: {
						authentication: ['basicAuth'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Personal Access Token',
						value: 'accessToken',
					},
					{
						name: 'Basic Auth',
						value: 'basicAuth',
					},
				],
				default: 'accessToken',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Branch',
						value: 'branch',
					},
					{
						name: 'Commit',
						value: 'commit',
					},
					{
						name: 'Issue',
						value: 'issue',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Pull Request',
						value: 'pullRequest',
					},
					{
						name: 'Repository',
						value: 'repository',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'File',
						value: 'file',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'repository',
			},

			// Project Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['project'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a project',
						action: 'Create a project',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a project',
						action: 'Delete a project',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a project',
						action: 'Get a project',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all projects',
						action: 'Get all projects',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a project',
						action: 'Update a project',
					},
				],
				default: 'getAll',
			},

			// Repository Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['repository'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a repository',
						action: 'Create a repository',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a repository',
						action: 'Delete a repository',
					},
					{
						name: 'Fork',
						value: 'fork',
						description: 'Fork a repository',
						action: 'Fork a repository',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a repository',
						action: 'Get a repository',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all repositories',
						action: 'Get all repositories',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a repository',
						action: 'Update a repository',
					},
				],
				default: 'getAll',
			},

			// Pull Request Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['pullRequest'],
					},
				},
				options: [
					{
						name: 'Approve',
						value: 'approve',
						description: 'Approve a pull request',
						action: 'Approve a pull request',
					},
					{
						name: 'Add Comment',
						value: 'addComment',
						description: 'Add a comment to a pull request',
						action: 'Add a comment to a pull request',
					},
					{
						name: 'Add Reviewer',
						value: 'addReviewer',
						description: 'Add a reviewer to a pull request',
						action: 'Add a reviewer to a pull request',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a pull request',
						action: 'Create a pull request',
					},
					{
						name: 'Decline',
						value: 'decline',
						description: 'Decline a pull request',
						action: 'Decline a pull request',
					},
					{
						name: 'Delete Comment',
						value: 'deleteComment',
						description: 'Delete a pull request comment',
						action: 'Delete a pull request comment',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a pull request',
						action: 'Get a pull request',
					},
					{
						name: 'Get Activities',
						value: 'getActivities',
						description: 'Get all activities for a pull request',
						action: 'Get all activities for a pull request',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all pull requests',
						action: 'Get all pull requests',
					},
					{
						name: 'Get All Comments',
						value: 'getAllComments',
						description: 'Get all comments for a pull request',
						action: 'Get all comments for a pull request',
					},
					{
						name: 'Get Participants',
						value: 'getParticipants',
						description: 'Get all participants for a pull request',
						action: 'Get all participants for a pull request',
					},
					{
						name: 'Merge',
						value: 'merge',
						description: 'Merge a pull request',
						action: 'Merge a pull request',
					},
					{
						name: 'Needs Work',
						value: 'needsWork',
						description: 'Mark a pull request as needing work',
						action: 'Mark a pull request as needing work',
					},
					{
						name: 'Remove Reviewer',
						value: 'removeReviewer',
						description: 'Remove a reviewer from a pull request',
						action: 'Remove a reviewer from a pull request',
					},
					{
						name: 'Unapprove',
						value: 'unapprove',
						description: 'Remove approval from a pull request',
						action: 'Remove approval from a pull request',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a pull request',
						action: 'Update a pull request',
					},
					{
						name: 'Update Comment',
						value: 'updateComment',
						description: 'Update a pull request comment',
						action: 'Update a pull request comment',
					},
				],
				default: 'getAll',
			},

			// Issue Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['issue'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create an issue',
						action: 'Create an issue',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an issue',
						action: 'Delete an issue',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an issue',
						action: 'Get an issue',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all issues',
						action: 'Get all issues',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an issue',
						action: 'Update an issue',
					},
				],
				default: 'getAll',
			},

			// Branch Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['branch'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all branches',
						action: 'Get all branches',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a branch',
						action: 'Create a branch',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a branch',
						action: 'Delete a branch',
					},
				],
				default: 'getAll',
			},

			// Commit Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['commit'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a commit',
						action: 'Get a commit',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all commits',
						action: 'Get all commits',
					},
				],
				default: 'getAll',
			},

			// User Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get user information',
						action: 'Get user information',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all users',
						action: 'Get all users',
					},
				],
				default: 'get',
			},

			// Tag Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tag'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all tags',
						action: 'Get all tags',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a tag',
						action: 'Create a tag',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a tag',
						action: 'Delete a tag',
					},
				],
				default: 'getAll',
			},

			// File Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['file'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get file content',
						action: 'Get file content',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'List files in a directory',
						action: 'List files in a directory',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create or update a file',
						action: 'Create or update a file',
					},
				],
				default: 'get',
			},

			// Webhook Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all webhooks',
						action: 'Get all webhooks',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a webhook',
						action: 'Create a webhook',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a webhook',
						action: 'Update a webhook',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a webhook',
						action: 'Delete a webhook',
					},
				],
				default: 'getAll',
			},

			// Common Parameters
			{
				displayName: 'Project',
				name: 'projectKey',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getProjects',
				},
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The project to work with',
				required: true,
			},
			{
				displayName: 'Project',
				name: 'projectKey',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getProjects',
				},
				displayOptions: {
					show: {
						resource: ['repository', 'pullRequest', 'issue', 'branch', 'commit'],
					},
				},
				default: '',
				description: 'The project to work with',
				required: true,
			},
			{
				displayName: 'Repository',
				name: 'repositorySlug',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getRepositories',
					loadOptionsDependsOn: ['projectKey'],
				},
				displayOptions: {
					show: {
						resource: ['repository', 'pullRequest', 'issue', 'branch', 'commit'],
						operation: ['get', 'update', 'delete', 'merge', 'decline', 'fork'],
					},
				},
				default: '',
				description: 'The repository to work with',
				required: true,
			},

			// Project specific parameters
			{
				displayName: 'Project Name',
				name: 'name',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The name of the project',
				required: true,
			},
			{
				displayName: 'Project Key',
				name: 'key',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'PROJ',
				description: 'The key of the project',
				required: true,
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project', 'repository'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The description of the project/repository',
			},

			// Repository specific parameters
			{
				displayName: 'Repository Name',
				name: 'name',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['repository'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The name of the repository',
				required: true,
			},
			{
				displayName: 'Repository Slug',
				name: 'repositorySlug',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['repository'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'my-repo',
				description: 'The slug of the repository (will be auto-generated if empty)',
			},
			{
				displayName: 'Public',
				name: 'public',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['repository'],
						operation: ['create', 'update'],
					},
				},
				default: false,
				description: 'Whether the repository is public',
			},

			// Pull Request specific parameters
			{
				displayName: 'Pull Request ID',
				name: 'pullRequestId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['get', 'update', 'merge', 'decline', 'approve', 'unapprove', 'needsWork', 'addComment', 'updateComment', 'deleteComment', 'getAllComments', 'getActivities', 'getParticipants', 'addReviewer', 'removeReviewer'],
					},
				},
				default: 0,
				description: 'The ID of the pull request',
				required: true,
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The title of the pull request',
				required: true,
			},
			{
				displayName: 'From Branch',
				name: 'fromRef',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'feature-branch',
				description: 'The source branch',
				required: true,
			},
			{
				displayName: 'To Branch',
				name: 'toRef',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['create'],
					},
				},
				default: 'main',
				placeholder: 'main',
				description: 'The destination branch',
				required: true,
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The description of the pull request',
			},
			{
				displayName: 'Comment Text',
				name: 'text',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['addComment', 'updateComment'],
					},
				},
				default: '',
				description: 'The text content of the comment',
				required: true,
			},
			{
				displayName: 'Comment ID',
				name: 'commentId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['updateComment', 'deleteComment'],
					},
				},
				default: 0,
				description: 'The ID of the comment to update or delete',
				required: true,
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['pullRequest'],
						operation: ['addReviewer', 'removeReviewer'],
					},
				},
				default: '',
				description: 'The username of the reviewer to add or remove',
				required: true,
			},

			// Issue specific parameters
			{
				displayName: 'Issue ID',
				name: 'issueId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['issue'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: 0,
				description: 'The ID of the issue',
				required: true,
			},

			// Tag specific parameters
			{
				displayName: 'Tag Name',
				name: 'tagName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create', 'delete'],
					},
				},
				default: '',
				description: 'The name of the tag',
				required: true,
			},
			{
				displayName: 'Start Point',
				name: 'startPoint',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create'],
					},
				},
				default: 'main',
				placeholder: 'main',
				description: 'The commit hash or branch name to tag from',
				required: true,
			},
			{
				displayName: 'Tag Message',
				name: 'message',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Optional message for the tag',
			},

			// File specific parameters
			{
				displayName: 'File Path',
				name: 'filePath',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['get', 'create'],
					},
				},
				default: '',
				placeholder: 'src/main.js',
				description: 'The path to the file',
				required: true,
			},
			{
				displayName: 'Directory Path',
				name: 'directoryPath',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['getAll'],
					},
				},
				default: '',
				placeholder: 'src/',
				description: 'The directory path to list files from (leave empty for root)',
			},
			{
				displayName: 'File Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The content of the file',
				required: true,
			},
			{
				displayName: 'Commit Message',
				name: 'commitMessage',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Commit message for the file change',
				required: true,
			},

			// Webhook specific parameters
			{
				displayName: 'Webhook ID',
				name: 'webhookId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['update', 'delete'],
					},
				},
				default: 0,
				description: 'The ID of the webhook',
				required: true,
			},
			{
				displayName: 'Webhook URL',
				name: 'url',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				placeholder: 'https://example.com/webhook',
				description: 'The URL to send webhook notifications to',
				required: true,
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Repository Push',
						value: 'repo:refs_changed',
					},
					{
						name: 'Pull Request Opened',
						value: 'pr:opened',
					},
					{
						name: 'Pull Request Merged',
						value: 'pr:merged',
					},
					{
						name: 'Pull Request Declined',
						value: 'pr:declined',
					},
					{
						name: 'Pull Request Comment Added',
						value: 'pr:comment:added',
					},
				],
				default: ['repo:refs_changed'],
				description: 'The events that trigger the webhook',
				required: true,
			},
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create', 'update'],
					},
				},
				default: true,
				description: 'Whether the webhook is active',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['issue'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The title of the issue',
				required: true,
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['issue'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The content/description of the issue',
			},

			// Branch specific parameters
			{
				displayName: 'Branch Name',
				name: 'name',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['branch'],
						operation: ['create', 'delete'],
					},
				},
				default: '',
				description: 'The name of the branch',
				required: true,
			},
			{
				displayName: 'Start Point',
				name: 'startPoint',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['branch'],
						operation: ['create'],
					},
				},
				default: 'main',
				description: 'The branch or commit to start from',
				required: true,
			},

			// Commit specific parameters
			{
				displayName: 'Commit ID',
				name: 'commitId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['commit'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID/hash of the commit',
				required: true,
			},

			// User specific parameters
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The username to get information for (leave empty for current user)',
			},

			// Common pagination parameters
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['getAll'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 500,
				},
				default: 50,
				description: 'Max number of results to return',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		let credentials;
		const authentication = this.getNodeParameter('authentication', 0) as string;

		if (authentication === 'accessToken') {
			credentials = await this.getCredentials('bitbucketDataCenterApi');
		} else {
			credentials = await this.getCredentials('bitbucketDataCenterBasicAuth');
		}

		const baseURL = credentials.server as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				if (resource === 'project') {
					responseData = await handleProjectOperations.call(this, i, operation, baseURL, authentication);
				} else if (resource === 'repository') {
					responseData = await handleRepositoryOperations.call(this, i, operation, baseURL, authentication);
				} else if (resource === 'pullRequest') {
					responseData = await handlePullRequestOperations.call(this, i, operation, baseURL, authentication);
				} else if (resource === 'issue') {
					responseData = await handleIssueOperations.call(this, i, operation, baseURL, authentication);
				} else if (resource === 'branch') {
					responseData = await handleBranchOperations.call(this, i, operation, baseURL, authentication);
				} else if (resource === 'commit') {
					responseData = await handleCommitOperations.call(this, i, operation, baseURL, authentication);
				} else if (resource === 'user') {
					responseData = await handleUserOperations.call(this, i, operation, baseURL, authentication);
				} else if (resource === 'tag') {
					responseData = await handleTagOperations.call(this, i, operation, baseURL, authentication);
				} else if (resource === 'file') {
					responseData = await handleFileOperations.call(this, i, operation, baseURL, authentication);
				} else if (resource === 'webhook') {
					responseData = await handleWebhookOperations.call(this, i, operation, baseURL, authentication);
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData);
				} else if (responseData) {
					returnData.push(responseData);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						error: error instanceof Error ? error.message : 'Unknown error',
					});
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}

	methods = {
		loadOptions: {
			async getProjects(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];

				const authentication = this.getNodeParameter('authentication', 0) as string;
				let credentials;

				if (authentication === 'accessToken') {
					credentials = await this.getCredentials('bitbucketDataCenterApi');
				} else {
					credentials = await this.getCredentials('bitbucketDataCenterBasicAuth');
				}

				const baseURL = credentials.server as string;

				try {
					const responseData = await makeApiRequestForOptions.call(
						this,
						'GET',
						`${baseURL}/rest/api/1.0/projects?limit=100`,
						undefined,
						undefined,
						authentication,
					);

					const projects = responseData.values || [];
					for (const project of projects) {
						returnData.push({
							name: `${project.key} - ${project.name}`,
							value: project.key,
						});
					}
				} catch (error) {
					// If there's an error, return empty array instead of throwing
					return [];
				}

				return returnData.sort((a, b) => a.name.localeCompare(b.name));
			},

			async getRepositories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];

				const projectKey = this.getNodeParameter('projectKey') as string;
				if (!projectKey) {
					return returnData;
				}

				const authentication = this.getNodeParameter('authentication', 0) as string;
				let credentials;

				if (authentication === 'accessToken') {
					credentials = await this.getCredentials('bitbucketDataCenterApi');
				} else {
					credentials = await this.getCredentials('bitbucketDataCenterBasicAuth');
				}

				const baseURL = credentials.server as string;

				try {
					const responseData = await makeApiRequestForOptions.call(
						this,
						'GET',
						`${baseURL}/rest/api/1.0/projects/${projectKey}/repos?limit=100`,
						undefined,
						undefined,
						authentication,
					);

					const repositories = responseData.values || [];
					for (const repo of repositories) {
						returnData.push({
							name: `${repo.slug} - ${repo.name}`,
							value: repo.slug,
						});
					}
				} catch (error) {
					// If there's an error, return empty array instead of throwing
					return [];
				}

				return returnData.sort((a, b) => a.name.localeCompare(b.name));
			},
		},
	};
}

// Helper function to make API requests for loadOptions
async function makeApiRequestForOptions(
	this: ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	url: string,
	body?: IDataObject,
	qs?: IDataObject,
	authentication?: string,
): Promise<any> {
	const options: IRequestOptions = {
		method,
		body,
		qs,
		url,
		json: true,
	};

	// Use the authentication method specified, or default to accessToken
	const authMethod = authentication || 'accessToken';
	const credentialType = authMethod === 'accessToken' ? 'bitbucketDataCenterApi' : 'bitbucketDataCenterBasicAuth';

	try {
		return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
	} catch (error) {
		throw new NodeOperationError(this.getNode(), `Bitbucket Data Center API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

// Helper function to make API requests
async function makeApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	url: string,
	body?: IDataObject,
	qs?: IDataObject,
	authentication?: string,
): Promise<any> {
	const options: IRequestOptions = {
		method,
		body,
		qs,
		url,
		json: true,
	};

	// Use the authentication method specified, or default to accessToken
	const authMethod = authentication || 'accessToken';
	const credentialType = authMethod === 'accessToken' ? 'bitbucketDataCenterApi' : 'bitbucketDataCenterBasicAuth';

	try {
		return await this.helpers.requestWithAuthentication.call(this, credentialType, options);
	} catch (error) {
		throw new NodeOperationError(this.getNode(), `Bitbucket Data Center API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

// Helper function to get current username
async function getCurrentUsername(
	this: IExecuteFunctions,
	baseURL: string,
	authentication: string,
): Promise<string> {
	try {
		// Try to get current user info
		const url = `${baseURL}/rest/api/1.0/users?filter=myself`;
		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, { limit: 1 }, authentication);
		
		if (responseData && responseData.values && responseData.values.length > 0) {
			return responseData.values[0].name;
		}
		
		// Fallback: use username from credentials if available
		const authMethod = authentication || 'accessToken';
		if (authMethod === 'basicAuth') {
			const credentials = await this.getCredentials('bitbucketDataCenterBasicAuth');
			if (credentials && credentials.username) {
				return credentials.username as string;
			}
		}
		
		throw new Error('Could not determine current username');
	} catch (error) {
		throw new NodeOperationError(this.getNode(), `Failed to get current username: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

// Project operations handler
async function handleProjectOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	baseURL: string,
	authentication: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index);
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', index) as number);
		
		let url = `${baseURL}/rest/api/1.0/projects`;
		const qs: IDataObject = {};
		
		if (limit) {
			qs.limit = limit;
		}

		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
		return responseData.values || [];
	}

	if (operation === 'get') {
		const projectKey = this.getNodeParameter('projectKey', index) as string;
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}`;
		return await makeApiRequest.call(this, 'GET', url, undefined, undefined, authentication);
	}

	if (operation === 'create') {
		const body: IDataObject = {
			key: this.getNodeParameter('key', index),
			name: this.getNodeParameter('name', index),
		};

		const description = this.getNodeParameter('description', index) as string;
		if (description) {
			body.description = description;
		}

		const url = `${baseURL}/rest/api/1.0/projects`;
		return await makeApiRequest.call(this, 'POST', url, body, undefined, authentication);
	}

	if (operation === 'update') {
		const projectKey = this.getNodeParameter('projectKey', index) as string;
		const body: IDataObject = {
			name: this.getNodeParameter('name', index),
		};

		const description = this.getNodeParameter('description', index) as string;
		if (description) {
			body.description = description;
		}

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}`;
		return await makeApiRequest.call(this, 'PUT', url, body, undefined, authentication);
	}

	if (operation === 'delete') {
		const projectKey = this.getNodeParameter('projectKey', index) as string;
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}`;
		await makeApiRequest.call(this, 'DELETE', url, undefined, undefined, authentication);
		return { success: true };
	}

	throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "project"`);
}

// Repository operations handler
async function handleRepositoryOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	baseURL: string,
	authentication: string,
): Promise<IDataObject | IDataObject[]> {
	const projectKey = this.getNodeParameter('projectKey', index) as string;

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index);
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', index) as number);
		
		let url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos`;
		const qs: IDataObject = {};
		
		if (limit) {
			qs.limit = limit;
		}

		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
		return responseData.values || [];
	}

	const repositorySlug = this.getNodeParameter('repositorySlug', index) as string;

	if (operation === 'get') {
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}`;
		return await makeApiRequest.call(this, 'GET', url, undefined, undefined, authentication);
	}

	if (operation === 'create') {
		const body: IDataObject = {
			name: this.getNodeParameter('name', index),
		};

		const repositorySlugParam = this.getNodeParameter('repositorySlug', index) as string;
		if (repositorySlugParam) {
			body.scmId = repositorySlugParam;
		}

		const description = this.getNodeParameter('description', index) as string;
		if (description) {
			body.description = description;
		}

		const isPublic = this.getNodeParameter('public', index) as boolean;
		body.public = isPublic;

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos`;
		return await makeApiRequest.call(this, 'POST', url, body, undefined, authentication);
	}

	if (operation === 'update') {
		const body: IDataObject = {
			name: this.getNodeParameter('name', index),
		};

		const description = this.getNodeParameter('description', index) as string;
		if (description) {
			body.description = description;
		}

		const isPublic = this.getNodeParameter('public', index) as boolean;
		body.public = isPublic;

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}`;
		return await makeApiRequest.call(this, 'PUT', url, body, undefined, authentication);
	}

	if (operation === 'delete') {
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}`;
		await makeApiRequest.call(this, 'DELETE', url, undefined, undefined, authentication);
		return { success: true };
	}

	if (operation === 'fork') {
		const body: IDataObject = {
			name: repositorySlug,
			project: { key: projectKey },
		};

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}`;
		return await makeApiRequest.call(this, 'POST', url, body, undefined, authentication);
	}

	throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "repository"`);
}

// Pull Request operations handler
async function handlePullRequestOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	baseURL: string,
	authentication: string,
): Promise<IDataObject | IDataObject[]> {
	const projectKey = this.getNodeParameter('projectKey', index) as string;
	const repositorySlug = this.getNodeParameter('repositorySlug', index) as string;

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index);
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', index) as number);
		
		let url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests`;
		const qs: IDataObject = {};
		
		if (limit) {
			qs.limit = limit;
		}

		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
		return responseData.values || [];
	}

	const pullRequestId = this.getNodeParameter('pullRequestId', index) as number;

	if (operation === 'get') {
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}`;
		return await makeApiRequest.call(this, 'GET', url, undefined, undefined, authentication);
	}

	if (operation === 'create') {
		const body: IDataObject = {
			title: this.getNodeParameter('title', index),
			fromRef: {
				id: `refs/heads/${this.getNodeParameter('fromRef', index)}`,
				repository: {
					slug: repositorySlug,
					project: { key: projectKey },
				},
			},
			toRef: {
				id: `refs/heads/${this.getNodeParameter('toRef', index)}`,
				repository: {
					slug: repositorySlug,
					project: { key: projectKey },
				},
			},
		};

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests`;
		return await makeApiRequest.call(this, 'POST', url, body, undefined, authentication);
	}

	if (operation === 'update') {
		const body: IDataObject = {
			title: this.getNodeParameter('title', index),
			version: 1, // This should ideally be fetched from current PR
		};

		const description = this.getNodeParameter('description', index) as string;
		if (description) {
			body.description = description;
		}

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}`;
		return await makeApiRequest.call(this, 'PUT', url, body, undefined, authentication);
	}

	if (operation === 'merge') {
		const body: IDataObject = {
			version: 1, // This should ideally be fetched from current PR
		};

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/merge`;
		return await makeApiRequest.call(this, 'POST', url, body, undefined, authentication);
	}

	if (operation === 'decline') {
		const body: IDataObject = {
			version: 1, // This should ideally be fetched from current PR
		};

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/decline`;
		return await makeApiRequest.call(this, 'POST', url, body, undefined, authentication);
	}

	// Comment operations
	if (operation === 'addComment') {
		const body: IDataObject = {
			text: this.getNodeParameter('text', index),
		};

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/comments`;
		return await makeApiRequest.call(this, 'POST', url, body, undefined, authentication);
	}

	if (operation === 'getAllComments') {
		const returnAll = this.getNodeParameter('returnAll', index);
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', index) as number);
		
		let url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/comments`;
		const qs: IDataObject = {};
		
		if (limit) {
			qs.limit = limit;
		}

		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
		return responseData.values || [];
	}

	if (operation === 'updateComment') {
		const commentId = this.getNodeParameter('commentId', index) as number;
		const body: IDataObject = {
			text: this.getNodeParameter('text', index),
		};

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/comments/${commentId}`;
		return await makeApiRequest.call(this, 'PUT', url, body, undefined, authentication);
	}

	if (operation === 'deleteComment') {
		const commentId = this.getNodeParameter('commentId', index) as number;
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/comments/${commentId}`;
		await makeApiRequest.call(this, 'DELETE', url, undefined, undefined, authentication);
		return { success: true };
	}

	// Reviewer operations
	if (operation === 'approve') {
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/participants`;
		const body: IDataObject = {
			user: {
				name: await getCurrentUsername.call(this, baseURL, authentication),
			},
			approved: true,
		};

		return await makeApiRequest.call(this, 'PUT', url, body, undefined, authentication);
	}

	if (operation === 'unapprove') {
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/participants`;
		const body: IDataObject = {
			user: {
				name: await getCurrentUsername.call(this, baseURL, authentication),
			},
			approved: false,
		};

		return await makeApiRequest.call(this, 'PUT', url, body, undefined, authentication);
	}

	if (operation === 'needsWork') {
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/participants`;
		const body: IDataObject = {
			user: {
				name: await getCurrentUsername.call(this, baseURL, authentication),
			},
			approved: false,
			status: 'NEEDS_WORK',
		};

		return await makeApiRequest.call(this, 'PUT', url, body, undefined, authentication);
	}

	if (operation === 'addReviewer') {
		const username = this.getNodeParameter('username', index) as string;
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/participants`;
		const body: IDataObject = {
			user: {
				name: username,
			},
			role: 'REVIEWER',
		};

		return await makeApiRequest.call(this, 'PUT', url, body, undefined, authentication);
	}

	if (operation === 'removeReviewer') {
		const username = this.getNodeParameter('username', index) as string;
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/participants/${username}`;
		await makeApiRequest.call(this, 'DELETE', url, undefined, undefined, authentication);
		return { success: true };
	}

	// Information operations
	if (operation === 'getActivities') {
		const returnAll = this.getNodeParameter('returnAll', index);
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', index) as number);
		
		let url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/activities`;
		const qs: IDataObject = {};
		
		if (limit) {
			qs.limit = limit;
		}

		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
		return responseData.values || [];
	}

	if (operation === 'getParticipants') {
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests/${pullRequestId}/participants`;
		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, undefined, authentication);
		return responseData.values || [];
	}

	throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "pullRequest"`);
}

// Issue operations handler (Note: Bitbucket Data Center may not have native issues, this is for external issue trackers)
async function handleIssueOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	baseURL: string,
	authentication: string,
): Promise<IDataObject | IDataObject[]> {
	// Note: Bitbucket Data Center doesn't have built-in issues like Bitbucket Cloud
	// This would require integration with external issue trackers like Jira
	throw new NodeOperationError(this.getNode(), 'Issue operations are not directly supported in Bitbucket Data Center. Please use Jira integration instead.');
}

// Branch operations handler
async function handleBranchOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	baseURL: string,
	authentication: string,
): Promise<IDataObject | IDataObject[]> {
	const projectKey = this.getNodeParameter('projectKey', index) as string;
	const repositorySlug = this.getNodeParameter('repositorySlug', index) as string;

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index);
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', index) as number);
		
		let url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/branches`;
		const qs: IDataObject = {};
		
		if (limit) {
			qs.limit = limit;
		}

		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
		return responseData.values || [];
	}

	if (operation === 'create') {
		const body: IDataObject = {
			name: this.getNodeParameter('name', index),
			startPoint: this.getNodeParameter('startPoint', index),
		};

		const url = `${baseURL}/rest/branch-utils/1.0/projects/${projectKey}/repos/${repositorySlug}/branches`;
		return await makeApiRequest.call(this, 'POST', url, body, undefined, authentication);
	}

	if (operation === 'delete') {
		const branchName = this.getNodeParameter('name', index) as string;
		const url = `${baseURL}/rest/branch-utils/1.0/projects/${projectKey}/repos/${repositorySlug}/branches`;
		const body = {
			name: `refs/heads/${branchName}`,
		};
		
		await makeApiRequest.call(this, 'DELETE', url, body, undefined, authentication);
		return { success: true };
	}

	throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "branch"`);
}

// Commit operations handler
async function handleCommitOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	baseURL: string,
	authentication: string,
): Promise<IDataObject | IDataObject[]> {
	const projectKey = this.getNodeParameter('projectKey', index) as string;
	const repositorySlug = this.getNodeParameter('repositorySlug', index) as string;

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index);
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', index) as number);
		
		let url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/commits`;
		const qs: IDataObject = {};
		
		if (limit) {
			qs.limit = limit;
		}

		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
		return responseData.values || [];
	}

	if (operation === 'get') {
		const commitId = this.getNodeParameter('commitId', index) as string;
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/commits/${commitId}`;
		return await makeApiRequest.call(this, 'GET', url, undefined, undefined, authentication);
	}

	throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "commit"`);
}

// User operations handler
async function handleUserOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	baseURL: string,
	authentication: string,
): Promise<IDataObject | IDataObject[]> {
	if (operation === 'get') {
		const username = this.getNodeParameter('username', index) as string;
		let url = `${baseURL}/rest/api/1.0/users`;
		
		if (username) {
			url += `/${username}`;
		} else {
			// Get current user
			url = `${baseURL}/rest/api/1.0/user`;
		}

		return await makeApiRequest.call(this, 'GET', url, undefined, undefined, authentication);
	}

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index);
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', index) as number);
		
		let url = `${baseURL}/rest/api/1.0/users`;
		const qs: IDataObject = {};
		
		if (limit) {
			qs.limit = limit;
		}

		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
		return responseData.values || [];
	}

	throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "user"`);
}

// Tag operations handler
async function handleTagOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	baseURL: string,
	authentication: string,
): Promise<IDataObject | IDataObject[]> {
	const projectKey = this.getNodeParameter('projectKey', index) as string;
	const repositorySlug = this.getNodeParameter('repositorySlug', index) as string;

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index);
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', index) as number);
		
		let url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/tags`;
		const qs: IDataObject = {};
		
		if (limit) {
			qs.limit = limit;
		}

		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
		return responseData.values || [];
	}

	if (operation === 'create') {
		const tagName = this.getNodeParameter('tagName', index) as string;
		const startPoint = this.getNodeParameter('startPoint', index) as string;
		const message = this.getNodeParameter('message', index) as string;

		const body: IDataObject = {
			name: tagName,
			startPoint: startPoint,
		};

		if (message) {
			body.message = message;
		}

		const url = `${baseURL}/rest/git/1.0/projects/${projectKey}/repos/${repositorySlug}/tags`;
		return await makeApiRequest.call(this, 'POST', url, body, undefined, authentication);
	}

	if (operation === 'delete') {
		const tagName = this.getNodeParameter('tagName', index) as string;
		const url = `${baseURL}/rest/git/1.0/projects/${projectKey}/repos/${repositorySlug}/tags/${encodeURIComponent(tagName)}`;
		await makeApiRequest.call(this, 'DELETE', url, undefined, undefined, authentication);
		return { success: true };
	}

	throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "tag"`);
}

// File operations handler
async function handleFileOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	baseURL: string,
	authentication: string,
): Promise<IDataObject | IDataObject[]> {
	const projectKey = this.getNodeParameter('projectKey', index) as string;
	const repositorySlug = this.getNodeParameter('repositorySlug', index) as string;

	if (operation === 'get') {
		const filePath = this.getNodeParameter('filePath', index) as string;
		const at = this.getNodeParameter('at', index, 'main') as string;
		
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/browse/${encodeURIComponent(filePath)}`;
		const qs: IDataObject = { at };

		return await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
	}

	if (operation === 'getAll') {
		const directoryPath = this.getNodeParameter('directoryPath', index) as string;
		const at = this.getNodeParameter('at', index, 'main') as string;
		const returnAll = this.getNodeParameter('returnAll', index);
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', index) as number);
		
		let url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/browse`;
		if (directoryPath) {
			url += `/${encodeURIComponent(directoryPath)}`;
		}

		const qs: IDataObject = { at };
		if (limit) {
			qs.limit = limit;
		}

		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
		return responseData.children?.values || [];
	}

	if (operation === 'create') {
		const filePath = this.getNodeParameter('filePath', index) as string;
		const content = this.getNodeParameter('content', index) as string;
		const commitMessage = this.getNodeParameter('commitMessage', index) as string;
		const branch = this.getNodeParameter('branch', index, 'main') as string;

		// For file operations, we need to use the source branch management API
		const body: IDataObject = {
			content: Buffer.from(content).toString('base64'),
			message: commitMessage,
			branch: branch,
		};

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/browse/${encodeURIComponent(filePath)}`;
		return await makeApiRequest.call(this, 'PUT', url, body, undefined, authentication);
	}

	throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "file"`);
}

// Webhook operations handler
async function handleWebhookOperations(
	this: IExecuteFunctions,
	index: number,
	operation: string,
	baseURL: string,
	authentication: string,
): Promise<IDataObject | IDataObject[]> {
	const projectKey = this.getNodeParameter('projectKey', index) as string;
	const repositorySlug = this.getNodeParameter('repositorySlug', index) as string;

	if (operation === 'getAll') {
		const returnAll = this.getNodeParameter('returnAll', index);
		const limit = returnAll ? undefined : (this.getNodeParameter('limit', index) as number);
		
		let url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/webhooks`;
		const qs: IDataObject = {};
		
		if (limit) {
			qs.limit = limit;
		}

		const responseData = await makeApiRequest.call(this, 'GET', url, undefined, qs, authentication);
		return responseData.values || [];
	}

	if (operation === 'create') {
		const webhookUrl = this.getNodeParameter('url', index) as string;
		const events = this.getNodeParameter('events', index) as string[];
		const active = this.getNodeParameter('active', index) as boolean;

		const body: IDataObject = {
			name: `n8n-webhook-${Date.now()}`,
			url: webhookUrl,
			events: events,
			active: active,
		};

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/webhooks`;
		return await makeApiRequest.call(this, 'POST', url, body, undefined, authentication);
	}

	if (operation === 'update') {
		const webhookId = this.getNodeParameter('webhookId', index) as number;
		const webhookUrl = this.getNodeParameter('url', index) as string;
		const events = this.getNodeParameter('events', index) as string[];
		const active = this.getNodeParameter('active', index) as boolean;

		const body: IDataObject = {
			url: webhookUrl,
			events: events,
			active: active,
		};

		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/webhooks/${webhookId}`;
		return await makeApiRequest.call(this, 'PUT', url, body, undefined, authentication);
	}

	if (operation === 'delete') {
		const webhookId = this.getNodeParameter('webhookId', index) as number;
		const url = `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/webhooks/${webhookId}`;
		await makeApiRequest.call(this, 'DELETE', url, undefined, undefined, authentication);
		return { success: true };
	}

	throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "webhook"`);
}

