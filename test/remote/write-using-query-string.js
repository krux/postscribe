var scripts = document.getElementsByTagName('script'),
  cur = scripts[scripts.length-1],
  queryString = cur.src.split('?')[1],
  kv = queryString.split('&')[1],
  k2 = kv.split('=')[0];
document.write(k2);