import Q from 'q';
import _ from 'lodash';

export const iframe = () => {
  const ifr = document.createElement('iframe');

  ifr.setAttribute('id', 'ifr' + (_.uniqueId()));

  const dfd = Q.defer();
  ifr.addEventListener('load', () => {
    dfd.resolve(ifr.contentDocument);
  });

  // append it to dom so we can get the document
  document.body.appendChild(ifr);

  return dfd.promise;
};
