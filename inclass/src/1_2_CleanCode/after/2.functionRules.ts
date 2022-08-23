const dbcone = { openConnection: () => ({ runQuery: () => ({ password: 'test' }), closeConnection: () => true }) }
const sessionStorageT = { set: (data:any) => true }

type initSessionDto = { name: string, password: string }
type User = { id: number, name:string, password: string }

function getUserData({ name }: initSessionDto, dbcon) {
  const connection = dbcon.openConnection()
  const res = connection.runQuery(`
  	SELECT 
    	u.name,
      u.id,
    FROM USER AS u
    WHERE u.name = $name
  `, { name })
  connection.closeConnection()
  
  return res
}

function checkPassword({ password }: initSessionDto, user:User, initSession) {
  return user.password === password
}


const initData = {name: 'test', password: 'test'}
const user = getUserData(initData, dbcone)
const res = checkPassword(initData, user, false)
console.log(res)