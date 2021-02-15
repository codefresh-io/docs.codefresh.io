---
title: "Sunsetting Helm 2 Support"
description: "Migrate Your Applications from Helm 2 to Helm 3"
group: new-helm
toc: true
---

**Sunsetting Helm 2 Support**

At Codefresh, we support both Helm 2 and Helm 3 releases, both in the graphical dashboards and in pipeline steps.

However, the Helm team has discontinued all Helm support since November 2020. 
This means; no new Helm 2 releases (not even for security updates). “Stable” and “Incubator" repositories will be discontinued.

https://github.com/helm/charts

For migrating your Helm 2 charts you can use the [helm-2to3 plugin](https://github.com/helm/helm-2to3)

Codefresh will also discontinue support for Helm 2 on July 16 2021. After this date, all Codefresh Helm dashboards including the Helm releases, and promotions will stop supporting Helm 2 clusters and namespaces. The Codefresh Helm [step](https://codefresh.io/steps/step/helm) will no longer support Helm 2.

Please contact us at support@codefresh.io if you have any questions or concerns.

What to read next:

[Helm Quick Start Guide](https://codefresh.io/docs/docs/getting-started/helm-quick-start-guide/)

[Using Helm](https://codefresh.io/docs/docs/new-helm/using-helm-in-codefresh-pipeline/ )

[Helm Example](https://codefresh.io/docs/docs/yaml-examples/examples/helm/)



