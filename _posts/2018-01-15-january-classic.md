---
title: "January 2018 - Classic"
description: "Changelog and Release Notes For Classic"
---

- Chart install:
  - can now specify release name (useful for installing same chart multiple times)
  - can now add values file that is reusable for next installs
  - can now override individual values
- You can now add your own Helm repositories to the Helm Charts page
- Release details:
  - can now delete a release, with advanced options
  - can now test a release
  - can rollback to previous release
  - can visually see differences between releases
- Misc:
  - UI and bug fixes.
  - reorganized Helm docs, including samples on how package charts and push to registry: [Create Helm artifacts using Codefresh pipeline]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/)
  - Pre-release of our brand new CLI at [https://github.com/codefresh-io/cli](https://github.com/codefresh-io/cli)
  - Using our new cli, you can now execute many pipelines in parallel with different configurations for each.
