# min-dash

[![Build Status](https://travis-ci.org/bpmn-io/min-dash.svg?branch=master)](https://travis-ci.org/bpmn-io/min-dash)

Minimal utility tool belt to be used with [bpmn.io](https://bpmn.io/) related libraries.


## Features

* fine selection of [powerful utilities](./lib) on board
* ES2015 compatible
* complete bundle `4K` gzipped
* utilities optimized for speed (i.e. sorting and union only by key)


## How to use

```javascript
import {
  find,
  sortBy
} from 'min-dash/lib/collection';

import {
  assign
} from 'min-dash/lib/object';

...
```

Use a ES6 to ES5 transpiler such as [Babel](http://babeljs.io/) to run the code in the browser.

If you care about small bundle sizes, fetch the utilities directly from the individual files. This is required for actual tree shaking / dead code removal to work (cf. [this issue](https://github.com/webpack/webpack/pull/5435)).



## License

MIT