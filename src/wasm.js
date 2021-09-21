const fs = require("fs");

const initWasmComparison = async () => {
    const wasmBuffer = fs.readFileSync("bin/add.wasm");
    const { instance, module } = await WebAssembly.instantiate(wasmBuffer, {});

    const wasm = test("wasm", () => {
        instance.exports.add(10, 10);
    }, 1000);
    
    const js = test("js", () => {
        add(10, 10);
    }, 1000);
}

function test(label, fn, iteration) {
    console.time(`${label}`);
    let i = 0;
    while (i < iteration) {
        fn();
        i += 1;
    }
    console.timeEnd(`${label}`);
}

function add(a, b) {
    return a + b;
}

initWasmComparison();