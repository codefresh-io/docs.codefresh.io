---
title: "Required Data: UI Slowness and other UI Issues"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [General]
support-reviewed: 2023-04-18 LG
---

## Overview

When navigating through the Codefresh UI. I am experiencing slowness or I am seeing something occur in a component that is not normal.

## Details

For troubleshooting UI-related issues, it's helpful to provide the Codefresh support team with a HAR file. This file is a log of network requests that occurred during a recorded period.

### Important

Before capturing a HAR file, it's important to note a few items.

1. A HAR file may contain sensitive data. (personal data, emails, hostnames, IP Addresses, passwords, etc.) It's highly recommended that you review the HAR file for sensitive information before uploading it to Codefresh Support.
2. For the best results, it's recommended that you begin the capture of the HAR file before you attempt to reproduce the issue and continue to capture it throughout the problem.
3. ( _Optional_ ) It's also a good idea to record your screen while you are facing the issue to help give a better understanding of what you are seeing concerning the HAR file.

### Capturing a HAR file

Here are instructions on how to capture a HAR file for various browsers:

* [Chromium-based browsers (Chrome, Edge, Brave, Opera)](#chromium-based)
* [Safari](#safari)
* [Firefox](#firefox)

#### Chromium-based

1. Open Chrome, in the top right, select the **vertical "Meatball" menu** -> **More tools** -> **Developer tools**
    ![chromium image 0](/images/troubleshooting/data-needed-00.png)
2. Click the **Network** tab
    ![chromium image 1](/images/troubleshooting/data-needed-01.png)
3. If the " **Record** " button is not red, go ahead and click this button.
    ![chromium image 2](/images/troubleshooting/data-needed-02.png)
4. You are now ready to begin capture. Please navigate to the URL where you are facing the issue and attempt to reproduce the issue. You should now see network requests being populated in your developer tools. Here is an example:
    ![chromium image 3](/images/troubleshooting/data-needed-03.png)
5. Once you have reproduced the issue, you can stop the capture by pressing the "Record" button again.
6. Click the "Export HAR..." button, then download the HAR file.
    ![chromium image 4](/images/troubleshooting/data-needed-04.png)
   * Tip: A suggested naming scheme is to use: _< ZD-Case-ID>_< YYYY-MM-DD>_< HH-mm-ss>_
7. Upload the HAR file to your support case.
   * Make sure to read the [important notes](#important) mentioned above.

#### Safari

1. Open Safari, in the **Menu Bar,** go to **Develop** -> **Show Web Inspector.**
    ![safari image 1](/images/troubleshooting/data-needed-05.png)
2. Navigate to the **Network** tab.
    ![safari image 2](/images/troubleshooting/data-needed-06.png)
3. You are now ready to begin capture. Please navigate to the URL where you are facing the issue and attempt to reproduce the issue. You should now see network requests being populated in your developer tools. Here is an example:
    ![safari image 3](/images/troubleshooting/data-needed-07.png)
4. Once you have finished reproducing the issue, click the "Export" button to download the HAR file.
    ![safari image 4](/images/troubleshooting/data-needed-08.png)
   * Tip: A suggested naming scheme is to use: _< ZD-Case-ID>_< YYYY-MM-DD>_< HH-mm-ss>_
5. Upload the HAR file to your support case.
   * Make sure to read the [important notes](#important) mentioned above.

#### Firefox

1. Open Firefox, in the top right, select the **vertical "Meatball" menu** -> **More tools** -> **Web Developer Tools**.
    ![firefox image 1](/images/troubleshooting/data-needed-09.png)
    ![firefox image 2](/images/troubleshooting/data-needed-10.png)
2. Click on the **Network** tab.
    ![firefox image 3](/images/troubleshooting/data-needed-11.png)
3. You are now ready to begin capture. Please navigate to the URL where you are facing the issue and attempt to reproduce the issue. You should now see network requests being populated in your developer tools. Here is an example:
    ![firefox image 4](/images/troubleshooting/data-needed-12.png)
4. Click the " **Cog Wheel** " located in the top-right of the Web Developer Tools window -> **Save All as HAR!**
    ![firefox image 5](/images/troubleshooting/data-needed-13.png)
    * Tip: A suggested naming scheme is to use: _< ZD-Case-ID>_< YYYY-MM-DD>_< HH-mm-ss>_
5. Upload the HAR file to your support case.
    * Make sure to read the [important notes](#important) mentioned above.
