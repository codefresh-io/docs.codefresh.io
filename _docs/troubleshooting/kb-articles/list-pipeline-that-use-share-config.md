# CLI: How to list all pipelines that use a specific shared configuration

#

## Overview

Using the CLI to get all Pipelines that is using a shared configuration

## Details

Use the query below:

    
    
    codefresh get pip --limit 1000  -o json | jq '.[] | select(contains({"spec":{"contexts":["<CONTEXT_NAME>"]}}) )  | {PipelineName:.metadata.name}' | jq -r '.[]'
    

