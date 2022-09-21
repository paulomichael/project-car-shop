import { Router, Request, Response } from 'express';
import CarController from '../controllers/carController';
import CarModel from '../models/carModel';
import CarService from '../services/carService';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

// route.get('/car/:id', (req, res) => carController.readOne(req, res));
// route.get('/cars', (req, res) => carController.readOne(req, res));
route.post('/', (req: Request, res: Response) => carController.create(req, res));

export default route;
