import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import { ICar } from '../../../interfaces/ICar';
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	describe('Read Car', () => {
		it('Success', async () => {

			const carMock =[ {
				// status: true,
				model: "Ferrari Maranello",
				year: 1963,
				color: "red",
				buyValue: 3500000,
				seatsQty: 2,
				doorsQty: 2
			}];
		
		sinon.stub(carModel, 'read').resolves(carMock)
			
			const car = await carService.read();

			expect(car).to.be.equal(carMock);
		sinon.restore()

		});

	
	});

});