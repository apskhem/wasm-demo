extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: f64, b: f64) -> f64 {
    a + b
}

#[wasm_bindgen]
pub fn subtract(a: f64, b: f64) -> f64 {
    a - b
}

#[wasm_bindgen]
pub fn multiply(a: f64, b: f64) -> f64 {
    a * b
}

#[wasm_bindgen]
pub fn divide(a: f64, b: f64) -> f64 {
    a / b
}

#[wasm_bindgen]
pub fn sqrt(a: f64) -> f64 {
    a.sqrt()
}

#[wasm_bindgen]
pub fn pow(a: f64, b: f64) -> f64 {
    a.powf(b)
}

#[wasm_bindgen]
pub fn sum(n: u64) -> u64 {
    let mut sum = 0;
    for x in 0..n {
        sum += x;
    }

    return sum;
}