import CapacitationModel from "../../Infrestructure/Db/Models/Capacitation";
import ICapacitation from "../Interfaces/Db Interfaces/ICapacitation";
class CapacitationRepository {
  public async CreateCapacitation(capacitation: ICapacitation): Promise<ICapacitation> {
    const capacitacionCreating = await CapacitationModel.create(capacitation);
    const capacitacionCreated = await capacitacionCreating.save();
    return capacitacionCreated;
  }
  public async GetAllCapacitations(EnterpriseId: string): Promise<ICapacitation[]> {
    const capacitacion = await CapacitationModel.find({ enterprise: EnterpriseId });
    if (!capacitacion) throw new Error("No hay capacitaciones");
    return capacitacion;
  }
  public async UpdateCapacitation(capacitationId: string, capacitation: ICapacitation): Promise<ICapacitation> {
    const capacitationUpdating = await CapacitationModel.findByIdAndUpdate(capacitationId, capacitation);
    if (!capacitationUpdating) throw new Error("No se pudo actualizar la capacitacion");
    return capacitationUpdating;
  }
  public async DeleteCapacitation(capacitationId: string): Promise<void> {
    const capacitationDeleting = await CapacitationModel.findByIdAndDelete(capacitationId);
    if (!capacitationDeleting) throw new Error("No se pudo eliminar la capacitacion");
  }
  public async GetCapacitationById(capacitationId: string): Promise<ICapacitation> {
    const capacitation = await CapacitationModel.findById(capacitationId);
    if (!capacitation) throw new Error("No se pudo encontrar la capacitacion");
    return capacitation;
  }
}

export default CapacitationRepository;
