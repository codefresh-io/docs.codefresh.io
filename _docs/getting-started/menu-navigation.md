---
title: ""
description: ""
group: getting-started
toc: true
---

## Classic > New Codefresh experience navigation
Get up to speed with navigation enhancements and changes with the New Codefresh Experience.  

We added a new **Settings** icon to the toolbar to simplify account-level management for Codefresh administrators.
With the Settings icon always available, you have _single-click access_ whenever you need to account-level options and settings.



{% include 
  image.html 
  lightbox="true" 
  file="/images/getting-started/settings-icon.png" 
  url="/images/getting-started/settings-icon.png" 
  alt="To be changed Settings icon in toolbar" 
  caption="To be changed Settings icon in toolbar"
    max-width="70%" 
%}

We divided the navigation into Avatar, account-level, and features and functionality.  The &rarr; indicates a change in navigation.

### Avatar options

{: .table .table-bordered .table-hover}
|  CLASSIC             |                               |      |NEW CODEFRESH EXPERIENCE            |             |
|  Bucket              | Menu item                     |        | Bucket        |  Menu item           | 
| -------------------  | -------------------           |---      | ---------------- | ---------  | 
| **AVATAR**           |                               |         |  No change               |            |     
|                       |Account Settings              |&rarr;  |                  | Moved to Settings  |
|                       |User Management               |&rarr;  |                  | Moved to Settings  |               
|                       |Billing                       |&rarr;  |                  | Moved to Settings  |             
|                       |User Settings                 |        |                  | No change                 |
|                       |                              | &rarr; |                  | Git Personal Access Token |

### Account-level options

Access account-level options through the **Settings** icon: 
* Account & user management
* Integrations
* Configurations
* Runtimes



{: .table .table-bordered .table-hover}
|  CLASSIC             |                               |       |NEW  CODEFRESH EXPERIENCE       |           |
|  Bucket              | Menu item                     |       | Bucket        |  Menu item           | 
| -------------------  | -------------------           |       | ----------------  | ---------     | 
| **GENERAL**          |                               |         | No change         |                          |       
|                      | **Account Information**       | &rarr; |                   | (Renamed) Organization Information |       
|                      | **Users & Teams**             | &rarr; | (Moved to) ACCESS & COLLABORATION  |  |
|                      | **Subscription & Billing**    |  |                   | No change                |
|                      | **Usage**                     |  |                   | No change                |
|                      |                               |  |                   |                          |       
| **CONFIGURATION**    |                               |  | No change         |                          |       
|                      | **Integrations**              | &rarr; |                   |(Renamed) Pipeline Integrations |       
|                      |                               |&rarr;  |                   |(New) GitOps Integrations |       
|                      | **Pipeline Settings**         |  |                         | No change                |       
|                      | **Codefresh Runner**          |&rarr;  |                   | (Moved to) Runtimes bucket |
|                      | **Runtime Environments**      | &rarr; |                   | (Moved to) Runtimes bucket |
|                      | **GitOps Controller**         |        |                   |  ??                       |
|                      | **Shared Configuration**      |        |                   | No change                |
|                      | **Nodes**                     |        |                   | ??                       |
|                      |                               |        |                   |                          |       
| **SECURITY**         |                               |&rarr;  | (Renamed) ACCESS & COLLABORATION|            |       
|                      | **Single Sign-On**            |        |                   |(Now in) Access & Collaboration |       
|                      | **Permissions**               |        |                   | Now in Access & Collaboration  |       
|                      | **Audit**                     |        |                   | Now in Access & Collaboration  |       
|                      |                               |        |                   |                          |       
|                      |                               |&rarr;  | RUNTIMES          |                                |       
|                      |                               |&rarr;  |                   | (Renamed) Build Runtimes  |       
|                      |                               |&rarr;  |                   | (New) GitOps Runtimes|       



### Features and functionality
We renamed menu groups and moved items for more intuitive access. 

{: .table .table-bordered .table-hover}
|  CLASSIC             |                         | &rarr;| NEW CODEFRESH EXPERIENCE  |          |    
|  Bucket              | Menu item               |       |                    |            | 
| -------------------  | -------------------     |  | ----------------    | ---------  | 
|                       |                        | |                      |  Home      |
|                       |                        |&rarr; | INSIGHTS       |            |
|                       |                        | |                      | DORA Metrics |
|                       |                        | |                      |            |
|**BUILD > TEST > DEPLOY**|                      |&rarr; |(Renamed) PIPELINES  |          |
|                       |**Projects**            | |               | No change  |
|                       |**Pipelines**           | |               | No change  |
|                       |**Builds**              | |              | No change  |
|                       |**Steps**               | |               | No change  |
|                       |                        | |               |            |
|**DEVOPS INSIGHTS**    |                        |&rarr; |(Renamed) OPS            |            |
|                       |                        | &rarr;|                | GitOps Apps | 
|                       |**Kubernetes > Services** | &rarr;|               | Kubernetes Services |
|                       |**Kubernetes > Monitor** | |               | ???
|                       |**Helm Releases**        | |               | No change  |
|                       |**Helm Boards**          | |               | No change  |
|                       |**Environments**         | |               | No change |
|                       |**GitOps**               |&rarr; |               | Deprecated  |
|                       |                         | |               |            |
|**ARTIFACTS**          |                         | | No change
|                       |**Images**               | |               |  No change |
|                       |**Helm Charts**          | |               |  No change |
|                       |**Compositions**         | |               |  No change |
|                       |                         | |               |            |
|**SETTINGS**           |                         | |               |            |
|                       |**Account Settings**     |&rarr; |               |(Moved) Settings in toolbar|
|                       |**User Settings**        |&rarr; |               | Avatar     |

