---
title: "Pipeline analytics"
description: "Get insights on pipeline performance"
toc: true
---


Enterprise view of pipeline performance

Clear breakdown of duration by 

KPIs for trends 

 Analytics are derived by comparing the selected time range to the corresponding reference period. If your time range is the last seven days, the reference period is the seven days that precede the time range.

## Filters for pipeline analytics
Filters narrow the scope of aggregated data, allowing you to focus on the information you want to see. Unless otherwise indicated, all filters support multi-selection.

{: .table .table-bordered .table-hover}
|  Filter          |  Description|  
| --------------   | --------------|  
| **Date Range** | The time frame for which to view data. The date range filter affects the other filters. In addition to the predefined date ranges, you can select a custom date range up to the last six months. |
| **Project**           | The project to which the pipeline belongs. |                            
| **Pipeline**           | The pipeline or pipelines to filter by. |                            
| **Status**           | {::nomarkdown}<ul>li><b>Error</b>: Pipelines with builds that failed due to errors. </li><li><b>Succeeded</b>: Pipelines with builds that completed successfully.</li> <li><b>Terminated</b>: Pipelines with builds terminated by the system according to the policy defined in the pipeline's settings. These can be any or all of these: <ul><li>Recent build from the same branch terminating all previous pipeline builds </li><li>Recent build from the specified branch terminating all previous builds from that branch</li><li>Running build terminating all running builds</li><li>Child builds terminated when the parent build is terminated.</li> </ul></li></ul>For details, see  {:/}|                            
| **Tags**             |The tag or tags assigned to the pipelines. |      



## Success rate
The pipelines that completed execution successfully from the total number of pipelines executed within the selected date range, percentage. 

## Pipeline duration
The average/50th-percentile /90th-percentile duration of a pipeline workflow, calculated from the total number of pipelines executed within the selected date range, unless additional filters are applied. The breakdown into phases helps identify causes or bottlenecks for longer than usual durations.  

The reference for comparison is the date range corresponding to the one selected. <br>

>TIP:  
 Each phase is color-coded for easy visualization. To show/hide phases in the chart, click the name of the phase in the legend. 
  
**Pipeline duration breakdown:**

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
From at-a-glance views of the success rate and duration, performance metrics provides more insghits drill down into performance by projects, number of executions and duration for the provides insights into trends for pipelines. 

You have the list view alongside the cloud view for the selected date range and other filters if applied. 
The list view shows up to five pipelines, headed by the pipeline with the longest duration. 
The cloud view shows all pipelines with each dot representing a pipeline. Useful to identify outliers in terms of duration and executions. 

For example, the a pipeline with more than 174 executions with a more than 2 minute duration can be a cause for concern. Clicking the dot that represents it changes the list view to show that pipeline and others with similar duration and execution metrics. 
You can then filter by the pipeline to see the duration breakdown and 







 

#### Metrics in global pipeline view

Pipeline metrics (KPIs), are displayed as line charts and in list formats. 
* Line charts
  Quick views of KPIs for the selected time frame. To see detailed day-to-day values, select a line chart.
* List formats
  Display the average values for the same KPIs, sorted by activity and duration. The different perspectives illustrate both the fluctuations in the KPIs compared to the reference time range, and trending pipelines. The reference time range is the period of time that corresponds to and precedes the selected time range. 

 > In the list view, pipelines prefixed with an icon indicates a deleted pipeline.

In addition to the pipeline name, the list view shows the following information.

{: .table .table-bordered .table-hover}
|  Metric               |  Description|  
| --------------        | --------------|  
| **Project Name**      | The project to which the pipeline belongs. |                            
| **Executions**  | The number of times that pipeline was triggered within the selected date range, with the comparison to the preceding date range in percentage.  |          
| **Avg/P-50/P-90 duration**        | The length of time for the pipeline to complete execution in mm:ss, with the comparison to the preceding date range in percentage.  The duration is in the context of the average or percentile. |    
