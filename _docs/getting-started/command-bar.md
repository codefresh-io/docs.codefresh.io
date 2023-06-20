---
title: "Global Search & Navigation"
description: "How to perform actions, search for entities, find features, and more with Global Search & Navigation"
group: getting-started
toc: true
---



Stay where you are in Codefresh and get to what you want without extra clicks! Be it navigation, actions such as switching accounts, or finding entities such as pipelines or builds, Codefresh Global Search & Navigation is your answer. 





## About Global Search & Navigation

Global Search & Navigation is always available in the toolbar, displayed on the top-left. 

> **TIP**:  
If you don't see it, you may have to [enable the Codefresh New Experience]({{site.baseurl}}/docs/new-codefresh/enable-new-experience/#enable-the-codefresh-new-experience).

When you click the Global Search field, you can see the predefined categories to jump-start your search for **Pipelines** **Projects**, or **Documentation**. 

To start the search, click a category or directly type in the first letters of what you're looking for. 
Select the option or use the shortcut keys. See [Keyboard shortcuts for Global Search & Navigation](#keyboard-shortcuts-for-global-search--navigation).

>**TIP**:   
The results are synced to your permissions and account settings. 


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

>**NOTE**:
>The Global Search & Navigation feature establishes an initial handshake request with the data source API on inital loading. The outcome of this request does not impact functionality, even in on-premises or air-gapped environments where it will fail.  
>Although your monitoring or alerting systems may flag it as a failure, you can safely disregard the failure notification.

## Keyboard shortcuts for Global Search & Navigation

Here are a few keyboard shortcuts to work with Global Search & Navigation.

{: .table .table-bordered .table-hover}
| Navigate to              | Keyboard Shortcuts               |
| ----------          |  -------------------------- |
| Global Search       | **⌘+ K**   |
| Projects            | **P** then **R** |
| Builds              | **B** |
| Steps               | **S** then **T** |
| GitOps Apps         | **A** then **P** |
| Helm Boards         | **H** then **B** |
| DORA Metrics         | **D** then **R** |
| Images               | **I** then **M** |
 

## Find actions & configuration settings
In addition to quickly navigating to specific entities such as Builds and Pipelines, administrators can navigate to configuration settings such as Single Sign-On, and installation actions.

{% include 
image.html 
lightbox="true" 
file="/images/administration/command-bar/quick-search-builds.png" 
url="/images/administration/command-bar/quick-search-builds.png" 
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
[Account and user settings]({{site.baseurl}}/docs/administration/account-user-management)  
[Codefresh for CI]({{site.baseurl}}/docs/getting-started/ci-codefresh/)  
[Codefresh for CD]({{site.baseurl}}/docs/getting-started/cd-codefresh/)    
[Concepts in Codefresh]({{site.baseurl}}/docs/getting-started/concepts/)   
[Introduction to Codefresh]({{site.baseurl}}/docs/getting-started/intro-to-codefresh/)  