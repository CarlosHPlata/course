import { trainerGatewayMock } from "@test/trainer/trainer.gateway.mock";
import { Trainer } from "../dtos";
import makeGetTrainer from "./getTrainer.usecase";

describe('When calling for a trainer', () => {
  const getTrainer = makeGetTrainer(trainerGatewayMock);
  const trainerId = 1;
  
  it('should return a valid trainer from an ID', async () => {
    const trainer: Trainer = await  getTrainer(1);

    expect(trainerGatewayMock.getTrainerById).toHaveBeenCalled();
    expect(trainer.id).toBe(trainerId);
  });

});