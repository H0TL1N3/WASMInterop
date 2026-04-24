pub fn pi_approx(n: u32) -> f64 {
    let span = 1.0 / n as f64;
    let span4 = 4.0 * span;
    let half_span_sq_add1 = (span * span) / 4.0 + 1.0;

    let mut acc = 0.0;
    let mut x = 0.0;

    for _ in 0..n {
        acc += span4 / (x * (x + span) + half_span_sq_add1);
        x += span;
    }

    return acc;
}
