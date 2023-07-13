---
title: "Conditional execution of steps"
description: "Skip specific pipeline steps according to one or more conditions"
group: pipelines
redirect_from:
  - /docs/codefresh-yaml/conditional-execution-of-steps/
  - /docs/codefresh-yaml/condition-expression-syntax/
  - /docs/conditional-execution-of-steps/

toc: true
---
For each step in a `codefresh.yml` file, you can define a set of conditions which need to be satisfied in order to execute the step. For details on the `codefresh.yml` file, see [Pipeline definitions YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/).)

There are currently two main methods to define conditions:   
* Branch conditions
* Expression conditions
 
## Branch Conditions

Usually, you'll want to define a branch condition, be it of the type ```ignore``` for blacklisting a set of branches or of the type ```only``` for allowlisting a set of branches. Each branch specification can either be an exact branch name, e.g. ```master```, or a regular expression, e.g. ```/hotfix$/```. Case insensitive regexps (```/^FB-/i```) are also supported.

Here are some examples:

Only execute for the ```master``` branch:
  
  `only-master-branch.yml`
{% highlight yaml %}
build-step:
  description: Building the image.
  type: build
  dockerfile: Dockerfile
  image-name: someRepo/someUser
  when:
    branch:
      only:
        - master
{% endhighlight %}

Only execute for branches whose name begins with ```FB-``` prefix (feature branches):

  `only-feature-branches.yml`
{% highlight yaml %}
build-step:
  description: Building the image.
  type: build
  dockerfile: Dockerfile
  image-name: someRepo/someUser
  when:
    branch:
      only:
        - /^FB-.*/i
{% endhighlight %}

Ignore the develop branch and master branch:

  `ignore-master-and-develop-branch.yml`
{% highlight yaml %}
build-step:
  description: Building the image.
  type: build
  dockerfile: Dockerfile
  image-name: someRepo/someUser
  when:
    branch:
      ignore:
        - master
        - develop
{% endhighlight %}


>We use [JavaScript regular expressions](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions){:target="\_blank"} for the syntax in branch conditions.


## Condition expressions

Alternatively, you can use more advanced condition expressions.

