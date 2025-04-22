import { Request, Response } from "express";
import CapacitationRepository from "../../../Domain/Repositories/Capacitation";
import jwt from "jsonwebtoken";
class CapacitationController{
    public async CreateCapacitation(req:Request,res:Response):Promise<any>{
        const capacitation = req.body;
        console.log(capacitation);
        const adminId = (jwt.verify(req.body.adminId, process.env.JWT_SECRET || "secret") as {id: string});
        const enterpriseId = (req.user as {id: string}).id;
        try {
            const capacitationCreated = await new CapacitationRepository().CreateCapacitation(capacitation, adminId.id, enterpriseId, capacitation.categoryId);
            res.status(201).json(capacitationCreated);
        } catch (error:any) {
            res.status(400).json({message:error.message});
        }
    }

    public async GetAllCapacitations(req:Request,res:Response):Promise<any>{
        const enterpriseId = req.params.enterpriseId;
        try {
            const capacitation = await new CapacitationRepository().GetAllCapacitations(enterpriseId);
            res.status(200).json(capacitation);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async UpdateCapacitation(req:Request,res:Response):Promise<any>{
        const capacitation = req.body;
        const adminId = (jwt.verify(req.body.adminId, process.env.JWT_SECRET || "secret") as {id: string});
        const enterpriseId = (req.user as {id: string}).id;

        try {
            const capacitationUpdated = await new CapacitationRepository().UpdateCapacitation(capacitation.id, capacitation, adminId.id, enterpriseId, capacitation.categoryId);
            res.status(200).json({msg:"Capacitation updated successfully", capacitationUpdated});
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async DeleteCapacitation(req:Request,res:Response):Promise<any>{
        const enterpriseId = (req.user as {id: string}).id;
        const capacitationId = req.params.capacitationId;
        try {
            await new CapacitationRepository().DeleteCapacitation(capacitationId, enterpriseId);
            res.status(200).json({msg:"Capacitation deleted successfully"});
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async GetCapacitationById(req:Request,res:Response):Promise<any>{
        const capacitationId = req.params.capacitationId;
        try {
            const capacitation = await new CapacitationRepository().GetCapacitationById(capacitationId);
            res.status(200).json({msg:"Capacitation found successfully" ,capacitation});
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }
}

export default CapacitationController;