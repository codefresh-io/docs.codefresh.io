# Required Data: UI Slowness and other UI Issues

#

## Overview

When navigating through the Codefresh UI. I am experiencing slowness or I am
seeing something occur in a component that is not normal.

## Details

For troubleshooting UI-related issues, it's helpful to provide the Codefresh
support team with a HAR file. This file is a log of network requests that
occurred during a recorded period.

### Important

Before capturing a HAR file, it's important to note a few items.

  1. A HAR file may contain sensitive data. (personal data, emails, hostnames, IP Addresses, passwords, etc.) It's highly recommended that you review the HAR file for sensitive information before uploading it to Codefresh Support.
  2. For the best results, it's recommended that you begin the capture of the HAR file before you attempt to reproduce the issue and continue to capture it throughout the problem.
  3. ( _Optional_ ) It's also a good idea to record your screen while you are facing the issue to help give a better understanding of what you are seeing concerning the HAR file.

### Capturing a HAR file

Here are instructions on how to capture a HAR file for various browsers:

  * Chromium-based browsers (Chrome, Edge, Brave, Opera)
  * Safari
  * Firefox

#### **Chromium-based browsers (Chrome, Edge, Brave, Opera)**

  1. Open Chrome, in the top right, select the **vertical "Meatball" menu** -> **More tools** -> **Developer tools**![mceclip0.png](https://support.codefresh.io/hc/article_attachments/6465768173724)
  2. Click the **Network** tab![mceclip1.png](https://support.codefresh.io/hc/article_attachments/6465857616924)
  3. If the " **Record** " button is not red, go ahead and click this button.![mceclip2.png](https://support.codefresh.io/hc/article_attachments/6465865350172)
  4. You are now ready to begin capture. Please navigate to the URL where you are facing the issue and attempt to reproduce the issue. You should now see network requests being populated in your developer tools. Here is an example:![mceclip4.png](https://support.codefresh.io/hc/article_attachments/6465903029532)
  5. Once you have reproduced the issue, you can stop the capture by pressing the "Record" button again.
  6. Click the "Export HAR..." button, then download the HAR file.![mceclip5.png](https://support.codefresh.io/hc/article_attachments/6465957694364)
    * Tip: A suggested naming scheme is to use: _< ZD-Case-ID>_<YYYY-MM-DD>_<HH-mm-ss>_
  7. Upload the HAR file to your support case. 
    * Make sure to read the important notes mentioned above.

#### **Safari**

  1. Open Safari, in the **Menu Bar,** go to **Develop** -> **Show Web Inspector.** ![mceclip7.png](https://support.codefresh.io/hc/article_attachments/6466042897692)
  2. Navigate to the **Network** tab.![mceclip8.png](https://support.codefresh.io/hc/article_attachments/6466084248220)
  3. You are now ready to begin capture. Please navigate to the URL where you are facing the issue and attempt to reproduce the issue. You should now see network requests being populated in your developer tools. Here is an example:![mceclip9.png](https://support.codefresh.io/hc/article_attachments/6466086575772)
  4. Once you have finished reproducing the issue, click the "Export" button to download the HAR file.![mceclip10.png](https://support.codefresh.io/hc/article_attachments/6466088141084)
    * Tip: A suggested naming scheme is to use: _< ZD-Case-ID>_<YYYY-MM-DD>_<HH-mm-ss>_
  5. Upload the HAR file to your support case. 
    * Make sure to read the important notes mentioned above.

#### **Firefox**

  1. Open Firefox, in the top right, select the **vertical "Meatball" menu** -> **More tools** -> **Web Developer Tools**.![mceclip11.png](https://support.codefresh.io/hc/article_attachments/6466140745244)![mceclip12.png](https://support.codefresh.io/hc/article_attachments/6466128666524)
  2. Click on the **Network** tab.![mceclip13.png](https://support.codefresh.io/hc/article_attachments/6466182665116)
  3. You are now ready to begin capture. Please navigate to the URL where you are facing the issue and attempt to reproduce the issue. You should now see network requests being populated in your developer tools. Here is an example:![mceclip14.png](https://support.codefresh.io/hc/article_attachments/6466146418076)
  4. Click the " **Cog Wheel** " located in the top-right of the Web Developer Tools window -> **Save All as HAR![mceclip15.png](https://support.codefresh.io/hc/article_attachments/6466186643996)**
    * Tip: A suggested naming scheme is to use: _< ZD-Case-ID>_<YYYY-MM-DD>_<HH-mm-ss>_
  5. Upload the HAR file to your support case. 
    * Make sure to read the important notes mentioned above.

