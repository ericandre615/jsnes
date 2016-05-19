'use strict';

import JSNES from './source/nes';

export default JSNES;

export const create = function(opts) {
  return new JSNES(opts);
};
