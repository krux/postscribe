# Overview

# Usage

# Browser Compatibility

# Who is using it

# More information
* [Documentation](https://github.com/krux/postscribe/tree/master/doc)
* Browse the [raw](https://github.com/krux/postscribe/blob/master/postscribe.js) source code. **TODO**: Link to annotated source code.

# Help/Bugs/Requests
Have a problem? Need help? Would you like additional functionality added? We use github's ticket system for keeping track of these requests. Please check out the [existing issues](https://github.com/krux/postscribe/issues), and if you don't see that your problem is already being
worked on, please file a [new issue](https://github.com/krux/postscribe/issues/new). The more information the better to describe your problem. We ♥ [Jing](http://www.techsmith.com/jing.html) bug reports.

# Contributing
We ♥  [forks and pull requests](https://help.github.com/articles/using-pull-requests).


## Environment
To run the tests and static code analysis tools, you will need to have the following installed:

* nodejs (>=0.8) & npm - [Install Instructions](https://github.com/joyent/node/wiki/Installation)
* PhantomJS - A headless browser based on Webkit. [Install Instructions](http://phantomjs.org/download.html)
* All other project dependencies are installed via npm with `npm install`
	* [grunt](http://gruntjs.com) - a 'make' like tool for automating build, test, and other dev tasks

## Guidelines
Tabs, not spaces. 2 of them. [jQuery's style guide](http://docs.jquery.com/JQuery_Core_Style_Guidelines) covers just about everything else.

## Testing
Using [travis-ci](https://travis-ci.org) and [grunt](http://gruntjs.com), the [Qunit](http://qunitjs.com) unit tests are run on every commit using PhantomJS to run the tests with a real browser.
 
Current Build Status: [![Build Status](https://secure.travis-ci.org/krux/postscribe.png)](http://travis-ci.org/krux/postscribe)

To run the tests:

`$ grunt test`

We use jshint to do static analysis of the javascript and keep things smelling good. To run jslint:

`$ grunt lint`


**Pro Tip**: You can use TDD and have jslint and the tests run on every commit with:

`$ grunt watch`


# History
### 1.0.0 Initial open source release
* Write tags asynchronously, yo.

# License
We aim for you to use this inside your application, so we picked the leased restrictive license we could find. MIT License - see [LICENSE](https://github.com/krux/postscribe/blob/master/LICENSE)



