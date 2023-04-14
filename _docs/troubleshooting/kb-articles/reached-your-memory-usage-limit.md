# You have reached your memory usage limit

#

## Overview

You are seeing the error "You have reached your memory usage limit" at the top
of your build.

## Details

Your build has exceeded the limit of memory available to your account.

  * Note that the memory is not only the tasks you are running, but what is associated with the images you are running as well.
  * If running a parallel step, this can increase significantly. 
    * If the error occurs at a parallel step, consider splitting it into sequential steps instead.
  * If you are using particularly large Docker images, consider changing to smaller images.
  * Consider upgrading to a runtime with higher memory limits.

_Notes_ For builds on your own runner runtime, you can customize the memory
limit per pipeline under Settings -> Runtime. On our SaaS offering, the
standard limits are as follows:

  * Small: 1 GB RAM
  * Medium: 4 GB RAM
  * Large: 8 GB RAM

Custom plans are available upon request.

## Related Items

[Plans and pricing](https://codefresh.io/pricing/)

