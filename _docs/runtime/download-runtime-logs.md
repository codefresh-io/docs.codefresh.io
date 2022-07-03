---
title: "View/download runtime logs"
description: ""
group: runtime
toc: true
---

Logs are available for completed runtimes, both for the runtime and for individual runtime components. Download runtime log files for offline viewing and analysis, or view online logs for a runtime component, and download if needed for offline analysis. Online logs support free-text search, search-result navigation, and line-warp for enhanced readability.  

Log files include events from the date of the application launch, with the newest events listed first. 


### Download logs for runtimes
Download the log file for a runtime. The runtime log is downloaded as a `.tar.gz` file, which contains the individual log files for each runtime component. 

1. In the Codefresh UI, go to [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}. 
1. If needed, switch to **List View**, and then select the runtime for which to download logs.
1.  From the list of **Additional Actions**, select **Download All Logs**.  
  The log file is downloaded to the Downloads folder or the folder designated for downloads, with the filename, `<runtime-name>.tar.gz`. For example, `codefreshv2-production2.tar.gz`.


  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-download-all.png" 
	url="/images/runtime/runtime-logs-download-all.png" 
	alt="Download logs for selected runtime" 
	caption="Download logs for selected runtime"
    max-width="40%" 
%}


{:start="4"}
1. To view the log files of the individual components, unzip the file.  
  Here is an example of the folder with the individual logs.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-folder-view.png" 
	url="/images/runtime/runtime-logs-folder-view.png" 
	alt="Individual log files in folder" 
	caption="Individual log files in folder"
    max-width="50%" 
%}

{:start="5"}
1. Open a log file with the text editor of your choice.

 
### View/download logs for runtime components
View online logs for any runtime component, and if needed, download the log file for offline viewing and analysis.  

Online logs show up to 1000 of the most recent events (lines), updated in real time. Downloaded logs include all the events from the application launch to the date and time of download. 

1. In the Codefresh UI, go to [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}. 
1. If needed, switch to **List View**, and then select the runtime.
1. Select the runtime component and then select **View Logs**. 

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-view-component.png" 
	url="/images/runtime/runtime-logs-view-component.png" 
	alt="View log option for individual runtime component" 
	caption="View log option for individual runtime component"
    max-width="40%" 
%}


{:start="4"}
1. Do the following:
  * Search by free-text for any string, and click the next and previous buttons to navigate between the search results.
  * To switch on line-wrap for readability, click **Wrap**.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-screen-view.png" 
	url="/images/runtime/runtime-logs-screen-view.png" 
	alt="Runtime component log example" 
	caption="Runtime component log example"
    max-width="50%" 
%}

{:start="5"}
1. To download the log, click **Download**.  
  The file is downloaded as `<component-name>.log`.

### Related information
[Manage Git Sources]({{site.baseurl}}/docs/runtime/git-sources/#viewdownload-logs-for-a-git-source) 