---
title: "Release Notes: January 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements








## Bug fixes

**General**  


**Pipelines**  
* For Bitbucket Cloud, `codefresh-report-image` step fails with errors to get Pull Requests (PRs) and branches. (CR-22200 vadim)
* Builds for Gerrit in Codefresh are triggered twice at random. (CR-20179 Olek)
* Replaced misleading warning message "The security token included in the request is invalid" for successful builds. (CR-18186 kim)


<!--- * Notifications not send for builds triggered by Cron timers. (CR-3927 Franscisco) -->

<br>

**GitOps**  
* Codefresh UI unresponsive when clicking Warnings/Errors button in the **GitOps Apps** dashboard. (CR-22077 - Bogdan)
* Failed to create binary image error from Image reporter for images execeeding 2GB (CR-21671 - Vadim) 
* Audit log missing manual actions performed in Rollouts Player. (CR-21295 Andrii)
* Long time for new Argo CD applications to appear in Codefresh GitOps Apps dashboard. (CR-21281 Yarik)
* For GitLab Actions, `codefresh-image-reporter` log displays actual values of encrypted secrets. (CR-20826 Denis)
* Codefresh UI not in sync with native Argo CD UI. (CR-20811 Yarik)

Logs are not accessible anymore on the runtime components dashboard (ask Zhenya)

