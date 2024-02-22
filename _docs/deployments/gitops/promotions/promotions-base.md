

What is a promotion

A romotion is that stage of software development where you advance completed software to the next stage of the development liefcyle until the it is released



## Promotions in GitOps

A;; promotions start with an action in the Git repository which houses the application.
The action is the familiar commit or PR.

This is the trigger event which initiates the promotion

The rest of the promotion flow is based on 

## Concepts

### Promotion Trigger Environment

### Promotion Action

### Promotion Template

### Promotion Policy

### Promotion Flow

### Promotion Releases

## Features

### ArgoCD comptatible 
Auto sync 

### Flexible methodologies
Drag-and-drop 
Declarative 
API

### Customizable logic
Aplly changes to selected files, or selected attributes in files.

### Multi-app promotions
Promote multiple or all applications in the same Product at once in the target environment

### Multi-environment promotions

### Preview updates



##  Promotion Points
1. Trigger promotion in an Environment (source)
1. Apply Promotion Flow for to current (target or destination) Environment
   This is the flow that orchestrates the promotion between environments. 
   If Dev is the Trigger Environment and Nima is the product, the 
1. Validate promotion eligibility for the current Environment via Promotion Policy:
  1. Pre Action (not for the Promotion Trigger Environment): Workflows
  1. Action: Commit or PR either manually or decoratively via Promotion Template (not for Promotion Trigger Environment)
  1. Post Action: Workflows
1. Successful validation, move to next Environment in Promotion Flow
1. Repeat step 3 for Enviroments in the Promotion Flow.

## Promotion Trigger
The promotion trigger is the action in the source environment that initiates the promotion flow.  
The action is typically a commit or a PR to the Git repo for the Argo CD application.

Argo CD 

## 

The application is part of a Product 
The application can comprise and usually comprises microservices 
The application must be promoted through  single or mu;ltiple Envionments.


## Validate promotion eligibility for environment
 how to promote
When a promotion is triggered,  either manually or declaratively or programmtically in the current environment you can define how to validate the promotion in the current environment.

Validation verifies that the application meets the requirements and standards necessary for deployment in the target environment. This may include checks for code quality, passing tests, compatibility with dependencies, security compliance, and other factors relevant to the deployment environment.

The validations comprise promotion workflows and the promotion action. It is at the level of the environment. So it can be shared between environments or can be unique to each environment. 
This can be shared between t

Promotion validation includes:
Workflows to run 
Workflows are meant to validate the promotion. They are completely optional. In general, any promotion to any environment from developement generally includes validations such as unit tests, smoke tests, and any other tasks.
Unit tests
Integration tests
Notifications
Smoke tests

Promotion action
The promotion action is mandatory. 
Similar to the promotion trigger that initiated the promotion, it the action that promotes the application in the current envrionment.

Commit: automated approval-less promotion. Does not require manual intervention.
Pull Request (PR): Requires approval therough manual intervention

Promotion Policy



## Orchestrate promotion across environments
The final 