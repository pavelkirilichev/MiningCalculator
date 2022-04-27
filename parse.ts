import fs from 'fs'
import axios from 'axios';


const crypto = JSON.parse(fs.readFileSync('./crypto.json').toString()) as Array<{ title: string, img: string, name: string, id: number }>

async function boot() {
  let i = 0;
  for (const item of crypto) {
    const { name, title, img, id } = item
    const strings = img.split('/')
  
    const fileName = strings[strings.length - 1]
    const { data: file } = await axios({
      url: img,
      method: 'GET',
      responseType: 'stream',
    })
    const stream = fs.createWriteStream(`./crypto/${fileName}`)
    file.pipe(stream)
    
    stream.on('finish', () => {
      console.log(`writed ${i}`)
    })

    i++;
  }
}

boot()