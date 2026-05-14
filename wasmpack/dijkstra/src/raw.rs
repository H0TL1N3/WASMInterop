#![cfg(not(feature = "js"))]

use crate::core;
use std::slice;

static mut LAST_LEN: usize = 0;

// Helper structs for inputs
#[derive(serde::Deserialize)]
struct EdgeInput {
    start: String,
    end: String,
    weight: i32,
}

#[derive(serde::Deserialize)]
struct DijkstraInput {
    start: String,
    end: String,
    edges: Vec<EdgeInput>,
}

// Create read-only pointer and allocate memory
#[no_mangle]
pub extern "C" fn dijkstra_input_alloc(len: usize) -> *mut u8 {
    let mut b = vec![0u8; len].into_boxed_slice();
    let ptr = b.as_mut_ptr();
    std::mem::forget(b);
    return ptr;
}

// Pass read-only pointer, return new pointer (similar to sieve)
// Main dijkstra function
#[no_mangle]
pub extern "C" fn dijkstra_raw(in_ptr: *const u8, len: usize) -> *mut u8 {
    // Parse input into String, parse String as JSON into data
    let input_bytes = unsafe { slice::from_raw_parts(in_ptr, len) };
    let input_str = String::from_utf8_lossy(input_bytes);
    let input: DijkstraInput = match serde_json::from_str(&input_str) {
        Ok(v) => v,
        Err(_) => {
            let mut msg = "invalid json".to_string().into_bytes();
            unsafe {
                LAST_LEN = msg.len();
            }
            let ptr = msg.as_mut_ptr();
            std::mem::forget(msg);
            return ptr;
        }
    };
    let edges = input.edges.into_iter().map(|e| core::Edge {
        start: e.start,
        end: e.end,
        weight: e.weight,
    }).collect();

    // Run main function
    let result = core::dijkstra(edges, input.start, input.end);

    // Keep length, return pointer
    let mut bytes = result.into_bytes();
    unsafe {
        LAST_LEN = bytes.len();
    }
    let ptr = bytes.as_mut_ptr();
    std::mem::forget(bytes);

    return ptr;
}

// We need to return length to use with the pointer
#[no_mangle]
pub extern "C" fn dijkstra_len() -> usize {
    unsafe { LAST_LEN }
}

// We also need a free function after we use the pointer with length
#[no_mangle]
pub extern "C" fn dijkstra_free(ptr: *mut u8, len: usize) {
    unsafe {
        let _ = Vec::from_raw_parts(ptr, len, len);
    }
}
