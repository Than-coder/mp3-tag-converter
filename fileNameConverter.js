const fs = require('fs');
const path = require('path');
const z_to_u = require('./font-converter/zawgyi-to-unicode');
//mp3 path
const filePath = path.join(__dirname,'audio');

//files
let files = fs.readdirSync(filePath);
// files loop
for(let file of files){
  try{
    //file name change unicode
    fs.renameSync(`${filePath}/${file}`,`${filePath}/${converter(file)}`);
    // success
    console.log('success');
  }catch(err){
    console.log(err);
  }
}

//zawgyi to unicode converter
function converter(text){
  z_to_u.forEach(font =>{
    let from = font.from;
    let to = font.to;
    
    let reg = new RegExp(from,'g');
    text = text.replace(reg,to)
  })
  return text;
}