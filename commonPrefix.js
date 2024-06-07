
function commonPrefix(inputs) {
    let results = [];
    
    inputs.forEach(s => {
        let totalSum = 0;
        let length = s.length;
        
        for (let i = 0; i < length; i++) {
            let suffix = s.substring(i);
            // Find the common prefix length
            let commonLength = 0;
            for (let j = 0; j < suffix.length; j++) {
                if (suffix[j] === s[j]) {
                    commonLength++;
                } else {
                    break;
                }
            }
            totalSum += commonLength;
        }
        
        results.push(totalSum);
    });
    
    return results;
}

// Sample Input
let inputs = ['ababaa'];
console.log(commonPrefix(inputs)); 

inputs = ['aa'];
console.log(commonPrefix(inputs)); 
