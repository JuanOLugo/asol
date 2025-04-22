import mongoose from "mongoose";
import CapacitationModel from "../../Infrestructure/Db/Models/Capacitation";
import ICapacitation from "../Interfaces/Db Interfaces/ICapacitation";
class CapacitationRepository {
  public async CreateCapacitation(capacitation: ICapacitation, adminId: string, enterpriseId: string, categoryId: string): Promise<ICapacitation> {
    const capacitacionCreating = await CapacitationModel.create({...capacitation, Admin: new mongoose.Types.ObjectId(adminId), enterprise: new mongoose.Types.ObjectId(enterpriseId), category: new mongoose.Types.ObjectId(categoryId)});
    const capacitacionCreated = await capacitacionCreating.save().then(res => res.populate("category"));
    return capacitacionCreated;
  }
  public async GetAllCapacitations(EnterpriseId: string): Promise<ICapacitation[]> {
    const capacitacion = await CapacitationModel.find({ enterprise: EnterpriseId });
    if (!capacitacion) throw new Error("No hay capacitaciones");
    return capacitacion;
  }
  public async UpdateCapacitation(capacitationId: string, capacitation: ICapacitation, adminId: string, enterpriseId: string, categoryId: string): Promise<ICapacitation> {
    const capacitationUpdating = await CapacitationModel.findByIdAndUpdate(capacitationId, {...capacitation, admin: adminId, enterprise: enterpriseId, category: new mongoose.Types.ObjectId(categoryId)}, {new: true}).populate("category").populate("Admin");
    if (!capacitationUpdating) throw new Error("No se pudo actualizar la capacitacion");
    return capacitationUpdating;
  }
  public async DeleteCapacitation(capacitationId: string, enterpriseId: string): Promise<void> {
    const capacitationDeleting = await CapacitationModel.findByIdAndDelete(capacitationId);
    if (!capacitationDeleting) throw new Error("No se pudo eliminar la capacitacion");
    if (capacitationDeleting.enterprise.toString() !== enterpriseId) throw new Error("No tienes permisos para eliminar esta capacitacion");
  }
  public async GetCapacitationById(capacitationId: string): Promise<ICapacitation> {
    const capacitation = await CapacitationModel.findById(capacitationId);
    if (!capacitation) throw new Error("No se pudo encontrar la capacitacion");
    return capacitation;
  }
}

export default CapacitationRepository;
