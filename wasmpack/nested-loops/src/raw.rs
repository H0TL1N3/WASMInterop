#![cfg(not(feature = "js"))]

use crate::core;

#[no_mangle]
pub extern "C" fn nested_loops_raw(n: u64) -> u64 {
    core::nested_loops(n)
}
