import mongoose from "mongoose";
import ITitle from "../Interfaces/Db Interfaces/ITitle";
import TitleModel from "../../Infrestructure/Db/Models/Title";

class TitleRepository {
  public async CreateTitle(
    title: ITitle,
    enterpriseId: string,
    adminId: string,
    cargoGeneralId: string
  ): Promise<ITitle> {
    const titleCreating = await TitleModel.create({
      ...title,
      enterprise: enterpriseId,
      Admin: new mongoose.Types.ObjectId(adminId),
      category: new mongoose.Types.ObjectId(cargoGeneralId)

    });
    const titleCreated = await titleCreating.save().then(async res => TitleModel.findById(res._id).populate("category").populate("Admin"));
    if (!titleCreated) throw new Error("No se pudo crear el titulo");
    return titleCreated;
  }
  public async GetAllTitles(EnterpriseId: string): Promise<ITitle[]> {
    const titles = await TitleModel.find({ enterprise: EnterpriseId });
    if (!titles) throw new Error("No hay titulos");
    return titles;
  }
  public async UpdateTitle(titleId: string, title: ITitle, enterpriseId: string, adminId: string, categoryId: string): Promise<ITitle> {
    const titleUpdating = await TitleModel.findByIdAndUpdate(titleId, {...title, enterprise: enterpriseId, Admin: new mongoose.Types.ObjectId(adminId), category: new mongoose.Types.ObjectId(categoryId)}, {new: true}).populate("category").populate("Admin");
    if (!titleUpdating) throw new Error("No se pudo actualizar el titulo");
    return titleUpdating;
  }
  public async DeleteTitle(titleId: string): Promise<void> {
    const titleDeleting = await TitleModel.findByIdAndDelete(titleId);
    if (!titleDeleting) throw new Error("No se pudo eliminar el titulo");
  }
  public async GetTitleById(titleId: string): Promise<ITitle> {
    const title = await TitleModel.findById(titleId);
    if (!title) throw new Error("No se pudo encontrar el titulo");
    return title;
  }
}

export default TitleRepository;
