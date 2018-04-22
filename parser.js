const io = require('./io.js') // moving out io stuff so this file is not that messy
const lineParser = require('./lineParser.js') //main algorithm logic

const args = process.argv.slice(2)

const results = []
const parser = lineParser(args[0])

//async io read
io.on('line', line => {
  results.push(parser(line))
})

//do something when async processing was finished
io.on('close', () => {
  results.forEach(result => {
    console.log(result)
  })
})
