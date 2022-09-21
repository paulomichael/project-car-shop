import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import CarService from '../services/carService';

class CarController {
  constructor(private _service: CarService) {}

  public async create(
    req: Request & { body: ICar },
    res: Response,
  ) {
    const { model, year, color, buyValue, seatsQty, doorsQty } = req.body;
    const car = { model, year, color, buyValue, seatsQty, doorsQty };
    const results = await this._service.create(car);
    return res.status(201).json(results);
  }
}

export default CarController;
