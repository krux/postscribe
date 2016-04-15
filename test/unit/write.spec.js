/* global describe,it */
import _ from 'lodash';
import Q from 'q';

import descriptions from './write-comparisons';
import WriteComparor from './write-comparor';


describe('writes the same as document.write', function() {
  const wc = new WriteComparor();
  _.forEach(descriptions, (specs, desc) => {
    describe(desc, function() {
      _.forEach(specs, (spec, name) => {
        it(name, function(done) {
          wc.compare(spec).then(r => {
            expect(r).to.be.ok();
          }).catch(done).finally(done);
        });
      });
    });
  });
});
