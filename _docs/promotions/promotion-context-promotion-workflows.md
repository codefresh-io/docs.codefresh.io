---
title: "Promotion contexts for promotion hooks"
description: "Use promotion contexts to expose custom parameters to hooks in Promotion Flows"
group: promotions
toc: true
---




## Promotion contexts in promotion hooks
Promotion Workflows with hooks in GitOps Cloud have access to a standard set of [default parameters]({{site.baseurl}}/docs/promotions/promotion-hooks/#default-arguments-in-promotion-hooks), such as the release ID, product, and commit SHA.  
For promotion hooks to have access to additional, custom parameters that are not natively available, you need to use **promotion contexts**.

Because promotion hooks run within GitOps Runtimes in your own clusters, they do not automatically have access to custom internal parameters. To pass custom values like Jira ticket IDs, approver names, or Slack channel information between hooks in the same Promotion Flow, you must define and export a promotion context, which is a user-defined JSON object. See [Creating and exporting a promotion context](#creating-and-exporting-a-promotion-context).

Each hook in the Promotion Flow has access to the information it needs, no matter where it's running.  
This ability to pass custom data across hooks can help with scenarios like notifying specific Slack channels or tracking specific Jira tickets associated with the promotion process. See [Example of Promotion Workflow with promotion context](#example-of-promotion-workflow-with-promotion-context) and [How promotion context works during execution](#how-promotion-context-works-during-execution).


## Creating and exporting a promotion context 
You can use any method to create a promotion context as a JSON object and define the parameters you need.  
The key step is **exporting the promotion context**, as this makes its content available to the Promotion Workflow.  

Export the promotion context as an output parameter and make it available to the promotion mechanism:
* Add `PROMOTION_CONTEXT` as the `name` to `outputs.parameters`. _The name must not be changed_.
* Add the `globalName` attribute to make it available globally. The value must match the name of the promotion context.
* Add the `valueFrom` attribute to reference the file path.


## Example of Promotion Workflow with promotion context  
The example creates a promotion context `PROMOTION_CONTEXT` as a JSON object and exports it as an output parameter.
* The promotion context defines `JIRA_ISSUE_SOURCE_FIELD` and `JIRA_BASE_URL` 
* Writes the context to a file `/tmp/promotion-context.txt`
* Adds `PROMOTION_CONTEXT` to `outputs.parameters.name`, defines `globalName` as the name of the promotion context, and in `valueFrom.path` specifies the file path where the promotion context JSON was saved for GitOps Cloud to retrieve and pass on to subsequent Promotion  Workflows.

  
```yaml 
...
spec:
...
    - name: set-promotion-context
      serviceAccountName: hook
      inputs:
        parameters:
          - name: JIRA_ISSUE_SOURCE_FIELD
          - name: JIRA_BASE_URL
      script:
        image: alpine
        command:
          - sh
        source: |
            export JIRA_ISSUE_BASE_URL="{{inputs.parameters.JIRA_BASE_URL}}"
            export JIRA_ISSUE_SOURCE_FIELD="{{inputs.parameters.JIRA_ISSUE_SOURCE_FIELD}}"
            PROMOTION_CONTEXT=$(echo "{\"JIRA_ISSUE_URL\": \"${JIRA_ISSUE_BASE_URL}/browse/${JIRA_ISSUE_SOURCE_FIELD}\"}")
            echo "$PROMOTION_CONTEXT" > /tmp/promotion-context.txt
      outputs:
        parameters:
          - name: PROMOTION_CONTEXT  #  cannot be changed
            globalName: PROMOTION_CONTEXT # name of promotion context
            valueFrom:
              path: /tmp/promotion-context.txt
...
``` 

## How promotion context works during execution

When a hook exports a promotion context, the promotion mechanism passes those parameters to all subsequent hooks in the Promotion Flow, regardless of whether the hooks include promotion contexts. The promotion context is saved in the GitOps Cloud platform.

This ensures:
* Context values persist across environments and clusters
* If a hook redefines a parameter already in the context, the new value takes precedence


##### Triggering the first promotion hook
When the Promotion Flow is triggered and a product release is created, the promotion mechanism:
* Passes the default metadata (release ID, commit SHA for example) to all hooks configured for the Promotion Flow
* Initializes the promotion context, if defined and exported, with custom values 

##### Triggering subsequent promotion hooks
As the Flow progresses, the promotion mechanism:
* Retrieves the promotion context from the previous hook
* Passes the context automatically to the next hook as input parameters:
  * New parameters are added to the input parameters of the next hook
  * For existing parameters, the value of the parameter in the current hook always takes precedence
  


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/hooks/promotion-context-behavior.png" 
url="/images/gitops-promotions/hooks/promotion-context-behavior.png"
alt="Promotion context shared across promotion hooks in Promotion Flow" 
caption="Promotion context shared across promotion hooks in Promotion Flow"
max-width="60%"
%}

## Related articles
[Configure Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/)  
[Configure hooks in Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-hooks/)  
[Configure Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/)  
