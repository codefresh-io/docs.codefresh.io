---
title: "Global Search"
description: "How to search for entities, find features, and more with Global Search & Navigation"
toc: true
---



Finding entities such as applications, Codefresh Global Search & Navigation is your answer. 



## About Global Search 

Global Search is always available in the toolbar, displayed on the top-left. 


When you click the Global Search field, you can see the predefined categories to jump-start your search for **Pipelines** **Projects**, or **Documentation**. 

To start the search, click a category or directly type in the first letters of what you're looking for. 
Select the option or use the shortcut keys. See [Keyboard shortcuts for Global Search & Navigation](#keyboard-shortcuts-for-global-search--navigation).

{{site.data.callout.callout_tip}}
**TIP**   
The results are synced to your permissions and account settings. 
{{site.data.callout.end}}


{% include 
image.html 
lightbox="true" 
file="/images/administration/command-bar/quick-search-options.png" 
url="/images/administration/command-bar/quick-search-options.png" 
alt="Global Search & Navigation in Codefresh" 
caption="Global Search & Navigation in Codefresh" 
max-width="60%" 
%}


We are always adding more options, so stay tuned to our online announcements.

>**NOTE**  
>The Global Search & Navigation feature establishes an initial handshake request with the data source API on inital loading. The outcome of this request does not impact functionality, even in on-premises or air-gapped environments where it will fail.  
>Although your monitoring or alerting systems may flag it as a failure, you can safely disregard the failure notification.



## Find actions & configuration settings
In addition to quickly navigating to specific entities such as Projects and Pipelines, administrators can navigate to configuration settings for Single Sign-On, and installation actions.

{% include 
image.html 
lightbox="true" 
file="/images/administration/command-bar/quick-search-single-sign-on.png" 
url="/images/administration/command-bar/quick-search-single-sign-on.png" 
alt="Example: Finding Single Sign-On with Global Navigation & Search" 
caption="Example: Finding Single Sign-On with Global Navigation & Search" 
max-width="60%" 
%}

## Switch accounts
Use Global Search & Navigation to switch between Codefresh accounts. 
Instead of selecting the account to sign in to from your avatar, stay where you are, and use our built-in action to switch accounts.

* In the Global Search field, start typing `accounts` to get to the Switch Account action.
* Select **Switch Account**** to see the list of accounts, and then either select or use auto-complete to select the account.

 {% include 
image.html 
lightbox="true" 
file="/images/administration/command-bar/switch-account.png" 
url="/images/administration/command-bar/switch-account.png" 
alt="Switch accounts with Global Navigation & Search" 
caption="Switch accounts with Global Navigation & Search" 
max-width="60%" 
%}



## Related articles
[What is Codefresh GitOps Cloud?]({{site.baseurl}}/argohub/introduction/what-is-gitops-cloud/)  
[Explore Codefresh GitOps Cloud]({{site.baseurl}}/argohub/introduction/explore-gitops-cloud-features/)  
