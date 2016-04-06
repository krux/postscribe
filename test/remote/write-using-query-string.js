var scripts = document.getElementsByTagName('script');
var cur = scripts[scripts.length - 1];
var queryString = cur.src.split('?')[1];
var kv = queryString.split('&')[1];
var k2 = kv.split('=')[0];
document.write(k2);
