import app from './app';
import mysql_client from './database';


//-----Init Database
mysql_client.connect((err)=>{
    if(err){
        console.log(err);
        throw new Error("no se pudo conectar");
    }
    console.log('mysql online');
});

//-----Init App
const port = process.env.PORT || 5000;

app.listen(port,()=>console.log('Server on port: ',port));