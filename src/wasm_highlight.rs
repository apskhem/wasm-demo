extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn wasm_highlight(text: &str, lang: &str) -> String {
    let s = String::from(text);

    return s;
}