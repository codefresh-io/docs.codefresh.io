# Failed to return attached pipeline contexts

#

## Overview

Initializing Process step fails with following output:

    
    
    Error: Failed to prepare variables; caused by Error: Failed to return attached pipeline contexts; caused by Error: Failed to get context <context-name> w
    ith error: 500 - {"message":"Error: Context <context-name> not found."}; caused by [object Object]  
    

## Details

This context being referenced by the pipeline has been deleted, but the
reference itself was not removed.

1) Create a dummy shared context with the same name as the missing context
from the error message.

2) This dummy context should show up in the pipeline UI. Delete it in the
workflow definition -> variables -> advanced options.

3) Delete the dummy shared context.

