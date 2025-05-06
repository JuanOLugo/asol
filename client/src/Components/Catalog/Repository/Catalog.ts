import { Training } from "../Interfaces/CatalogList";
import { Category } from "../Interfaces/Category";
import { Position } from "../Interfaces/Position";
import CategoryController from "../Controllers/Category";
import Cookies from "js-cookie";
import TitleController from "../Controllers/Title";
import CapacitationControllers from "../Controllers/Capacitation";
import GeneralTitleController from "../Controllers/GeneralCargos";
import { GeneralTitle } from "../Interfaces/GeneralTitle";
import { swalWithBootstrapButtons } from "../../../Config/SwalConfig";
const categoryController = new CategoryController();
const titleController = new TitleController();
const capacitationController = new CapacitationControllers();
const generalTitleController = new GeneralTitleController();
class CatalogRepository {
  // Category handlers
  public handleAddCategory = (
    name: string,
    setCategories: React.Dispatch<React.SetStateAction<Category[] | null>>,
    categories: Category[] | null,
    id: string,
    adminName: string,
    adminLastName: string
  ) => {
    if (!categories) return;

    const newCategory = {
      name,
      _id: id,
      Admin: {
        name: adminName,
        lastName: adminLastName,
      },
    };
    setCategories([...categories, newCategory]);
  };

