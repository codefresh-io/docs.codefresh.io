---
title: "Promotion orchestration"
description: "Ochestrate promotion for products across environments"
group: deployments
sub_group: gitops
toc: true
---




PromotionFlow selection is based on a product selector and a release to an environment.
Products “Billing” is deployed to the first env, “dev”
Allow grouping of environments in order to create complex logic of promotion after multiple environments are healthy
Define Rollback Logic for Rollouts, when rollout fails and creates a rollback on env us-east, rollback eu and asia as they have the same version. Potentially rollback asia-2 as well
Asia-2 promotion starts depends on multiple envs
define release windows