# rtcio-signaller-compatibility

This is a small test suite that can be used to test whether a signalling
server behaves as expected for working with the `rtc-signaller` module.


[![NPM](https://nodei.co/npm/rtcio-signaller-compatibility.png)](https://nodei.co/npm/rtcio-signaller-compatibility/)


![unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)

## Usage

Eventually this will be hosted as a webpage somewhere, but in the meantime
you can clone the repo and run the test from the command line:

```
git clone https://github.com/rtc-io/rtcio-signaller-compatibility.git
cd rtcio-signaller-compatibility
npm install
node test.js --uri http://rtc.io/switchboard/primus
```

This also works if you specify a `ws` or `wss` endpoint:

```
node test.js --uri ws://rtc.io/switchboard/primus
```

## License(s)

### Apache 2.0

Copyright 2014 National ICT Australia Limited (NICTA)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
