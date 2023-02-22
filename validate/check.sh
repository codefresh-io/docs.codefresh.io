#!/bin/bash
BASE_URL="${BASE_URL:-http://localhost:3131}"

ERRORS=0

for path in $(grep ^/ paths_to_check.txt)
do
  url="$BASE_URL$path"
  echo -n "Checking $url ... "

  STATUS_CODE=$(curl \
      --output /dev/null \
      --silent \
      --head \
      --write-out "%{http_code}" \
      "$url")

  if (( STATUS_CODE == 200 ))
  then
    echo "$STATUS_CODE"
  else
    echo -e "\033[0;31m$STATUS_CODE !!!\033[m"
    ERRORS=$(( ERRORS + 1 ))
  fi
done

if (( ERRORS != 0 ))
then
  echo -e "\033[0;31m!!! $ERRORS Errors found when checking URLs!\033[m"
  exit 1
fi
