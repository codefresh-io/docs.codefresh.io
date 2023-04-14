# Pull request not building

#

## Overview

Pull requests don't trigger builds.

## Details

The trigger is not set up for pull requests.

  1. Open your pipeline
  2. Select Triggers
  3. Edit your Trigger
  4. Ensure the `Any Pull request event` and `Pull request synchronized` options are set
  5. Ensure that your permissions to the repository haven't changed
  6. If applicable, ensure that `Support pull request events from forks` is toggled `ON`. Please refer to this documentation page for more details & some limitations on this option: [Support for building pull requests from forks](https://codefresh.io/docs/docs/configure-ci-cd-pipeline/triggers/git-triggers/#support-for-building-pull-requests-from-forks)
  7. If using branch filters, be aware that for PR events the `BRANCH` field will match against the source branch name, and the `PULL REQUEST TARGET BRANCH` field will match against the target branch name.

If you have confirmed all the above and it is still not triggering, please
include a link to your pipeline and details of your PR in a ticket to our
team.

## Related Items

[Clone target instead of source branch on pull
request](https://support.codefresh.io/hc/en-us/articles/360015024160)

[Pull Request Comments are not triggering a
build](https://support.codefresh.io/hc/en-us/articles/360015263319)

