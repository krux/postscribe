# Overview

[![Version](https://img.shields.io/npm/v/postscribe.svg)](http://npmjs.com/package/postscribe)
[![License](https://img.shields.io/npm/l/postscribe.svg)](http://npmjs.com/package/postscribe)
[![Build Status](https://travis-ci.org/krux/postscribe.svg?branch=master)](https://travis-ci.org/krux/postscribe)
[![Code Climate](https://img.shields.io/codeclimate/github/krux/postscribe.svg)](https://codeclimate.com/github/krux/postscribe)
[![Coverage](https://img.shields.io/coveralls/krux/postscribe.svg)](https://coveralls.io/github/krux/postscribe)
[![Dependencies](https://img.shields.io/david/dev/krux/postscribe.svg)](./package.json)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Gitter](https://badges.gitter.im/krux/postscribe.svg)](https://gitter.im/krux/postscribe)

Remote scripts, especially ads, block the page from doing anything else while they load. They contribute a large % to load times which
[affects your bottom line](http://devnet.kentico.com/Blogs/Thomas-Robbins/September-2012/How-loading-time-affects-your-bottom-line-Infograp.aspx).
*Asynchronous* ads do not block the page and can be delivered after core
content - [Async FTW](http://www.krux.com/blog/krux-engineers/synchronous-versus-asynchronous-tags-whats-the-big-deal/).

Why is it so hard to deliver ads asynchronously? Because they may contain calls to `document.write`, which expects to be handled synchronously.
**PostScribe lets you deliver a synchronous ad asynchronously without modifying the ad code**.

### Approach

Other tag writing libraries exist (see [alternatives](#alternatives)), but PostScribe is novel in its use of what we call DOM Proxies, a way to
ensure that the content is written as close to the way the browser would natively write the content with `document.write`/`innerHTML`. Read: it
behaves just like the browser would, without convoluted parsing or hacks.

For more information:

* [Presentation at HTML5devconf](http://youtu.be/ClzeilKwX10) by the original author, Derek Brans
* [Interactive Demo](http://run.plnkr.co/plunks/e8MJAx/) with side by side comparisons of other tag writers

# Getting Started

PostScribe overrides `document.write`. It is best and safest to use PostScribe after DOM is ready.

## Installation

### Browser

If you just want to use the script without installing anything, use the following to load the script from *cdnjs*:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/postscribe/2.0.6/postscribe.min.js"></script>
```

### NPM

You can include `postscribe` using *npm*:

```console
npm install --save postscribe
```

Postscribe runs in browsers, so this assumes you're using a module bundler like [webpack](https://webpack.github.io/),
[Browserify](http://browserify.org/), [JSPM](http://jspm.io/) or [Rollup](http://rollupjs.org/) to consume CommonJS modules.

### Bower

You can include `postscribe` using *bower* by installing from the CDN URL:

```console
bower install --save https://cdnjs.cloudflare.com/ajax/libs/postscribe/2.0.6/postscribe.min.js
```

The library will exist at `<components_folder>/postscribe/index.js`.

## Accessing

### ES6/ES2015

```javascript
import postscribe from 'postscribe';
```

### AMD

```javascript
define(['postscribe'], function(postscribe) {

});
```

### CommonJS

```javascript
var postscribe = require('postscribe');
```

## Usage

To append html to #mydiv:

```javascript
postscribe('#mydiv', '<h1>Hello PostScribe</h1>');
```

In general:

```javascript
postscribe(element, html, options);
```

* *element:* a DOM Element, jQuery object, or id selector (e.g. "#mydiv")
* *html:* an html string or a function that takes a DOM Document and writes to it.
* *options:* a hash of options
  * *afterAsync*: a callback called when an async script has loaded
  * *afterDequeue*: a callback called immediately before removing from the write queue
  * *afterStreamStart*: a callback called sync after a stream's first thread release
  * *afterWrite*: a callback called after writing buffered document.write calls
  * *done:* a callback that will be called when writing is finished
  * *autoFix*: a boolean that allows disabling the autoFix feature of prescribe
  * *beforeEnqueue*: a callback called immediately before adding to the write queue
  * *beforeWriteToken*: a callback called before writing a token
  * *beforeWrite*: a callback called before writing buffered document.write calls
  * *error*: a function that throws the error by default, but could be overwritten
  * *releaseAsync*: a boolean whether to let scripts w/ async attribute set fall out of the queue

If you just want to mess around, include the js files at the top of an html page that contains the following:

```html
<div id="mydiv"></div>
<script type="text/javascript">
  postscribe('#mydiv', '<h1>Hello PostScribe</h1>');
</script>
```

## How to use PostScribe to render an ad after load

Where normally you would have

```html
<div id="ad"><h5>Advertisement</h5>
  <script type="text/javascript">
    // Build url params and make the ad call
    document.write('<script src=doubleclick_url_with_params><\/script>');
  </script>
</div>
```

Instead, remove the ad call and close the div

```html
<div id="ad"><h5>Advertisement</h5></div>

<script type="text/javascript">
  // jQuery used as an example of delaying until load.
  $(function() {
    // Build url params and make the ad call
    postscribe('#ad', '<script src=doubleclick_url_with_params><\/script>');
  });
</script>
```

There are some hooks you may pass as the third argument. For example:

```html
<script type="text/javascript">
  // jQuery used as an example of delaying until load.
  $(function() {
    postscribe('#ad', '<script src=doubleclick_url_with_params><\/script>', {
      done: function() {
        console.info('Dblclick script has been delivered.');
      }
    });
  });
</script>
```

See the beginning of [postscribe.js](./src/postscribe.js) for a complete list.

# FAQ

##### Does it work with jQuery, Prototype, Backbone, Underscore, jQuery UI, YUI, mooTools, dojo, etc.?
Yep. It neither depends on nor conflicts with any of the existing popular javascript frameworks.

##### Does it work with another tag writing library on the page?
No. Only one tag writer at a time.

# Who is using it

This project was originally developed at [Krux](http://www.krux.com) as part of its
[SuperTag](https://www.krux.com/data-management-platform-solutions/super-tag-management/) product.
There it has been battle tested on high-profile sites like [The New York Times](http://www.nytimes.com),
[The Wall Street Journal](http://online.wsj.com), [NBCU](http://www.nbcuni.com), and hundreds of others.
It is actively maintained by Krux.

# Browser Compatibility

PostScribe was designed to behave as closely to the native `document.write`/`innerHTML` does as possible, and we've taken great care to make sure
that it works on every browser we can get our hands on. We expect it to work on every browser built after 2009. There are over
500 [unit tests](./test) that run on every commit. PostScribe is thoroughly tested and known to work well in the following browsers:

* Firefox 4+
* Chrome 10+
* Safari 5.0+
* Opera 10.0+
* Internet Explorer 8+
* iPhone/iPad and other WebKit-based browsers

Note that we do not provide any support for Internet Explorer versions earlier than IE8.

# Alternatives

We've stood on the shoulders of giants with our work, and there are other alternative approaches to solve this problem. Shout out to the best
ones we found:

* [writeCapture](https://github.com/iamnoah/writeCapture)
* Ghostwriter by Digital Fulcrum
* [ControlJS](http://stevesouders.com/controljs/) by [Steve Souders](http://stevesouders.com)

If you would like your project to be added to this list, file an issue and we'd be happy to.

# Help/Bugs/Requests

We ♥ bug reports.

Have a problem? Need help? Would you like additional functionality added? We use GitHub's ticket system for keeping track of these requests.

Please check out the [existing issues](https://github.com/krux/postscribe/issues), and if you don't see that your problem is already being
worked on, please [file a new issue](https://github.com/krux/postscribe/issues/new). The more information the better to describe your problem.

# Contributing

We ♥ [forks and pull requests](https://help.github.com/articles/using-pull-requests).

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for full details.

## Environment

The project requires nodejs (>=5.6) and npm (>=3.6.0) for development. It has no runtime dependencies.

## Developing

Check the code out and install the development dependencies using:

```console
npm install
```

### Building

To build the code, run

```console
npm run build
```

### Linting

We use ESLint and JSCS to do static analysis of the JavaScript and keep things smelling good.  To run both, use:

```console
npm run lint
```

### Testing

Using [travis-ci](https://travis-ci.org), the unit tests are run on every commit using PhantomJS to run the tests
with a real browser.

To test the code locally, you can use:

```console
npm test
```

To run tests in Test-Driven-Development mode, where the test will be run after every change, use:

```console
npm run tdd
```

To run the cross-browser tests, use:

```console
npm run test:cross-browser
```

## Issue Guidelines

Please either add a failing [unit test](./test/unit) or include a [jsfiddle](http://jsfiddle.net) that distills and reproduces the issue.

Try forking [this jsfiddle](https://jsfiddle.net/postscribe/h1wnuk9h/). We've set everything up there for you so that you can reproduce your issue.

# License

We aim for you to use this inside your application, so we picked the least restrictive license we could find.

See [LICENSE](LICENSE).

