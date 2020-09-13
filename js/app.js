import Github from './src/Github.js';

let github = new Github({
  user: 'ethereal97'
});

github.repositories.then(repos => {
  let el = document.querySelector('table#repositories');
  if (!el) return;
  
  //console.log(Object.keys(repos[0]));
  
  repos.forEach(repo => {
    let { id, html_url, name, size, language } = repo;
    
    var tr = document.createElement('tr');        
    var _id = document.createElement('td');        
    var _name = document.createElement('td');
    var _size = document.createElement('td');
    var _lang = document.createElement('td');

    _id.innerText = id;
   
    var a = document.createElement('a');
   
    a.target = '_blank';
    a.href = html_url;
    a.innerText = name;
    
    _name.appendChild(a);
    
    _size.innerText = convertSize(size, 'KB', ['KB', 'MB']);
    
    _lang.innerText = language;
    
    tr.appendChild(_id);
    tr.appendChild(_name);
    tr.appendChild(_size);
    tr.appendChild(_lang);
    el.appendChild(tr);
  });
  //* end of getting repositories
});

/**
 * Convert the file size
 * 
 * @param int value
 * @param string unit - [ 'B' | 'KB' | 'MB' | 'GB' ]
 * @param array units
 */
function convertSize(value, unit, units) {
  let size = [];
  let size_in_bytes;
  
  let _units = {
    B: ["bytes", "B", 1],
    KB: ["kilobytes", "KB", 1024],
    MB: ["megabytes", "MB", 1024000],
    GB: ["gigabytes", "GB", 1024000000]
  };
  
  var current_size = _units[unit];
  var current_value = current_size[2];
  
  size_in_bytes = current_value * value;
  
  for (let i in units) {
    unit = units[i];
    var unit_size = _units[unit];
    var unit_value = unit_size[2];
    
    if (current_value > unit_value) {
      size.push([size_in_bytes * unit_value, unit_size[1]]);
    } else {
      size.push([size_in_bytes / unit_value, unit_size[1]]);
    }
  }
  size.sort((a, b) => b[0] - a[0]);
  size = size[0];
  return size.join(' ');
}