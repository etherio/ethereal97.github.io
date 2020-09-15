(function(w) {
  let dir_lvl = 1;
  let src = document.currentScript.src.split('/');
  for (let i=0;i < dir_lvl;i++) src.pop();
  w.baseUrl = src.join('/');
})(window);

function importModule(name, resolved, rejected) {
  var script = document.createElement('script');
  script.type = 'module';
  script.src = getPath(['js', name]);
  (typeof resolved === 'function') && script.addEventListener('load', resolved);
  (typeof rejected === 'function') && script.addEventListener('error', rejected);
  document.body.appendChild(script);
 
  return script;
}

function renderView(page) {
  var viewPage = getPath(['views', page], 'html');
 
  return viewPage;
}

function getPath(path=[], type='js') {
  if (typeof path === "string") path = [path];
  return [window.baseUrl, ...path].join('/') + '.' + type;
}