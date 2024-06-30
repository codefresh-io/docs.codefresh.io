



```yaml
apiVersion: csdp.codefresh.io/v1
kind: PromotionPolicy
metadata:
  name: productionDeployments
spec:
  # optional, when missing PP becomes global
  selector:
    # at least one selector should be present
    product:
      # only one key is allowed
      names: [String]
      tags: [String]
    targetEnvironment:
      # only one key is allowed
      names: [String]
      type: [String]
      tags: [String]
  # required
  policy:
    # at list one policy setting should be present
    preAction: String
    postAction: String
    action: String
  # required
  priority: Number
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
    <td>The name of the Promotion Polocy, which must conform to the naming conventions for Kubernetes resources.<br>usefule if the name indicates the purpose of this Promotion Policy - where and how it is intended to be used.<br>For example, <code class="highlighter-rouge">productionDeployments</code>.</td>
    <td>Required</td>
  </tr>
  <tr>
    <td><code class="highlighter-rouge">spec.selector</code></td>
    <td>The product or target environment to which to apply the Promotion Policy. The product or environemnt becomes significant when there are multiple or at least more than one Promotion Policies that match the same prodcut or environment. In this caase???
    See ???
      <ul>
        <li>
          <code class="highlighter-rouge">.product</code>: The Product to which to apply or match this Promotion Policy by either names or tags.<br>Required when <code class="highlighter-rouge">.targetEnvironment</code> is not defined.
          <ul>
            <li>
              <code class="highlighter-rouge">.names</code>:The name of a single product or the comma-separated names of multiple products to which to apply the Promotion Policy. 
              <br>Required if <code class="highlighter-rouge">.tags</code> are not used to match the Promotion Policy to the product. 
              <br>For example, <code class="highlighter-rouge">billing</code> or <code class="highlighter-rouge">billing, guestbook-helm, demo-trioapp</code>.
            </li>
            <li>
              <code class="highlighter-rouge">.tags</code>: The tag or tags associated with a single or multiple products to which to match the  Promotion Policy. 
              <br>Required if <code class="highlighter-rouge">.tags</code> are not used to match the Promotion Policy to the product.
              <br>For example, ?????<code class="highlighter-rouge">$.appVersion</code> 
            </li>
          </ul>
        </li>
        <li>
          <code class="highlighter-rouge">.targetEnvironment</code>: The target environments to which to apply the Promotion Policy based on the <code class="highlighter-rouge">name</code>, <code class="highlighter-rouge">type</code>, or <code class="highlighter-rouge">tag</code>. If multiple criteria is provided, all ???? logic is used to match the criteria.
          <ul>
            <li>
              <code class="highlighter-rouge">.targetEnvironment.name</code>The name of the target environment or the comma-separated names of the different target environments to which to apply the Promotion Policy.<br>If at least one name in the array does not exist, meaning that the target environment is not defined, then ?????
            </li>
            <li>
              <code class="highlighter-rouge">.targetEnvironment.type</code>The type of target environments to which to apply the Promotion Policy.<br>Can be one of these: <code class="highlighter-rouge">non-production</code> or <code class="highlighter-rouge">production</code>.
              <br>?????
            </li>
            <li>
              <code class="highlighter-rouge">.targetEnvironment.tags</code>The tag or tags associated with a single or multiple target environments to which to apply the Promotion Policy.<br>?????.
              <br>?????
            </li>
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