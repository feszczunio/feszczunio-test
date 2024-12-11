#!/bin/bash sh

START=$(date +%s)

RED='\033[0;31m'
PURPLE='\033[0;35m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

# Start script.
printf "${PURPLE}Statik Builder:${NC} starting build...\n"

# Check if required parameters exists.
if [ -z "$1" ]; then
  printf"${PURPLE}Statik Builder: ${RED}missing version parameter. Aborting!${NC}\n"
  exit
fi

if [ -z "$2" ]; then
  printf "${PURPLE}Statik Builder: ${YELLOW}missing destination directory parameter. Continuing without production directory...${NC}\n"
elif [ ! -d "$2" ]; then
  printf "${PURPLE}Statik Builder: ${RED}$2 is not a valid directory. Aborting!${NC}\n"
  exit
fi

# Check OS for sed option.
if [[ "$OSTYPE" == "darwin"* ]]; then
  SED="gsed" # brew install gnu-sed
else
  SED="sed"
fi

# STEP 1. Reinstall composer vendors.
printf "${PURPLE}Statik Builder:${NC} (1/8) reinstalling composer vendors... "
rm -rf vendor >/dev/null
rm -rf production/** >/dev/null
composer install || {
  printf "${RED}ERROR${NC}\n"
  exit 1
}
printf "${GREEN}DONE${NC}\n"

# STEP 2. Clear production directory.
printf "${PURPLE}Statik Builder:${NC} (2/8) clearing production directory... "
if [ -z "$2" ]; then
  printf "${YELLOW}SKIPPED${NC}\n"
else
  rm -rf "${2:?}/**" >/dev/null
  printf "${GREEN}DONE${NC}\n"
fi

# STEP 3. Run NPM install to make sure that GULP tasks can run.
printf "${PURPLE}Statik Builder:${NC} (3/8) running 'npm install' if needed... "
if [ "$(npm list | grep -c gulp)" -eq 0 ]; then
  npm ci >/dev/null || {
    printf "${RED}ERROR${NC}\n"
    exit 1
  }
fi
printf "${GREEN}DONE${NC}\n"

# STEP 4. Compile SCSS and JS files.
printf "${PURPLE}Statik Builder:${NC} (4/8) compiling SCSS and JS files... "
gulp >/dev/null || {
  printf "${RED}ERROR${NC}\n"
  exit 1
}
printf "${GREEN}DONE${NC}\n"

# STEP 5. Copy all required files to temporary production directory.
printf "${PURPLE}Statik Builder:${NC} (5/8) copying all required files to temporary production directory... "
rsync -va --exclude 'vendor' --exclude 'scripts' --exclude 'tests' --exclude 'node_modules' --exclude 'production' --delete-after -- ** production >/dev/null || {
  printf "${RED}ERROR${NC}\n"
  exit 1
}
printf "${GREEN}DONE${NC}\n"

# STEP 6. Update the package version.
printf "${PURPLE}Statik Builder:${NC} (6/8) updating package version... "
grep -rl "VERSION = '0.1.0'" production | xargs "${SED[@]}" -i.bak "s#0.1.0#${1}#g"
grep -rl "Version:     0.1.0" production | xargs "${SED[@]}" -i.bak "s#0.1.0#${1}#g"
printf "${GREEN}DONE${NC}\n"

# STEP 7. Clean up temporary production directory.
printf "${PURPLE}Statik Builder:${NC} (7/8) cleaning up the temporary production directory... "
rm -rf production/package* production/*.js production/*.xml production/.gitignore production/.php-cs-fixer.php production/.github
find production/assets/javascripts -iname '*.js' ! -iname '*.min.js' -exec rm -rf {} +
find production/assets/stylesheets -iname '*.css' ! -iname '*.min.css' -exec rm -rf {} +
find production/assets/stylesheets -iname '*.scss' -exec rm -rf {} +
printf "${GREEN}DONE${NC}\n"

# STEP 8. Copy files to production directory.
printf "${PURPLE}Statik Builder:${NC} (8/8) copying files to production directory... "
if [ ! -d "$2" ]; then
  printf "${YELLOW}SKIPPED${NC}\n"
else
  rm -rf "${2:?}/**"
  rsync -va --delete-after production/** "$2" >/dev/null || {
    printf "${RED}ERROR${NC}\n"
    exit 1
  }
  rm -rf production >/dev/null
  printf "${GREEN}DONE${NC}\n"
fi

# Finish script.
printf "${PURPLE}Statik Builder:${NC} build finished after $(($(date +%s) - START)) seconds\n"
