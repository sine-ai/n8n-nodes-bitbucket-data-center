import type {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IHttpRequestMethods,
	IRequestOptions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class BitbucketDataCenterTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bitbucket Data Center Trigger',
		name: 'bitbucketDataCenterTrigger',
		icon: 'file:bitbucket.svg',
		group: ['trigger'],
		version: 4,
		subtitle: '={{$parameter["event"]}}',
		description: 'Handle Bitbucket Data Center webhooks',
		defaults: {
			name: 'Bitbucket Data Center Trigger',
		},
		inputs: [],
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
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
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
				displayName: 'Project',
				name: 'projectKey',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getProjects',
				},
				default: '',
				description: 'The project containing the repository',
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
				default: '',
				description: 'The repository to monitor for webhook events',
				required: true,
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					// REPOSITORY EVENTS
					{
						name: 'Repository Push (Code Changes)',
						value: 'repo:refs_changed',
						description: 'Triggered when code is pushed to the repository (most common)',
					},
					{
						name: 'Repository Created',
						value: 'repo:created',
						description: 'Triggered when a new repository is created',
					},
					{
						name: 'Repository Deleted',
						value: 'repo:deleted',
						description: 'Triggered when a repository is deleted',
					},
					{
						name: 'Repository Forked',
						value: 'repo:forked',
						description: 'Triggered when the repository is forked',
					},
					{
						name: 'Repository Modified',
						value: 'repo:modified',
						description: 'Triggered when repository settings are modified',
					},
					
					// PULL REQUEST EVENTS
					{
						name: 'Pull Request Opened',
						value: 'pr:opened',
						description: 'Triggered when a pull request is created',
					},
					{
						name: 'Pull Request Modified',
						value: 'pr:modified',
						description: 'Triggered when a pull request title/description is modified',
					},
					{
						name: 'Pull Request Merged',
						value: 'pr:merged',
						description: 'Triggered when a pull request is merged',
					},
					{
						name: 'Pull Request Declined',
						value: 'pr:declined',
						description: 'Triggered when a pull request is declined/rejected',
					},
					{
						name: 'Pull Request Deleted',
						value: 'pr:deleted',
						description: 'Triggered when a pull request is deleted',
					},
					{
						name: 'Pull Request Reopened',
						value: 'pr:reopened',
						description: 'Triggered when a pull request is reopened',
					},
					{
						name: 'Pull Request Source Branch Updated',
						value: 'pr:from_ref_updated',
						description: 'Triggered when the source branch of a pull request is updated',
					},

					// === PULL REQUEST REVIEWER EVENTS ===
					{
						name: 'Pull Request Approved',
						value: 'pr:reviewer:approved',
						description: 'Triggered when a reviewer approves a pull request',
					},
					{
						name: 'Pull Request Needs Work',
						value: 'pr:reviewer:needs_work',
						description: 'Triggered when a reviewer marks a pull request as needing work',
					},
					{
						name: 'Pull Request Approval Removed',
						value: 'pr:reviewer:unapproved',
						description: 'Triggered when a reviewer removes their approval',
					},
					{
						name: 'Pull Request Reviewer Added',
						value: 'pr:reviewer:added',
						description: 'Triggered when a reviewer is added to a pull request',
					},
					{
						name: 'Pull Request Reviewer Removed',
						value: 'pr:reviewer:removed',
						description: 'Triggered when a reviewer is removed from a pull request',
					},

					// PULL REQUEST COMMENT EVENTS
					{
						name: 'Pull Request Comment Added',
						value: 'pr:comment:added',
						description: 'Triggered when a comment is added to a pull request',
					},
					{
						name: 'Pull Request Comment Edited',
						value: 'pr:comment:edited',
						description: 'Triggered when a pull request comment is edited',
					},
					{
						name: 'Pull Request Comment Deleted',
						value: 'pr:comment:deleted',
						description: 'Triggered when a pull request comment is deleted',
					},

					// === COMMENT EVENTS (Repository/Commits) ===
					{
						name: 'Commit Comment Added',
						value: 'repo:comment:added',
						description: 'Triggered when a comment is added to a commit',
					},
					{
						name: 'Commit Comment Edited',
						value: 'repo:comment:edited',
						description: 'Triggered when a commit comment is edited',
					},
					{
						name: 'Commit Comment Deleted',
						value: 'repo:comment:deleted',
						description: 'Triggered when a commit comment is deleted',
					},

					// === BRANCH EVENTS ===
					{
						name: 'Branch Created',
						value: 'repo:branch:created',
						description: 'Triggered when a new branch is created',
					},
					{
						name: 'Branch Deleted',
						value: 'repo:branch:deleted',
						description: 'Triggered when a branch is deleted',
					},

					// === TAG EVENTS ===
					{
						name: 'Tag Created',
						value: 'repo:tag:created',
						description: 'Triggered when a new tag is created',
					},
					{
						name: 'Tag Deleted',
						value: 'repo:tag:deleted',
						description: 'Triggered when a tag is deleted',
					},

					// === MIRROR EVENTS (Data Center specific) ===
					{
						name: 'Mirror Synchronization Started',
						value: 'mirror:repo_synchronization_started',
						description: 'Triggered when repository mirror sync begins',
					},
					{
						name: 'Mirror Synchronization Finished',
						value: 'mirror:repo_synchronization_finished',
						description: 'Triggered when repository mirror sync completes',
					},
					{
						name: 'Mirror Synchronization Failed',
						value: 'mirror:repo_synchronization_failed',
						description: 'Triggered when repository mirror sync fails',
					},
				],
				default: ['repo:refs_changed'],
				description: 'The events to listen to',
				required: true,
			},
		],
	};

	// @ts-ignore (because of inconsistent interface)
	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const webhookData = this.getWorkflowStaticData('node');
				
				if (webhookData.webhookId === undefined) {
					return false;
				}

				const projectKey = this.getNodeParameter('projectKey') as string;
				const repositorySlug = this.getNodeParameter('repositorySlug') as string;
				
				const credentials = await this.getCredentials('bitbucketDataCenterApi');
				const baseURL = credentials.server as string;

				const options: IRequestOptions = {
					method: 'GET',
					url: `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/webhooks/${webhookData.webhookId}`,
					json: true,
				};

				try {
					await this.helpers.requestWithAuthentication.call(this, 'bitbucketDataCenterApi', options);
				} catch (error) {
					if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 404) {
						return false;
					}
					throw error;
				}

				return true;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const projectKey = this.getNodeParameter('projectKey') as string;
				const repositorySlug = this.getNodeParameter('repositorySlug') as string;
				const events = this.getNodeParameter('events') as string[];
				
				if (!projectKey || !repositorySlug) {
					throw new NodeOperationError(this.getNode(), 'Project and Repository are required');
				}

				let credentials;
				const authentication = this.getNodeParameter('authentication') as string;

				if (authentication === 'accessToken') {
					credentials = await this.getCredentials('bitbucketDataCenterApi');
				} else {
					credentials = await this.getCredentials('bitbucketDataCenterBasicAuth');
				}

				const baseURL = credentials.server as string;

				// All events are now valid webhook events

				const body: IDataObject = {
					name: `n8n-webhook-${Date.now()}`,
					url: webhookUrl,
					active: true,
					events: events,
				};

				const options: IRequestOptions = {
					method: 'POST',
					url: `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/webhooks`,
					body,
					json: true,
				};

				const responseData = await this.helpers.requestWithAuthentication.call(this, 'bitbucketDataCenterApi', options);

				if (responseData.id === undefined) {
					return false;
				}

				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = responseData.id as string;

				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				
				if (webhookData.webhookId !== undefined) {
					const projectKey = this.getNodeParameter('projectKey') as string;
					const repositorySlug = this.getNodeParameter('repositorySlug') as string;
					
					let credentials;
					const authentication = this.getNodeParameter('authentication') as string;

					if (authentication === 'accessToken') {
						credentials = await this.getCredentials('bitbucketDataCenterApi');
					} else {
						credentials = await this.getCredentials('bitbucketDataCenterBasicAuth');
					}

					const baseURL = credentials.server as string;

					const options: IRequestOptions = {
						method: 'DELETE',
						url: `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/webhooks/${webhookData.webhookId}`,
						json: true,
					};

					try {
						await this.helpers.requestWithAuthentication.call(this, 'bitbucketDataCenterApi', options);
					} catch (error) {
						return false;
					}

					// Remove from the static workflow data so that it is clear
					// that no webhooks are registered anymore
					delete webhookData.webhookId;
				}

				return true;
			},
		},
	};

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
					const responseData = await makeApiRequestForTriggerOptions.call(
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
					const responseData = await makeApiRequestForTriggerOptions.call(
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

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const headers = this.getHeaderData() as IDataObject;

		// Verify that the webhook is from Bitbucket Data Center
		const userAgent = headers['user-agent'] as string;
		if (!userAgent || !userAgent.includes('Atlassian')) {
			throw new NodeOperationError(this.getNode(), 'Request does not seem to be from Bitbucket Data Center');
		}

		// Extract event type from headers
		const eventKey = headers['x-event-key'] as string;
		
		if (!eventKey) {
			throw new NodeOperationError(this.getNode(), 'No event key found in headers');
		}

		// Filter events based on what the user selected
		const events = this.getNodeParameter('events') as string[];
		if (!events.includes(eventKey)) {
			// If we do not care about the event, do not process it further
			return {
				noWebhookResponse: true,
			};
		}

		const returnData: IDataObject[] = [];

		// Process the webhook payload
		const webhookData: IDataObject = {
			event: eventKey,
			headers,
			body: bodyData,
		};

		// Extract useful information based on event type
		if (eventKey.startsWith('repo:')) {
			// Repository events
			if (bodyData.repository) {
				webhookData.repository = bodyData.repository;
			}
			if (bodyData.actor) {
				webhookData.actor = bodyData.actor;
			}
			if (bodyData.changes) {
				webhookData.changes = bodyData.changes;
			}
		} else if (eventKey.startsWith('pr:')) {
			// Pull request events
			if (bodyData.pullRequest) {
				webhookData.pullRequest = bodyData.pullRequest;
			}
			if (bodyData.repository) {
				webhookData.repository = bodyData.repository;
			}
			if (bodyData.actor) {
				webhookData.actor = bodyData.actor;
			}
			if (bodyData.comment) {
				webhookData.comment = bodyData.comment;
			}
			if (bodyData.previousTitle) {
				webhookData.previousTitle = bodyData.previousTitle;
			}
			if (bodyData.previousDescription) {
				webhookData.previousDescription = bodyData.previousDescription;
			}
			if (bodyData.previousTarget) {
				webhookData.previousTarget = bodyData.previousTarget;
			}
		}

		returnData.push(webhookData);

		return {
			workflowData: [
				this.helpers.returnJsonArray(returnData),
			],
		};
	}
}

// Helper function to make API requests for loadOptions in trigger node
async function makeApiRequestForTriggerOptions(
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
