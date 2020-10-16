import {Request, Response} from 'express';
import mysql_client from '../database';

export const getFlight = (req:Request, res:Response) =>{
    const id = Number(req.params.id);
    if(id<0 || typeof id != "number")return res.json({ok:false, message:"id must be a number and greater than 0"});
    const query = `SELECT * FROM flight WHERE id=${id}`;
    mysql_client.query(query, (err, results)=>{
        if(err)return res.json({ok:false, message:"route Get Flight does not work"});
        if(results.length==0)return res.json({ok:false, message:"Wrong id"});
        res.json({Ok:true, flight: results[0]});
    });

}

export const getFlights = (req:Request, res:Response) => {
    const query = `SELECT flight.id, origin, destination, hour, date,name_lobby, name_hangar FROM flight 
                    INNER JOIN lobby ON lobby_id=lobby.id 
                    INNER JOIN hangar ON hangar_id=hangar.id;    `;
    mysql_client.query(query, (err, results)=>{
        if(err)return res.json({ok:true, message:"Route Get Flights does not work"});
        res.json({ok:true, flights:results});
    });
}
export const createFlight = (req:Request, res:Response) =>{
    const {origin, destination, hour, date, airplane_id, lobby_id, hangar_id, pilots, members} = req.body;
    if(!origin || !destination || !hour || !date || !airplane_id || !lobby_id || !hangar_id || !pilots || !members){
        return res.json({
            ok:false,
            message:"pilots, members, origin, destination, hour, date, airplane_id, lobby_id and hangar_id must be provided"
        });
    }
    if(typeof pilots != "object" || typeof members != "object")return res.json({ok:false, message:"pilots and members must be a numerical array"});

    const query = `INSERT INTO flight(origin, destination, hour, date, airplane_id, lobby_id, hangar_id) VALUES("${origin}","${destination}","${hour}","${date}",${airplane_id},${lobby_id},${hangar_id})`
    mysql_client.query(query,(err, results)=>{
        console.log(err);
        if(err)return res.json({ok:false, message:"route post flight does not work at this moment, please report it"});
        const {insertId} = results


        pilots.forEach((pilot:number )=> {
            mysql_client.query(`INSERT INTO pilot_flight(pilot_id, flight_id) VALUES(${pilot},${insertId})`);
        });

        members.forEach((member:number )=> {
            mysql_client.query(`INSERT INTO member_flight(member_id, flight_id) VALUES(${member},${insertId})`);
        });

        res.json({ok:true, insertId});
    });
}