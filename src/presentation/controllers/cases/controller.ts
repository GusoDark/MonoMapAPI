import { Request, Response } from "express";
import { MonoModel } from "../../../data/models/mono.model";
import { EmailService } from "../../../domain/services/email.service";

export class MonoController{
  public getCases = async (req: Request, res: Response) => {
    //res.send("Obteniendo los datos");
    try{
      const incidents = await MonoModel.find();
      return res.json(incidents);
    }catch(error){
      return res.json([]);
    }
  }

  public createCase = async (req: Request, res: Response) => {
    try{
      const { lat, lng, genre, age } = req.body;
      const newCase = await MonoModel.create({
        lat,
        lng,
        genre,
        age
      });
      const emailService = new EmailService();
      return res.json(newCase);
    }catch(error){
      return res.json({message:"Error al registrar el caso"});
    }
  }

  public getMostRecentCases = async (req: Request, res: Response) => {
    //res.send("Obteniendo los datos");
    try{
      const actualDate = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(actualDate.getDate() - 7);

      const cases = await MonoModel.find({
        creationDate: { $gte: sevenDaysAgo, $lte: actualDate }
      });
      

      return res.json(cases);
    }catch(error){
      return res.json({message:"Error al obtener los casos mas recientes"});
    }
  }

  public updateCase = async (req: Request, res: Response) => {
    try{
      const {id} = req.params;
      const { lat, lng, genre, age } = req.body;
      await MonoModel.findByIdAndUpdate(id, {
        lat,
        lng,
        isSent: false,
        genre,
        age
      });
      const updatedCase = MonoModel.findById(id);
      return res.json(updatedCase);
    }catch(error){
      return res.json({message:"Error al actualizar el caso"});
    }
  }

  public deleteCase = async (req: Request, res: Response) => {
    
    try{
      const {id} = req.params;
      const deleteCase = await MonoModel.findByIdAndDelete(id)
      return res.json(deleteCase);
    }catch(error){
      return res.json({message:"No se pudo eliminar el incidente"});
    }
  }

  
}