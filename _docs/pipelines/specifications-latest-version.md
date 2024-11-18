

const { validation: { createSchema, Joi } } = require('@codefresh-io/service-base');
const yamlValidator = require('@codefresh-io/yaml-validator');

const VERSION = '1.0';
const KIND = 'pipeline';


/* this cron regex is the same on ui -- if doing any change here need to do it also there!
for more explanation about the regex -> https://codefresh-io.atlassian.net/wiki/spaces/COD/pages/2682617977/Cron+Triggers+2.0#Cron-regex-for-validation
*/
// eslint-disable-next-line max-len
const CRON_EXPRESSION_REGEX = /^\s*($|#|\w+\s*=|(@YEARLY|@ANNUALLY|@MONTHLY|@WEEKLY|@DAILY|@MIDNIGHT|@HOURLY)|(\?|\*|(?:[0-5]?\d|\*)(?:(?:-|\/|,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d|\*)(?:(?:-|\/|,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:\*|[01]?\d|2[0-3])(?:(?:-|\/|,)(?:[01]?\d|2[0-3]))?(?:(?:-|\/|,)(?:[01]?\d|2[0-3]|\*)(?:(?:-|\/|,)(?:[01]?\d|2[0-3]))?)*)\s+(\?|\*|(?:\*|0?[1-9]|[12]\d|3[01])(?:(?:-|\/|,)(?:0?[1-9]|[12]\d|3[01]))?(?:,(?:\*|0?[1-9]|[12]\d|3[01])(?:(?:-|\/|,)(?:0?[1-9]|[12]\d|3[01]))?)*)\s+(\?|\*|(?:[1-9]|1[012])(?:(?:-|\/|,)(?:[1-9]|1[012]))?(?:,(?:[1-9]|1[012])(?:(?:-|\/|,)(?:[1-9]|1[012]))?)*|\?|\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\s+(\?|\*|(?:[0-6])(?:(?:-|\/|,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\/|,|#)(?:[0-6]))?(?:L)?)*|\?|\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\s)+(\?|\*|(?:|\d{4})(?:(?:-|\/|,)(?:|\d{4}))?(?:,(?:|\d{4})(?:(?:-|\/|,)(?:|\d{4}))?)*))$/;

const YAML_LOCATION_ERRORS = {
    PIPELINE_YAML_GIT_BRANCH_FORBIDDEN_LOCATION_ERROR: 'Pipeline yaml git branch forbidden location error',
    PIPELINE_YAML_GIT_PATH_FORBIDDEN_LOCATION_ERROR: 'Pipeline yaml git path forbidden location error',
    PIPELINE_YAML_GIT_REPOSITORY_FORBIDDEN_LOCATION_ERROR: 'Pipeline yaml git repository forbidden location error',
    PIPELINE_YAML_INLINE_FORBIDDEN_LOCATION_ERROR: 'Pipeline yaml inline forbidden location error',
    PIPELINE_YAML_REPOSITORY_FORBIDDEN_LOCATION_ERROR: 'Pipeline yaml repository forbidden location error',
    PIPELINE_YAML_URL_FORBIDDEN_LOCATION_ERROR: 'Pipeline yaml url forbidden location error',
    PIPELINE_YAML_GIT_RATE_LIMIT_EXCEEDED_ERROR: 'API rate limit exceeded',
};

const YAML_VALIDATION_ERRORS = { EXTERNAL_YAML_VALIDATION_ERROR: 'External specTemplate is not a valid yaml' };

const YAML_LOCATION = {
    INLINE: 'inline',
    GIT: 'git',
    URL: 'url',
};

const TRIGGER_STATUSES = {
    VERIFYING: 'verifying',
    VERIFIED: 'verified',
};

const MEMORY_LIMIT_WARNING_THRESHOLD = {
    WARNING: '70',
    CRITICAL: '90',
    REACHED_LIMIT: '100',
    DEFAULT: '',
};

const variablesSchema = Joi.array().items(Joi.object().keys({
    key: Joi.string().required(),
    value: Joi.alternatives().try(Joi.string().allow(''), Joi.number(), Joi.boolean()).default(''),
    encrypted: Joi.boolean().default(false),
}));
const contextsSchema = Joi.array().items(Joi.string());
const optionsSchema = Joi.object().keys({
    noCache: Joi.boolean().default(false),
    noCfCache: Joi.boolean().default(false),
    resetVolume: Joi.boolean().default(false),
    enableNotifications: Joi.boolean().default(false),
    keepPVCsForPendingApproval: Joi.boolean(), // default is no value.
    pendingApprovalConcurrencyApplied: Joi.boolean(), // default is no value.
});

const terminationSchema = Joi.array().items(Joi.object().keys({
    type: Joi.string().valid('branch', 'annotation'),
    event: Joi.string().valid('onCreate', 'onTerminate'),
    ignoreBranch: Joi.when('type', {
        is: 'branch',
        then: Joi.boolean().default(false),
        otherwise: Joi.forbidden(),
    }),
    ignoreTrigger: Joi.when('type', {
        is: 'branch',
        then: Joi.boolean().default(false),
        otherwise: Joi.forbidden(),
    }),
    branchName: Joi.when('type', {
        is: 'branch',
        then: Joi.string(),
        otherwise: Joi.forbidden(),
    }),
    key: Joi.when('type', {
        is: 'annotation',
        then: Joi.string().required(),
        otherwise: Joi.forbidden(),
    }),
    value: Joi.when('type', {
        is: 'annotation',
        then: Joi.string(),
        otherwise: Joi.forbidden(),
    }),
}));

const externalResourcesSchema = Joi.array().items(Joi.object().keys({
    id: Joi.objectId(),
    type: Joi.string().valid('git', 'cloud', 'url'),
    source: Joi.string().required(),
    context: Joi.string(),
    destination: Joi.string().required(),
    isFolder: Joi.boolean(),
    repo: Joi.when('type', {
        is: 'git',
        then: Joi.string().required(),
        otherwise: Joi.forbidden(),
    }),
    revision: Joi.when('type', {
        is: 'git',
        then: Joi.string().required(),
        otherwise: Joi.forbidden(),
    }),
}));

const runtimeEnvironmentSchema = Joi.object().keys({
    name: Joi.string(),
    memory: Joi.string(),
    cpu: Joi.string(),
    dindStorage: Joi.string(),
    requiredAvailableStorage: Joi.string(),
});

const advancedTriggerOptions = {
    variables: variablesSchema,
    options: optionsSchema,
    packId: Joi.objectId(),
    requiredAvailableStorage: Joi.string(),
    serviceAccount: Joi.string(),
    runtimeEnvironment: runtimeEnvironmentSchema,
};

const schema = createSchema({
    version: Joi.string().valid([VERSION]).default(VERSION),
    kind: Joi.string().valid([KIND]).default(KIND),
    last_executed: Joi.date(),
    metadata: Joi.object()
        .keys({
            id: Joi.objectId(),
            name: Joi.string().required(),
            shortName: Joi.string(),
            revision: Joi.number().integer().min(0).default(0),
            isPublic: Joi.boolean(),
            description: Joi.string(),
            labels: Joi.object(), // validation is done in the async callback
            labelKeys: Joi.array().items(Joi.string()),
            created_at: Joi.date(),
            updated_at: Joi.date(),
            accountId: Joi.objectId(),
            deprecate: Joi.object() // TODO these fiedls are here only to support previous use-cases and should be some how removed
                .keys({
                    repoPipeline: Joi.boolean(),
                    implicitGitCloneService: Joi.object()
                        .keys({
                            context: Joi.string(),
                            scm: Joi.object().keys({
                                provider: Joi.string(),
                                owner: Joi.object().keys({ name: Joi.string() }),
                                name: Joi.string(),
                            }),
                        }),
                    applicationPort: Joi.string(),
                    basic: Joi.boolean(),
                    template: Joi.string(),
                }),
            originalYamlString: Joi.yaml(), // TODO encode base 64
            projectId: Joi.objectId(),
            project: Joi.string(), // This is a temporary computed field from the name field until we will insert a real project concept
            template: Joi.object()
                .keys({
                    isTemplate: Joi.boolean(),
                    generatedFrom: Joi.objectId(),
                }),
            executionContextId: Joi.string(),
        }).required(),
    spec: Joi.object()
        .keys({
            scopes: Joi.array().items(Joi.string()),
            scopeSnapshot: Joi.objectId(),
            permitRestartFromFailedSteps: Joi.boolean(),
            build_version: Joi.string().valid('v1', 'v2'),
            triggers: Joi.array() // TODO should be removed from here
                .items(Joi.object().keys({
                    type: Joi.string().valid('git').required(),
                    id: Joi.objectId(),
                    createdFromRepositoryMigration: Joi.boolean(), // TODO marks if the trigger was auto created as part of migration from repositories. can be removed
                    name: Joi.string().min(1).max(200).regex(/^\S*$/).required(), // no spaces allowed
                    description: Joi.string().min(1).max(150).label('Trigger description'),
                    commitStatusTitle: Joi.string().min(1).max(200),
                    contexts: contextsSchema,
                    verified: Joi.boolean(),
                    status: Joi.string(),
                    repo: Joi.string().regex(/.+\/.+/, 'repoOwner/repoName').required(),
                    provider: Joi.string(),
                    disabled: Joi.boolean(),
                    skipCommentAuthorAssociationValidation: Joi.boolean(),
                    lastExecutionDate: Joi.date(),
                    events: Joi.array().items(Joi.string().valid(
                        'push', // this mean any possible push event
                        'push.heads',
                        'push.tags',
                        'push.newBranch',
                        'push.deleteBranch',
                        'pullrequest', // this mean any possible pullrequest event
                        'pullrequest.opened',
                        'pullrequest.closed',
                        'pullrequest.reopened',
                        'pullrequest.edited',
                        'pullrequest.assigned',
                        'pullrequest.unassigned',
                        'pullrequest.review_requested',
                        'pullrequest.review_request_removed',
                        'pullrequest.reviewRequested',
                        'pullrequest.reviewRequestRemoved',
                        'pullrequest.review.submitted.approved',
                        'pullrequest.review.submitted.commented',
                        'pullrequest.review.submitted.changes_requested',
                        'pullrequest.pushCommit',
                        'pullrequest.labeled',
                        'pullrequest.unlabeled',
                        'pullrequest.synchronize',
                        'pullrequest.commentAdded',
                        'pullrequest.commentAddedUnrestricted', // bypass auth restriction
                        'pullrequest.reviewersUpdate', // Azure devops
                        'pullrequest.statusUpdate', // Azure devops
                        'pullrequest.reviewerVote', // Azure devops
                        'pullrequest.created', // Azure devops
                        'pullrequest.merged', // Azure devops, git closed with merge flag
                        'pullrequest.unmerged-closed', // git closed without merge flag
                        'pullrequest.updated', // Azure devops
                        'release', // legacy value, actually should be release.published
                        'release.unpublished',
                        'release.created',
                        'release.edited',
                        'release.deleted',
                        'release.prereleased',
                        'release.released',
                        'pullrequest:created', // Bitbucket
                        'pullrequest:updated', // Bitbucket
                        'pullrequest:updatedButNoPush', // Bitbucket custom event
                        'pullrequest:deleted', // Bitbucket-server
                        'pullrequest:push_commit', // Bitbucket-server
                        'pullrequest:merged', // Bitbucket-server
                        'pullrequest:declined', // Bitbucket-server
                        'pullrequest:approved', // Bitbucket
                        'pullrequest:unapproved', // Bitbucket
                        'pullrequest:needsWork', // Bitbucket-server
                        'pullrequest:fulfilled', // Bitbucket
                        'pullrequest:rejected', // Bitbucket
                        'pullrequest:comment_created', // Bitbucket
                        'pullrequest:comment_updated', // Bitbucket
                        'pullrequest:comment_deleted', // Bitbucket
                        'change-abandoned', // Gerrit
                        'change-deleted', // Gerrit
                        'change-merged', // Gerrit
                        'change-restored', // Gerrit
                        'comment-added', // Gerrit
                        'dropped-output', // Gerrit
                        'hashtags-changed', // Gerrit
                        'project-created', // Gerrit
                        'patchset-created', // Gerrit
                        'ref-updated', // Gerrit
                        'reviewer-added', // Gerrit
                        'reviewer-deleted', // Gerrit
                        'topic-changed', // Gerrit
                        'wip-state-changed', // Gerrit
                        'private-state-changed', // Gerrit
                        'vote-deleted', // Gerrit
                        'project-head-update', // Gerrit
                    )).required(),
                    commentRegex: Joi.string().regex(/^\/((?:[^/]|\\\/)*)\/([gim]*)$/),
                    branchRegex: Joi.string().regex(/^\/((?:[^/]|\\\/)*)\/([gim]*)$/),
                    branchRegexInput: Joi.string().valid('multiselect', 'multiselect-exclude', 'regex'),
                    pullRequestTargetBranchRegex: Joi.string().regex(/^\/((?:[^/]|\\\/)*)\/([gim]*)$/).allow(''),
                    pullRequestAllowForkEvents: Joi.boolean().default(false),
                    // 65536 chars is the maximum nuber for lib we use for glob
                    modifiedFilesGlob: Joi.string().max(65000).allow(''),
                    gerritCIStatusLabels: Joi.array().items(Joi.string().max(500)).allow([]),
                    context: Joi.string(),
                    concurrency: Joi.number().integer().min(1),
                    priority: Joi.number().integer().default(0).min(-100).max(100),
                    terminationPolicy: terminationSchema,
                    ...advancedTriggerOptions,
                })),
            cronTriggers: Joi.array().items(Joi.object().keys({
                type: Joi.string().valid('cron').required(),
                id: Joi.objectId(),
                event: Joi.string(), // hermes event
                name: Joi.string().min(1).max(200).required(),
                message: Joi.string().regex(/^[a-zA-Z0-9_+\s-#?.:]{2,128}$/).required(), // taken from hermes
                expression: Joi.string().min(1).max(150).regex(CRON_EXPRESSION_REGEX).required(),
                verified: Joi.boolean(),
                disabled: Joi.boolean(),
                status: Joi.string(),
                lastExecutionDate: Joi.date(),
                // git related
                gitTriggerId: Joi.objectId(),
                branch: Joi.string(),
                // advanced related
                ...advancedTriggerOptions,
            }).with('gitTriggerId', 'branch').with('branch', 'gitTriggerId')),
            runtimeEnvironment: Joi.object()
                .keys({
                    name: Joi.string(),
                    memory: Joi.string(),
                    cpu: Joi.string(),
                    dindStorage: Joi.string(),
                    requiredAvailableStorage: Joi.string(),
                }),
            lowMemoryWarningThreshold: Joi.string()
                .valid(
                    MEMORY_LIMIT_WARNING_THRESHOLD.WARNING,
                    MEMORY_LIMIT_WARNING_THRESHOLD.CRITICAL,
                    MEMORY_LIMIT_WARNING_THRESHOLD.REACHED_LIMIT,
                ),
            packId: Joi.objectId(),
            requiredAvailableStorage: Joi.string(),
            contexts: contextsSchema,
            clustersInfo: Joi.object()
                .keys({
                    injectAll: Joi.boolean(),
                    clusters: Joi.array().items(Joi.string()),
                }),
            variablesSchema: Joi.jsonSchemaString(),
            variables: variablesSchema,
            specTemplate: Joi.object().keys({
                location: Joi.string().valid(YAML_LOCATION.URL, YAML_LOCATION.GIT).default(YAML_LOCATION.URL),
                context: Joi.string(),
                url: Joi.string().uri().when('location', {
                    is: YAML_LOCATION.URL,
                    then: Joi.required(),
                    otherwise: Joi.forbidden(),
                }),
                repo: Joi.string().regex(/.+\/.+/, 'repoOwner/repoName').when('location', {
                    is: YAML_LOCATION.GIT,
                    then: Joi.required(),
                    otherwise: Joi.forbidden(),
                }),
                path: Joi.string().when('location', {
                    is: YAML_LOCATION.GIT,
                    then: Joi.required(),
                    otherwise: Joi.forbidden(),
                }),
                revision: Joi.when('location', {
                    is: YAML_LOCATION.GIT,
                    then: Joi.string(),
                    otherwise: Joi.forbidden(),
                }),
            }),
            steps: Joi.object(),
            services: Joi.object(),
            hooks: Joi.object(),
            stages: Joi.array().items(Joi.string()),
            mode: Joi.string().valid('sequential', 'parallel'),
            fail_fast: [Joi.object(), Joi.string(), Joi.boolean()],
            strict_fail_fast: [
                Joi.boolean().strict().optional(),
                Joi.string().regex(
                    yamlValidator.getVariableRegex(VERSION, { isExact: true }),
                    { name: 'cf_variable' },
                ).optional(),
            ],
            success_criteria: Joi.object(),
            options: optionsSchema,
            concurrency: Joi.number().integer().min(0),
            triggerConcurrency: Joi.number().integer(),
            branchConcurrency: Joi.number().integer(),
            priority: Joi.number().integer().default(0).min(-100).max(100),
            terminationPolicy: terminationSchema,
            externalResources: externalResourcesSchema,
            debug: Joi.object().keys({
                // allow any step name
                steps: Joi.object().pattern(/^/, Joi.object().keys({
                    phases: Joi.object().required().keys({
                        before: Joi.boolean(),
                        after: Joi.boolean(),
                        override: Joi.boolean(),
                    }).or('before', 'after', 'override'),
                })).required(),
            }),
            serviceAccount: Joi.string(),
        }),
});

module.exports = {
    schema,
    VERSION,
    KIND,
    YAML_LOCATION,
    TRIGGER_STATUSES,
    YAML_LOCATION_ERRORS,
    YAML_VALIDATION_ERRORS,
};


/**
 * @typedef {Object} PipelineTrigger
 * NOT all fields described
 *
 * @property {string} type
 * @property {string} id
 * @property {string} repo
 * @property {string} provider
 */


/**
 * @typedef {Object} PipelineCronTrigger
 * @property {string} type - 'cron'
 * @property {string} [id]
 * @property {string} [event] // event name returned from hermes
 * @property {string} name
 * @property {string} message
 * @property {string} expression
 * @property {string} [status]
 * @property {boolean} [verified]
 * @property {boolean} [disabled]
 *
 * @property {boolean} [gitTriggerId]
 * @property {boolean} [branch]
 *
 * @property {boolean} [variables]
 * @property {boolean} [options]
 * @property {boolean} [packId]
 * @property {boolean} [requiredAvailableStorage]
 * @property {boolean} [serviceAccount]
 * @property {boolean} [runtimeEnvironment]
 */