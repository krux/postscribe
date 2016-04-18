const $ = require('jquery');
import descriptions from '../fixtures/write-comparisons';
import * as wc from '../helpers/write-comparor';

describe('write', () => {
  $.map(descriptions, (specs, desc) => {
    describe(desc, function() {
      $.map(specs, (spec, name) => {
        function cb(done) {
          wc.compare(spec).then(r => {
            expect(r).to.be.ok();
          }).fail(done).always(done);
        }

        if (name.indexOf('only:') === 0) {
          it.only(name.replace('only:', ''), cb);
        } else if (name.indexOf('skip:') === 0) {
          xit(name.replace('skip:', ''), cb);
        } else {
          it(name, cb);
        }
      });
    });
  });
});
