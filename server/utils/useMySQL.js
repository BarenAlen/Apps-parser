import mysql from 'mysql2';

export const useMySQL = () => {
    const config = useRuntimeConfig()

    const pool = mysql.createPool({
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name
    })

    return {
        pool
    }
}