import mongoose from "mongoose";
import ITitle from "../Interfaces/Db Interfaces/ITitle";
import GeneralTitleModel from "../../Infrestructure/Db/Models/GeneralTitle";
import IGeneralTitle from "../Interfaces/Db Interfaces/GeneralTitle";
class GeneralTitleRepository {
  public async CreateTitle(
    title: ITitle,
    enterpriseId: string,
    adminId: string,
  ): Promise<IGeneralTitle> {
    const titleCreating = await GeneralTitleModel.create({
      ...title,
      enterprise: enterpriseId,
      Admin: new mongoose.Types.ObjectId(adminId)
    });
    const titleCreated = await titleCreating.save().then(async res => await res.populate("Admin"));
    return titleCreated;
  }
  public async GetAllTitles(EnterpriseId: string): Promise<IGeneralTitle[]> {
    const titles = await GeneralTitleModel.find({ enterprise: EnterpriseId });
    if (!titles) throw new Error("No hay titulos");
    return titles;
  }
  public async UpdateTitle(titleId: string, title: IGeneralTitle, enterpriseId: string, adminId: string): Promise<IGeneralTitle> {
    const titleUpdating = await GeneralTitleModel.findByIdAndUpdate(titleId, {...title, enterprise: enterpriseId, Admin: new mongoose.Types.ObjectId(adminId)});
    if (!titleUpdating) throw new Error("No se pudo actualizar el titulo");
    return titleUpdating;
  }
  public async DeleteTitle(titleId: string): Promise<void> {
    const titleDeleting = await GeneralTitleModel.findByIdAndDelete(titleId);
    if (!titleDeleting) throw new Error("No se pudo eliminar el titulo");
  }
  public async GetTitleById(titleId: string): Promise<IGeneralTitle> {
    const title = await GeneralTitleModel.findById(titleId);
    if (!title) throw new Error("No se pudo encontrar el titulo");
    return title;
  }
}

export default GeneralTitleRepository;
