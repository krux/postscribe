# Overview

Remote scripts, especially ads, block the page from doing anything else while they load. They contribute a large % to load times which
[affects your bottom line](http://devnet.kentico.com/Blogs/Thomas-Robbins/September-2012/How-loading-time-affects-your-bottom-line-Infograp.aspx).
*Asynchronous* ads do not block the page and can be delivered after core
content - [Async FTW](http://www.krux.com/blog/krux-engineers/synchronous-versus-asynchronous-tags-whats-the-big-deal/).

Why is it so hard to deliver ads asynchronously? Because they may contain calls to `document.write`, which expects to be handled synchronously.
**PostScribe lets you deliver a synchronous ad asynchronously without modifying the ad code**.

Shameless Plug: Using this standalone library is a great start, but if you want to go further and have your tags centrally managed instead of
having them hard-coded on the page, Check out [Krux's SuperTag](https://www.krux.com/data-management-platform-solutions/super-tag-management/),
developed by the same authors as this library.


### Approach

Other tag writing libraries exist (see [alternatives](#alternatives)), but PostScribe is novel in it's use of what we call DOM Proxies, a way to
ensure that the content is written as close to the way the browser would natively write the content with `document.write`/`innerHTML`. Read: it
behaves just like the browser would, without convoluted parsing or hacks.

For more information:

* [Presentation at HTML5devconf](http://youtu.be/ClzeilKwX10) by the author, Derek Brans
* [Interactive Demo](http://run.plnkr.co/plunks/e8MJAx/) with side by side comparisons of other tag writers
* [Documentation](https://github.com/krux/postscribe/tree/master/doc)
* Browse the [raw](https://github.com/krux/postscribe/blob/master/postscribe.js) or [annotated](http://krux.github.com/postscribe/doc/postscribe.html) source code.

# Getting Started

PostScribe overrides `document.write`. It is best and safest to use PostScribe after DOM is ready.

## Installation

In a browser:

```html
<script src="./dist/postscribe.min.js"></script>
```

With an AMD loader:

```javascript
require(['postscribe'], function(postscribe) {});
```

If using CommonJS, first `npm install --save postscribe`, then:

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
  * *done:* a callback that will be called when writing is finished.

If you just want to mess around, include the js files at the top of an html page that contains the following:

```html
<div id="mydiv"></div>
<script type="text/javascript">
  postscribe('#mydiv', '<h1>Hello PostScribe</h1>');
</script>
```

## How to use postscribe to render an ad after load

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
[SuperTag](https://www.krux.com/data-management-platform-solutions/super-tag-management/) product. There it was battle tested on high-profile
sites like [The New York Times](http://www.nytimes.com), [The Wall Street Journal](http://online.wsj.com), [NBCU](http://www.nbcuni.com), and
hundreds of others. It is actively maintained by Krux.

# Browser Compatibility
Postscribe was designed to behave as closely to the native `document.write`/`innerHTML` does as possible, and we've taken great care to make sure
that it works on every browser we can get our hands on. We expect it to work on every browser built after 2005. There are over
400 [unit tests](./test) that run on every commit, and we add more all the time. Postscribe is thoroughly tested and known to work well in the
following browsers:

* Firefox 4+
* Chrome 10+
* Safari 5.0+
* Opera 10.0+
* Internet Explorer 8+
* iPhone/iPad and other WebKit-based browsers

Curious if a specific browser will work? [Run the tests yourself](http://krux.github.com/postscribe/test/test.html) and let us know if you see
any failures.

# Alternatives
We've stood on the shoulders of giants with our work, and there are other alternative approaches to solve this problem. Shout out to the best
ones we found:

* [writeCapture](https://github.com/iamnoah/writeCapture)
* [Ghostwriter](http://digital-fulcrum.com/ghostwriter/docs/files/ghostwriter-js.html) by Digital Fulcrum (it looks like they have removed
  references to it on their site?)
* [ControlJS](http://stevesouders.com/controljs/) by [Steve Souders](http://stevesouders.com)

If you would like your project to be added to this list, file an issue and we'd be happy to.

# Help/Bugs/Requests

Have a problem? Need help? Would you like additional functionality added? We use github's ticket system for keeping track of these requests.
Please check out the [existing issues](https://github.com/krux/postscribe/issues), and if you don't see that your problem is already being
worked on, please [file a new issue](https://github.com/krux/postscribe/issues/new). The more information the better to describe your problem.
We ♥ [Jing](http://www.techsmith.com/jing.html) bug reports.


# Contributing

We ♥ [forks and pull requests](https://help.github.com/articles/using-pull-requests). Please see [CONTRIBUTING.md](CONTRIBUTING.md) for full details.

## Environment

To run the tests and static code analysis tools, you will need to have the following installed:

* nodejs (>=5.6) & npm (>=3.6.0) - [Install Instructions](https://github.com/nodejs/node/wiki/Installation)
* All other project dependencies are installed via npm with `npm install`

## Issue Guidelines
Please include a [jsfiddle](http://jsfiddle.net) or [plunker](http://plnkr.co) that distills and reproduces the issue.
Try forking [this jsfiddle](http://jsfiddle.net/dbrans/Znpxv/). We've set everything up there for you so that you can reproduce your issue.

## Testing
Using [travis-ci](https://travis-ci.org), the [Qunit](http://qunitjs.com) unit tests are run on every commit using PhantomJS to run the tests
with a real browser.

Current Build Status: [![Build Status](https://travis-ci.org/krux/postscribe.svg?branch=master)](https://travis-ci.org/krux/postscribe)

To run the tests:

```console
$ npm test
```

We use eslint to do static analysis of the JavaScript and keep things smelling good. To run eslint:

```console
$ npm run lint
```

**Pro Tip**: You can use TDD and have eslint and the tests run on every change with:

```console
$ npm run tdd
```

# License
We aim for you to use this inside your application, so we picked the least restrictive license we could find.
MIT License - see [LICENSE](LICENSE)

