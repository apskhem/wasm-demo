// import * as wasm from "./pkg";

onload = () => {
    initWasm();
}

const initWasm = async () => {
    const wasm = await WasmInitializer.create("pkg/wasm_demo_bg.wasm");

    const el = document.getElementById("demo");

    el.textContent = wasm.call("test", [ 12, 10 ]);
}

class WasmInitializer {
    constructor(source, exports) {
        this.source = source 
        this.exports = exports;
    }

    call(fnName, params) {
        return this.exports[fnName](...params);
    }

    static async create(source) {
        const res = await fetch(source);
        const buffer = await res.arrayBuffer();
        const pkg = await WebAssembly.instantiate(buffer);

        // MIME TYPE "application/wasm" PROBLEM
        // const res = await WebAssembly.instantiateStreaming(fetch(source));

        return new WasmInitializer(source, pkg.instance.exports);
    }
}