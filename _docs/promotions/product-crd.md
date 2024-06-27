---
title: "CRDs for GitOps deployments"
description: "Create CRDs for deployment entities such as Products, Promotion Policy, Promotion Flow, and  to track SDLC for Argo CD applications"
group: promotions
toc: true
---
## About CRDs for deployments


## Product CRD
Here's an example of the Product CRD. The table that follows describes the fields in the Product CRD. 


```yaml
apiVersion: codefresh.io/v1beta1
kind: Product
metadata:
  name: helm-guestbook #name of product
  annotation: codefresh.io/product: helm-guestbook  # annotation to be added to manifests of apps to connect to this product 
spec:
  promotionTemplateRef: gs-promotion-template  #predefined promotion template; optional if using inline template
  promotionTemplate:  # custom inline promotion template; optional if using predefined promotion template
    versionSource:
      file: version.yaml  
      jsonPath: $.appVersionInline
    promotion:
      Chart.yaml:
        jsonPaths:
          - $.appVersion
          - $.version
          - $.dependencies
      version.yaml:
        jsonPaths:
          - $.appVersionInline
      values.yaml:
        jsonPaths:
          - $..image
      requirements.yaml:
        jsonPaths:
          - "$.dependencies"
  promotionFlows:  # ochestration flow to promote product across environments; first flow that matches product is selected
    - name: to-prod
      gitTriggerSelectors:
        - key: commitMessage
          operator: In
          values:
            - "*deploy*"
    - name: demo
      gitTriggerSelectors:
        - key: commitMessage
          operator: In
          values:
            - "*[demo]"
```




