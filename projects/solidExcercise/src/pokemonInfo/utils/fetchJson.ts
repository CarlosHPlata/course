
export const fetchJson = async (path: string): Promise<any> => {
  try {
    return await fetch(path)
      .then(async (res) => await res.json())
  } catch (e) {
    throw new Error('pokemon not found')
  }
}
