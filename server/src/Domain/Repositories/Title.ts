import TitleModel from "../../Infrestructure/Db/Models/Title";
import ITitle from "../Interfaces/Db Interfaces/ITitle";
class TitleRepository {
  public async CreateTitle(title: ITitle): Promise<ITitle> {
    const titleCreating = await TitleModel.create(title);
    const titleCreated = await titleCreating.save();
    return titleCreated;
  }
  public async GetAllTitles(EnterpriseId: string): Promise<ITitle[]> {
    const titles = await TitleModel.find({ enterprise: EnterpriseId });
    if (!titles) throw new Error("No hay titulos");
    return titles;
  }
  public async UpdateTitle(titleId: string, title: ITitle): Promise<ITitle> {
    const titleUpdating = await TitleModel.findByIdAndUpdate(titleId, title);
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
