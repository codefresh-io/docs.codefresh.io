---
title: "Promotions API"
description: ""
group: deployments
sub_group: gitops
toc: true
---

## Promotions resource
Promotions are how you promote Products/applications with changes from a source environment to one or more target environments, using either commit or a pull request as the promotion action. 

The Promotions API uses HTTP POST requests with JSON arguments and JSON responses. 

## Authorization
To make calls to the Promotions API, you need authorization through an API key passed in the header of the API request.  

>**NOTE**  
The user who generates the API token must be an account administrator. 

##### How to get the API key
1. From your avatar dropdown in the Codefresh toolbar, select **User Settings**.
1. Do one of the following:
  * To use an existing API key, click **Edit**, and then copy the value in the **API Key** field.
  * To generate a new API key, click Generate.
    1. In **Key Name**, type a new name for the API key. 
      This name is prefixed to the API key value and displaed in the UI.
    1. Click **Create**.
    1. Copy the API key to a handy location.

## Runtime ingress host
The ingress host of the GitOps Runtime with the source application is required for the API commit request endpoint.

##### How to get the correct ingress host

1. Run:
  `cf runtime ls`
1. Copy the value from the **Ingress_Host** column of the Runtime. 

  {% include
image.html
lightbox="true"
file="/images/gitops-promotions/promotion-templates/api-ingress-host.png"
url="/images/gitops-promotions/promotion-templates/api-ingress-host.png"
alt="Identify ingress host for GitOps Runtime"
caption="Identify ingress host for GitOps Runtime"
max-width="90%"
%}


## POST    `/promotions/commit`

Promotes the application from the source environment to the destination or target environment with the `commit` promotion action, and the commit message.

### Endpoint

