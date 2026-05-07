#![cfg(not(feature = "js"))]

use crate::core;

static mut LAST_LEN: usize = 0;

// Create read-only pointer and allocate memory
#[no_mangle]
pub extern "C" fn bubble_sort_input_alloc(len: usize) -> *mut i32 {
    let mut v = vec![0i32; len];
    let ptr = v.as_mut_ptr();
    std::mem::forget(v);
    return ptr;
}

// Clear from read-only pointer
#[no_mangle]
pub extern "C" fn bubble_sort_input_dealloc(ptr: *mut i32, len: usize) {
    return unsafe {
        let _ = Vec::from_raw_parts(ptr, len, len);
    };
}

// Pass read-only pointer, return new pointer (similar to sieve)
#[no_mangle]
pub extern "C" fn bubble_sort_raw(in_ptr: *const i32, len: usize) -> *mut i32 {
    let input = unsafe {
        std::slice::from_raw_parts(in_ptr, len)
    };

    // Clone to avoid mutation
    let mut vec = input.to_vec();
    let sorted = core::bubble_sort(vec);

    unsafe {
        LAST_LEN = sorted.len();
    }

    let mut boxed = sorted.into_boxed_slice();
    let out_ptr = boxed.as_mut_ptr();
    std::mem::forget(boxed);

    return out_ptr;
}

// We need to return length to use with the pointer
#[no_mangle]
pub extern "C" fn bubble_sort_len() -> usize {
    return unsafe { LAST_LEN };
}

// We also need a free function after we use the pointer with length
#[no_mangle]
pub extern "C" fn bubble_sort_free(ptr: *mut i32, len: usize) {
    return unsafe {
        let _ = Vec::from_raw_parts(ptr, len, len);
    };
}
