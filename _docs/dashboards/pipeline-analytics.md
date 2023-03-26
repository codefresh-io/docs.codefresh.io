---
title: "Pipeline analytics"
description: "Get insights on pipeline performance"
toc: true
---


View and analyze pipeline performance, identify bottlenecks, and trends for your CI pipelines in the Pipelines dashboard.

While you can monitor individual pipelines from the Builds page, the Pipelines dashboard gives a quick overview of and visibility into cross-project pipeline performance for developers and other stakeholders.

Apart from the performance metrics such as success rate, duration, number of executions, visibility into the duration of each phase of the workflow build is an added help in identifying bottlenecks.


SCREENSHOT



## Filters for pipeline analytics
Filters narrow the scope of aggregated data, allowing you to focus on the information you want to see. Unless otherwise indicated, all filters support multi-selection.

{: .table .table-bordered .table-hover}
|  Filter          |  Description|  
| --------------   | --------------|  
| **Date Range** | The time frame for which to view data. The date range affects the other filters. In addition to the predefined date ranges, you can select a custom date range up to the last six months. |
| **Project**           | The project or projects to which the pipeline belongs. |                            
| **Pipeline**           | The pipeline or pipelines to filter by. |                            
| **Status**           | {::nomarkdown}<ul>li><b>Error</b>: Pipelines with builds that failed due to errors. </li><li><b>Succeeded</b>: Pipelines with builds that completed successfully.</li> <li><b>Terminated</b>: Pipelines with builds terminated by the system according to the policy defined in the pipeline's settings. These can be any of these: <ul><li>Recent build from the same branch terminating all previous pipeline builds </li><li>Recent build from the specified branch terminating all previous builds from that branch</li><li>Running build terminating all running builds</li><li>Child builds terminated when the parent build is terminated.</li> </ul></li></ul>For details, see  {:/}|                            
| **Tags**             |The tag or tags assigned to the pipelines. |      



## Success rate
The pipelines that completed execution successfully from the total number of pipelines executed within the selected date range, as percentage. 

## Pipeline duration
The time it takes for a pipeline workflow to complete the build, in mm:ss. It is calculated from the total number of pipelines executed within the selected date range, unless you apply additional filters. 

By giving you different perspectives of duration measures, and  present the duration is the average vs. percentile, and the breakdown into phases. 

**Duration as average or percentile**
The average duration calculation shows the duration across all the pipelines within the selected date range. This is accurate enough if the duration is more or less uniform across all the pipelines. 

For a more contextual interpretation, switch to duration by percentiles. The median and the 90th percentiles give you an accurate baseline benchmark. 

The comparison percentage is derived from the preceding date range corresponding to the one selected. <br>

**Pipeline duration breakdown:**
Every pipeline workflow can be divided into phases, some of which apply to all pipelines, while others depend on the settings of each pipeline. The initialization phase is common to all pipelines. Other phases such as pending approval to continue execution, and pending execution due to concurrency limits depends on the settings.

>TIP:  
 Each phase is color-coded for easy visualization. To show/hide phases in the chart, click the name of the phase in the legend. 
 
SCREENSHOT

* **Pending approval**  
  The average duration of pipelines pending manual approval to continue workflow execution.  

*  **Running**  
  The average duration of pipeline workflows in running state.
  
*  **Initializing**  
  The average duration of pipeline workflows in the initialization phase.  

*  **Pending concurrency policy**  
  The average duration of pipeline workflows pending execution due to the concurrency limits configured for the pipelines. Workflows with pipeline, trigger, and branch concurrency limits are included in the calculation.
  >Pipeline workflows pending execution due to concurrency policies are affected by the global account or pipeline's settings for Pending approval.
                         
*  **Delayed due to license limit**  
  The pipeline workflows pending execution due to the license limits configured for your account.  




## Pipeline performance metrics
Performance metrics provide more insights and identify trends for pipelines. 

You have the list view alongside the cloud map with pipelines for the selected date range and other filters if applied. 
* The list view shows up to five pipelines, sorted by the pipeline with the longest duration. 
* The cloud map shows all the pipelines, charted by number of executions (X-axis) versus duration (Y-axis). Every represents a pipeline. 
Identify at a glance outliers in terms of executions and duration, and correlate with the list view. 

SCREENSHOT

For example, a pipeline with more than 174 executions exceeding 2 minutes in duration can indicate cause for concern. Clicking the dot that represents it changes the list view to show that pipeline and others with similar numbers of executions and duration. 

You can then filter by the specific pipeline to view its success rate, overall, and phase-level duration.    

 

The list view shows the following information.

{: .table .table-bordered .table-hover}
|  Metric               |  Description|  
| --------------        | --------------|  
| **Pipeline Name**      | A pipeline name prefixed with this {::nomarkdown}<img src="../../../../images/icons/error.png" display=inline-block">{:/} indicates that it has been deleted. |    
| **Project Name**      | The project to which the pipeline belongs. |                            
| **Executions**  | The number of times that pipeline was triggered within the selected date range, with the comparison to the preceding date range in percentage.  |          
| **Avg/P-50/P-90 duration**        | The length of time for the pipeline to complete execution in mm:ss according to the duration measure selected in the Duration chart. The comparison percentage is to the preceding date range. |    


## Related articles
[Pipeline settings]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings) 
[Global settings for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/)  
[Monitoring pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/)