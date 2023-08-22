function relateOrders(orders) {
  const MAX_PRICE_DIFFERENCE = 327

  for (let i = 0; i < orders.length; i++) {
    const orderOne = orders[i]

    for (let j = i + 1; j < orders.length; j++) {
      const orderTwo = orders[j]
      if (Math.abs(orderOne.price - orderTwo.price) <= MAX_PRICE_DIFFERENCE) {
        orderOne.related.push(orderTwo.id)
        orderTwo.related.push(orderOne.id)
      }
    }
  }

  return orders
}

console.log(
  relateOrders([
    { id: 1, price: 1002, related: [] },
    { id: 2, price: 1001, related: [] },
    { id: 3, price: 2001, related: [] },
  ])
)
