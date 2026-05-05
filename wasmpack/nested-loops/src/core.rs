pub fn nested_loops(n: u64) -> u64 {
    let mut sum: u64 = 0;

    for i in 0..n {
        for j in 0..n {
            sum += i * j;
        }
    }

    return sum;
}
