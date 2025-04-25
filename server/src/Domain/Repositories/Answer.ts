import AnswerModel from "../../Infrestructure/Db/Models/Answer";
import Answer from "../Interfaces/Db Interfaces/Answer";

class AnswerRpository{
    public async CreateAnswer(answer: Answer){
        if(!answer) throw new Error("No answer provided")
        const newAnswer = new AnswerModel(answer)
        if(!newAnswer) throw new Error("Error al crear pregunta")
        return await newAnswer.save()
    }
}

export default AnswerRpository