const path = require('path')
const dir = path.join(__dirname, '..', 'python', 'code.py')

module.exports = {
  callName(req, res) {
    try {
      // Use child_process.spawn method from
      // child_process module and assign it
      // to variable spawn
      const spawn = require('child_process').spawn

      // Parameters passed in spawn -
      // 1. type_of_script
      // 2. list containing Path of the script
      //    and arguments for the script

      // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
      // so, first name = Mike and last name = Will
      const process = spawn('python', [
        dir,
        req.query.firstname,
        req.query.lastname,
      ])

      // Takes stdout data from script which executed
      // with arguments and send this data to res object
      process.stdout.on('data', function (data) {
        res.json(data.toString())
      })
    } catch (err) {
      return res.status(400).json('erro')
    }
  },
}
