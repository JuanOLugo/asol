import WorkshopModel from "../../Infrestructure/Db/Models/Workshop";
import IWorkshop from "../Interfaces/Db Interfaces/IWorkshop";
class WorkShopRepository {
    public async CreateWorshop(workshop: IWorkshop){
        if(!workshop) throw new Error("no hay tarea asignada")
        const newWorkshop = new WorkshopModel(workshop)
        if(!workshop) throw new Error("Error al crear el workshop")
        return await newWorkshop.save()
    }
}

export default WorkShopRepository