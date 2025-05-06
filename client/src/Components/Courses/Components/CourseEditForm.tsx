"use client";

import type React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  Save,
  BookOpen,
  Tag,
  FileText,
  AlignLeft,
  Plus,
  Upload,
} from "lucide-react";
import { CapacityTypeSelectionModal } from "./CapacityTypeSelectionModal";
import { CategorySelectionModal } from "./CategorySelectionmodal";
import { QuestionCreationModal } from "./QuestionCreationModal";
import { formattedDate } from "../../../Config/Utils/Date";
import { useParams } from "react-router-dom";
import AdminControllers from "../../Catalog/Controllers/_admin_";
import { Category } from "../../Catalog/Interfaces/Category";
import { Training } from "../../Catalog/Interfaces/CatalogList";
import CourseController from "../Controllers/Course";
import { swalWithBootstrapButtons } from "../../../Config/SwalConfig";
export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  _id: string;
}

export interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  file: globalThis.File;
}
const { GetIndividualCourse, UpdateCourse } = new CourseController();
const { GetCatalog } = new AdminControllers();
export function CourseEditForm() {
  const { id } = useParams();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    title: "",
  });

  const [CapacityTypes, setCapacityTypes] = useState<Training[]>([]);
  const [Categories, setCategories] = useState<Category[]>([]);
  const [DefaultCapacity, setDefaultCapacity] = useState<Training[]>([]);
  const data = new FormData();
  const onSubmit = async (courseData: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Estas seguro de editar este curso?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then(async (result: any) => {
        if (result.isConfirmed) {
          console.log("so")
          data.append(
            "data",
            JSON.stringify({
              ...courseData,
              _id: id,
              Admin: Cookies.get("admin-token"),
            })
          );
          files.forEach((fileObj: File & { file?: Blob }) => {
            if (fileObj.file) data.append("file", fileObj.file);
          });
          try {
            const response = await UpdateCourse(data);
            console.log(response);
          } catch (error) {
            console.log(error);
          }
          setFormData({
            name: "",
            description: "",
            title: "",
          });
          setFiles([]);
          setSelectedCategory("");
          setSelectedCapacityTypes([]);
          setQuestions([]);
          data.delete("files");
          data.delete("data");
          window.location.href = "/admin/cursos";
        }
      });
  };

  // Selected items state
  const [selectedCapacityTypes, setSelectedCapacityTypes] = useState<string[]>(
    []
  );
  const [tempSelectedCapacityTypes, setTempSelectedCapacityTypes] = useState<
    string[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  // Modal states
  const [isCapacityTypeModalOpen, setIsCapacityTypeModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      alert("Por favor selecciona una categoría");
      return;
    }

    if (selectedCapacityTypes.length === 0) {
      alert("Por favor selecciona al menos un tipo de capacitación");
      return;
    }

    const courseData = {
      ...formData,
      createAt: new Date().toLocaleDateString("es-co"),
      capacityType: selectedCapacityTypes,
      category: selectedCategory,
      questions,
      files,
    };

    onSubmit(courseData);
  };

  // Capacity Type Modal handlers
  const handleOpenCapacityTypeModal = () => {
    setTempSelectedCapacityTypes([...selectedCapacityTypes]);
    setIsCapacityTypeModalOpen(true);
  };

  const handleCloseCapacityTypeModal = () => {
    setIsCapacityTypeModalOpen(false);
    setTempSelectedCapacityTypes([]);
  };

  const handleToggleCapacityType = (typeId: string) => {
    setTempSelectedCapacityTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleConfirmCapacityTypes = () => {
    setSelectedCapacityTypes(tempSelectedCapacityTypes);
    setIsCapacityTypeModalOpen(false);
  };

  // Category Modal handlers
  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleSelectCategory = (categoryId: string, categoryName: string) => {
    setSelectedCategory(categoryId);
    setSelectedCategoryName(categoryName);
    setIsCategoryModalOpen(false);
    setSelectedCapacityTypes([]);
  };

  // Question Modal handlers
  const handleOpenQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
  };

  const handleAddQuestion = (question: Question) => {
    setQuestions((prev) => [...prev, question]);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q._id !== questionId));
  };

  // File upload handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    console.log(fileList?.length);
    if (!fileList) return;
    const newFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const fileUrl = URL.createObjectURL(file);
      newFiles.push({
        id: new Date().toString() + file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
        file: file,
      });
    }
    setFiles((prev) => [...prev, ...newFiles]);

    // Reset the input
    e.target.value = "";
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove && fileToRemove.url.startsWith("blob:")) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  // Get selected capacity type names for display
  const getSelectedCapacityTypeNames = () => {
    return selectedCapacityTypes
      .map((id) => CapacityTypes.find((type) => type._id === id)?.name || "")
      .filter(Boolean);
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  useEffect(() => {
    GetCatalog().then((res) => {
      setCategories(res.categories);
      setDefaultCapacity(res.catalog);
    });
    if (!id) return;
    GetIndividualCourse(id).then((res) => {
      console.log(res);
      setFormData((prev) => ({
        ...prev,
        name: res.course.name || "",
        description: res.course.description || "",
      }));
      handleSelectCategory(res.course.category._id, res.course.category.name);
      setSelectedCapacityTypes(
        res.course.capacityType.map((e: { _id: string }) => e._id)
      );
      setFiles(
        res.files.map((f: any) => {
          return {
            id: f.size * +new Date(),
            name: f.name,
            size: f.size,
            type: f.extension.split(".")[0],
            url: f.path,
            file: f,
          };
        })
      );
      if (res.questions) {
        const data = res.questions.map((q: any) => {
          return {
            question: q.question,
            options: q.answers.map((a: any) => a.name),
            correctAnswer: q.answers.findIndex(
              (a: any) => a._id == q.correctAnswer._id
            ),
            _id: q._id,
          };
        });

        setQuestions(data);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    if (selectedCategory?.length > 0) {
      const CapacitysFilter = DefaultCapacity.filter(
        (c) => c.category?._id === selectedCategory
      );
      setCapacityTypes(CapacitysFilter);
    }
  }, [selectedCategory]);

  useEffect(() => {
    console.log(
      CapacityTypes,
      tempSelectedCapacityTypes,
      Categories,
      questions,
      formData,
      files
    );
  }, [
    CapacityTypes,
    tempSelectedCapacityTypes,
    Categories,
    questions,
    formData,
    files,
  ]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full mx-auto h-screen overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-lg shadow-md p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Editar curso</h1>
            <p className="text-gray-600">{formattedDate}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6 grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre del Curso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <BookOpen size={18} />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre del curso"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 flex items-start pl-3 pointer-events-none text-gray-500">
                  <AlignLeft size={18} />
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Descripción del curso"
                  rows={4}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Category (Single-select with modal) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Categoría
              </label>
              <div
                onClick={handleOpenCategoryModal}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <div className="flex items-center">
                  <Tag size={18} className="text-gray-500 mr-2" />
                  <span
                    className={
                      selectedCategory ? "text-gray-800" : "text-gray-500"
                    }
                  >
                    {selectedCategory
                      ? selectedCategoryName
                      : "Seleccionar categoría..."}
                  </span>
                </div>
              </div>
            </div>

            {/* Capacity Types (Multi-select with modal) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tipos de Capacitación
              </label>
              <div
                onClick={handleOpenCapacityTypeModal}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <div className="flex items-center">
                  <BookOpen size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-500">
                    {selectedCapacityTypes.length > 0
                      ? `${selectedCapacityTypes.length} tipos seleccionados`
                      : "Seleccionar tipos de capacitación..."}
                  </span>
                </div>
              </div>

              {/* Display selected capacity types */}
              {selectedCapacityTypes.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {getSelectedCapacityTypeNames().map((name, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Questions Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Preguntas
                </label>
                <button
                  type="button"
                  onClick={handleOpenQuestionModal}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus size={16} className="mr-1" />
                  Crear Preguntas
                </button>
              </div>

              {/* Display questions count */}
              <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                {questions.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No hay preguntas creadas. Haz clic en "Crear Preguntas" para
                    añadir.
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-700 font-medium">
                      {questions.length} preguntas creadas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {questions.map((question, index) => (
                        <span
                          key={question._id}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          Pregunta {index + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Archivos del Curso
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleFileChange}
                      />
                      <span className="text-blue-500 mx-auto">
                        Subir archivos
                      </span>
                    </label>
                  </div>

                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG, etc.
                  </p>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <ul className="mt-3 divide-y divide-gray-200 border border-gray-200 rounded-md">
                  {files.map((file) => (
                    <li
                      key={file.id}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" />
                        <span className="ml-2 flex-1 w-0 truncate">
                          {file.name}
                        </span>
                      </div>
                      <div className="ml-4 flex items-center space-x-4">
                        <span className="text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(file.id)}
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Save size={18} />
                <span>Crear Curso</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Capacity Type Selection Modal */}
      <CapacityTypeSelectionModal
        isOpen={isCapacityTypeModalOpen}
        onClose={handleCloseCapacityTypeModal}
        capacityTypes={CapacityTypes}
        selectedTypes={tempSelectedCapacityTypes}
        onToggleType={handleToggleCapacityType}
        onConfirm={handleConfirmCapacityTypes}
      />

      {/* Category Selection Modal */}
      <CategorySelectionModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
        categories={Categories}
        onSelectCategory={handleSelectCategory}
      />

      {/* Question Creation Modal */}
      <QuestionCreationModal
        isOpen={isQuestionModalOpen}
        onClose={handleCloseQuestionModal}
        onAddQuestion={handleAddQuestion}
        onDeleteQuestion={handleDeleteQuestion}
        questions={questions}
      />
    </>
  );
}
