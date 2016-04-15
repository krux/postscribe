import Q from 'q';
import _ from 'lodash';

export default function iframe() {
  const ifr = document.createElement('iframe');

  ifr.setAttribute('id', `ifr${_.uniqueId()}`);

  // append it to dom so we can get the document
  document.body.appendChild(ifr);

  return Q(ifr.contentWindow);
}
