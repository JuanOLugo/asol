import { Training } from "../Interfaces/CatalogList";
import { Category } from "../Interfaces/Category";
import { Position } from "../Interfaces/Position";

class CatalogRepository {
  // Category handlers
  public handleAddCategory = (
    name: string,
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    categories: Category[]
  ) => {
    const newCategory = {
      id: categories.length > 0 ? (categories.length + 1).toString() : "2",
      name,
    };
    setCategories([...categories, newCategory]);
  };

  public handleUpdateCategory = (
    id: string,
    name: string,
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    categories: Category[],
    setTrainings: React.Dispatch<React.SetStateAction<Training[]>>,
    trainings: Training[]
  ) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, name } : category
      )
    );

    // Update category name in trainings
    setTrainings(
      trainings.map((training) =>
        training.categoryId === id
          ? { ...training, categoryName: name }
          : training
      )
    );
  };

  public handleDeleteCategory = (
    id: string,
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    categories: Category[],
    setTrainings: React.Dispatch<React.SetStateAction<Training[]>>,
    trainings: Training[]
  ) => {
    setCategories(categories.filter((category) => category.id !== id));

    // Remove category from trainings or handle as needed
    setTrainings(
      trainings.map((training) =>
        training.categoryId === id
          ? { ...training, categoryId: undefined, categoryName: undefined }
          : training
      )
    );
  };

  // Training handlers
  public handleAddTraining = (
    name: string,
    setTrainings: React.Dispatch<React.SetStateAction<Training[]>>,
    trainings: Training[],
    categories: Category[],
    categoryId: string
  ) => {
    const category = categories.find((c) => c.id === categoryId);
    const newTraining = {
      id:
        trainings.length > 0 ? Math.max(...trainings.map((t) => t.id)) + 1 : 1,
      name,
      categoryId,
      categoryName: category?.name,
    };
    setTrainings([...trainings, newTraining]);
  };

  public handleUpdateTraining = (
    id: number,
    name: string,
    setTrainings: React.Dispatch<React.SetStateAction<Training[]>>,
    trainings: Training[]
  ) => {
    setTrainings(
      trainings.map((training) =>
        training.id === id ? { ...training, name } : training
      )
    );
  };

  public handleDeleteTraining = (
    id: number,
    setTrainings: React.Dispatch<React.SetStateAction<Training[]>>,
    trainings: Training[]
  ) => {
    setTrainings(trainings.filter((training) => training.id !== id));
  };

  // Position handlers
  public handleAddPosition = (
    name: string,
    setPositions: React.Dispatch<React.SetStateAction<Position[]>>,
    positions: Position[]
  ) => {
    const newPosition = {
      id:
        positions.length > 0 ? Math.max(...positions.map((p) => p.id)) + 1 : 1,
      name,
    };
    setPositions([...positions, newPosition]);
  };

  public handleUpdatePosition = (
    id: number,
    name: string,
    setPositions: React.Dispatch<React.SetStateAction<Position[]>>,
    positions: Position[]
  ) => {
    setPositions(
      positions.map((position) =>
        position.id === id ? { ...position, name } : position
      )
    );
  };

  public handleDeletePosition = (
    id: number,
    setPositions: React.Dispatch<React.SetStateAction<Position[]>>,
    positions: Position[]
  ) => {
    setPositions(positions.filter((position) => position.id !== id));
  };
}

export default CatalogRepository;
