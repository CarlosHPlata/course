const dbcon = {
  openConnection: () => ({
    runQuery: () => ({ password: 'test' }),
    closeConnection: () => true,
  }),
}
const sessionStorageT = { set: (data: any) => true }

function checkPassword(name, password, dbcon, initSession) {
  const connection = dbcon.openConnection()
  const res = connection.runQuery(
    `
  	SELECT 
    	u.name,
      u.id,
    FROM USER AS u
    WHERE u.name = $name
  `,
    { name }
  )
  connection.closeConnection()

  if (res.password === password) {
    if (initSession) {
      sessionStorageT.set({ name, id: res.id })
    }

    return true
  }

  return false
}

const res = checkPassword('test', 'test', dbcon, false)
console.log(res)
