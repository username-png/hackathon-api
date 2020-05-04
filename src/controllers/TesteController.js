const path = require('path')
const dir = path.join(__dirname, '..', 'python_files', 'teste.py')
const loc = path.join(__dirname, '..', 'python_files')

module.exports = {
  callName(req, res) {
    try {
      const product_id = 0
      const question = 'qual a cor?'

      const spawn = require('child_process').spawn
      const pythonProcess = spawn('python3', [dir, product_id, question, loc])

      pythonProcess.stdout.on('data', data => {
        const str_data = data.toString().trim()

        const array_data = str_data.split('\n')

        const results_json = JSON.parse(array_data[array_data.length - 1])

        res.json(results_json)
      })
    } catch (err) {
      console.log(err)
    }
  },
}
