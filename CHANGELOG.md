# Changelog

All notable changes to [min-dash](https://github.com/bpmn-io/min-dash) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 3.2.0

* `FEAT`: add `isNil` utility that checks for `undefined || null`
* `FIX`: correct `isDefined` behavior
* `FIX`: make `isUndefined` behavior

## 3.1.0

* `FEAT`: add TypeScript definitions

## 3.0.0

### Breaking Changes

* `FIX`: remove browser field again; it confuses modern module bundlers. This partially reverts `v2.4.0`

## 2.4.0

* `CHORE`: add `browser` field

## 2.3.0

* `FEAT`: add `omit(obj, properties)` util

## 2.2.0

* `FEAT`: add `flatten(array)` util

## 2.1.0

* `FEAT`: add `merge(target, ...sources)` util
* `FEAT`: add `size(obj)` util
* `FEAT`: add `has(obj, property)` util
* `DOCS`: improve utils documentation

## 2.0.0

### Breaking Changes

* `FEAT`: expose utilities via main export only ([`cb6ab757`](https://github.com/bpmn-io/min-dash/commit/cb6ab757fa07e8728ba6c7bd692f93a94afecceb))

### Other Improvements

* `CHORE`: generate ES, CJS and UMD bundles using rollup
* `CHORE`: babelify results and don't require `Object.assign` polyfill

## ...

Check `git log` for earlier history.