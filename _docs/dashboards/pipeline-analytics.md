---
title: "Pipeline analytics"
description: "Get insights on pipeline performance"
toc: true
---


View and analyze pipeline performance, identify bottlenecks, and trends for your CI pipelines in the Pipelines dashboard.  
The dashboard displays aggregated pipeline data, updated at 30-minute intervals. All stakeholders can get quick visibility into cross-project pipeline metrics.

Use the Pipelines dashboard to:
1. Identify performance issues in pipelines, both in terms of number of executions and execution duration
2. Identify spikes in specific pipelines
3. Focus on the performance of a specific pipeline, or pipelines in a specific project
4. Validate improvements by comparing current metrics to those in the reference time period
5. Ensure that you are meeting defined SLAs


{% include image.html
  lightbox="true"
  file="/images/pipeline/dashboard/pipeline-dashboard.png"
  url="/images/pipeline/dashboard/pipeline-dashboard.png"
  alt="Pipelines dashboard"
  caption="Pipelines dashboard"
  max-width="60%"
    %} 




## Filters for pipeline analytics
Filters narrow the scope of aggregated data, allowing you to focus on the information you want to see. Unless otherwise indicated, all filters support multi-selection.

{: .table .table-bordered .table-hover}
|  Filter          |  Description|  
| --------------   | --------------|  
| **Date Range** | The time frame for which to view data. The date range affects the other filters. In addition to the predefined date ranges, you can select a custom date range up to the last six months. <br>If you select Today, then the Success Rate and Duration charts reflect hourly granularity.<br><br>Every date range you select has a reference period corresponding to the same period of time preceding the selected date range. The reference period is used to derive comparisons for trends.|
| **Project**           | The project or projects to which the pipeline belongs. Selecting a project allows you to focus on performance of pipelines assigned to it.|                            
| **Pipeline**           | The pipeline or pipelines to filter by. |                            
| **Status**           | {::nomarkdown}<ul><li><b>Error</b>: Pipelines with builds that failed due to errors in the pipeline specifications or steps that failed. </li><li><b>Succeeded</b>: Pipelines with builds that completed successfully.</li> <li><b>Terminated</b>: Pipelines with builds terminated by the system according to the policy defined in the pipeline's settings. These can be any of these: <ul><li>Recent build from the same branch terminating all previous pipeline builds </li><li>Recent build from the specified branch terminating all previous builds from that branch</li><li>Running build terminating all running builds</li><li>Child builds terminated when the parent build is terminated.</li> </ul></li>For details, see <a href ="https://codefresh.io/docs/docs/pipelines/pipelines/#policies">Build Termination in Pipeline Policies</a>. </ul>{:/}|                            
| **Tags**             |The tag or tags assigned to the pipelines. |      



## Success rate
The pipelines that completed execution successfully, from the total number of pipelines executed within the selected date range, as percentage. 
> TIP:  
  Pipelines in Pending status are excluded from the Success Rate calculations.



## Pipeline duration
The time it takes for a pipeline workflow to complete the build, calculated from the total number of pipelines executed within the selected date range, unless you apply additional filters. 
You can switch between average (the default), and percentile views. 

**Duration as average or percentile**  
The average duration calculation shows the duration across all the pipelines within the selected date range. 
To better understand the performance over time, switch to duration by the median (P-50) or the 90th (P-90) percentiles. 

The comparison percentage is derived from the reference time period. The reference period corresponds to the same length of time that  preceding the date range selected. <br>

**Pipeline duration breakdown**  
Every pipeline workflow can be divided into phases, some of which apply to all pipelines, while others depend on the settings configured for each pipeline. The initialization phase is common to all pipelines. Other phases such as pending approval to continue execution, and pending execution due to concurrency limits depends on the settings.

>TIP:  
 Each phase is color-coded for easy visualization. To show/hide phases in the chart, click the name of the phase in the legend. 
 
{% include image.html
  lightbox="true"
  file="/images/pipeline/dashboard/duration-all-stages-versus-selected.png"
  url="/images/pipeline/dashboard/duration-all-stages-versus-selected.png"
  alt="Pipeline duration with all phases displayed versus selected only"
  caption="Pipeline duration with all phases displayed versus selected only"
  max-width="60%"
    %} 

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
Performance metrics for individual pipelines for the current and preceding time frames provide more insights and identify trends for pipelines. 

* The list view shows pipelines sorted by average workflow build duration (default sort). 
* The scatter chart shows all the pipelines, charted by number of executions (X-axis) versus duration (Y-axis). Every dot represents a pipeline. 

The list view shows the following information.

{: .table .table-bordered .table-hover}
|  Metric               |  Description|  
| --------------        | --------------|  
| **Pipeline Name**      | A pipeline name prefixed with this {::nomarkdown}<img src="../../../../images/icons/error.png" display=inline-block">{:/} icon indicates that it has been deleted. |    
| **Project Name**      | The project to which the pipeline belongs. |                            
| **Executions**  | The number of times that pipeline was triggered within the selected date range, with the comparison to the preceding date range in percentage.  |          
| **Duration (Avg/P-50/P-90)**        | The length of time for the pipeline to complete execution according to the duration measure selected in the Duration chart. The comparison percentage is to the preceding date range. |  



**Correlate scatter chart with list view**  

Identify outliers in terms of executions and duration in the scatter chart map, and correlate with the list view. For example, a pipeline with more than 174 executions, that always exceeds 2 minutes in duration, can indicate potential for improvements.

* Clicking the dot that represents that pipeline in the scatter chart, changes the list view to show that and other pipelines with similar number of executions and duration.
* Clicking a row in the metrics table highlights the dot in the scatter chart that corresponds to that pipeline.

{% include image.html
  lightbox="true"
  file="/images/pipeline/dashboard/pipeline-performance-correlation.png"
  url="/images/pipeline/dashboard/pipeline-performance-correlation.png"
  alt="Pipeline correlation in Metrics table with scatter chart"
  caption="Pipeline correlation in Metrics table with scatter chart"
  max-width="60%"
    %} 

You can then filter by the specific pipeline or pipelines and analyze success rate, overall, and phase-level duration.    

 
  


## Related articles
[Pipeline settings]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings)  
[Global settings for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/)  
[Monitoring pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/)