import express from 'express';
import DB from './src/database';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const app = express();

const upload = multer({ dest: 'temp/' })
const {compress} = require("compress-images/promise");
const { PORT } = process.env;

app.listen(PORT,()=>{
    console.log('server')
});


const MyFun=async(name)=> {
  let INPUT_path_to_your_images = `temp/${name}`;
  let OUTPUT_path = "build/";
  
  const img = await compress({
      source: INPUT_path_to_your_images,
      destination: OUTPUT_path,
      enginesSetup: {
        //jpg: { engine: "mozjpeg", command: ["-quality", "70"] },
        //png: { engine: "pngcrush", command:[]  },
        //svg: { engine: "svgo", command: false },
        gif: {engine: 'gifsicle', command: ['--scale', ' 0.1']}
      }
  });
  const {err, statistic, completed} = img
  return img;
  }

app.post('/data', upload.single('img'), async(req, res)=>{
    if(!req.file)
        return res.send("dosya yok");
    const full_path = path.resolve("./temp", req.file.filename);
    let extArray = req.file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    if(extension.match(/xml/)){
      extension = "svg"
    }
    fs.renameSync(full_path, full_path+"."+extension);
    
    const result = await MyFun(req.file.filename+"."+extension);
    res.json(result);
})

const db = DB(process.env.DB_NAME);
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Mongodb connected'));