pub fn quick_sort(mut arr: Vec<f64>) -> Vec<f64> {
    let len = arr.len();

    if len <= 1 {
        return arr;
    }

    quick_sort_helper(&mut arr, 0, (len as isize) - 1);
    
    return arr;
}

// Separate internal function since we have "optional" args in the pseudocode 
fn quick_sort_helper(arr: &mut Vec<f64>, low: isize, high: isize) {
    if low >= high {
        return;
    }

    let pivot = arr[high as usize];
    let mut i = low;

    for j in low..high {
        if arr[j as usize] < pivot {
            arr.swap(i as usize, j as usize);
            i += 1;
        }
    }

    arr.swap(i as usize, high as usize);

    quick_sort_helper(arr, low, i - 1);
    quick_sort_helper(arr, i + 1, high);
}
