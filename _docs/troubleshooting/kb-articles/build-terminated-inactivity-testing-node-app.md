# Build terminated because of prolonged inactivity while testing a Node app
with Jest

#

## Overview

Build terminated because of prolonged inactivity while running step with Jest
tests.

## Details

When none of the steps produce logs for a long time (45 minutes by default),
the build terminates as inactive. The most common reason for this when using
Jest framework — unfinished async operations in your app.

Closer look to the test logs will show the following:

    
    
    <...>  
    Ran all test suites.  
     **Jest did not exit one second after the test run has completed.**  
     **This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.**  
      
     Trying to terminate step execution  
    <...>

Jest indicates that the process was not completed because some async
operations are still running in your app even when tests are finished. The
possible roots can be: unhandled promise rejections caused to hang sockets,
opened connection to DB if not closed on tests finish, etc.

By default, Jest waits for any operations to be finished before exiting, which
can hang the process for an unpredicted amount of time.

### Solution

**Quick workaround**

A quick workaround (which is not recommended for daily usage) would be to run
tests with [`--forceExit` flag](https://jestjs.io/docs/cli#--forceexit), which
says to Jest to ignore open handles and exit process as soon as tests are
finished.

**Solution**

Please debug and fix the app locally with [`--detectOpenHandles`
flag](https://jestjs.io/docs/cli#--detectopenhandles) to find out which
operations keeps Jest from exiting.

