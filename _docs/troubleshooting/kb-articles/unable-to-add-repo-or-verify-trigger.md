# Unable to add a repository to or verify trigger

#

## Overview

You are unable to add a repository to a Trigger. More specifically, you are
unable to add a webhook to your repository.

You may see the following error:

`Failed to add Trigger to GitHub`

You may also see that the trigger is created, but marked as Unverified.
Clicking on the "Verify" button again still fails to successfully verify the
trigger.

## Details

The Git context does not have permission to modify or access webhooks on the
repository.

Check the user or token used for this git integration. Ensure that it has the
appropriate access to create webhooks. Please check our [git integration
documentation](https://codefresh.io/docs/docs/integrations/git-providers/) for
additional details on which permissions are required for your specific git
provider.

