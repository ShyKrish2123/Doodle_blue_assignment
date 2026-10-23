const prices =[ 120,60,899];
const total = prices.reduce((sum,price) => sum + price,0);
console.log(total);