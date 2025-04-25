"use client";

import { useEffect, useState } from "react";
import { CatalogHeader } from "../Components/CatalogHeader";
import { CategorySection } from "../Components/CategorySection";
import { CapacitationList } from "../Components/CapacitationList";
import { CargoSection } from "../Components/CargoSection";
import { Category } from "../Interfaces/Category";
import { Training } from "../Interfaces/CatalogList";
import { Position } from "../Interfaces/Position";
import CatalogRepository from "../Repository/Catalog";
import AdminControllers from "../Controllers/_admin_";
import { CargoGeneralSection } from "../Components/CargoGeneral";
import { GeneralTitle } from "../Interfaces/GeneralTitle";
const catalogRepository = new CatalogRepository();
const adminControllers = new AdminControllers();
// Define item types

export default function CatalogPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [trainings, setTrainings] = useState<Training[] | null>(null);
  const [positions, setPositions] = useState<Position[] | null>(null);
  const [generalTitles, setGeneralTitles] = useState<GeneralTitle[] | null>(null);
  const {
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleAddTraining,
    handleUpdateTraining,
    handleDeleteTraining,
    handleAddPosition,
    handleUpdatePosition,
    handleDeletePosition,
    handleAddGeneralTitle,
    handleUpdateGeneralTitle,
    handleDeleteGeneralTitle,

  } = catalogRepository;

  const getCatalog = async () => {
    const catalog = await adminControllers.GetCatalog();
    setCategories(catalog.categories);
    const newCatalog = catalog.catalog.map((training: Training) => ({
      ...training,
      categoryName: catalog.categories.find(
        (category: Category) => category._id === training.category?._id
      )?.name,
    }));
    setTrainings(newCatalog);
    setPositions(catalog.titles);
    setGeneralTitles(catalog.generalTitles);
  };

  useEffect(() => {
    getCatalog();
  }, []);


  if (!categories || !trainings || !positions || !generalTitles) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <CatalogHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Cargo Section */}
          <CargoGeneralSection
            generalTitles={generalTitles}
            onAdd={(
              name: string,
              id: string,
              adminName: string,
              adminLastName: string
            ) =>
              handleAddGeneralTitle(
                name,
                setGeneralTitles,
                generalTitles,
                id,
                adminName,
                adminLastName
              )
            }
            onUpdate={(id: string, name: string) =>
              handleUpdateGeneralTitle(id, name, setGeneralTitles, generalTitles)
            }
            onDelete={(id: string) =>
              handleDeleteGeneralTitle(id, setGeneralTitles, generalTitles)
            }
          />

          {/* Cargo Section */}
          <CargoSection
            cargosGenerales={generalTitles}
            positions={positions}
            onAdd={(
              name: string, id: string, adminName: string, adminLastName: string, categoryName: string, categoryId: string
            ) =>
              handleAddPosition(
                setPositions,
                positions,
                name,
                id,
                adminName,
                adminLastName,
                categoryName,
                categoryId
              )
            }
              onUpdate={(id: string, name: string,  categoryId: string) =>
              handleUpdatePosition(id, name, setPositions, positions, categoryId)
            }
            onDelete={(id: string) =>
              handleDeletePosition(id, setPositions, positions)
            }
          
          />

          {/* Categoría Section */}
          <CategorySection
            categories={categories}
            onAdd={(
              name: string,
              id: string,
              adminName: string,
              adminLastName: string
            ) =>
              handleAddCategory(
                name,
                setCategories,
                categories,
                id,
                adminName,
                adminLastName
              )
            }
            onUpdate={(id: string, name: string) =>
              handleUpdateCategory(
                id,
                name,
                setCategories,
                categories,
                setTrainings,
                trainings
              )
            }
            onDelete={(id: string) =>
              handleDeleteCategory(
                id,
                setCategories,
                categories,
                setTrainings,
                trainings
              )
            }
          />

          {/* Capacitación Section */}
          <CapacitationList
            trainings={trainings}
            categories={categories}
            onAdd={(name: string, categoryId: string, id: string) =>
              handleAddTraining(
                name,
                setTrainings,
                trainings,
                categories,
                categoryId,
                id
              )
            }
            onUpdate={(id: string, name: string, categoryId: string) =>
              handleUpdateTraining(id, name, setTrainings, trainings, categoryId)
            }
            onDelete={(id: string) =>
              handleDeleteTraining(id, setTrainings, trainings)
            }
          />
        </div>
      </div>
    </div>
  );
}
