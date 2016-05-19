'use strict';

import JSNES from './source/nes';

export const create = function(opts) {
  return new JSNES(opts);
};
