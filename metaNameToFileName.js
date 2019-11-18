const fs = require('fs');
const path = require('path');
const metadata = require('ffmetadata');

//mp3 path
const filePath = path.join(__dirname,'audio');

//files
let files = fs.readdirSync(filePath);

for(let file of files){
  try{
    metadata.read(`${filePath}/${file}`,(err,data)=>{
      //pull out metadata
      const { title } = data;
      //rename
      fs.renameSync(`${filePath}/${file}`,`${filePath}/${title ? title : file}${path.extname(file)}`);
      //success
      console.log('success');
    })
  }catch(err){
    console.log(err);
  }
  
}