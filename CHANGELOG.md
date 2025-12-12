# Changelog

All notable changes to [min-dash](https://github.com/bpmn-io/min-dash) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

## 5.0.0

* `FEAT`: make library ESM only

### Breaking Changes

* `Node>=20.12` is required to consume library from CommonJS

## 4.2.3

* `FIX`: correct `flatten` type definitions ([#38](https://github.com/bpmn-io/min-dash/pull/38))

## 4.2.2

* `FIX`: gracefully handle `undefined` target in `has`
* `FIX`: correct `findIndex` type definitions ([#36](https://github.com/bpmn-io/min-dash/issues/36))

## 4.2.1

* `FIX`: correct `isNil` and `isArray` type definitions ([#35](https://github.com/bpmn-io/min-dash/pull/35))

## 4.2.0

* `FEAT`: add `ESM` package exports ([#29](https://github.com/bpmn-io/min-dash/pull/29))
* `FIX`: correct various type definitions ([#33](https://github.com/bpmn-io/min-dash/pull/33))
* `FIX`: allow type definitions to be consumed in ESM setups ([#31](https://github.com/bpmn-io/min-dash/pull/31))

## 4.1.1

* `FIX`: correct `pick` and `omit` type definitions ([#26](https://github.com/bpmn-io/min-dash/issues/26))

## 4.1.0

* `FIX`: various type definition fixes ([#25](https://github.com/bpmn-io/min-dash/pull/25))

## 4.0.0

* `FEAT`: use ES2018

### Breaking changes

* The library exposes now ES2018 code. You have to transpile it yourself to support older (ES5) syntax.

## 3.8.1

* `FIX`: prevent prototype pollution via `set` ([#21](https://github.com/bpmn-io/min-dash/pull/21))

## 3.8.0

* `FEAT`: provide lodash-style `cancel` and `flush` on debounced function

## 3.7.0

* `FEAT`: add `get` utility ([#19](https://github.com/bpmn-io/min-dash/pull/19))

## 3.6.1

* `FIX`: correct `set` handling of `0` keys ([#18](https://github.com/bpmn-io/min-dash/pull/18))
* `FIX`: correct `set` scaffolding on `null` values ([#18](https://github.com/bpmn-io/min-dash/pull/18))

## 3.6.0

* `FEAT`: add `set` utility ([#16](https://github.com/bpmn-io/min-dash/pull/16))

## 3.5.2

* `FIX`: prevent prototype pollution via `merge`

## 3.5.1

* `FIX`: make `every` always return boolean value ([#14](https://github.com/bpmn-io/min-dash/pull/14))

## 3.5.0

* `FIX`: make `isFunction` detect async functions and generators
* `FIX`: correct `bind` TypeScript definitions
* `FIX`: match `forEach` implementation with documentation
* `CHORE`: bump to `babel@7`

## 3.4.0

* `CHORE`: make `debounce` work without `clearTimeout` ([#7](https://github.com/bpmn-io/min-dash/pull/7))

## 3.3.0

* `FEAT`: add `throttle(fn, interval)` util

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
