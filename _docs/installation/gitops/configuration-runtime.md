---
title: "Designating Configuration Runtimes"
description: "Select a Configuration Runtime to store product and promotion configuration"
toc: true
---



## Designating Configuration Runtimes 
Designate any GitOps Runtime<!---, including the Hosted GitOps Runtime ,--> as a Configuration Runtime to manage platform-level resources which are Runtime-agnostic. These resources are crucial for functionality related to products and promotions in GitOps. 
  
##### Single vs multiple Configuration Runtimes  
The first GitOps Runtime you create is automatically designated as the Configuration Runtime by default.  
You can designate a single Runtime, or multiple Runtimes as Configuration Runtimes for redundancy. GitOps Cloud ensures there is no duplication of resources across designated Configuration Runtimes, maintaining consistency and preventing conflicts. 

##### Designation options
Designate Configuration Runtimes through the user interface (UI) or by editing the `values` file.  
If needed, you can also remove the Configuration Runtime designation from any GitOps Runtime.



## Designate a Configuration Runtime in the UI
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **GitOps Runtimes**.
1. Select the Runtime to designate as the Configuration Runtime, and from the context menu, select **Set as Configuration Runtime**.

  {% include
    image.html
  lightbox="true"
  file="/images/runtime/helm/set-as-config-runtime.png"
  url="/images/runtime/helm/set-as-config-runtime.png"
  alt="Set GitOps Runtime as Configuration Runtime"
  caption="Set GitOps Runtime as Configuration Runtime"
  max-width="60%"
  %}

  You'll see that the Type column displays Config Runtime.

  {% include
    image.html
  lightbox="true"
  file="/images/runtime/helm/config-runtime-in-ui.png"
  url="/images/runtime/helm/config-runtime-in-ui.png"
  alt="GitOps Runtime designated as Configuration Runtime"
  caption="GitOps Runtime designated as Configuration Runtime"
  max-width="60%"
  %}

{:start="4"}
1. To remove the designation, from the context menu of the Runtime, select **Unset as Configuration Runtime**.

## Designate a Configuration Runtime in values.yaml
1. In the `values.yaml` file, navigate to `global.runtime`.
1. To designate a specific Runtime, set the `isConfigurationRuntime` flag for that Runtime to `true` (default is `false`).
  
```yaml
  global:
  codefresh:
    url: https://codefresh-platform.ngrok.io # ngrok

    userToken:
      token: <TOKEN>

  runtime:
    name: ngrok-noam
    isConfigurationRuntime: true # saves platform configuration in this Runtime 

    ingress:
      enabled: true
      className: nginx-public
      hosts:
      - codefresh.rnd.sandbox.codefresh.io 
```

## Configuration folder in Shared Configuration Repository
When a Runtime is designated as a Configuration Runtime, GitOps Cloud creates a folder entitled `configuration` within `resources` in the Shared Configuration Repository. The folder includes additional subfolders for the different promotion entities.

>**NOTE**  
Only GitOps Runtimes designated as Configuration Runtimes sync to this folder and its subfolders.

```
├── resources <───────────────────┐
│   ├── all-runtimes-all-clusters 
│   ├── configurations            │ # new folder storing promotion configuration
│       ├── promotion-flows       │ 
│       └── promotion-templates   │
│       └── promotion-policies    │
│   ├── control-planes            │        
│   ├── runtimes                  │
│   │   ├── runtime1              │    
│   │   └── runtime2              │    
│   └── manifest6.yaml            │
└── runtimes                      │
│    ├── runtime1                 │ 
│   │   ├── in-cluster.yaml       ┤     
```

## Related articles
[Monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)  
[Managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/) 
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  