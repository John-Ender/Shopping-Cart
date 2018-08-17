
### Node
Use the following runtime dependencies.  Use NVM (Node version manager) to use different versions of node 
* node `v8.2.x`
* npm `v5.3.0`

## Install
    `npm install`
    
## Run Example
    `npm run dev`
    
Example Output

    Output 1:
        1 16lb bag of Skittles: 16.00
        1 Walkman: 109.99
        1 bag of microwave Popcorn: 0.99
        Sales Tax: 10.00
        Total: 126.98
     
    Output 2:
        1 imported bag of Vanilla-Hazelnut Coffee: 11.55
        1 Imported Vespa: 17,251.50
        Sales Tax: 2,250.80
        Total: 17,263.05
     
    Output 3:
        1 imported crate of Almond Snickers: 79.79
        1 Discman: 60.50
        1 Imported Bottle of Wine: 11.50
        1 300# bag of Fair-Trade Coffee: 997.99
        Sales Tax: 10.80
        Total: 1,149.78
        
        
Provided example output had conflicting decimal precision.

In the first example the output includes trailing zeros on values such as 16.00 or 10.00.

Yet in the second example trailing zeros are eliminated on 17,251.5 and 2,250.8.

To resolve the inconsistency all numeric values are treated as currency and include a decimal precision of 2
    
## Execute Unit Tests
    `npm run test`

