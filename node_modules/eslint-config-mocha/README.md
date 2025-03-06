# eslint-config-mocha

> ESLint config for mochajs projects

## Summary

*Does nothing remarkable with linting your tests!*  Intended for use by projects under the [Mocha.js GitHub org](https://github.com/mochajs).

As of this writing, *this config is unused* by any published project.  Except this one, I guess.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i eslint eslint-config-standard eslint-plugin-import eslint-plugin-promise eslint-plugin-standard eslint-plugin-mocha-only eslint-config-mocha --save-dev
```

([About ESLint & `peerDependencies`](https://github.com/eslint/eslint/issues/3458))

## Usage

Assuming a JSON ESLint config, add the following to the root `.eslintrc.json`:

```json
{
  "extends": "mocha"
}
```

### For ES6 Modules

If using ES6 modules, instead:

```json
{
  "extends": "mocha/es6"
}
```

### For Tests

In your `test/.eslintrc.json`, try this:

```json
{
  "extends": "mocha/test"
}
```

## License

Copyright © 2016 [Christopher Hiller](https://mochajs.org)
Licensed under the ISC license.
