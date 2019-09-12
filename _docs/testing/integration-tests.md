---
title: "Integration Tests"
description: ""
group: testing
redirect_from:
  - /docs/integration-tests/
  - /docs/integration-test-script/
  - /docs/testing/run-unit-test-with-db-composition/
toc: true
---
If your service is part of a micro-service type of application, Codefresh enables you to run your image as part of a composition, and then run your integration tests against it. There are two prerequisites for this step:

## Ways 

1. Compositions
1. Service containers

why

1. Readines
1. Scope
1. Automounted volume


## Launching external services

### Source code to mysql

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/from-source-code.png"
  url="/images/testing/integration-testing/from-source-code.png"
  alt="Testing directly from source code"
  caption="Testing directly from source code"
  max-width="70%"
%}

### Source code to app to mysql

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/to-app.png"
  url="/images/testing/integration-testing/to-app.png"
  alt="Launching the application to be tested"
  caption="Launching the application to be tested"
  max-width="70%"
%}


### Docker image for tests

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/special-image.png"
  url="/images/testing/integration-testing/special-image.png"
  alt="Using a dedicated testing image"
  caption="Using a dedicated testing image"
  max-width="70%"
%}

### Multiple services tree

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/complex-tests.png"
  url="/images/testing/integration-testing/complex-tests.png"
  alt="Microservice testing"
  caption="Microservice testing"
  max-width="70%"
%}


## Service scope (all pipeline or none)


{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/single-scope.png"
  url="/images/testing/integration-testing/single-scope.png"
  alt="Service containers for individual steps"
  caption="Service containers for individual steps"
  max-width="60%"
%}

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/multi-scope.png"
  url="/images/testing/integration-testing/multi-scope.png"
  alt="Service containers for the whole pipeline"
  caption="Service containers for the whole pipeline"
  max-width="60%"
%}

## Reuse compositions.