"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitbucketDataCenterTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class BitbucketDataCenterTrigger {
    constructor() {
        this.description = {
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
            outputs: ["main" /* NodeConnectionType.Main */],
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
        this.webhookMethods = {
            default: {
                async checkExists() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const webhookData = this.getWorkflowStaticData('node');
                    if (webhookData.webhookId === undefined) {
                        return false;
                    }
                    const projectKey = this.getNodeParameter('projectKey');
                    const repositorySlug = this.getNodeParameter('repositorySlug');
                    const credentials = await this.getCredentials('bitbucketDataCenterApi');
                    const baseURL = credentials.server;
                    const options = {
                        method: 'GET',
                        url: `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/webhooks/${webhookData.webhookId}`,
                        json: true,
                    };
                    try {
                        await this.helpers.requestWithAuthentication.call(this, 'bitbucketDataCenterApi', options);
                    }
                    catch (error) {
                        if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 404) {
                            return false;
                        }
                        throw error;
                    }
                    return true;
                },
                async create() {
                    const webhookUrl = this.getNodeWebhookUrl('default');
                    const projectKey = this.getNodeParameter('projectKey');
                    const repositorySlug = this.getNodeParameter('repositorySlug');
                    const events = this.getNodeParameter('events');
                    if (!projectKey || !repositorySlug) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Project and Repository are required');
                    }
                    let credentials;
                    const authentication = this.getNodeParameter('authentication');
                    if (authentication === 'accessToken') {
                        credentials = await this.getCredentials('bitbucketDataCenterApi');
                    }
                    else {
                        credentials = await this.getCredentials('bitbucketDataCenterBasicAuth');
                    }
                    const baseURL = credentials.server;
                    // All events are now valid webhook events
                    const body = {
                        name: `n8n-webhook-${Date.now()}`,
                        url: webhookUrl,
                        active: true,
                        events: events,
                    };
                    const options = {
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
                    webhookData.webhookId = responseData.id;
                    return true;
                },
                async delete() {
                    const webhookData = this.getWorkflowStaticData('node');
                    if (webhookData.webhookId !== undefined) {
                        const projectKey = this.getNodeParameter('projectKey');
                        const repositorySlug = this.getNodeParameter('repositorySlug');
                        let credentials;
                        const authentication = this.getNodeParameter('authentication');
                        if (authentication === 'accessToken') {
                            credentials = await this.getCredentials('bitbucketDataCenterApi');
                        }
                        else {
                            credentials = await this.getCredentials('bitbucketDataCenterBasicAuth');
                        }
                        const baseURL = credentials.server;
                        const options = {
                            method: 'DELETE',
                            url: `${baseURL}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/webhooks/${webhookData.webhookId}`,
                            json: true,
                        };
                        try {
                            await this.helpers.requestWithAuthentication.call(this, 'bitbucketDataCenterApi', options);
                        }
                        catch (error) {
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
        this.methods = {
            loadOptions: {
                async getProjects() {
                    const returnData = [];
                    const authentication = this.getNodeParameter('authentication', 0);
                    let credentials;
                    if (authentication === 'accessToken') {
                        credentials = await this.getCredentials('bitbucketDataCenterApi');
                    }
                    else {
                        credentials = await this.getCredentials('bitbucketDataCenterBasicAuth');
                    }
                    const baseURL = credentials.server;
                    try {
                        const responseData = await makeApiRequestForTriggerOptions.call(this, 'GET', `${baseURL}/rest/api/1.0/projects?limit=100`, undefined, undefined, authentication);
                        const projects = responseData.values || [];
                        for (const project of projects) {
                            returnData.push({
                                name: `${project.key} - ${project.name}`,
                                value: project.key,
                            });
                        }
                    }
                    catch (error) {
                        // If there's an error, return empty array instead of throwing
                        return [];
                    }
                    return returnData.sort((a, b) => a.name.localeCompare(b.name));
                },
                async getRepositories() {
                    const returnData = [];
                    const projectKey = this.getNodeParameter('projectKey');
                    if (!projectKey) {
                        return returnData;
                    }
                    const authentication = this.getNodeParameter('authentication', 0);
                    let credentials;
                    if (authentication === 'accessToken') {
                        credentials = await this.getCredentials('bitbucketDataCenterApi');
                    }
                    else {
                        credentials = await this.getCredentials('bitbucketDataCenterBasicAuth');
                    }
                    const baseURL = credentials.server;
                    try {
                        const responseData = await makeApiRequestForTriggerOptions.call(this, 'GET', `${baseURL}/rest/api/1.0/projects/${projectKey}/repos?limit=100`, undefined, undefined, authentication);
                        const repositories = responseData.values || [];
                        for (const repo of repositories) {
                            returnData.push({
                                name: `${repo.slug} - ${repo.name}`,
                                value: repo.slug,
                            });
                        }
                    }
                    catch (error) {
                        // If there's an error, return empty array instead of throwing
                        return [];
                    }
                    return returnData.sort((a, b) => a.name.localeCompare(b.name));
                },
            },
        };
    }
    async webhook() {
        const bodyData = this.getBodyData();
        const headers = this.getHeaderData();
        // Verify that the webhook is from Bitbucket Data Center
        const userAgent = headers['user-agent'];
        if (!userAgent || !userAgent.includes('Atlassian')) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Request does not seem to be from Bitbucket Data Center');
        }
        // Extract event type from headers
        const eventKey = headers['x-event-key'];
        if (!eventKey) {
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'No event key found in headers');
        }
        // Filter events based on what the user selected
        const events = this.getNodeParameter('events');
        if (!events.includes(eventKey)) {
            // If we do not care about the event, do not process it further
            return {
                noWebhookResponse: true,
            };
        }
        const returnData = [];
        // Process the webhook payload
        const webhookData = {
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
        }
        else if (eventKey.startsWith('pr:')) {
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
exports.BitbucketDataCenterTrigger = BitbucketDataCenterTrigger;
// Helper function to make API requests for loadOptions in trigger node
async function makeApiRequestForTriggerOptions(method, url, body, qs, authentication) {
    const options = {
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
    }
    catch (error) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Bitbucket Data Center API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
