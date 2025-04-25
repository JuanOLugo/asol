import React from "react"
import { Category } from "../Interfaces/Category"
import CategoryController from "../Controllers/Category";
import Cookies from "js-cookie";
const categoryController = new CategoryController();
class CategoryRepository {
    
  public handleSubmit = async (e: React.FormEvent, newCategory: String, onAdd: (name: string, id: string, adminName: string, adminLastName: string) => void, setNewCategory: React.Dispatch<React.SetStateAction<string>>) => {
    e.preventDefault()
    if (newCategory.trim()) {
      const data = {
        name: newCategory.trim(),
        description: "",
        adminId: Cookies.get("admin-token") || "",
        createdAt: new Date().toLocaleDateString("es-CO"),
      }
      try {
        const response = await categoryController.CreateCategory(data);

        onAdd(newCategory.trim(), response._id, response.Admin.name, response.Admin.lastName)
        setNewCategory("")
      } catch (error) {
        console.log(error)
      }

    }
  }

  public startEditing = (category: Category, setEditingId: React.Dispatch<React.SetStateAction<string | null>>, setEditingName: React.Dispatch<React.SetStateAction<string>>) => {
    setEditingId(category._id)
    setEditingName(category.name)
  }

  public cancelEditing = (setEditingId: React.Dispatch<React.SetStateAction<string | null>>, setEditingName: React.Dispatch<React.SetStateAction<string>>) => {
    setEditingId(null)
    setEditingName("")
  }

  public saveEditing = (setEditingId: React.Dispatch<React.SetStateAction<string | null>>, setEditingName: React.Dispatch<React.SetStateAction<string>>, onUpdate: (id: string, name: string) => void, editingId: string, editingName: string) => {
    if (editingId !== null && editingName.trim()) {
      onUpdate(editingId, editingName.trim())
      setEditingId(null)
      setEditingName("")
    }
  }
}

export default CategoryRepository