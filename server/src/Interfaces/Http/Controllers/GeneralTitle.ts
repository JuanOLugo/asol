import { Request, Response } from "express";
import GeneralTitleRepository from "../../../Domain/Repositories/GeneralTitle";
import jwt from "jsonwebtoken";
class GeneralTitleController{
    public async CreateTitle(req:Request,res:Response):Promise<any>{
        const title = req.body;
        const enterpriseId = (req.user as {_id: string})?._id;
        const adminId: {id: string} = jwt.verify(req.body.adminId, process.env.JWT_SECRET || "secret") as {id: string};
        console.log(adminId)
        try {
            const titleCreated = await new GeneralTitleRepository().CreateTitle(title, enterpriseId, adminId.id);
            res.status(201).json(titleCreated);
        } catch (error:any) {
            res.status(400).json({message:error.message});
        }
    }

    public async GetAllTitles(req:Request,res:Response):Promise<any>{
        const enterpriseId = req.params.enterpriseId;
        try {
            const titles = await new GeneralTitleRepository().GetAllTitles(enterpriseId);
            res.status(200).json(titles);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async UpdateTitle(req:Request,res:Response):Promise<any>{
        const titleId = req.body.id;
        const title = req.body;
        const enterpriseId = (req.user as {_id: string})?._id;
        const adminId: {id: string} = jwt.verify(req.body.adminId, process.env.JWT_SECRET || "secret") as {id: string};
        try {
            const titleUpdated = await new GeneralTitleRepository().UpdateTitle(titleId, title, enterpriseId, adminId.id);
            res.status(200).json(titleUpdated);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async DeleteTitle(req:Request,res:Response):Promise<any>{
        const titleId = req.params.titleId;
        try {
            await new GeneralTitleRepository().DeleteTitle(titleId);
            res.status(200).json({message:"Titulo eliminado correctamente"});
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async GetTitleById(req:Request,res:Response):Promise<any>{
        const titleId = req.params.titleId;
        try {
            const title = await new GeneralTitleRepository().GetTitleById(titleId);
            res.status(200).json(title);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }
}

export default GeneralTitleController;