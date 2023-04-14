# How-To: Know which builder pod was used for running a build

#

## Overview

By default codefresh on-premises uses codefresh builders to run your builds.
In case you configured more than one builder, you might need to know on which
builder pod specific build was run on for debug purposes for example in case
of networking issues in your k8s cluster

## Details

One of the ways you can use for this purpose is to output the builder pod name
to the build logs so it can be easily found there in future.  
You just need to add `echo $CF_HOST_NAME` to the commands list of one of the
freestyle steps in the pipeline for which you need to track the builder name
it runs on.

