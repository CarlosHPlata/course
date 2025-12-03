
const getFlightById = async (flightNumber: string) => {
  try {
    const response = await fetch(`http://localhost:3001/flight/service/v1/flight/${flightNumber}`)
    const data = await response.json()
    return data //remove this
    //return new Flight(data.flightNumber, data.price)
  } catch (error) {
    throw error
  }
}
