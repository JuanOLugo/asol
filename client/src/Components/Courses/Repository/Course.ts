import { Course } from "../Interfaces/ICourse";
import CourseController from "../Controllers/Course";
import { swalWithBootstrapButtons } from "../../../Config/SwalConfig";


const { DeleteCourse } = new CourseController();

class CourseRepository {
  public handleDeleteCourse = async (
    id: string,
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>,
    courses: Course[]
  ) => {
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
            await DeleteCourse(id);
            swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "Capacitacion eliminada correctamente",
              icon: "success",
            });
            setCourses(courses.filter((course) => course._id !== id));
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  public handleEditCourse = (id: string) => {
    // In a real app, this would open an edit form or modal
    console.log(`Editing course with ID: ${id}`);
    window.location.href = "/admin/cursos/edit/" + id
  };
}

export default CourseRepository;
