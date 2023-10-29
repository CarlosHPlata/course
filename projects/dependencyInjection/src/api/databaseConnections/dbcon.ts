import * as MySql from 'mysql'
export interface DBResponse { results: any[], fields?: MySql.FieldInfo[] }

const getDbConfig = () => ({
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '3306'),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'pokedb'
})

export function createDBConnection(): MySql.Connection {
  return MySql.createConnection(getDbConfig())
}

export async function runQuery(sql: string, params?: Record<string, string | number | boolean>): Promise<DBResponse> {
  const connection = createDBConnection()
  if (params != null) sql = buildQueryString(sql, params)

  return await runDbQuery(sql, connection)
    .then((res) => {
      connection.end()
      return res
    })
}

async function runDbQuery(sql: string, connection: MySql.Connection): Promise<DBResponse> {
  return await new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error != null) { reject(error) };

      resolve({ results, fields })
    })
  })
}

export function buildQueryString(sql: string, params: Record<string, string | number | boolean>): string {
  Object.entries(params).forEach(([key, value]) => {
    sql = sql.replace(`$${key}`, parseValue(value))
  })

  return sql
}

const parseValue = (val: string | number | boolean) => {
  const fun = mapValueType[typeof val]

  if (fun !== undefined) return fun(val)
  return val
}

const mapValueType: Record<string, (val: any) => any> = {
  string: (val: string) => `"${val}"`
}

export async function runTransaction(queries: string[]) {
  const connection = createDBConnection()
  connection.connect()
  await beginTransaction(connection)

  try {
    for (const query of queries) {
      await runDbQuery(query, connection)
    }
    await new Promise((resolve, reject) => {
      connection.commit((err) => {
        if (err != null) reject(err)
        resolve('')
      })
    })
  } catch (e) {
    connection.rollback()
  } finally {
    connection.end()
  }
}

async function beginTransaction(connection: MySql.Connection) {
  return await new Promise((resolve, reject) => {
    connection.beginTransaction(err => {
      if (err != null) {
        connection.rollback()
        reject(err)
      }

      resolve('begin')
    })
  })
}
