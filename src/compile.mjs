import fs from "fs";
import shell from "shelljs";

try {
    const files = fs.readdirSync("wat");

    for (const filename of files) {
        const [ name, ext ] = filename.split(".");
    
        shell.exec(`wat2wasm wat/${filename} -o public/wasm/${name}.wasm`)
    }

    console.log("Compiled successfully.");
}
catch (err) {
    console.log("Error!");
}
