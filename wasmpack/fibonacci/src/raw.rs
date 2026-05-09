#![cfg(not(feature = "js"))]

use crate::core;

#[no_mangle]
pub extern "C" fn fibonacci_raw(n: u32) -> u32 {
    core::fibonacci(n)
}
