const PRICE_LIMIT = 327;
function relateOrders(orders) {
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    for (let j = i + 1; j < orders.length; j++) {
      const nextOrder = orders[j];
      if (Math.abs(order.price - nextOrder.price) <= PRICE_LIMIT) {
        order.related.push(nextOrder.id);
        nextOrder.related.push(order.id);
      }
    }
  }

  return orders;
}

console.log(
  relateOrders([
    { id: 1, price: 1000, related: [] },
    { id: 2, price: 1001, related: [] },
    { id: 3, price: 1001, related: [] },
  ])
);
