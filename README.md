NASA Space apps 2014: Spacet
============================

Setup
-----

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
------------

* python 2.7
* Ruby and the sass gem
* pip
* NodeJs
