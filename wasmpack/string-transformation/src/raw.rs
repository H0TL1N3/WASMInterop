#![cfg(not(feature = "js"))]

use crate::core;
use std::slice;

static mut LAST_LEN: usize = 0;

// Create read-only pointer and allocate memory
#[no_mangle]
pub extern "C" fn string_transformation_input_alloc(len: usize) -> *mut u8 {
    let mut b = vec![0u8; len].into_boxed_slice();
    let ptr = b.as_mut_ptr();
    std::mem::forget(b);
    return ptr;
}

// Pass read-only pointer, return new pointer (similar to sieve)
// Main transformation function
#[no_mangle]
pub extern "C" fn string_transformation_raw(in_ptr: *const u8, len: usize) -> *mut u8 {
    let input_bytes = unsafe {
        slice::from_raw_parts(in_ptr, len)
    };

    let input_str = String::from_utf8_lossy(input_bytes).to_string();
    let output = core::string_transformation(input_str);

    // Save length as bytes, since UTF-8 is byte variable (each symbol is 1-4 bytes)
    let mut bytes = output.into_bytes();
    unsafe {
        LAST_LEN = bytes.len();
    }

    let out_ptr = bytes.as_mut_ptr();
    std::mem::forget(bytes);

    return out_ptr;
}

// We need to return length to use with the pointer;
// length in this case is bytes, not array/string length
#[no_mangle]
pub extern "C" fn string_transformation_len() -> usize {
    return unsafe { LAST_LEN };
}
