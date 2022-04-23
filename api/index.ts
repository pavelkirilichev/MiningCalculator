import express from 'express'
import cors from 'cors'

const app = express()

import crypto from '../resources/Vue/src/mock/crypto'
import gpu from '../resources/Vue/src/mock/gpu'

app.use(cors())

app.get('/coins/:search?', (req, res) => {
  const { search = "" } = req.params
  res.send(crypto.filter((_, index) => index < 30).filter(coin => coin.name.toLowerCase().includes(search)))
})

app.get('/gpu/:search?', (req, res) => {
  const { search = "" } = req.params

  res.send(gpu.filter((_, index) => index < 30).filter(gpu => gpu.name.toLowerCase().includes(search)))
})

app.listen(4000, () => {
  console.log('listen... 4000')
})