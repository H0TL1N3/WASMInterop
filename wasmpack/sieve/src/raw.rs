#![cfg(not(feature = "js"))]

use crate::core;

static mut LAST_LEN: usize = 0;

// We can't easily export array, so we must return a pointer
#[no_mangle]
pub extern "C" fn sieve_raw(n: u32) -> *mut u32 {
    let result = core::sieve(n);

    unsafe {
        LAST_LEN = result.len();
    }

    let mut boxed = result.into_boxed_slice();
    let ptr = boxed.as_mut_ptr();
    std::mem::forget(boxed);

    return ptr;
}

// We need to return length to use with the pointer
#[no_mangle]
pub extern "C" fn sieve_len() -> usize {
    return unsafe { LAST_LEN };
}

// We also need a free function after we use the pointer with length
#[no_mangle]
pub extern "C" fn sieve_free(ptr: *mut u32, len: usize) {
    return unsafe {
        let _ = Vec::from_raw_parts(ptr, len, len);
    };
}
