# How-to: Install from package.json not located in root directory

#

## Overview

You want to run npm install from a directory that is not the root directory.

## Details

**Option 1: Set the working directory**

  * In your step, change the `working_directory` setting from `${{clone_step}}` to `${{clone_step}}/subdir`

**Option 2: Change directory in step.**

  * In your step, add a command to change the directory:

    
    
    commands:   
    - cd subdir   
    - npm install

**_Note_**

This logic can be applied for anything you need to use subdirectories for.

## Related Items

[Working Directories](https://codefresh.io/docs/docs/codefresh-yaml/what-is-
the-codefresh-yaml/#working-directories)

