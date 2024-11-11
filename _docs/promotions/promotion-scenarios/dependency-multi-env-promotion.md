---
title: "Multi-environment promotion with dependencies"
description: "Promote product apps between environments with dependencies"
group: promotions
toc: true
---


In this final scenario, we’ll explore how to create dependencies between environments in a Promotion Flow.

By default, each environment in a promotion flow (except the trigger environment) is dependent on the one preceding it. However, critical environments may rely on the success or stability of multiple environments before they are promoted to. By defining additional dependencies, you can ensure that changes are promoted only when all required environments meet the specified criteria.

In this example, we’ll return to the `three-env-promotion` flow, add a parallel `staging` environment, and set a dependency on `staging` for `production`. This setup means changes are promoted to `production` only after both `qa` and `staging` have been successfully promoted.

In the example, we have already added the `staging` environment.  

Now we'll update the dependency on the `production` environment, by selecting `staging`, in addition to `qa`:

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-dependency.png" 
url="/images/gitops-promotions/tutorials/promo-flow-dependency.png"
alt="Update dependencies for environment" 
caption="Update dependencies for environment"
max-width="60%"
%}

Here's the `three-env-promotion` Promotion Flow with the updated dependency.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-updated-dependency.png" 
url="/images/gitops-promotions/tutorials/promo-flow-updated-dependency.png"
alt="Promotion Flow with updated dependencies" 
caption="Promotion Flow with updated dependencies"
max-width="60%"
%}



## Related articles
[Promotion tutorials]({{site.baseurl}}/docs/promotions/promotion-scenarios/)

 
 