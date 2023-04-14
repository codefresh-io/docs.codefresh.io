# How-to: Check environment variable value or existence in conditionals

#

## Overview

You are trying to run a specific step only if a variable is set. You are
trying to have branching logic in one pipeline.

## Details

  1. Using the following syntax, you can check whether a variable exists for the current build:
    
          when:
        condition:
          all:
            whenVarIsMissing: 'includes("${{MyVar}}", "{{MyVar}}") == true'
    

  2. The following syntax can be used to check for a specific value:
    
          when:
        condition:
          all:
            whenVarValue: '"${{MyVar}}" == "myValue"'
    

  3. If desired, you can combine multiple checks.

## Related Items

[Conditional Execution of Steps](https://codefresh.io/docs/docs/codefresh-
yaml/conditional-execution-of-steps/)

