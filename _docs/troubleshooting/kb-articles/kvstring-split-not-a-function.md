# Error: kvString.split is not a function

#

## Overview

Pipeline fails with following error:

    
    
    Message             Failed to prepare composition: services                                                                                                                                                               
    Caused by           kvString.split is not a function
    
    
    
                                                                                                                                                                
    

## Details

Environment variables are defined as `<KEY>: <VALUE>`

Instead, define environment variables as follows: `<KEY>=<VALUE>` An example
follows:

    
    
    services:
      composition:
        test_db:
          image: 'mysql:5.6.45'
          environment:
            - MYSQL_ROOT_PASSWORD=admin
    

## Related Items

[Service Containers](https://codefresh.io/docs/docs/codefresh-yaml/service-
containers/)

