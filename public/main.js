import { js, sample } from "./module.js";

const ITERATION_COUNT = 10000;

onload = () => {
    initWasmComparison();
}

const initWasmComparison = async () => {
    const demo1 = document.getElementById("demo-1");
    const demo2 = document.getElementById("demo-2");

    const { instance, module } = await WebAssembly.instantiateStreaming(fetch("wasm/add.wasm"), {});
    
    for (const [ name, fn ] of Object.entries(js)) {
        const args = sample[name];

        if (typeof args === "undefined" || typeof instance.exports[name] === "undefined") {
            throw new Error("Unexpected unready environment.");
        }

        // wasm section
        const wasm = test(instance.exports[name], args, ITERATION_COUNT);

        // js section
        const js = test(fn, args, ITERATION_COUNT);

        demo1.textContent = `WebAssembly: ${wasm.toLocaleString("en")}ms`;
        demo2.textContent = `JavaScript: ${js.toLocaleString("en")}ms`;
    }
}

function test(fn, args, iteration) {
    const t1 = performance.now();

    let i = 0;
    while (i < iteration) {
        fn(...args);
        i += 1;
    }

    const t2 = performance.now();
    
    return t2 - t1;
}