  public handleUpdateCategory = async (
    id: string,
    name: string,
    setCategories: React.Dispatch<React.SetStateAction<Category[] | null>>,
    categories: Category[],
    setTrainings: React.Dispatch<React.SetStateAction<Training[] | null>>,
    trainings: Training[] | null
  ) => {
    if (!categories || !trainings) return;
    setCategories(
      categories.map((category) =>
        category._id === id ? { ...category, name } : category
      )
    );

    const data = {
      name,
      description: "",
      adminId: Cookies.get("admin-token") || "",
    };

    try {
      const response = await categoryController.UpdateCategory(id, data);
      setTrainings(
        trainings.map((training) =>
          training.categoryId === id
            ? { ...training, categoryName: name }
            : training
        )
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    // Update category name in trainings
  };

  public handleDeleteCategory = async (
    id: string,
    setCategories: React.Dispatch<React.SetStateAction<Category[] | null>>,
    categories: Category[],
    setTrainings: React.Dispatch<React.SetStateAction<Training[] | null>>,
    trainings: Training[] | null
  ) => {
    if (!categories || !trainings) return;
    

    // Remove category from trainings or handle as needed
    try {
      swalWithBootstrapButtons
        .fire({
          title: "Estas seguro de eliminar",
          text: "No puedes volver a regresarla!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true,
        })
        .then(async (result: any) => {
          if (result.isConfirmed) {
            setCategories(categories.filter((category) => category._id !== id));
            await categoryController.DeleteCategory(id);
            setTrainings(
              trainings.map((training) =>
                training.categoryId === id
                  ? {
                      ...training,
                      categoryId: undefined,
                      categoryName: undefined,
                    }
                  : training
              )
            );
            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "eliminado correctamente",
              icon: "success",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Training handlers
  public handleAddTraining = (
    name: string,
    setTrainings: React.Dispatch<React.SetStateAction<Training[] | null>>,
    trainings: Training[],
    categories: Category[],
    categoryId: string,
    id: string
  ) => {
    if (!categories || !trainings || !categoryId || !id) return;
    const category = categories.find((c) => c._id === categoryId);
    const newTraining = {
      _id: id,
      name,
      categoryId,
      categoryName: category?.name,
    };
    setTrainings([...trainings, newTraining]);
  };

  public handleUpdateTraining = async (
    id: string,
    name: string,
    setTrainings: React.Dispatch<React.SetStateAction<Training[] | null>>,
    trainings: Training[] | null,
    categoryId: string
  ) => {
    if (!trainings || !categoryId) return;

    const data = {
      id,
      name,
      description: "",
      adminId: Cookies.get("admin-token") || "",
      categoryId,
    };

    try {
      const response = await capacitationController
        .UpdateCapacitation(data)
        .then((res) => res.capacitationUpdated)
        .catch((err) => console.log(err));
      if (!response) return;
      console.log(response.category.name);
      setTrainings(
        trainings.map((training) =>
          training._id === response._id
            ? { ...training, ...response }
            : training
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  public handleDeleteTraining = async (
    id: string,
    setTrainings: React.Dispatch<React.SetStateAction<Training[] | null>>,
    trainings: Training[] | null
  ) => {
    if (!trainings) return;
    try {
      swalWithBootstrapButtons
        .fire({
          title: "Estas seguro de eliminar",
          text: "No puedes volver a regresarla!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true,
        })
        .then(async (result: any) => {
          if (result.isConfirmed) {
            await capacitationController.DeleteCapacitation(id);
            setTrainings(trainings.filter((training) => training._id !== id));
            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "eliminado correctamente",
              icon: "success",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Position handlers
  public handleAddPosition = async (
    setPositions: React.Dispatch<React.SetStateAction<Position[] | null>>,
    positions: Position[] | null,
    name: string,
    id: string,
    adminName: string,
    adminLastName: string,
    categoryName: string,
    categoryId: string
  ) => {
    if (!positions) return;
    const data = {
      name,
      _id: id,
      Admin: {
        name: adminName,
        lastName: adminLastName,
      },
      category: {
        _id: categoryId,
        name: categoryName,
      },
    };
    try {
      setPositions([...positions, data]);
    } catch (error) {
      console.log(error);
    }
  };

  public handleUpdatePosition = async (
    id: string,
    name: string,
    setPositions: React.Dispatch<React.SetStateAction<Position[] | null>>,
    positions: Position[] | null,
    categoryId: string
  ) => {
    if (!positions) return;
    const data = {
      id,
      name,
      description: "",
      adminId: Cookies.get("admin-token") || "",
      categoryId,
    };
    try {
      const response = await titleController.UpdateTitle(data);
      setPositions(
        positions.map((position) =>
          position._id === id
            ? {
                ...position,
                name: response.name,
                category: {
                  _id: response.category._id,
                  name: response.category.name,
                },
              }
            : position
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  public handleDeletePosition = async (
    id: string,
    setPositions: React.Dispatch<React.SetStateAction<Position[] | null>>,
    positions: Position[] | null
  ) => {
    if (!positions) return;

    try {
      swalWithBootstrapButtons
        .fire({
          title: "Estas seguro de eliminar",
          text: "No puedes volver a regresarla!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true,
        })
        .then(async (result: any) => {
          if (result.isConfirmed) {
            await titleController.DeleteTitle({ id });
            setPositions(positions.filter((position) => position._id !== id));
            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "eliminado correctamente",
              icon: "success",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // General Title handlers
  public handleAddGeneralTitle = async (
    name: string,
    setGeneralTitles: React.Dispatch<
      React.SetStateAction<GeneralTitle[] | null>
    >,
    generalTitles: GeneralTitle[] | null,
    id: string,
    adminName: string,
    adminLastName: string
  ) => {
    if (!generalTitles) return;
    const newGeneralTitle = {
      _id: id,
      name,
      Admin: {
        name: adminName,
        lastName: adminLastName,
      },
    };
    setGeneralTitles([...generalTitles, newGeneralTitle]);
  };

  public handleUpdateGeneralTitle = async (
    id: string,
    name: string,
    setGeneralTitles: React.Dispatch<
      React.SetStateAction<GeneralTitle[] | null>
    >,
    generalTitles: GeneralTitle[] | null
  ) => {
    if (!generalTitles) return;
    const data = {
      id,
      name,
      description: "",
      adminId: Cookies.get("admin-token") || "",
    };
    try {
      const response = await generalTitleController.UpdateTitle(data);
      setGeneralTitles(
        generalTitles.map((generalTitle) =>
          generalTitle._id === id ? { ...generalTitle, name } : generalTitle
        )
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  public handleDeleteGeneralTitle = async (
    id: string,
    setGeneralTitles: React.Dispatch<
      React.SetStateAction<GeneralTitle[] | null>
    >,
    generalTitles: GeneralTitle[] | null
  ) => {
    if (!generalTitles) return;

    try {
      swalWithBootstrapButtons
        .fire({
          title: "Estas seguro de eliminar",
          text: "No puedes volver a regresarla!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true,
        })
        .then(async (result: any) => {
          if (result.isConfirmed) {
            await generalTitleController.DeleteTitle({ id });
            setGeneralTitles(
              generalTitles.filter((generalTitle) => generalTitle._id !== id)
            );
            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "eliminado correctamente",
              icon: "success",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export default CatalogRepository;
