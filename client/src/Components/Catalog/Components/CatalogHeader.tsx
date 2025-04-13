import { formattedDate } from "../../../Config/Utils/Date";

export function CatalogHeader() {

  
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Catálogo</h1>
          <p className="text-gray-600">{formattedDate}</p>
        </div>
      </div>
    )
  }
  