var fs = require("fs");
var browserify = require("browserify");
var path = require("path");
var tsify = require("tsify");

var packageJSON = require("./package.json");
var config = require("./src/config.js");

var scriptsPath = path.join(config.config.assets, "scripts");

packageJSON.bundle.entries.map(entry => {
    var outFile = fs.createWriteStream(path.join(scriptsPath,
        (entry.substr(0, entry.lastIndexOf(".")) + ".bundle.js")));
    browserify({
            basedir: scriptsPath,
            entries: [entry]
        })
        .plugin(tsify)
        .bundle()
        .pipe(outFile)
        .on("finish", () => {
            console.log("Bundled " + entry + "succesfully!");
        });
});
