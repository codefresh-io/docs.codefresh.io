---
title: ""
description: ""
group: getting-started
toc: true
---

## Classic to New navigation
Get up to speed with the changes in the navigation.


We added a new **Settings** icon to the toolbar to simplify account-level management by Codefresh administrators.
The Settings icon is always available, so you have _single-click access_ to account-level options and settings whenever you need.




{% include 
  image.html 
  lightbox="true" 
  file="/images/getting-started/settings-icon.png" 
  url="/images/getting-started/settings-icon.png" 
  alt="Settings icon in toolbar" 
  caption="Settings icon in toolbar"
    max-width="70%" 
%}

### Avatar options

{: .table .table-bordered .table-hover}
|  CLASSIC             |                               | &rarr; |NEW              |             |
|  Bucket              | Menu item                     | | Bucket        |  Menu item           | 
| -------------------  | -------------------           |  | ---------------- | ---------  | 
| **AVATAR**           |                               |  |                  |            |     
|                       |Account Settings              |&rarr;  |                  | Moved to Settings  |
|                       |User Management               |&rarr;  |                  | Moved to Settings  |               
|                       |Billing                       |&rarr;  |                  | Moved to Settings  |             
|                       |User Settings                 |  |                  | No change                 |
|                       |                              | &rarr; |                  | Git Personal Access Token |

### Account-level options

Access account-level options through the Settings icon: 
* Account & user management
* Integrations
* Configurations
* Runtimes



{: .table .table-bordered .table-hover}
|  CLASSIC             |                               |&rarr; |NEW           |           |
|  Bucket              | Menu item                     | |      Bucket        |  Menu item           | 
| -------------------  | -------------------           |  | ----------------  | ---------     | 
| **GENERAL**          |                               |  | No change         |                          |       
|                      | **Account Information**       | &rarr; |                   | (Renamed) Organization Information |       
|                      | **Users & Teams**             | &rarr; |                   | Now in Access & Collaboration |
|                      | **Subscription & Billing**    |  |                   | No change                |
|                      | **Usage**                     |  |                   | No change                |
|                      |                               |  |                   |                          |       
| **CONFIGURATION**    |                               |  | No change         |                          |       
|                      | **Integrations**              | &rarr; |                   |(Renamed) Pipeline Integrations |       
|                      |                               |&rarr;  |                   |(New) GitOps Integrations |       
|                      | **Pipeline Settings**         |  |                   | No change                |       
|                      | **Codefresh Runner**          |&rarr;  |                   | (Moved to Runtimes bucket |
|                      | **Runtime Environments**      | &rarr; |                   | (Moved) Runtimes bucket |
|                      | **GitOps Controller**         |  |                   |  ??                       |
|                      | **Shared Configuration**      |  |                   | No change                |
|                      | **Nodes**                     |  |                   | ??                       |
|                      |                               |  |                   |                          |       
| **SECURITY**         |                               |&rarr;  | (Renamed) ACCESS & COLLABORATION|            |       
|                      | **Single Sign-On**            |  |                   |(Now in) Access & Collaboration |       
|                      | **Permissions**               |  |                   | Now in Access & Collaboration  |       
|                      | **Audit**                     |  |                   | Now in Access & Collaboration  |       
|                      |                               |  |                   |                          |       
|                      |                               |&rarr;  | RUNTIMES    |                                |       
|                      |                               |&rarr;  |                   | (Renamed) Build Runtimes  |       
|                      |                               |&rarr;  |                   |  (New) GitOps Runtimes|       



### Features and functionality
We renamed buckets and moved items for more intuitive access. 

{: .table .table-bordered .table-hover}
|  CLASSIC             |                         | &rarr;|              |NEW          |    
|  Bucket              | Menu item               | |                    |            | 
| -------------------  | -------------------     |  | ----------------  | ---------  | 
|                       |                        | |                    |  Home      |
|                       |                        |&rarr; | INSIGHTS       |            |
|                       |                        | |               | DORA Metrics |
|                       |                        | |               |            |
|**BUILD > TEST > DEPLOY**|                      |&rarr; |PIPELINES  |          |
|                       |**Projects**            | |               | No change  |
|                       |**Pipelines**           | |               | No change  |
|                       |**Builds**              | |              | No change  |
|                       |**Steps**               | |               | No change  |
|                       |                        | |               |            |
|**DEVOPS INSIGHTS**    |                        |&rarr; |OPS            |            |
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


