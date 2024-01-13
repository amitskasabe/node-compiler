const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);
app.use(bodyP.json());
app.use("/codemirror", express.static("D:/test/codemirror/codemirror"));


app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("deleted");
    });
    res.sendFile("D:/test/codemirror/index.html");
});

app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    try {
        if (lang == "cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                        
                    } else {
                        res.send({ output: data.error });
                    }
                });
            } else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: data.error });
                    }
                });
            }
        } else if (lang == "java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: data.error });
                    }
                });
            } else {
                var envData = { OS: "windows" };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: data.error });
                    }
                });
            }
        } else if (lang == "python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: data.error });
                    }
                });
                console.log(" THis should be working ")
                console.log(data)
            } else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: data.error });
                    }
                });
            }
        }
    } catch (e) {
        console.log("error");
    }
});

app.listen(9000, function () {
    console.log("Server is listening on port 9000");

});
