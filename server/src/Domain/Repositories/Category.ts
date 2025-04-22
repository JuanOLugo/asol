import mongoose from "mongoose";
import CategoryModel from "../../Infrestructure/Db/Models/Category";
import ICategory from "../Interfaces/Db Interfaces/ICategory";
class CategoryRepository {
  public async CreateCategory(category: ICategory, enterpriseId: string, adminId: string): Promise<ICategory> {
    const categoryCreating = await CategoryModel.create({...category, enterprise: enterpriseId, Admin: new mongoose.Types.ObjectId(adminId)});
    const categoryCreated = await categoryCreating.save().then(async res => await res.populate("Admin"));
    return categoryCreated;
  }
  public async GetAllCategories(EnterpriseId: string): Promise<ICategory[]> {
    const categories = await CategoryModel.find({ enterprise: EnterpriseId });
    if (!categories) throw new Error("No hay categorias");
    return categories;
  }
  public async UpdateCategory(categoryId: string, category: ICategory, enterpriseId: string, adminId: string): Promise<ICategory> {
    const categoryUpdating = await CategoryModel.findByIdAndUpdate(categoryId, {...category, enterprise: enterpriseId, Admin: new mongoose.Types.ObjectId(adminId)});
    if (!categoryUpdating) throw new Error("No se pudo actualizar la categoria");
    return categoryUpdating;
  }
  public async DeleteCategory(categoryId: string, enterpriseId: string): Promise<void> {
    const categoryDeleting = await CategoryModel.findOneAndDelete({_id: categoryId, enterprise: enterpriseId});
    if (!categoryDeleting) throw new Error("No se pudo eliminar la categoria");
  }
  public async GetCategoryById(categoryId: string): Promise<ICategory> {
    const category = await CategoryModel.findById(categoryId);
    if (!category) throw new Error("No se pudo encontrar la categoria");
    return category;
  }
}

export default CategoryRepository;
