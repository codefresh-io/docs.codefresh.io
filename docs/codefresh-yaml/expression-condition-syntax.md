---
layout: docs
title: "Expression Condition Syntax"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/expression-condition-syntax
toc: true
---
Each step in `codefresh.yml` file can contain expression conditions that must be satisfied for the step to execute.

This is a small example of where an expression condition can be used:
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

A expression condition is a basic expression that is evaluated to true/false (to decide whether to execute or not to execute), and can have the following syntax:

### Types

{: .table .table-bordered .table-hover}
| Type    | True/False Examples                       | True/False                                                                                                                                                                     |
| ------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| String  | True: "hello"<br>False: ""                | {::nomarkdown}<ul><li>String with content = true</li><li>Empty string = false</li><li>String with contenet = true</li></ul><span class="text-muted">String comparison is lexicographic</span>.{:/}    |
| Number  | True: 5<br>True: 3.4<br>True: 1.79E+308   | {::nomarkdown}<ul><li>Any number other than 0 = true.</li><li>0 = false</li></ul>{:/}                                                                                                                                      |
| Boolean | True: true<br>False: false                | {::nomarkdown}<ul><li>True = true</li><li>False = false</li></ul>{:/}                                                                                                                                                       |
| Null    | False: null                               | Always false                                                                                                                                                                   |

### Variables
  * You can use the User Provided variables as explained in the [Variables]({{ site.baseurl }}/docs/codefresh-yaml/variables/) article.
  * Each step creates a variable based on the name of the variable. A standard variable that always exists is *main_clone*. You can then use the members of each variable.
  * To access variables that have a non-standard (i.e. only alphanumeric and _ characters) names, use the Variable() function.

### Members
Variables that are created by steps can have members. The members depend on the variable type.

{: .table .table-bordered .table-hover}
| Step Type                                                                                              | Members                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| All step types                                                                                         | {::nomarkdown}<ul><li>name</li><li>type</li><li>description</li><li>failFast</li><li>workingDirectory</li><li>environment</li></ul>{:/}                                        |
| [**Freestep**]({{ site.baseurl }}/docs/codefresh-yaml/steps/freestyle/)        | -                                                                                                                                                                              |
| [**Build**]({{ site.baseurl }}/docs/codefresh-yaml/steps/build-1/)             | {::nomarkdown}<ul><li>dockerfile</li><li>imageName</li><li>tag</li><li>buildArguments</li></ul>{:/}                                                                            |
| [**Git-clone**]({{ site.baseurl }}/docs/codefresh-yaml/steps/git-clone/)       | {::nomarkdown}<ul><li>revision</li><li>credentials</li><li>repo</li><li>imageId</li></ul>{:/}                                                                                  |
| [**Composition**]({{ site.baseurl }}/docs/codefresh-yaml/steps/composition-1/) | {::nomarkdown}<ul><li>compositionCandidates</li><li>composition</li><li>startImmediately</li><li>environmentName</li><li>assets</li><li>compositionVariables</li></ul>{:/}     |
| [**Push**]({{ site.baseurl }}/docs/codefresh-yaml/steps/push-1/)               | {::nomarkdown}<ul><li>candidate</li><li>tag</li><li>registry</li><li>credentials</li><li>imageId</li></ul>{:/}                                                                 |


* To access members that have a non-standard (i.e., only alphanumeric and _ characters) names, use the Member() function.

### Unary Operators

{: .table .table-bordered .table-hover}
| Operator   | Operation             |
| ---------- | --------------------- |
| `-`        | Negation of numbers   |
| `!`        | Logical NOT           |

### Binary Operators

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

### Comparisons

{: .table .table-bordered .table-hover}
| Operator    | Operation              |
| ----------- | ---------------------- |
| `==`        | Equal to               |
| `!=`        | Not equal to           |
| `>`         | Greater than           |
| `>=`        | Greater than or equal  |
| `<`         | Less than              |
| `<=`        | Less than or equal     |

