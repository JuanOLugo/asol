import { Request, Response } from "express";
import CategoryRepository from "../../../Domain/Repositories/Category";

class CategoryController{
    public async CreateCategory(req:Request,res:Response):Promise<any>{
        const category = req.body;
        try {
            const categoryCreated = await new CategoryRepository().CreateCategory(category);
            res.status(201).json(categoryCreated);
        } catch (error:any) {
            res.status(400).json({message:error.message});
        }
    }

    public async GetAllCategories(req:Request,res:Response):Promise<any>{
        const enterpriseId = req.params.enterpriseId;
        try {
            const category = await new CategoryRepository().GetAllCategories(enterpriseId);
            res.status(200).json(category);
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async UpdateCategory(req:Request,res:Response):Promise<any>{
        const categoryId = req.params.categoryId;
        const category = req.body;
        try {
            const categoryUpdated = await new CategoryRepository().UpdateCategory(categoryId, category);
            res.status(200).json({msg:"Category updated successfully"});
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async DeleteCategory(req:Request,res:Response):Promise<any>{
        const categoryId = req.params.categoryId;
        try {
            await new CategoryRepository().DeleteCategory(categoryId);
            res.status(200).json({msg:"Category deleted successfully"});
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }

    public async GetCategoryById(req:Request,res:Response):Promise<any>{
        const categoryId = req.params.categoryId;
        try {
            const category = await new CategoryRepository().GetCategoryById(categoryId);
            res.status(200).json({msg:"Category found successfully" ,category});
        }catch(error:any){
            res.status(400).json({message:error.message});
        }
    }
}

export default CategoryController;