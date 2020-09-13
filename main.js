(function(w) {
  let dir_lvl = 1;
  let src = document.currentScript.src.split('/');
  for (let i=0;i < dir_lvl;i++) src.pop();
  w.baseUrl = src.join('/');
})(window);

function importModule(name, resolved, rejected) {
  var file = name + '.js';
  var script = document.createElement('script');
  script.type = 'module';
  script.src = [window.baseUrl, 'js', file].join('/');
  (typeof resolved === 'function') && script.addEventListener('load', resolved);
  (typeof rejected === 'function') && script.addEventListener('error', rejected);
  document.body.appendChild(script);
  return script;
}