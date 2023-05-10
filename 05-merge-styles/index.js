const fs = require('fs');
const path = require('path');

const wayStyles = path.join(__dirname, 'styles');
let arrFromCss = [];

fs.readdir(wayStyles, (err, files) => {
  if (err) {
    console.error(err);
  }
    
  files.forEach(file => {
    fs.stat(path.join(__dirname, 'styles', file), (errs, stats) => {
      if (stats.isFile()) {
        if (errs) {
          console.error(errs);
          return;
        } else if (path.extname(file) === '.css') {
          fs.readFile(path.join(__dirname, 'styles', file), (err, file) => {
            if (err) {
              console.error(err);
            }
            arrFromCss.push(Buffer.from(file).toString().trim()); 
            
            fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), arrFromCss.join('\n'), (err) => {
              if (err) {
                console.error(err);
                return;
              }
                
            });
          });
        
        }
    
      }});});});
