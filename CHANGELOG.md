# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 2.0.3 - 2016-04-22
### Fixed
- Fixed #159 - Chrome producing Unexpected token ILLEGAL when iframe src contains escaped double quotes

## 2.0.2 - 2016-04-22
### Fixed
- Fixed the export setup for browser-based

## 2.0.1 - 2016-04-19
### Fixed
- Fixed race condition in release resulting in an empty package

## 2.0.0 - 2016-04-18
### Changed
- Porting to ES6, Gulp, Karma and Webpack
- Rearrange source files
- Pull in some fixes from various PRs and downstream forks
- Publish as a UMD module
- Extracted htmlParser out as a new module called `prescribe`

## 1.4.0 - 2015-04-25
### Fixed
- Fix incomplete tags blocking UI thread
- beforeWriteToken hook
- Handle boolean attrs
- Comments fix
- Make autoFix a postscribe option

## 1.3.2 - 2014-06-06
### Changed
- Screwed up the tagging. (automation coming soon...)

## 1.3.0 - 2015-06-06
### Added
- Adds hooks around queuing and stream starting.

## 1.2.0 - 2014-03-03
### Added
- Adds option to not overwrite doc.write while script[async] is loading.

## 1.1.2 - 2014-03-03
### Fixed
- iframe and textarea fix

## 1.1.1 - UNKNOWN
### Changed
- Error handling mod

## 1.1.0 - 2013-06-13
### Changed
- major refactoring to simplify code and fix rare bugs related to script tag handling
- scripts are now written inline

## 1.0.5 - 2013-01-09
### Fixed
- htmlParser performance fix

## 1.0.3 - UNKNOWN
### Added
- Test framework improvements
### Fixed
- Lots of things

## 1.0.2 - UNKNOWN
### Changed
- Documentation release

## 1.0.1 - UNKNOWN
### Changed
- Documentation

## 1.0.0  - 2012-10-12
### Added
- Initial open source release
- Write tags asynchronously, yo. Initial release after 2+ years of development internally at Krux

