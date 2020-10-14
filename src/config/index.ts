import dotenv from 'dotenv';
dotenv.config();

const config = {
    mysql:{
        user: process.env.USERMYSQL || 'manuel',
        database_name : process.env.DATABASE_NAME_MYSQL || 'AIRPORT',
        host: process.env.HOST_MYSQL || 'localhost',
        password: process.env.PASSWORDMYSQL
    }
}

export default config;