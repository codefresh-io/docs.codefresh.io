---
layout: docs
title: "Validation Port warnings"
description: ""
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/validation-port-warnings
  - /docs/validation-port-warnings
toc: true
---
When you try to launch a service or composition you may see warning regarding the validation port. The validation port is a port that Codefresh uses to verify that your application is up.

## Validation Port warning – pipeline launch
**Problem:** I tried to launch a pipeline and received the following warning messages in the build log:        

  * “Encountered a problem while validating your application. Please check your pipeline configuration.”
  * “No default port was configured”.

{% include 
image.html 
lightbox="true" 
file="/images/7ce9b1b-2016-09-29_13-19-16.png" 
url="/images/7ce9b1b-2016-09-29_13-19-16.png"
alt="2016-09-29_13-19-16.png" 
max-width="40%"
%}
  
When launching a pipeline, Codefresh exposes the ports specified in the repository’s Dockerfile. Codefresh enables you to validate that your application is up by running a '**health check**' to test the connection to one of the exposed ports. When you receive this error message, the pipeline was launched successfully, but the Codefresh **health check** couldn't identify which URL to validate, or didn’t get a response from the specified application port.  

**Solution:**

{:start="1"}
1. Make sure that you listen to one of your exposed ports:
  * If you use a Dockerfile, listen to a port in your application.
  * If you use a template, listen to one of of the exposed ports in either the template, or in the ports list. (If you are not using a Dockerfile, you can find the ports list in the **Pipeline** view.

{:start="2"}
2. Navigate to **`Repositories`** &#8594; **_`Your Repository`_** &#8594; **`Launch Settings`**, and verify that the **`Application Port`** is the same one that your application exposes, and listen to it. This is the port on which Codefresh runs the **health check**.

{% include 
image.html 
lightbox="true" 
file="/images/e8a83e0-2016-09-29_13-28-13.png" 
url="/images/e8a83e0-2016-09-29_13-28-13.png"
alt="2016-09-29_13-28-13.png" 
max-width="40%"
%}
