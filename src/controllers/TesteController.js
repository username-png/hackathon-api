const path = require("path");
const dir = path.join(__dirname, "..", "python_files", "teste.py");
const loc = path.join(__dirname, "..", "python_files");
const { onExit } = require("@rauschma/stringio");

module.exports = {
  callName(req, res) {
    try {
      product_id = 0;
      question = "qual a cor?";

      const spawn = require("child_process").spawn;
      const pythonProcess = spawn("python3", [dir, product_id, question, loc]);

      pythonProcess.stdout.on("data", (data) => {
        console.log(`Node received: ${data}`);
        str_data = data.toString().trim();

        //console.log(str_data);
        array_data = str_data.split("\n");

        results_json = JSON.parse(array_data[array_data.length - 1]);

        //console.log(results_json);

        res.json(results_json);
      });
    } catch (err) {
      console.log(err);
    }
  },
};
