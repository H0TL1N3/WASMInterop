#![cfg(feature = "js")]

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

use crate::core;

fn get_string(obj: &JsValue, key: &str) -> String {
    js_sys::Reflect::get(obj, &JsValue::from_str(key))
        .unwrap()
        .as_string()
        .unwrap()
}

fn get_i32(obj: &JsValue, key: &str) -> i32 {
    js_sys::Reflect::get(obj, &JsValue::from_str(key))
        .unwrap()
        .as_f64()
        .unwrap() as i32
}

fn set_panic_hook() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

#[wasm_bindgen(start)]
pub fn init() {
    set_panic_hook();
}

#[wasm_bindgen]
pub fn dijkstra_js(edges: js_sys::Array, start: String, end: String) -> String {
    let mut out_edges = Vec::with_capacity(edges.length() as usize);

    for e in edges.iter() {
        let start = get_string(&e, "start");
        let end = get_string(&e, "end");
        let weight = get_i32(&e, "weight");

        out_edges.push(core::Edge { start, end, weight });
    }

    core::dijkstra(out_edges, start, end)
}
