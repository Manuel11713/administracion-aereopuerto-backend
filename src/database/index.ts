import mysql from 'mysql';
import config from '../config';

const mysql_config = {
    host:config.mysql.host,
    user:config.mysql.user,
    password:config.mysql.password,
    database: config.mysql.database_name
}

const mysql_client = mysql.createConnection(mysql_config);


export default mysql_client;
