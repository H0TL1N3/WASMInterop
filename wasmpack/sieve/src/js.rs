#![cfg(feature = "js")]

use wasm_bindgen::prelude::*;
use crate::core;

fn set_panic_hook() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

#[wasm_bindgen(start)]
pub fn init() {
    set_panic_hook();
}

#[wasm_bindgen]
pub fn sieve_js(n: u32) -> Vec<u32> {
    core::sieve(n)
}
