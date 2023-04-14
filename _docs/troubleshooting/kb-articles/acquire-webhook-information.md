# How To: Acquire webhook information after a git trigger has been created

#

## Overview

Currently, there is no way to gather this information via the Codefresh Web
Interface. This information can be acquired via the CLI / API call to get the
pipeline spec.

## Details

  1. `codefresh get pipeline Project/Pipeline -o yaml`
  2. Under spec.triggers you can see the information about each git trigger.
  3. Information you will need is the **endpoint** and **secret** fields

