---
title: "Data required for troubleshooting UI issues"
description: "Data required to troubleshoot UI performance and issues"
---

## Overview

This article outlines the data Codefresh Support needs to troubleshoot UI issues, such as slowness or unexpected behavior in UI components.

## Details

In order to troubleshoot UI-related issues, Codefresh Support requires at minimum the following information:

* Codefresh username of affected user
* Link to UI page being accessed
* Action being performed
* Timestamp of incident

It's also helpful to provide Codefresh Support with an HTTP Archive (HAR) file. This file is a log of network requests that occurred during a recorded period.

## Important

Before capturing a HAR file, it's important to note a few items.

1. A HAR file can contain sensitive data, such as personal data, emails, hostnames, IP Addresses, passwords, etc. It's highly recommended that you review the HAR file for sensitive information before uploading it to Codefresh Support.
2. For the best results, it's recommended that you begin the capture of the HAR file before you attempt to reproduce the issue and continue to capture it throughout the problem.
3. (_Optional_) It's also a good idea to record your screen while you are facing the issue to help give a better understanding of what you are seeing concerning the HAR file.

## Capturing a HAR file

Here are instructions on how to capture a HAR file for various browsers:

* [Chromium-based browsers (Chrome, Edge, Brave, Opera)](#chromium-based)
* [Safari](#safari)
* [Firefox](#firefox)

### Chromium-based

1. Open Chrome, in the top right, select the **vertical "Meatball" menu** -> **More tools** -> **Developer tools**

{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-00.png" 
url="/images/troubleshooting/data-needed-00.png" 
alt="Chromium: Developer tools" 
caption="Chromium: Developer tools" 
max-width="100%" 
 %}

{:start="2"}   
1. Click the **Network** tab.

  {% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-01.png" 
url="/images/troubleshooting/data-needed-01.png" 
alt="Chromium: Network tab" 
caption="Chromium: Network tab" 
max-width="100%" 
 %}
 
{:start="3"}   
1. If the **Record** button is not active (red), go ahead and click this button.  
  You are now ready to begin capture. 

  {% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-02.png" 
url="/images/troubleshooting/data-needed-02.png" 
alt="Chromium: Record button" 
caption="Chromium: Record button" 
max-width="100%" 
 %}

{:start="4"} 
1. Navigate to the URL where you are facing the issue and attempt to reproduce the issue.  
  You should now see network requests being populated in your developer tools.  
  Here is an example:

  {% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-03.png" 
url="/images/troubleshooting/data-needed-03.png" 
alt="Chromium: Example of network requests in Developer tools" 
caption="Chromium: Example of network requests in Developer tools" 
max-width="100%" 
 %}

{:start="5"}
1. Once you have reproduced the issue, stop the capture by clicking the **Record** button again.
1. Click the **Export HAR...** button, and then download the HAR file.  
   **TIP**: A suggested naming scheme is to use: _< ZD-Case-ID>_< YYYY-MM-DD>_< HH-mm-ss>_
  
  {% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-04.png" 
url="/images/troubleshooting/data-needed-04.png" 
alt="Chromium: Export HAR file" 
caption="Chromium: Export HAR file" 
max-width="100%" 
 %}

{:start="7"}
1. Upload the HAR file to your support case.  
   **TIP**: Make sure to read the [important notes](#important) mentioned above.

### Safari

1. Open Safari, in the **Menu Bar,** go to **Develop** -> **Show Web Inspector**.

  {% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-05.png" 
url="/images/troubleshooting/data-needed-05.png" 
alt="Safari: Show Web Inspector" 
caption="Safari: Show Web Inspector" 
max-width="100%" 
 %}

{:start="2"}
1. Navigate to the **Network** tab.

  {% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-06.png" 
url="/images/troubleshooting/data-needed-06.png" 
alt="Safari: Network tab" 
caption="Safari: Network tab" 
max-width="100%" 
 %}

{:start="3"}
1. You are now ready to begin capture. Navigate to the URL where you are facing the issue and attempt to reproduce the issue.  
  You should now see network requests being populated in your developer tools.  
  Here is an example:

    {% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-07.png" 
url="/images/troubleshooting/data-needed-07.png" 
alt="Safari: Example of network requests in Developer tools" 
caption="Safari: Example of network requests in Developer tools" 
max-width="100%" 
 %}

{:start="4"}
1. Once you have finished reproducing the issue, click the **Export** button to download the HAR file.  
   **TIP**: A suggested naming scheme is to use: _< ZD-Case-ID>_< YYYY-MM-DD>_< HH-mm-ss>_

    {% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-08.png" 
url="/images/troubleshooting/data-needed-08.png" 
alt="Safari: Download HAR file" 
caption="Safari: Download HAR file" 
max-width="100%" 
 %}

{:start="5"}
5. Upload the HAR file to your support case.  
   **TIP**: Make sure to read the [important notes](#important) mentioned above.

### Firefox

1. Open Firefox, and from the top right, select the **vertical "Meatball" menu** -> **More tools** -> **Web Developer Tools**.

    {% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-09.png" 
url="/images/troubleshooting/data-needed-09.png" 
alt="Firefox: Web Developer Tools" 
caption="Firefox: Web Developer Tools" 
max-width="100%" 
 %}

{:start="2"}
1. Click the **Network** tab.
    
{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-11.png" 
url="/images/troubleshooting/data-needed-11.png" 
alt="Firefox: Network tab" 
caption="Firefox: Network tab" 
max-width="100%" 
 %}
    
{:start="3"}    
1. You are now ready to begin capture. Please navigate to the URL where you are facing the issue and attempt to reproduce the issue.  
  You should now see network requests being populated in your developer tools.  
  Here is an example:  

  {% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-12.png" 
url="/images/troubleshooting/data-needed-12.png" 
alt="Firefox: Example of network requests in Web Developer Tools" 
caption="Firefox: Example of network requests in Web Developer Tools" 
max-width="100%" 
 %}

{:start="4"}
1. Click **Cog Wheel** at the top-right of the Web Developer Tools window -> **Save All as HAR!**.  
    **TIP**: A suggested naming scheme is to use: _< ZD-Case-ID>_< YYYY-MM-DD>_< HH-mm-ss>_

  {% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/data-needed-12.png" 
url="/images/troubleshooting/data-needed-12.png" 
alt="Firefox: Save as HAR file" 
caption="Firefox: Save as HAR file" 
max-width="100%" 
 %}

{:start="5"}
1. Upload the HAR file to your support case.  
   **TIP**: Make sure to read the [important notes](#important) mentioned above.
