#![cfg(not(feature = "js"))]

use crate::core;

#[no_mangle]
pub extern "C" fn pi_approx_raw(n: u32) -> f64 {
    core::pi_approx(n)
}
