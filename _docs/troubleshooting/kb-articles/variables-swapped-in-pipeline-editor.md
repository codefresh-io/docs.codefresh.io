# Variables swapped while in pipeline editor

#

## Overview

Variable names and values get copied over each other or swapped around while
editing a pipeline.

## Details

LastPass has been seen to cause this behavior when it incorrectly triggers
automatic form filling based on entries for pipeline variables inside a
LastPass database.

  * Remove LastPass database entries related to pipeline variables.

  * Consider deny listing LastPass from interacting with the Codefresh app (see below)

## Related Items

LastPass' Article on [Disabling LastPass for Specific
Sites](https://support.logmeininc.com/lastpass/help/disable-lastpass-for-
specific-sites-lp040006) has a guide on adding a Never URL that can be used to
deny list LastPass from interacting with the Codefresh app.  
  
  
  