This follows the standard [condition expression  syntax](#condition-expression-syntax). In this case, you can choose to execute if ```all``` expression conditions evaluate to ```true```, or to execute if ```any``` expression conditions evaluate to ```true```.

> Note: Use "" around variables with text to avoid errors in processing the conditions. Example: "${{CF_COMMIT_MESSAGE}}"

Here are some examples. Execute if the string ```[skip ci]``` is not part of the main repository commit message AND if the branch is ```master```

  `all-conditions.yml`
{% highlight yaml %}
build-step:
  description: Building the image.
  type: build
  dockerfile: Dockerfile
  image-name: someRepo/someUser
  when:
    condition:
      all:
        noSkipCiInCommitMessage: 'includes(lower({% raw %}"${{CF_COMMIT_MESSAGE}}"{% endraw %}), "skip ci") == false'
        masterBranch: '{% raw %}"${{CF_BRANCH}}{% endraw %}" == "master"'
{% endhighlight %}

Execute if the string ```[skip ci]``` is not part of the main repository commit message, OR if the branch is not a feature branch (i.e. name starts with FB-)

  `any-condition.yml`
{% highlight yaml %}
build-step:
  description: Building the image.
  type: build
  dockerfile: Dockerfile
  image-name: someRepo/someUser
  when:
    condition:
      any:
        noSkipCiInCommitMessage: 'includes(lower({% raw %}"${{CF_COMMIT_MESSAGE}}"{% endraw %}), "skip ci") == false'
        notFeatureBranch: 'match({% raw %}"${{CF_BRANCH}}"{% endraw %}, "^FB-", true) == false'
{% endhighlight %}

Each step in `codefresh.yml` file can contain conditions expressions that must be satisfied for the step to execute.

This is a small example of where a condition expression  can be used:
  `YAML`
{% highlight yaml %}
step-name:
  description: Step description
  image: image/id
  commands:
    - bash-command1
    - bash-command2
  when:
    condition:
      all:
        executeForMasterBranch: "{% raw %}'${{CF_BRANCH}}{% endraw %}' == 'master'"
{% endhighlight %}

### Condition expression syntax
A condition expression is a basic expression that is evaluated to true/false (to decide whether to execute or not to execute), and can have the following syntax:

#### Types

{: .table .table-bordered .table-hover}
| Type    | True/False Examples                       | True/False  |
| ------- | ----------------------------------------- | --------------|
| String  | True: "hello"<br>False: ""                | {::nomarkdown}<ul><li>String with content = true</li><li>Empty string = false</li><li>String with content = true</li></ul><span class="text-muted">String comparison is lexicographic</span>.{:/}    |
| Number  | True: 5<br>True: 3.4<br>True: 1.79E+308   | {::nomarkdown}<ul><li>Any number other than 0 = true.</li><li>0 = false</li></ul>{:/} |
| Boolean | True: true<br>False: false                | {::nomarkdown}<ul><li>True = true</li><li>False = false</li></ul>{:/}   |
| Null    | False: null                               | Always false  |

#### Variables

You can use the user-defined variables, including the variables exposed by each individual pipeline step. See [Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/).

#### Unary Operators

{: .table .table-bordered .table-hover}
| Operator   | Operation             |
| ---------- | --------------------- |
| `-`        | Negation of numbers   |
| `!`        | Logical NOT           |

#### Binary Operators

{: .table .table-bordered .table-hover}
| Operator                    | Operation   |
| --------------------------- | ----------- |
| Add, String Concatenation   | `+`         |
| Subtract                    | `-`         |
| Multiply                    | `*`         |
| Divide                      | `/`         |
| Modulus                     | `%`         |
| Logical AND                 | `&&`        |
| Logical OR                  | `||`        |

#### Comparisons

{: .table .table-bordered .table-hover}
| Operator    | Operation              |
| ----------- | ---------------------- |
| `==`        | Equal to               |
| `!=`        | Not equal to           |
| `>`         | Greater than           |
| `>=`        | Greater than or equal  |
| `<`         | Less than              |
| `<=`        | Less than or equal     |

#### Functions

{: .table .table-bordered .table-hover}
| Function Name | Parameters         | Return value   | Example                 |
| ------------- | ------------------ | -------------- | ----------------------- |
| String        | 0: number or string | String of input value. | `String(40) == '40'` |
| Number        | 0: number or string | Number of input value.  | `Number('50') == 50` <br>`Number('hello')` is invalid |
| Boolean       | 0: number or string  | Boolean of input value. | `Boolean('123') == true` <br>`Boolean('') == false` <br>`Boolean(583) == true` <br>`Boolean(0) == false`  |
| round         | 0: number  | Rounded number.   | `round(1.3) == 1` <br>`round(1.95) == 2` |
| floor         | 0: number | Number rounded to floor.  | `floor(1.3) == 1`<br>`floor(1.95) == 1`   |
| upper         | 0: string   | String in upper case.  | `upper('hello') == 'HELLO'` |
| lower         | 0: string  | String in lower case.   | `lower('BYE BYE') == 'bye bye'` |
| trim          | 0: string  | Trimmed string.         | `trim(" abc ") == "abc"`  |
| trimLeft      | 0: string  | Left-trimmed string.     | `trimLeft("   abc   ") == "abc   "`|
| trimRight     | 0: string | Right-trimmed string.     | `trimRight("   abc   ") == "   abc"`  |
| replace       | 0: string - main string <br>1: string - substring to find <br>2: string - substring to replace | Replace all instances of the sub-string (1) in the main string (0) with the sub-string (2). | `replace('hello there', 'e', 'a') == 'hallo thara'`|
| substring     | 0: string - main string <br>1: string - index to start <br>2: string - index to end  | Returns a sub-string of a string. | `substring("hello world", 6, 11) == "world"`  |
| length        | string | Length of a string. | `length("gump") == 4` |
| includes      | 0: string - main string<br>1: string - string to search for  | Whether a search string is located within the main string.   | `includes("codefresh", "odef") == true`  |
| indexOf       | 0: string - main string<br>1: string - string to search for | Index of a search string if it is found inside the main string   | `indexOf("codefresh", "odef") == 1` |
| match         | 0: string - main string<br>1: string - regular expression string, [JS style](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) (Note: in JS strings, the backslash `\` is an escape character so in order to use a literal backslash, you need to escape it. For example: `"^\\d+$"` instead of `"^\d+$"`)<br>2: boolean - ignore case | Search for a regular expression inside a string, ignoring or not ignoring case              | `match("hello there you", "..ll.", false) == true` <br> `match("hello there you", "..LL.", false) == false` <br> `match("hello there you", "hell$", true) == false` <br> `match("hello there you", "^hell", true) == true` <br> `match("hello there you", "bye", false) == false` |
| Variable      | string   | Search for the value of a variable             | `Variable('some-clone')`  |
| Member        | 0: string - variable name<br>1: string - member name  | Search for the value of a variable member | `Member('some-clone', 'working-directory')` |

## Execute steps according to the presence of a variable

If a variable does not exist in a Codefresh pipeline, then it will simply stay as a string inside the definition. When the `{% raw %}${{MY_VAR}}{% endraw %}` variable is not available, the engine will literally print `{% raw %}${{MY_VAR}}{% endraw %}`, because that variable doesn't exist.  

You can use this mechanism to decide which steps will be executed if a [variable]({{site.baseurl}}/docs/pipelines/variables/) exists or not.



`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  step1:
    title: "Running if variable exists"
    type: "freestyle" 
    image: "alpine:3.9" 
    commands:
      - echo "Step 1 is running"
    when:
      condition:
        all:
          whenVarExists: 'includes("${{MY_VAR}}", "{{MY_VAR}}") == false'
  step2:
    title: "Running if variable does not exist"
    type: "freestyle" 
    image: "alpine:3.9" 
    commands:
      - echo "Step 2 is running"
    when:
      condition:
        all:
          whenVarIsMissing: 'includes("${{MY_VAR}}", "{{MY_VAR}}") == true'
{% endraw %}
{% endhighlight %}

Try running the pipeline above and see how it behaves when a variable called `MY_VAR` exists (or doesn't exist).

>Notice that if you use this pattern a lot it means that you are trying to create a complex pipeline that is very smart. We suggest you create instead multiple [simple pipelines for the same project]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/#trunk-based-development).


## Single step dependencies
When [parallel execution]({{site.baseurl}}/docs/docs/pipelines/advanced-workflows/#parallel-pipeline-execution) is enabled, the `when:` conditional can be used to set up step dependencies using the `steps:` and `on:` keywords. For more information, [check the parallel pipeline execution page]({{site.baseurl}}/docs/docs/pipelines/advanced-workflows/#parallel-pipeline-execution). 

## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)   
[Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/)  
[Pull Requests and Branches]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/)  
[Hooks in pipelines]({{site.baseurl}}/docs/pipelines/hooks/)
