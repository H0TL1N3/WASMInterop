pub fn sieve(n: u32) -> Vec<u32> {
    let n = n as usize;

    // Initialization
    let mut is_prime = vec![1u8; n + 1];
    if n >= 0 { is_prime[0] = 0; }
    if n >= 1 { is_prime[1] = 0; }

    // Find primes
    let limit = (n as f64).sqrt() as usize;
    for i in 2..=limit {
        if is_prime[i] == 1 {
            let mut j = i * i;
            while j <= n {
                is_prime[j] = 0;
                j += i;
            }
        }
    }

    // Collect results
    let mut result = Vec::new();
    for i in 2..=n {
        if is_prime[i] == 1 {
            result.push(i as u32);
        }
    }

    return result;
}
