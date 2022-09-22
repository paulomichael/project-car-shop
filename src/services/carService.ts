import { IModel } from '../interfaces/IModel';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { ErrorTypes } from '../errors/catalog';

// class CarService implements IModel<ICar> {
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

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(id: string): Promise<ICar | null> {
    const car = await this._car.readOne(id);
    // console.log('=====> car: ', car);
    if (!car) {
      // throw new Error(ErrorTypes.EntityNotFound); 
      throw new Error(ErrorTypes.ObjectNotFound); 
    }
    return car;
  }

  public async update(id: string, obj: ICar): Promise<ICar | null> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    let car;
    const carExists = await this._car.readOne(id);
    if (carExists) {
      car = await this._car.update(id, obj);
    }
    console.log('-------> car: ', car);
    if (!car) {
      // throw new Error(ErrorTypes.EntityNotFound); 
      throw new Error(ErrorTypes.ObjectNotFound); 
    }
    console.log('=====> car: ', car);

    return car; // Isn't returning a successful update
  }

  public async delete(id: string): Promise<ICar | null> {
    const car = await this._car.delete(id);
    // console.log('=====> car: ', car);
    if (!car) {
      // throw new Error(ErrorTypes.EntityNotFound); 
      throw new Error(ErrorTypes.ObjectNotFound); 
    }
    return car;
  }
}

export default CarService;