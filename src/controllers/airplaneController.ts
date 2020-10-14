import {Request, Response} from 'express';
import mysql_client from '../database';

//Get just one airplane
export const getAirplane = (req:Request, res:Response)=>{
    const {id} = req.params;
    const query = `SELECT * FROM airplane WHERE id=${id}`;
    mysql_client.query(query,(err,results)=>{
        if(err)return res.json({ok:false,message:"route Get airplane does not work at this moment, please report it"});
        if(results.length===0)return res.json({ok:false,message:"Wrong id"});
        return res.json({ok:true,airplane:results[0]});
    });
}
export const getAirplanes = (req:Request, res:Response)=>{
    const query = `SELECT * FROM airplane`;
    mysql_client.query(query,(err,results)=>{
        if(err)return res.json({ok:false,message:"route Get airplane does not work at this moment, please report it"});
        return res.json({ok:true,airplanes:results});
    });
}

export const createAirplane = (req:Request, res:Response) =>{
    const {type} = req.body;
    const query = `INSERT INTO airplane(type) VALUES("${type}")`;

    mysql_client.query(query,(err,results)=>{
        if(err)res.json({ok:false,message:"route POST airplane does not work at this moment please report it"});
        res.json({ok:true, message:"airplane saved"});
    });
}


export const deleteAirplane = (req:Request, res:Response)=>{
    const {id} = req.params;
    const query = `DELETE FROM airplane WHERE id=${id}`;
    mysql_client.query(query,(err,results)=>{
        if(err)return res.json({ok:false,message:"route delete airplane does not work at this moment, please report it"});
        const {affectedRows} = results;
        if(affectedRows===0)return res.json({ok:false,message:"Wrong id"});
        return res.json({ok:true,message:"airplane removed"});
    });
}