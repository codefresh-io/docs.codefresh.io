---
title: "Validate environment readiness for promotions"
description: "Create Promotion Policies to run workflows before promotion"
group: promotions
toc: true
---





## Validate promotion eligibility for environment
 how to promote
When a promotion is triggered in the target environment, either manually, declaratively, or programmatically, you can define how to validate the promotion in the current environment.

Validation verifies that the application and its dependencies meet the requirements and standards necessary for deployment in the target environment. The validation process can include checks for code quality, passing unit or smoke tests, compatibility with dependencies, security compliance, and other factors relevant to the target environment.


##### How do you define validation for environments

You define or create the validation process for the target environment through the Promotion Policy.


What is a Promotion Policy?
The Promotion Policy comprises:
Promotion Workflow
The Promotion Worklow is an Argo Workflow that is completely optional.   
It can be a single workflow, or can call other workflows. In short 



Promotion Action
The Promotion Action is mandatory. It is the action that promotes the application in the target envrionment. As we have already seen in XREF, it is either a commit or a PR.
Similar to the promotion trigger that initiated the promotion, 

The validations comprise promotion workflows and the promotion action. It is at the level of the environment. So it can be shared between environments or can be unique to each environment. 
This can be shared between t

What is a Promotion Rule



How do Promotion Rules work


How do Promotion Policies work


Concurrent pomotions

Promotion action


Commit: automated approval-less promotion. Does not require manual intervention.
Pull Request (PR): Requires approval therough manual intervention

Promotion Policy

## Promotion Workflows

Workflow Templates



## Add a Promotion Workflow



## Manage Promoption Workflows


### Copy Promotion Workflow


### Delete Promotion Workflow