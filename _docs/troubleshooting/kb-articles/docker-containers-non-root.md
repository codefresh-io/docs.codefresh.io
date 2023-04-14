# How-to: Run docker containers as non root user

#

## Overview

You need to run a docker container in a freestyle step, but not as the 'root'
user.

## Details

  * Add the command `su -c 'commands here' username`, replacing username with the appropriate value, to the appropriate point in your Script.

We run all containers with the root user for the container to allow for
certain key features - including mounting the shared volume.

