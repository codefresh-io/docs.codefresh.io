# Safari: Login Loop

#

## Overview

When using the Safari browser, you can get into a login loop after being
logged out.

## Details

You will need to delete the local storage for
[g.codefresh.io](https://g.codefresh.io/). Unfortunately, Preferences >
Privacy > Manage Website Data does not delete the local storage. There are two
ways to do this.

### Via Safari

  1. Visit [g.codefresh.io](https://g.codefresh.io/)
  2. Use the keyboard shortcut command + option + C
    1. Develop menu > Show JavaScript Console
  3. Select Storage Tab 
  4. On the left, open Local Storage
  5. Select [g.codefresh.io](https://g.codefresh.io/)
  6. Select the trash icon on the top right 
  7. Refresh [g.codefresh.io](https://g.codefresh.io/) and try logging back in

### Via Finder

  1. Open Finder 
  2. Use the keyboard shortcut shift + command + G
    1. Go Menu > Go to Folder
  3. Enter in `~/Library/Safari/LocalStorage`
  4. Delete all the files that started with `https_g.codefresh.io`
  5. Refresh [g.codefresh.io](https://g.codefresh.io/) and try logging back in

