onload = () => {
    initWasmComparison();
}

const initWasmComparison = async () => {
    const demo1 = document.getElementById("demo-1");
    const demo2 = document.getElementById("demo-2");
    
    const mem = new WebAssembly.Memory({ initial: 1 });
    const global = new WebAssembly.Global({ value: "i32", mutable: true }, 0);

    const importObject = {
        console: {
            log: (x) => {
                console.log(x)
            }
        },
        js: {
            mem
        }
    };

    const { instance, module } = await WebAssembly.instantiateStreaming(fetch("out.wasm"), {});

    const exports = instance.exports;

    console.warn(instance, module);

    // wasm section
    const wasm = test(() => {
        exports.add(1e6);
    }, 1000);

    // js section
    const js = test(() => {
        add(1e6);
    }, 1000);

    demo1.textContent = `WebAssembly: ${wasm.toLocaleString("en")} ms`;
    demo2.textContent = `JavaScript: ${js.toLocaleString("en")} ms`;
}

function test(fn, iteration) {
    const t1 = performance.now();

    let i = 0;
    while (i < iteration) {
        fn();
        i += 1;
    }

    const t2 = performance.now();
    
    return t2 - t1;
}

function add(n) {
    let res = 0;
    for (let i = 0; i < n; i++) {
        res += i
    }

    return res
}

function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
