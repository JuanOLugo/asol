import CategoryModel from "../../Infrestructure/Db/Models/Category";
import ICategory from "../Interfaces/Db Interfaces/ICategory";
class CategoryRepository {
  public async CreateCategory(category: ICategory): Promise<ICategory> {
    const categoryCreating = await CategoryModel.create(category);
    const categoryCreated = await categoryCreating.save();
    return categoryCreated;
  }
  public async GetAllCategories(EnterpriseId: string): Promise<ICategory[]> {
    const categories = await CategoryModel.find({ enterprise: EnterpriseId });
    if (!categories) throw new Error("No hay categorias");
    return categories;
  }
  public async UpdateCategory(categoryId: string, category: ICategory): Promise<ICategory> {
    const categoryUpdating = await CategoryModel.findByIdAndUpdate(categoryId, category);
    if (!categoryUpdating) throw new Error("No se pudo actualizar la categoria");
    return categoryUpdating;
  }
  public async DeleteCategory(categoryId: string): Promise<void> {
    const categoryDeleting = await CategoryModel.findByIdAndDelete(categoryId);
    if (!categoryDeleting) throw new Error("No se pudo eliminar la categoria");
  }
  public async GetCategoryById(categoryId: string): Promise<ICategory> {
    const category = await CategoryModel.findById(categoryId);
    if (!category) throw new Error("No se pudo encontrar la categoria");
    return category;
  }
}

export default CategoryRepository;
