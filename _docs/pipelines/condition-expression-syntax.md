---
title: "Condition Expression Syntax"
description: "Condition expressions can be included in each step in your codefresh.yml, and must be satisfied for the step to execute."
group: codefresh-yaml
redirect_from:
  - /docs/condition-expression-syntax/
  - /docs/codefresh-yaml/expression-condition-syntax/
toc: true
---
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

A condition expression is a basic expression that is evaluated to true/false (to decide whether to execute or not to execute), and can have the following syntax:

### Types

{: .table .table-bordered .table-hover}
| Type    | True/False Examples                       | True/False  |
| ------- | ----------------------------------------- | --------------|
| String  | True: "hello"<br>False: ""                | {::nomarkdown}<ul><li>String with content = true</li><li>Empty string = false</li><li>String with content = true</li></ul><span class="text-muted">String comparison is lexicographic</span>.{:/}    |
| Number  | True: 5<br>True: 3.4<br>True: 1.79E+308   | {::nomarkdown}<ul><li>Any number other than 0 = true.</li><li>0 = false</li></ul>{:/} |
| Boolean | True: true<br>False: false                | {::nomarkdown}<ul><li>True = true</li><li>False = false</li></ul>{:/}   |
| Null    | False: null                               | Always false  |

### Variables

You can use the User Provided variables as explained in [Variables]({{site.baseurl}}/docs/pipelines/variables/), including the [variables
exposed by each individual pipeline step]({{site.baseurl}}/docs/pipelines/variables/#step-variables).

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
| indexOf       | 0: string - main string<br>1: string - string to search for                                                                                                                                                                                                                                                                  | Index of a search string if it is found inside the main string                              | `indexOf("codefresh", "odef") == 1`                                                                                                                                                                                                                                       |
| match         | 0: string - main string<br>1: string - regular expression string, [JS style](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) (Note: in JS strings, the backslash `\` is an escape character so in order to use a literal backslash, you need to escape it. For example: `"^\\d+$"` instead of `"^\d+$"`)<br>2: boolean - ignore case | Search for a regular expression inside a string, ignoring or not ignoring case              | `match("hello there you", "..ll.", false) == true` <br> `match("hello there you", "..LL.", false) == false` <br> `match("hello there you", "hell$", true) == false` <br> `match("hello there you", "^hell", true) == true` <br> `match("hello there you", "bye", false) == false` |
| Variable      | string                                                                                                                                                                                                                                                                                                                                                                   | Search for the value of a variable                                                          | `Variable('some-clone')`                                                                                                                                                                                                                                                  |
| Member        | 0: string - variable name<br>1: string - member name                                                                                                                                                                                                                                                                                                                     | Search for the value of a variable member                                                   | `Member('some-clone', 'working-directory')`                                                                                                                                                                                                                               |

## What to read next

* [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/)
* [Condition Expression Syntax]({{site.baseurl}}/docs/codefresh-yaml/condition-expression-syntax/)
* [Working Directories]({{site.baseurl}}/docs/codefresh-yaml/working-directories/)
* [Annotations]({{site.baseurl}}/docs/codefresh-yaml/annotations/)
* [Pipeline/Step hooks]({{site.baseurl}}/docs/codefresh-yaml/hooks/)
