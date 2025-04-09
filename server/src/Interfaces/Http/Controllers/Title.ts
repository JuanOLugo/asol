import { Request, Response } from "express";
import TitleRepository from "../../../Domain/Repositories/Title";

class TitleController{
    public async CreateTitle(req:Request,res:Response):Promise<any>{
        const title = req.body;
        try {
            const titleCreated = await new TitleRepository().CreateTitle(title);
            res.status(201).json(titleCreated);
        } catch (error:any) {
            res.status(400).json({message:error.message});
        }
    }

    public async GetAllTitles(req:Request,res:Response):Promise<any>{
        const enterpriseId = req.params.enterpriseId;
        try {
            const titles = await new TitleRepository().GetAllTitles(enterpriseId);
            res.status(200).json(titles);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async UpdateTitle(req:Request,res:Response):Promise<any>{
        const titleId = req.params.titleId;
        const title = req.body;
        try {
            const titleUpdated = await new TitleRepository().UpdateTitle(titleId, title);
            res.status(200).json(titleUpdated);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async DeleteTitle(req:Request,res:Response):Promise<any>{
        const titleId = req.params.titleId;
        try {
            await new TitleRepository().DeleteTitle(titleId);
            res.status(200).json({message:"Titulo eliminado correctamente"});
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async GetTitleById(req:Request,res:Response):Promise<any>{
        const titleId = req.params.titleId;
        try {
            const title = await new TitleRepository().GetTitleById(titleId);
            res.status(200).json(title);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }
}

export default TitleController;