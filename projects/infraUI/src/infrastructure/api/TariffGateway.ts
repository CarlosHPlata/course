const getTariff = async () => {
  try {
    const response = await fetch('http://localhost:3001/accounting/service/v1/tariff')
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

