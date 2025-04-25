import WorkshopQuestionsModel from "../../Infrestructure/Db/Models/WorkshopQuestions";
import IWorkshopQuestions from "../Interfaces/Db Interfaces/IWorkshopQuestions";

class WorkshopQuestionsRepository {
    public async CreateQuestion(question: IWorkshopQuestions){
        if(!question) throw new Error("No question priovided")
        const newQuestion = new WorkshopQuestionsModel(question)
        if(!newQuestion) throw new Error("Error to create a question")
        return await newQuestion.save()
    }
}

export default WorkshopQuestionsRepository