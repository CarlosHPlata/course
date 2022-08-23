
function makeOrders(x) {
  for(let i=0; i<x.length; i++) {
      const z = x[i]
    
      for(let j=i+1; j<x.length; j++){
          const y = x[j]
          if(z.price - y.price <= 327) {
              z.related.push(y.id)
          }
      }
  }

  return x;
};

console.log(makeOrders([
  { id: 1, price: 1000, related: []},
  { id: 2, price: 1001, related: []}
]))