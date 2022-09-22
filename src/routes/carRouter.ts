import { Router, Request, Response } from 'express';
import CarController from '../controllers/carController';
import CarModel from '../models/carModel';
import CarService from '../services/carService';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/', (req: Request, res: Response) => carController.create(req, res));
route.get('/', (req: Request, res: Response) => carController.read(req, res));
route.get('/:id', (req: Request, res: Response) => carController.readOne(req, res));
route.put('/:id', (req: Request, res: Response) => carController.update(req, res));
route.delete('/:id', (req: Request, res: Response) => carController.delete(req, res));

export default route;
