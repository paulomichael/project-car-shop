import { IModel } from '../interfaces/IModel';
import { ICar, carZodSchema } from '../interfaces/ICar';

class CarService {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(obj);
  }
}

export default CarService;