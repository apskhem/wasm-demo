onload = () => {
    initWasmComparison();
}

const initWasmComparison = async () => {
    const demo1 = document.getElementById("demo-1");
    const demo2 = document.getElementById("demo-2");
    
    const mem = new WebAssembly.Memory({ initial: 1 });

    const importObject = {
        console: {
            log: consoleLogString
        },
        js: {
            mem
        }
    };

    const { instance, module } = await WebAssembly.instantiateStreaming(fetch("wasm_demo_bg.wasm"));

    const exports = instance.exports;

    let t1, t2;

    // wasm section
    t1 = performance.now();

    exports.sum(1e6);

    t2 = performance.now();

    demo1.textContent = `WebAssembly: ${t2 - t1} ms`;

    // js section
    t1 = performance.now();

    sum(1e6);

    t2 = performance.now();

    demo2.textContent = `JavaScript: ${t2 - t1} ms`;
}

function sum(n) {
    let res = 0;
    for (let i = 0; i < n; i++) {
        res += i
    }

    return res
}

const initWasm = async () => {
    const wasm = await Wassembler.create("wasm_demo_bg.wasm");

    const el = document.getElementById("demo");

    const res = wasm.call("sum", [ 10, 12 ]);

    el.textContent = res;
}

class Wassembler {
    static async create(source) {
        const src = await fetch(source);

        // fisrt plan
        try {
            const { instance, module } = await WebAssembly.instantiateStreaming(src);

            return new WassemblerInstance(source, instance);
        }
        catch (e) {
            console.warn(e);
        }

        // second plan
        try {
            const buffer = await src.arrayBuffer();
            const { instance, module } = await WebAssembly.instantiate(buffer);

            console.log(instance);
    
            return new WassemblerInstance(source, instance);
        }
        catch (e) {
            console.warn(e);
        }

        return null;
    }
}

class WassemblerInstance {
    constructor(source, instance) {
        this.source = source 
        this.exports = instance.exports;
        this.instance = instance;
    }

    call(fnName, params) {
        try {
            return params ? this.exports[fnName](...params) : this.exports[fnName]();
        }
        catch (e) {
            console.warn(`Cannot call "${fnName}" or it does not exist`);
        }
    }

    get memoryBuffer() {
        return new Uint8Array(this.exports.memory.buffer);
    }
}
