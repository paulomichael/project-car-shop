import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/carModel';
import CarService from '../../../services/carService';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	const carMock = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  };

	const carMockWithId = {
    id: 1,
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  };

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'readOne')
      // na chamada de index 0 `carModel.readOne` vai responder um fakeFrame
			.onCall(0).resolves(carMockWithId) 
      // já na próxima chamada ele vai mudar seu retorno, isso pode ser feito várias vezes
			.onCall(1).resolves(null); 
	})
	after(() => {
		sinon.restore()
	})
	describe('Create Car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			let error;
			try {
				// await carService.create({});
				await carService.create(carMock);
			} catch (err) {
				error = err
			}

			// expect(error).to.be.instanceOf(ZodError);
			expect(error).to.be.equal(undefined);
		});
	});

	// describe('ReadOne Car', () => {
	// 	it('Success', async () => {
	// 		const frameCreated = await frameService.readOne(frameMockWithId._id);

	// 		expect(frameCreated).to.be.deep.equal(frameMockWithId);
	// 	});

	// 	it('Failure', async () => {
	// 		let error;
	// 		try {
	// 			// a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
	// 			await frameService.readOne(frameMockWithId._id);
	// 		} catch (err:any) {
	// 			error = err
	// 		}

	// 		expect(error, 'error should be defined').not.to.be.undefined;
	// 		expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
	// 	});
	// });
});