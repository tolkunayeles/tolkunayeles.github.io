function checkThreeAndTwo(arr) {
    let count = {};
    for (let i = 0; i < arr.length; i++) {
        const char = arr[i];
       
        count[char] = (count[char] || 0) + 1;
    }

    // Get the values from the count object
    const values = Object.values(count);

    // Check if the array contains exactly one 3 and one 2
    return values.includes(3) && values.includes(2);
}

// Test cases
console.log(checkThreeAndTwo(["a", "a", "a", "b", "b"])); // true
console.log(checkThreeAndTwo(["a", "b", "c", "b", "c"])); // false
console.log(checkThreeAndTwo(["a", "a", "a", "a", "a"])); // false
