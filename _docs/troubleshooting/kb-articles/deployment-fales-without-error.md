# Deployment fails without error message

#

## Overview

A deploy step is failing, without providing an error message.

## Details

The standard deploy step has a timeout of 120 seconds.

  * In the deploy step, add the following attribute: `timeout: X`, where X is a more suitable time.

An example follows:

    
    
     step_name:
       title: deploying to cluster
       type: deploy
       kind: kubernetes 
       cluster:  --my-cluster-name--
       namespace: default
    
       # In seconds (default is 120)
       timeout: '500'
    

**_Note_** If this does not resolve your issue, please include a link to a
build showing the error and open a ticket.

