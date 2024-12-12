---
title: "Multi-environment promotion with dependencies"
description: "Promote product apps between environments with dependencies"
group: promotions
toc: true
---


In the final quick start, we’ll explore how to create dependencies between environments in a Promotion Flow.

By default, each environment in a promotion flow (except the trigger environment), is dependent on the one preceding it.  
However, critical environments may rely on the success or stability of multiple environments before they are promoted to. By defining additional dependencies, you can ensure that changes are promoted only when all required environments meet the specified criteria.

In this quick start:
Add a parallel `staging` environment
Set a dependency on `staging` for `prod`. This setup means changes are promoted to `prod` only after both `qa` and `staging` have been successfully promoted.


## Add dependency
In the example, we have already added the `staging` environment.  
Now we'll update the dependency on the `prod` environment, by selecting `staging`, in addition to `qa`:

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

Here's the YAML view of the same flow with the updated dependency.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-dependency-yaml-view.png" 
url="/images/gitops-promotions/tutorials/promo-flow-dependency-yaml-view.png"
alt="YAML view of Promotion Flow with updated dependencies" 
caption="YAML view of Promotion Flow with updated dependencies"
max-width="60%"
%}

## Related articles
[Promotion tutorials]({{site.baseurl}}/docs/promotions/promotion-scenarios/)

 
 