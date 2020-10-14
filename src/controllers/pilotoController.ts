import {Request, Response} from 'express';
import mysql_client from '../database';

//Get just one pilot
export const getPilot = (req:Request, res:Response)=>{
    const {id} = req.params;
    const query = `SELECT * FROM pilot WHERE id=${id}`;
    mysql_client.query(query,(err,results)=>{
        if(err)return res.json({ok:false,message:"route pilot does not work at this moment, please report it"});
        if(results.length===0)return res.json({ok:false,message:"Wrong id"});
        return res.json({ok:true,pilot:results[0]});
    });
}
export const getPilots = (req: Request, res: Response) =>{
    const query = `SELECT * FROM pilot`;
    mysql_client.query(query,(err, results)=>{
        if(err)return res.json({ok:false,message:"route pilots does not work at this moment, please report it"});
        res.json({ok:true,pilots:results});
    });
}


export const createPilot = (req:Request, res: Response)=>{
    const {name_pil, flying_hours} = req.body;

    if(!name_pil || !flying_hours)return res.status(400).json({ok:false,message:"name_pil and flying_hours must be provided"});
    if(flying_hours<0 || typeof flying_hours !== "number")return res.status(401).json({ok:false,message:"flying_hours must be a number and greater than 0"});
    
    const query = `INSERT INTO pilot(name_pil, flying_hours) VALUES("${name_pil}",${flying_hours})`;
    
    mysql_client.query(query,(err, results)=>{
        if(err)return res.json({ok:false,message:"piloto can't be saved, please try it later"});

        return res.json({ok:true,message:"Piloto saved",id:results.insertId});
    });
}

export const updatePilot = (req:Request, res:Response)=>{
    const {flying_hours} = req.body;
    const {id} = req.params;

    if(!id || !flying_hours)return res.status(400).json({ok:false,message:"id and flying_hours must be provided"});
    if(flying_hours<0 || typeof flying_hours !== "number")return res.status(401).json({ok:false,message:"flying_hours must be a number and greater than 0"});

    const query = `UPDATE pilot SET flying_hours=${flying_hours} WHERE id=${id}`;

    mysql_client.query(query,(err,results)=>{
        if(err)return res.json({ok:false,message:"piloto can't be updated, please try it later"});
        const {affectedRows} = results;
        if(affectedRows===0)return res.json({ok:false,message:"Wrong id"});

        res.json({ok:true,message:'piloto updated'});
    });
}

export const deletePilot = (req:Request, res:Response)=>{
    const {id} = req.params;
    const query = `DELETE FROM pilot WHERE id=${id}`;
    mysql_client.query(query,(err,results)=>{
        if(err)return res.json({ok:false,message:"route delete pilot does not work at this moment, please report it"});
        const {affectedRows} = results;
        if(affectedRows===0)return res.json({ok:false,message:"Wrong id"});
        return res.json({ok:true,message:"pilot removed"});
    });
}