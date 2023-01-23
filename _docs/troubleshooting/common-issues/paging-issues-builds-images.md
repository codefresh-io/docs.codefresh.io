---
title: "Paging issues  for builds and images"
description: "API and CLI operations for paging results do not work"
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/troubleshooting/common-issues/paging-issues-builds-images/
toc: true
---

On January 9th 2021 the API used for retrieving builds and images in Codefresh will be revamped with a new implementation
that is far more efficient than the previous one.

In summary, the paging mechanism will change and instead of being page-based it will be cursor based. The end result is a much faster implementation but also has side effects
on how you can move among results in the returned list.

## Problem description

In the old implementation you could fetch any possible page within the results and each call was completely independent from the previous one. For example you could do

1. `GET /workflow?page=5`
1. `GET /workflow?page=2`
1. `GET /workflow?page=8`

or 

1. `GET /workflow?page=1`
1. `GET /workflow?page=4`
1. `GET /workflow?page=2`

The same thing was true for both [builds](https://codefresh-io.github.io/cli/builds/get-build/){:target="_blank"} and [image listing](https://codefresh-io.github.io/cli/images/get-image/){:target="_blank"}.

This method will **NO** longer work after January 9th 2021. The reason is that with the new implementation there is a database cursor behind the scenes that
tracks the current position within the result list. You can only go back and forward to the next or previous page but never jump to an arbitrary page.

You need to check your Codefresh custom integrations that use the CLI or the [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/) to see if you have scenarios
where you are requesting pages in an out-of-order manner.

After 7th January 2021 both of the examples shown above will become **invalid operations**.

## The solution

If you have cases where your custom integration uses the Codefresh API and CLI to list images and/or builds with arbitrary page numbers you need to change them and
make them sequential. The only exception to this rule is that you can always go back to page 1 (resetting the cursor to the first position).

Getting pages in order:

1. `GET /workflow?page=1`
1. `GET /workflow?page=2`
1. `GET /workflow?page=3`
1. `GET /workflow?page=4`

Moving to the next and previous page:

1. `GET /workflow?page=1`
1. `GET /workflow?page=2`
1. `GET /workflow?page=1`
1. `GET /workflow?page=2`
1. `GET /workflow?page=3`

Going back to page 1:

1. `GET /workflow?page=1`
1. `GET /workflow?page=2`
1. `GET /workflow?page=1`
1. `GET /workflow?page=4`
1. `GET /workflow?page=1`

All of the examples shown above are valid with the new paging implementation.

## Handling concurrent API connections that list images and/or builds

By default you can have only one concurrent CLI/API connection for fetching lists of builds/images. If you use multiple connections
they will all have the same cursor, and using them all at once will yield undefined results.

To overcome this, you can use the `X-Pagination-Session-Id` header in your API calls and pass any value you see fit that makes your connection unique.

Note that if you use the [Codefresh CLI in a Codefresh pipeline]({{site.baseurl}}/docs/integrations/codefresh-api/#using-codefresh-from-within-codefresh) the session id is automatically set for you with a value of `{workflowId} + {stepsContainerId}` meaning that you can use multiple steps with the CLI in a single pipeline without any race conditions.

## Advantages of the new mechanism

Apart from increased performance, the new implementation also allows you to use negative numbers for going to the "previous" page. This is very handy for querying existing builds
while several new builds are becoming active (and thus being added to the list in real time).

This new scenario is also possible with the new implementation:

1. `GET /workflow?page=1`
1. `GET /workflow?page=2`
1. `GET /workflow?page=1`
1. `GET /workflow?page=0`
1. `GET /workflow?page=-1` (get the previous page that contains brand new builds)

The method will work in both the Codefresh API and the CLI.



## Related articles
[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)









