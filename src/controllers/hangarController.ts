import {Request, Response} from 'express';
import mysql_client from '../database';


export const getHangar = (req:Request, res:Response) => {
    const id = Number(req.params.id);
    if(id<0 || typeof id != "number")return res.json({ok:false, message:"id must be a number and greater than 0"});
    const query = `SELECT * FROM hangar WHERE id=${id}`;
    mysql_client.query(query,(err, results)=>{
        if(err)return res.json({ok:false, message:"route Get hangar does not work at this moment please report it"});
        if(results.length===0)return res.json({ok:false,message:"Wrong id"});
        res.json({ok:true, hangar:results[0]});
    });
}

export const getHangars = (req: Request, res: Response) => {
    const query = `SELECT * FROM hangar`;
    mysql_client.query(query, (err, results)=>{
        if(err)return res.json({ok:false, message:"route Get hangars does not work at this moment, please report it"});
        return res.json({ok:true,hangars:results});
    });
}

export const postHangar = (req:Request, res:Response) => {
    const {nameHangar }= req.body;
    if(!nameHangar)return res.json({ok:false, message:"nameHangar must be provided"});
    
    const query = `INSERT INTO hangar(name_hangar) VALUES("${nameHangar}")`;

    mysql_client.query(query,(err, results)=>{
        if(err)return res.json({ok:false, message:"route POST hangar does not work at this moment, please report it"});
        res.json({ok:true, messaged:"hangar created"});
    });
}