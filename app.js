const fs = require('fs');
const path = require('path');
const metadata = require('ffmetadata');
const z_to_u = require('./font-converter/zawgyi-to-unicode');

//mp3 path
const filePath = path.join(__dirname,'audio');

//files
let files = fs.readdirSync(filePath);

//init
function fileMetadataConvert(){
  for(let file of files){
    metadata.read(`${filePath}/${file}`,(err,data)=>{
  
      let  { title,artist,album,album_artist } = data;
      // if title
      if(title){
        title = converter(title);
      }else{
        title = 'unknown';
      }
      // if artist
      if(artist){
        artist = converter(artist);
      }else{
        artist = 'unknown';
      }
      // if album
      if(album){
        album = converter(album);
      }else{
        album = 'unknown';
      }
      // if album artist
      if(album_artist){
        album_artist = converter(album_artist)
      }else{
        album_artist = '';
      }
      //rewrite
      let newData = {...data,title,artist,album,album_artist};
      // resave
      metadata.write(`${filePath}/${file}`,newData,(err)=>{
        if(err) throw err;
        //success
        console.log('success');
      })
    })
  }
}

// mp3 metadata convert
fileMetadataConvert()


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