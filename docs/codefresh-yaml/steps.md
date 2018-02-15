---
layout: docs
title: "Steps"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/steps
toc: true
---
A step may be **typed** or **untyped**

**Typed steps** are single-purpose steps that are designed to perform a single, specific operation, requiring minimal configuration.
**Untyped steps** are defined by a base image and are affected by the image specified.

{: .table .table-bordered .table-hover}
| Step type      | Description                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Typed**      | Single-purpose steps designed to perform specific operation, and requires minimal configuration. <br/>**Typed** steps include:<br/>{::nomarkdown}<ul><li>Build</li><li>Push</li><li>Git Clone</li><li>Composition</li><li>Launch Composition</li></ul>{:/} |
| **Untyped**    | Defined by a base image and are affected by the specified image. <br/>**Untyped** steps include: <br/> {::nomarkdown}<ul><li>Freestyle</li></ul>{:/} |

