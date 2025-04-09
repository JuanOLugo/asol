import { Request, Response } from "express";
import CapacitationRepository from "../../../Domain/Repositories/Capacitation";

class CapacitationController{
    public async CreateCapacitation(req:Request,res:Response):Promise<any>{
        const capacitation = req.body;
        try {
            const capacitationCreated = await new CapacitationRepository().CreateCapacitation(capacitation);
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
        const capacitationId = req.params.capacitationId;
        const capacitation = req.body;
        try {
            const capacitationUpdated = await new CapacitationRepository().UpdateCapacitation(capacitationId, capacitation);
            res.status(200).json({msg:"Capacitation updated successfully"});
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async DeleteCapacitation(req:Request,res:Response):Promise<any>{
        const capacitationId = req.params.capacitationId;
        try {
            await new CapacitationRepository().DeleteCapacitation(capacitationId);
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