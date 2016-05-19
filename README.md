JSNES Plus
=====

A JavaScript NES emulator. Being reworked to be more modular and reusable. Adding ES2015+ modules.
Plans to add more features such as `Gamepad API` and remove useless IE/Flash specific fallbacks. Because I don't care or need those things junking stuff up. Would also like to abstract some things. Remove some coupling between the UI/jQuery stuff and the emulator (also remove jQuery dependency).

Build
-----

`npm install`

`npm run build`

`var nes = new JSNES(opts)` has been removed to now use `let nes = JSNES.create(opts)` but still uses the `new` constructor behind the scenes. This helps in that you won't miss calling `JSNES` withnout `new` but still kinda lame. Work will also be put in to removing the constructor aspects.

This will create ``jsnes.min.js`` in ``build/`` with source-maps.

Benchmark
---------

The benchmark in ``test/benchmark.js`` is intended for testing JavaScript
engines. It does not depend on a DOM or Canvas element etc.
