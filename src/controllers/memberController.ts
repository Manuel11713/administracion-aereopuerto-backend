import {Request, Response} from "express";
import mysql_client from "../database";

export const getMember = (req:Request, res:Response) =>{
    const id = Number(req.params.id);
    if(id<0 || typeof id != "number")return res.json({ok:false, message:"id must be a number and greater than 0"});
    const query = `SELECT * FROM member WHERE id=${id}`;
    mysql_client.query(query, (err, results)=>{
        if(err)return res.json({ok:false, message:"route Get member does not work at this moment, please report it"});
        if(results.length===0)return res.json({ok:false,message:"Wrong id"});
        res.json({ok:true, member:results[0]});
    });
}

export const getMembers = (req: Request, res:Response) => {
    const query = `SELECT * FROM member`;
    mysql_client.query(query, (err, results)=>{
        if(err)return res.json({ok:false, message:"route Get members does not work at this moment, please report it"});
        res.json({ok:true, members:results});
    });
}

export const postMember = (req:Request, res:Response) => {
    const {nameMember} = req.body;
    if(!nameMember)return res.json({ok:false, message:"nameMember must be provided"});

    const query = `INSERT INTO member(name_member) VALUES("${nameMember}")`;
    mysql_client.query(query, (err, results)=>{
        if(err)return res.json({ok:false, message:"route Post member does not work at this moment, please report it"});

        res.json({ok:true, message:"member created"});
    });
}