#!/usr/bin/env bash

START=$(date +%s)

RED='\033[0;31m'
PURPLE='\033[0;35m'
GREEN='\033[0;32m'
NC='\033[0m'

# Start script.
printf "${PURPLE}PHP CS Fixer:${NC} fix start...\n"

# Check if php-cs-fixer is installed.
if [ ! -x vendor/bin/php-cs-fixer ]; then
  printf "${PURPLE}PHP CS Fixer:${NC} ${RED}extension is not installed. Aborting!\n"
  exit
fi

# Fix all PHP files that have been added to GIT.
git status --porcelain | grep -e '^\s\?[AM]\(.*\).php$' | cut -c 3- | while read -r line; do
  printf "${PURPLE}PHP CS Fixer:${NC} fixing file ${line}... "
  PHP_CS_FIXER_IGNORE_ENV=1 vendor/bin/php-cs-fixer fix "$line" --quiet && printf "${GREEN}DONE${NC}\n" || printf "${RED}ERROR${NC}\n"
  git add "$line" >/dev/null
done

# Finish script.
printf "${PURPLE}PHP CS Fixer:${NC} fix finished after $(($(date +%s)-START)) seconds\n"
