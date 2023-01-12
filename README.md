# Smartcontract Supervisor JS

**Axios interaction with Smartcontract Supervisor's APIs.**

## Table of Contents

- [Smartcontract Supervisor JS](#smartcontract-supervisor-js)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Installation](#installation)
    - [Usage](#usage)

## Overview

### Installation

```console
$ npm install @interplanetary-lab/smartcontract-supervisor-js
```

### Usage

Once installed, you can use the contracts in the library by importing them:

```javascript
import SmartContractSupervisor from '@interplanetary-lab/smartcontract-supervisor-js';

//...

try {
    const supervisor = new SmartContractSupervisor(
        process.env.SUPERVISOR_API_URL
        process.env.SUPERVISOR_API_KEY
    );

    const response = await supervisor.validatorSign(validator, wallet);
    // Do something
} catch (e) {
    console.error(`${e.status} - ${e.message}`)
}
```
