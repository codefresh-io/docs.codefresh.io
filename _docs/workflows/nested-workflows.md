---
title: "Nested workflows"
description: ""
group: workflows
toc: true
---

Define single or multiple nested workflows within a workflow. A nested workflow is a step within the parent workflow that either submits a new workflow or creates a PR (Pull Request) that runs a different workflow based on the PR result.  

Nested workflows run independently of the parent workflow that submitted them. A nested submit workflow has traceability in both directions, from the parent to child, and from the child to the parent. A workflow triggered by a nested PR identifies the PR that triggered it. 

Codefresh has two ready-to-use Workflow Templates to:
* Submit a workflow
* Create a PR to run the workflow that tracks the PR
 
 

### Create the Workflow Template

Use the examples below to create the Workflow Templates that run the nested workflows.

**Submit Workflow**  

The example references the `submit-workflow` template, `argo-hub.argo-workflows.0.0.3` and higher, in the Codefresh Hub for Argo.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: argo-workflows-submit-workflow-
spec:
  entrypoint: main
  templates:
    - name: main
      dag:
        tasks:
          - name: submit
            templateRef:
              name: argo-hub.argo-workflows.0.0.3
              template: submit-workflow
            arguments:
              parameters:
                - name: TEMPLATE_NAME
                  value: 'argo-hub.argo-workflows-utils.0.0.1'
                - name: ENTRYPOINT
                  value: 'echo'
```

**Create a PR Workflow**  

The example references the `create-pr` template, `argo-hub.github.0.0.4` and higher, in the Codefresh Hub for Argo.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: create-pr
spec:
  entrypoint: main
  templates:
  - name: main
    dag:
      tasks:
      - name: create-pr
        templateRef:
          name: argo-hub.github.0.0.4
          template: create-pr
        arguments:
          artifacts:
            - name:
          parameters:
            - name: BRANCH
              value: 'feature/my-branch'
            - name: MESSAGE
              value: 'My new PR'
            - name: PR_TEMPLATE
              value: 'https://raw.githubusercontent.com/codefresh-contrib/express-microservice2/develop/.github/pull_request_template.md'
            - name: GITHUB_TOKEN_SECRET
              value: 'github-token'
```




### Navigate to parent/child workflows

Once the parent workflow is submitted, the Summary tab of the step in the parent or child workflow illustrates the nested relationship. 
* Submit workflow template: In the parent workflow, the nested-workflow step has a link to the child workflow. In the child workflow, the step has a link to the parent template.
* Create PR template: The child workflow indicates that it was triggered by the PR request. 
  
> To navigate to the Workflows tab with step visualizations, select the workflow and then **View workflow details**.  

     
**Example: Submit template - parent workflow with link to child workflow** 

      {% include 
   image.html 
   lightbox="true" 
   file="/images/workflows/nested-example-parent-submit.png" 
   url="/images/workflows/nested-example-parent-submit.png" 
   alt="Parent workflow with link to nested submit workflow" 
   caption="Parent workflow with link to nested submit workflow"
   max-width="50%" 
   %}

**Example: Submit template - child workflow with link to parent**
     
   {% include 
   image.html 
   lightbox="true" 
   file="/images/workflows/nested-example-child-submit.png" 
   url="/images/workflows/nested-example-child-submit.png" 
   alt="Child submit workflow with link to parent workflow" 
   caption="Child submit workflow with link to parent workflow"
   max-width="50%" 
   %}

**Example: Create PR template: - child workflow triggered by PR**
      
  {% include 
   image.html 
   lightbox="true" 
   file="/images/workflows/nested-example-pr.png" 
   url="/images/workflows/nested-example-pr.png" 
   alt="Workflow triggered by PR in parent workflow" 
   caption="Workflow triggered by PR in parent workflow"
   max-width="50%" 
   %}


 