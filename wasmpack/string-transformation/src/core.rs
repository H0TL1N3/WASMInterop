pub fn string_transformation(str: String) -> String {
    let upper_lower_diff = 32;
    let mut is_first_letter = true;
    let mut result = String::new();

    for ch in str.chars() {
        let code = ch as u32;

        // Not a latin letter
        if code < 65 || (code > 90 && code < 97) || code > 122 {
            result.push(ch);
            is_first_letter = true;
        } else if is_first_letter {
            let mut new_code = code;

            if (97..=122).contains(&code) {
                new_code -= upper_lower_diff;
            }

            if let Some(c) = char::from_u32(new_code) {
                result.push(c);
            }

            is_first_letter = false;
        } else {
            let mut new_code = code;

            if (65..=90).contains(&code) {
                new_code += upper_lower_diff;
            }

            if let Some(c) = char::from_u32(new_code) {
                result.push(c);
            }
        }
    }

    return result;
}
