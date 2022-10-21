# Colizeum JS SDK

## Description

The Colizeum JS SDK is designed for JavaScript to be used in either Node.JS or in the Browser.
It offers simple, flexible access to all Colizeum APIs.

## Features

- Login with Colizeum
- Play to Earn mechanics
    - Consume user energy by doing specific actions in your game
    - Send out Colizeum Gold rewards for consumed energy
    - Get information about earned Colizeum Gold

## Getting started

Install the package with

```shell
npm install colizeum-sdk
```

Initialize the SDK as a client

```JavaScript
const { Colizeum } = require("colizeum-sdk");
// or: import { Colizeum } from "colizeum-sdk";

const colizeum = new Colizeum({
    appId: "111-222-333",
    clientId: "123456789",
    redirectUri: "http://localhost",
    sandbox: true
})
```

or as a service

```JavaScript
const { Colizeum } = require("colizeum-sdk");
// or: import { Colizeum } from "colizeum-sdk";

const colizeum = new Colizeum({
    appId: "111-222-333",
    apiKey: "abcdefgh",
    sandbox: true
})
```

## Example

```JavaScript
import { Colizeum } from "colizeum-sdk";

const colizeum = new Colizeum({
    appId: "111-222-333",
    sandbox: true
})

colizeum.setAccessToken("abdefghj")

const user = await colizeum.user.getMe()

await colizeum.funds.consumeEnergy(10)
```

## Licence

See the [LICENCE](./LICENCE.txt) file

## Additional resources

- [Colizeum Website](https://colizeum.com)
