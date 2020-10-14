import {Request, response, Response} from 'express';
import mysql_client from '../database';

export const getLobby = (req:Request, res:Response) => {
    let id = Number(req.params.id);

    if(id<0 || typeof id !== "number")return res.json({ok:false, message:"id param must be a number and greater than 0"});

    const query = `SELECT * FROM lobby WHERE id=${id}`;

    mysql_client.query(query,(err, results) => {
        if(err)return res.json({ok:false, message:"route Get lobby does not work at this moment, please report it"});
        if(results.length===0)return res.json({ok:false,message:"Wrong id"});
        return res.json({ok:true,lobby:results[0]});
    });
}

export const getLobbies = (req:Request, res:Response) => {
    const query = `SELECT * FROM lobby`;
    mysql_client.query(query,(err,results)=>{
        if(err)return res.json({ok:false,message:"route Get airplane does not work at this moment, please report it"});
        return res.json({ok:true,lobbies:results});
    });
}

export const createLobby = (req:Request,res:Response) =>{
    const {nameLobby} = req.body;
    if(!nameLobby)return res.json({ok:false, message:"nameLobby must be provided"});

    const query = `INSERT INTO lobby(name_lobby) VALUES("${nameLobby}")`;
    mysql_client.query(query,(err,results)=>{
        if(err)return res.json({ok:false, message:"route POST lobby does not work at this moment, please report it"});
        return res.json({ok:true,message:"lobby saved"});
    });    
}