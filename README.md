NASA Space apps 2014: SpaceT Challenge, Team Insight
====================================================
[Spaceapps Challenge Project Insight](https://2014.spaceappschallenge.org/project/insight-/)

Setup
=====

Install your JS dependencies with Node:

    $ npm install

Install your front-end libraries with Grunt/Bower:

	$ npm install -g bower

    $ bower install

    $ npm install -g grunt-cli

    $ grunt

Make python virtual environment

0. Ensure you have both python and pip installed.
1. `pip install virtualenv`.
2. `pip install virtualenvwrapper` and [setup required variables](http://virtualenvwrapper.readthedocs.org/en/latest/install.html).
3. go to the project directory.
4. `mkvirtualenv spacet -a (project-directory) -r ./requirements.txt`. (You can use `pip install -r ./requirements.txt` to install the project requirements at any time).
5. Use `workon spacet` at any time to get back into the virtual environment.

Start the app

    $ python manage.py runserver 8000

Navigate to the website

    It's located at `http://localhost:8000/`

Requirements
============

* python 2.7
* Ruby and the sass gem
* pip
* NodeJs


Running The Tests
=================
`nosetests --with-progressive`

Pre-Commit Hook
===============

Place this in project_directory/.git/hooks/pre-commit (make sure it's executable)
```bash
#!/bin/bash

export TERM=xterm-256color

flake8=$(which flake8)

if [ -z "$flake8" ]; then
    $echo "You must install flake8; sudo pip install flake8"
    exit 1
fi

FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -e '\.py$')

# Check for print statements
if [ -n "$FILES" ]; then
    printf "\e[32mChecking files for print violations\n\033[0m"
    grep -n -E -v "^#" $FILES | grep -E "[^\"']\bprint[\"' ]+"
fi

# Check for ipdb and pdb imports/usage
if [ -n "$FILES" ]; then
    printf "\e[32mChecking files for pdb violations\n\033[0m"
    grep --exclude=\*pre-commit -n -E "import.*i?pdb|i?pdb\." $PYTHON_FILES
fi

# Auto-check for pep8
if [ -n "$FILES" ]; then
    printf "\e[32mChecking Python files for flake8 violations\n\033[0m"
    flake8 --ignore=E501 $FILES
    RETVAL=$?
fi

# Run nosetests
nosetests --with-progressive
PASSED=$?

exit $RETVAL && $PASSED
```

Post-Checkout Hook
==================
Place this in project_directory/.git/hooks/post-checkout (make sure it's executable)

```bash
#!/bin/bash

export TERM=xterm-256color

# Start from the repository root
cd ./$(git rev-parse --show-cdup)

printf "\e[32mRemoving .pyc and empty directories...\n\033[0m"
find . -name "*.pyc" -delete
find . -type d -empty -delete
```
