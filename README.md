# chrome-profile-list
> Get a list of existing Google Chrome, Google Chrome Canary or Chromium user profiles

## Install
```
npm install chrome-profile-list
```

## Usage
```
var chromeProfileList = require('chrome-profile-list');
console.log(chromeProfileList());

// Something like this is logged to the console:

[ { name: 'User',
    profileDir: '/Users/username/Library/Application Support/Google/Chrome/Default' },
  { name: 'Guest',
    profileDir: '/Users/username/Library/Application Support/Google/Chrome/Guest Profile' },
  { name: 'Person 1',
    profileDir: '/Users/username/Library/Application Support/Google/Chrome/Profile 1' } ]
```

## Supported environments

- node.js

## Supported operating systems

This module follows the conventions described by https://chromium.googlesource.com/chromium/src/+/HEAD/docs/user_data_dir.md
so it provides support for macOS, Windows and Linux (mileage may vary).

## API

### chromeProfileList(variant)

Returns an array of objects ({ name, path}) one for each available profile excluding the default `System Profile`.

#### arguments

*variant*   
One of `chromeProfileList.variants`, defaults to `CHROME`

### chromeProfileList.variants

An enum of possible variants to search profiles for:

- `CHROME`
- `CANARY`
- `CHROMIUM`

Example:

```
var chromeProfileList = require('chrome-profile-list');

console.log(chromeProfileList(chromeProfileList.variants.CHROMIUM));

// Logs a list of available chromium profiles to the console
```

## Author

Israel Roldan

## LICENSE

ISC