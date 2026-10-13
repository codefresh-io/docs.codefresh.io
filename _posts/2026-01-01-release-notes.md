---
title: "Release Notes: January 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

## Bug fixes

### Classic Pipelines

#### Pagination flickered on the Projects page

On the Projects page, when the list had more than one page and you used the **Next** or **Previous** buttons, the pagination controls flickered.

Pagination now stays stable when you move between pages.

#### Missing border on the Next button on the Pipelines page

On the Pipelines page, the **Next** button lost its border when you selected the last page, which made it look different from the **Previous** button.

The **Next** button now keeps its border on the last page.

### GitOps

#### "Learn more about Releases" link opened the wrong page

For a product with no releases, the **Learn more about Releases** link opened the Codefresh account creation guide instead of the documentation for releases.

The link now opens [Releases for products]({{site.baseurl}}/docs/products/releases-in-products/).