## GitOps to New Codefresh Experience 


### GitOps > Avatar options

{: .table .table-bordered .table-hover}
|  GITOPS             |                               | &rarr; |NEW              |             |
|  Bucket              | Menu item                     | | Bucket        |  Menu item           | 
| -------------------  | -------------------           |  | ---------------- | ---------  | 
| **AVATAR**           |                               |  |                  |            |     
|                       |Account Settings              |&rarr;  |                  | Moved to Settings  |
|                       |User Management               |&rarr;  |                  | Moved to Settings  |               
|                       |Billing                       |&rarr;  |                  | Moved to Settings  |             
|                       |User Settings                 |        |                  | No change          |
|                       |Git Personal Access Token    | &rarr; |                  |  New option              | 


### GitOps account-level options

Access account-level options through the **Settings** icon: 
* Account & user management
* Integrations
* Configurations
* Runtimes



{: .table .table-bordered .table-hover}
|  GITOPS             |                               |&rarr;  |NEW            |                      |
|  Bucket              | Menu item                     |       | Bucket        |  Menu item           | 
| -------------------  | -------------------           |       | ----------------  | -------------------    | 
| **GENERAL**          |                               |       | No change         |                          |       
|                      | **Organization Information**  |        |                  |No change                |       
|                      | **Subscription & Billing**    |        |                  |No change  |
|                      | **Users**                     | &rarr; |                  | {::nomarkdown} (Moved to) Access & Collaboration<br>(Renamed) Users & Teams{:/}|
|                      | **Usage**                     | &rarr; |                  | New                      |
|                      |                               | &rarr; |ACCESS & COLLABORATION   |                              |
|                      | **Security**                  |        |                          | (Moved to) General > Collaboration |
|                      | **Single Sign-On**            |        |                          | (Moved from) General > Collaboration|       
|                      |                               |         |                                     | Permissions  |       
|                      | ****                          |&rarr;   |                         | Audit   |    
|                      | Authentication                 |&rarr;   |                        | {::nomarkdown} (Moved from) Access & Collaboration<br>(Renamed) Git Authentication{:/}  |    
|                      |                               |        |                   |                                     |       
| **CONFIGURATION**    |                               |        | No change         |                                     |       
|                      | **Runtimes**                  | &rarr; |             |(Moved to) RUNTIMES bucket |       
|                      | **Pipeline Integrations**     | &rarr; |             | New               |       
|                      | **Integrations**              | &rarr; |             |(Renamed) GitOps Integrations|       
|                      | **Pipeline Settings**         | &rarr; |              | New               |       
|                      | **Shared Configuration**      | &rarr; |              | New               |       
|                      | **Authentication**            | &rarr;|               | {::nomarkdown} (Moved to) Access & Collaboration<br>(Renamed) Git Authentication{:/} |       

### GitOps features & functionality
We renamed menu groups and moved items for more intuitive access. 

{: .table .table-bordered .table-hover}
|  GITOPS             |                         | &rarr;|              |NEW          |    
|  Bucket              | Menu item               | |                    |            | 
| -------------------  | -------------------     |  | ----------------  | ---------  | 
|                      |  Home                   |  |                   |No change  |

| **INSIGHTS**          |                        |       | No change          |            |
|                       | DORA Metrics           |       |                    | No change  |
|                       |                        |       |                    |               |
|                       |                        |&rarr; |PIPELINES           |               |
|                       |                        |&rarr; |                    | Projects      |
|                       |                        |&rarr; |                    |Pipelines      |
|                       |                        |&rarr; |                    | Builds        |
|                       |                        |&rarr; |                    |Steps          |
|                       |                        |       |                    |               |
|                       |                        |&rarr; |OPS                 |               |
|                       |                        | &rarr;|                    | GitOps Apps    | 
|                       |                        |&rarr; |                    | Helm Boards        |
|                       |                        | &rarr;|                    | Kubernetes Services |
|                       |                        |&rarr; |                    |Helm Releases        |
|                       |                        |&rarr; |                    |Environments         |
|                       |                        |       |                    |                     |
|                       |                        |&rarr; | ARTIFACTS          |                     |
|                       |                        |&rarr; |                    | Images              |
|                       |                        |&rarr; |                    | Helm Charts         |
|                       |                        |&rarr; |                    | Compositions        |
