# How to: get the external IP of a Codefresh SAAS build

#

## Overview

Need to get the public IP of the current SAAS Build

## Details

To get the current external IP during a Codefresh SAAS build, you can run
`curl ifconfig.me` within a step in the pipeline:

    
    
    steps:  
      getIP:  
        image: curlimages/curl  
        commands:  
          - curl ifconfig.me

_**Note**_

This IP will vary between builds. Please refer to our [documentation
here](https://codefresh.io/docs/docs/administration/platform-ip-addresses/)
for the full list of Codefresh SAAS platform IP addresses.

