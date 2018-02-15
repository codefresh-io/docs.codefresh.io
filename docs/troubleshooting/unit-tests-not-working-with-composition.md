---
layout: docs
title: "Unit tests not working with composition"
description: ""
group: troubleshooting
redirect_from:
  - /docs/unit-tests-not-working-with-composition
  - /docs/unit-tests-not-working-with-composition
toc: true
old_url: /docs/unit-tests-not-working-with-composition
was_hidden: true
---
**Problem***: I want run unit tests with my composition, but nothing is happen.
***Solution:*** In order to use unit tests you need mark your service as "test" in composition:

{% include 
image.html 
lightbox="true" 
file="/images/a41664d-2016-10-14_16-12-02.png" 
url="/images/a41664d-2016-10-14_16-12-02.png"
alt="2016-10-14_16-12-02.png" 
max-width="40%"
caption="Test Results"
%}
