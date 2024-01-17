const dbcon = {
  openConnection: () => ({
    runQuery: () => ({ password: 'test' }),
    closeConnection: () => true,
  }),
}
const sessionStorageT = { set: (data: any) => true }

function getUser(dbcon) {
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

  return res
}

function checkPassword(loginData, dbcon) {
  const user = getUser(dbcon)

  if (user.password === loginData.password) {
    return true
  }

  return false
}

function initSession({ name, id }) {
  sessionStorageT.set({ name, id })
}

if (checkPassword({ user: 'test', password: 'test' }, dbcon)) {
  initSession(getUser(dbcon))
}
