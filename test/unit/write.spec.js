import _ from 'lodash';
import descriptions from '../fixtures/write-comparisons';
import * as wc from '../helpers/write-comparor';

describe('write', () => {
  _.forEach(descriptions, (specs, desc) => {
    describe(desc, () => {
      _.forEach(specs, (spec, name) => {
        it(name, done => {
          wc.compare(spec).then(r => {
            expect(r).to.be.ok();
          })['catch'](done)['finally'](done);
        });
      });
    });
  });
});