The POST commit request must include the ingress host of the GitOps Runtime making the API request. 
See [Runtime ingress host](#runtime-ingress-host).

```
POST http://<ingressHost>/api/promotions/commit
```

### Headers
The API authorization token must be included in the header of the API request. See [Authorization](#authorization).
```
`content-type: application/json`
`Authorization: <TOKEN>`
```

### Request body

For a description of the fields, see [Request parameters](#request-parameters).

```

{
    "srcAppId": {
        "runtime": "<runtime-name>",
        "namespace": "<namespace>",
        "name": "<source-application-name>"
    },
    "destAppId": {
        "runtime": "<runtime-name>",
        "namespace": <namespace>",
        "name": "<destination-application-name>"
    },
    "message": "<commit message>"
}
```

### Request example

The request is formatted in curl.

```
{
    \"srcAppId\": {
        \"runtime\": \"codefresh\",
        \"namespace\": \"orders\",
        \"name\": \"orders-qa-us-east\"
    },
    \"destAppId\": {
        \"runtime\": \"codefresh\",
        \"namespace\": \"orders\",
        \"name\": \"orders-prod-us-east\"
    },
        \"message\": \"Update image tag and bump version\"
}"
```
### Response example

#### Success
Here's an example of the response for a successful request.
It includes the:
* Commit SHA
* Commit message
* Name and email of the user who authored the commit

```
{"COMMIT_SHA":"ff46cab5a4c94fc2db215b2bd2102da05c5314ba","COMMIT_MESSAGE":"bumped version","COMMIT_AUTHOR":"codefresh-user <codefresh.user@codefresh.io>"}
```
#### Failure
Here's an example of the response for a failed request when there were no changes to promote between the source and the destination applications.

```
{"statusCode":400,"message":"no changes found between source and destination applications","error":"Bad Request"}
```


## POST    `/promotions/pullRequest`

Promotes the application from the source environment to the destination or target environment through a `pull request`  as the promotion action.

### `pullRequest` request body

```
{
        \"srcAppId\": {
            \"runtime\": \"<runtime name>\",
            \"namespace\": \"[<namespace>\",
            \"name\": \"[<source-application-name>\"
        },
        \"destAppId\": {
            \"runtime\": \"<runtime-name>\",
            \"namespace\": \"<namespace>\",
            \"name\": \"<destination-application-name>\"
        },
        \"head\": \"<branch-of-destination-application>\",
        \"title\": \"<pr-title>\",
        \"description\": \"<pr-description\",
        \"commitMessage\": \"<commit-message-if empty-uses-title>\",
        \"commitDescription\": \"<commit-description>\",
    }"
```

### `pullRequest` request example
The request is formatted in curl.

```
curl -X POST http://<ingressHost>/api/promotions/pullRequest \
    --header "content-type: application/json" \
    --header "Authorization: ${TOKEN}" \
    --data "{
        \"srcAppId\": {
            \"runtime\": \"codefresh\",
            \"namespace\": \"membership\",
            \"name\": \"membership-staging\"
        },
        \"destAppId\": {
            \"runtime\": \"codefresh\",
            \"namespace\": \"membership\",
            \"name\": \"membership-prod\"
        },
        \"head\": \"main\",
        \"title\": \"Merge new-accounts\",
        \"description\": \"Added new accounts and git sources\",
        \"commitMessage\": \"Merge new-accounts\",
        \"commitDescription\": \"Approved new accounts and git sources\",
    }"

```
### `pullRequest` response example

#### Success
TBD


#### Failure
TBD



## Request parameters

<table class="table table-bordered table-hover" style="width: 100%;">
  <colgroup>
    <col style="width: 10%;">
    <col style="width: 70%;">
    <col style="width: 10%;">
    <col style="width: 10%;">
  </colgroup>
  <thead>
    <tr>
      <th style="width: 10%;">Parameter</th>
      <th style="width: 70%;">Description</th>
      <th style="width: 10%;">Data Type</th>
      <th style="width: 10%;">Required/Optional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4"><code class="highlighter-rouge">srcAppId</code></td>
      <td colspan="3">The application in the source environment to promote through the <code class="highlighter-rouge">runtime</code>, <code class="highlighter-rouge">namespace</code>, and <code class="highlighter-rouge">name</code> key-value pairs.</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">srcAppId.runtime</code>: The name of the GitOps Runtime associated with the source application.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">srcAppId.namespace</code>: The namespace where the source application is deployed.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">srcAppId.name</code>: The name of the source application to be promoted.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td rowspan="4"><code class="highlighter-rouge">destAppId</code></td>
      <td colspan="3">The application in the destination environment to be promoted through the <code class="highlighter-rouge">runtime</code>, <code class="highlighter-rouge">namespace</code>, and <code class="highlighter-rouge">name</code> key-value pairs.</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">destAppId.runtime</code>: The name of the GitOps Runtime associated with the application in the destination environment.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">destAppId.namespace</code>: The namespace in the destination environment where the application being promoted is deployed.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">destAppId.name</code>: The name of the application in the destination environment to be promoted.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">message</code></td>
      <td>Applies to <code class="highlighter-rouge">commit</code> promotion actions.<br>The commit message to associate for the commit promotion action.(limits)</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">head</code></td>
      <td>Applies to <code class="highlighter-rouge">pull request</code> promotion actions.<br>The branch of the application in the destination environment on which to open the PR.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">title</code></td>
      <td>Applies to <code class="highlighter-rouge">pull request</code> promotion actions.<br>The title of the pull request.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">description</code></td>
      <td>Applies to <code class="highlighter-rouge">pull request</code> promotion actions.<br>Additional information describing the pull request.</td>
      <td>String</td>
      <td>Optional</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">commitMessage</code></td>
      <td>Applies to <code class="highlighter-rouge">pull request</code> promotion actions.<br>The commit message when the pull request is approved.<br>If omitted, uses <code class="highlighter-rouge">title</code> instead. </td>
      <td>String</td>
      <td>Optional</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">commitDescription</code></td>
      <td>Applies to <code class="highlighter-rouge">pull request</code> promotion actions.<br>Additional information on the commit message when the pull request is approved. </td>
      <td>String</td>
      <td>Optional</td>
    </tr>
  </tbody>
</table>






