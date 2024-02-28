

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





## Orchestrate promotion across environments
The final 