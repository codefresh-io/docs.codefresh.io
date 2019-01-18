---
title: "Steps"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/steps/
toc: true
---
A step may be **typed** or **untyped**

**Typed steps** are single-purpose steps that are designed to perform a single, specific operation, requiring minimal configuration.
**Untyped steps** are defined by a base image and are affected by the image specified.

{: .table .table-bordered .table-hover}
| Step type      | Description                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Typed**      | Single-purpose steps designed to perform specific operation, and requires minimal configuration. <br/>**Typed** steps include:<br/>{::nomarkdown}<ul><li>Git clone</li><li>Build</li><li>Push</li><li>Composition</li><li>Launch Composition</li><li>Deploy</li><li>Approval</li></ul>{:/} |
| **Untyped**    | Defined by a base image and are affected by the specified image. <br/>**Untyped** steps include: <br/> {::nomarkdown}<ul><li>Freestyle</li></ul>{:/} |

## Steps offered by Codefresh

Remember that we also offer a [plugin marketplace](https://steps.codefresh.io/) with several existing plugins for popular integrations.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/plugin-directory.png" 
url="/images/pipeline/plugin-directory.png"
alt="Codefresh steps directory" 
caption="Codefresh steps directory" 
max-width="80%" 
%}

