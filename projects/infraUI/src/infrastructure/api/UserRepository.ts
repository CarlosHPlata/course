const getUserById = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:3001/user/service/v1/user/${userId}`)
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
