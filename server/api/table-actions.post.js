import mysql from 'mysql2';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    const pool = mysql.createPool({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name
    })

    if (body.action == 'drop') {
        pool.query(`
            DROP TABLE IF EXISTS ${body.tableName}
        `)
    }

    if (body.action == 'create') {
        pool.query(`
            CREATE TABLE IF NOT EXISTS ${body.tableName} (id INT AUTO_INCREMENT PRIMARY KEY, category VARCHAR(255), genre TEXT, title VARCHAR(255), appId VARCHAR(255), downloads TEXT, currency VARCHAR(255), price FLOAT, free BOOLEAN, summary TEXT) DEFAULT CHARSET=utf8mb4;
        `, (error) => {
            console.log(error)
        })

        pool.query(`
            ALTER TABLE ${body.tableName} 
            CHANGE summary summary TEXT 
            CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `, (error) => {
            console.log(error)
        })
    }

    if (body.action == 'clear') {
        pool.query(`
            DELETE FROM ${body.tableName}
        `, (error) => {
            console.log(error)
        })
    }

    return true
})