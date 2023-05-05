---
title: "March 2021 - Classic"
description: "Changelog and Release Notes For Classic"
---

- Native Support for Hashicorp Vault Secrets - [documentation]({{site.baseurl}}/docs/integrations/hashicorp-vault)
- Blue/Green deployments with Argo Rollouts - [documentation]({{site.baseurl}}/docs/ci-cd-guides/progressive-delivery/#blue-green-deployments)
- The [Modified Files filter]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#monorepo-support-modified-files) will now work on triggers triggered by Pull Request events. Notice: this might cause unexpected behavior if you have a trigger that is triggered by both Pull Request and Commit events with a Modified Files filter set. Previously the Modified Files filter would be ignored for Pull Request events. If you need different filters for Pull Requests and Commit events, we recommend you separate the trigger.
- Codefresh Runner on Rancher RKE 2.X - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#installing-on-rancher-rke-2x)
- Access service containers via localhost - [documentation]({{site.baseurl}}/docs/pipelines/service-containers/#accessing-containers-via-localhost)
