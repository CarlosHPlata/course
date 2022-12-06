import { Trainer } from "../dtos";
import { ITrainerGateway } from "../interfaces/trainer.gateway";


const makeGetTrainer =
  (trainerGateway: ITrainerGateway) =>
  async (id: number): Promise<Trainer> => {
    const trainer = await trainerGateway.getTrainerById(id)
    return trainer
  };

export default makeGetTrainer;
