



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
</table>
{:/}