{::nomarkdown}
<table class="table table-bordered table-hover">
  <tr>
    <th>Field</th>
    <th>Description</th>
    <th>Required/Optional</th>
  </tr>
  <tr>
    <td><code class="highlighter-rouge">metadata.name</code></td>
    <td>The name of the product resource, which must conform to the naming conventions for Kubernetes resources.<br>The name unifies all the applications connected to this product and is displayed in the Products dashboard.<br>For example, <code class="highlighter-rouge">helm-guestbook</code>.</td>
    <td>Optional</td>
  </tr>
  <tr>
    <td><code class="highlighter-rouge">spec.promotionTemplateRef</code></td>
    <td>The predefined Promotion Template according to which the properties in the product's applications are selected to be promoted across environments.<br>Required if <code class="highlighter-rouge">spec.promotionTemplate</code> is not defined.<br>When a predefined Promotion Template is defined, both the version of the release and the specific files and attributes to be promoted across environments are taken from the Promotion Template. </td>
    <td>Optional</td>
  </tr>
  <tr>
    <td><code class="highlighter-rouge">spec.promotionTemplate</code></td>
    <td>The custom inline Promotion Template according to which the properties in the product's applications are selected to be promoted across environments.<br>Required if <code class="highlighter-rouge">spec.promotionTemplateRef</code> is not defined.
      <ul>
        <li><code class="highlighter-rouge">.versionSource</code>: The location of the file and the attribute from which to extract the product's release version. This is the version displayed in the Products and Environments dashboards.
          <ul>
            <li><code class="highlighter-rouge">.versionSource.file</code>: The file path relative to the application's file path from which to extract the application's release version. For example, <code class="highlighter-rouge">chart.yaml</code> indicates that the release version should be extracted from this file.</li>
            <li><code class="highlighter-rouge">.versionSource.jsonPath</code>: The JSON path expression pointing to the location of the attribute containing the application version within the specified <code class="highlighter-rouge">.file</code>.<br>For example, <code class="highlighter-rouge">$.appVersion</code> indicates the value should be extracted from the field <code class="highlighter-rouge">.appVersion</code> in <code class="highlighter-rouge">chart.yaml</code></li>
          </ul>
        </li>
        <li><code class="highlighter-rouge">.promotion</code>: The top-level element defining the specific changes to be promoted to the target environment, through a single or a list of <code class="highlighter-rouge">&lt;filename&gt;:jsonPaths</code>.<br><code class="highlighter-rouge">jsonPaths</code> can define the path to single or multiple attributes within the same file.<br>If <code class="highlighter-rouge">versionSource</code> is not defined, it must include at least one file and its JSON path containing the product's release version to extract.<br>When empty, <em>all</em> changes in <em>all</em> applications connected to the Product are promoted.<br><br>Examples:<ul><li>Extract <code class="highlighter-rouge">name</code> attribute from <code class="highlighter-rouge">chart.yaml</code><br>JSON path: <code class="highlighter-rouge">$.name</code></li><li>Extract all properties of the <code class="highlighter-rouge">dependencies</code> object from <code class="highlighter-rouge">chart.yaml</code><br>JSON path: <code class="highlighter-rouge">$..dependencies.*</code></li><li>Extract the <code class="highlighter-rouge">repository</code> property from the <code class="highlighter-rouge">image</code> object in <code class="highlighter-rouge">values.yaml</code><br>JSON path: <code class="highlighter-rouge">$..image.repository</code></li>
        </ul>
      </ul>
    </td>
    <td>Optional</td>
  </tr>
  <tr>
    <td><code class="highlighter-rouge">spec.promotionFlows</code></td>
    <td>The top-level element defining one or more Promotion Flows to orchestrate the product's promotion from the trigger environment, across all the target environments to the final target environment.<br>When there is more than one Promotion Flow, the first one in the list that matches the product is executed.
      <ul>
         <li><code class="highlighter-rouge">.promotionFlows.name</code>: The name of the Promotion Flow to execute.</li>
         <li><code class="highlighter-rouge">.promotionFlows.gitTriggerSelectors</code>: The criteria or conditions to trigger the Promotion Flow, evaluated according to the payload from the application's Git repository.<br>You can have more than one <code class="highlighter-rouge">gitTriggerSelector</code> for the same Promotion Flow. In such cases, the conditions are matched according to the <code class="highlighter-rouge">key</code>, <code class="highlighter-rouge">operator</code>, and <code class="highlighter-rouge">values</code> fields.<br><ul><li><code class="highlighter-rouge">key</code>: The specific attribute from the Git payload to evaluate, and can be one of the following:<ul><li><code class="highlighter-rouge">commitMessage</code>: Trigger the Promotion Flow based on the text description associated with the commit message. The commit message is matched against the values provided. </li><li><code class="highlighter-rouge">gitRevision</code>: Trigger the Promotion Flow based on the commit hash generated by Git as a unique identifier for the commit. The commit hash is matched against the values provided.</li></ul></li><li><code class="highlighter-rouge">operator</code>: The operator to apply when matching the <code class="highlighter-rouge">key</code>, and can be one of the following:<ul><li><code class="highlighter-rouge">In</code>: Checks if the commit message or Git revision <em>includes</em> the specified value or any value within a set of values. The <code class="highlighter-rouge">In</code> operator matches values by exact match. If asterisks are used as wildcards, it can also perform partial matches.</li><li><code class="highlighter-rouge">NotIn</code>: Checks if the commit message or Git revision <em>does not include</em> the specified value or any value within a set of values. Useful for excluding resources that match any value within a predefined list.<br>The <code class="highlighter-rouge">NotIn</code> operator matches values by exact match, and by partial match when asterisks are used as wildcards.</li></ul></li><li><code class="highlighter-rouge">values</code>: Single or list of comma-separated values used to match or exclude Promotion Flows based on criteria defined by the operator. The values can be strings, numbers, or other data types depending on the context.</li></ul><br>Examples:
        <ul>
           <li>With commit message<br>
              <code class="highlighter-rouge">key: commitMessage</code> <code class="highlighter-rouge">operator: In</code> <code class="highlighter-rouge">values: - "*deploy*" - "*release*"</code><br>
              This selector checks if the <code class="highlighter-rouge">commitMessage</code> includes either "deploy" or "release" using wildcards for partial matches.
           </li>  
           <li>With Git revision (commit hash) message<br>
              <code class="highlighter-rouge">key: gitRevision</code> <code class="highlighter-rouge">operator: NotIn</code> <code class="highlighter-rouge">values: - "a1b2c3d4" - "e5f6g7h8"</code><br>
              This selector checks if the <code class="highlighter-rouge">gitRevision</code> matches exactly either "a1b2c3d4" or "e5f6g7h8".
           </li>  
       </ul>
      </ul>
    </td>
    <td>Optional</td>
  </tr>
</table>

{:/}