### Functions

{: .table .table-bordered .table-hover}
| Function Name | Parameters                                                                                                                                                                                  | Return value                                                                                | Example                                                                                                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| String        | 0: number or string                                                                                                                                                                         | String of input value.                                                                      | String(40) == '40'                                                                                                                                                                                                                                                      |
| Number        | 0: number or string                                                                                                                                                                         | Number of input value.                                                                      | Number('50') == 50 <br>Number('hello') is invalid                                                                                                                                                                                                                       |
| Boolean       | 0: number or string                                                                                                                                                                         | Boolean of input value.                                                                     | Boolean('123') == true <br>Boolean('') == false <br>Boolean(583) == true <br>Boolean(0) == false                                                                                                                                                                        |
| round         | 0: number                                                                                                                                                                                   | Rounded number.                                                                             | round(1.3) == 1 <br>round(1.95) == 2                                                                                                                                                                                                                                    |
| floor         | 0: number                                                                                                                                                                                   | Number rounded to floor.                                                                    | floor(1.3) == 1<br>floor(1.95) == 1                                                                                                                                                                                                                                     |
| upper         | 0: string                                                                                                                                                                                   | String in upper case.                                                                       | upper('hello') == 'HELLO'                                                                                                                                                                                                                                               |
| lower         | 0: string                                                                                                                                                                                   | String in lower case.                                                                       | lower('BYE BYE') == 'bye bye'                                                                                                                                                                                                                                           |
| trim          | 0: string                                                                                                                                                                                   | Trimmed string.                                                                             | trim(" abc ") == "abc"                                                                                                                                                                                                                                                  |
| trimLeft      | 0: string                                                                                                                                                                                   | Left-trimmed string.                                                                        | trimLeft("   abc   ") == "abc   "                                                                                                                                                                                                                                       |
| trimRight     | 0: string                                                                                                                                                                                   | Right-trimmed string.                                                                       | trimRight("   abc   ") == "   abc"                                                                                                                                                                                                                                      |
| replace       | 0: string - main string <br>1: string - substring to find <br>2: string - substring to replace                                                                                              | Replace all instances of the sub-string (1) in the main string (0) with the sub-string (2). | replace('hello there', 'e', 'a') == 'hallo thara'                                                                                                                                                                                                                       |
| substring     | 0: string - main string <br>1: string - index to start <br>2: string - index to end                                                                                                         | Returns a sub-string of a string.                                                           | substring("hello world", 6, 11) == "world"                                                                                                                                                                                                                              |
| length        | string                                                                                                                                                                                      | Length of a string.                                                                         | length("gump") == 4                                                                                                                                                                                                                                                     |
| includes      | 0: string - main string<br>1: string - string to search for                                                                                                                                 | Whether a search string is located within the main string.                                  | includes("codefresh", "odef") == true                                                                                                                                                                                                                                   |
| indexOf       | 0: string - main string<br>1: string - string to search for                                                                                                                                 | Index of a search string if it is found inside the main string                              | indexOf("codefresh", "odef") == 1                                                                                                                                                                                                                                       |
| match         | 0: string - main string<br>1: string - regular expression string, [JS style](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)<br>2: boolean - ignore case | Search for a regular expression inside a string, ignoring or not ignoring case              | match("hello there you", "..ll.", false) == true <br> match("hello there you", "..LL.", false) == false <br> match("hello there you", "hell$", true) == false <br> match("hello there you", "^hell", true) == true <br> match("hello there you", "bye", false) == false |
| Variable      | string                                                                                                                                                                                      | Search for the value of a variable                                                          | Variable('some-clone')                                                                                                                                                                                                                                                  |
| Member        | 0: string - variable name<br>1: string - member name                                                                                                                                        | Search for the value of a variable member                                                   | Member('some-clone', 'working-directory')                                                                                                                                                                                                                               |
