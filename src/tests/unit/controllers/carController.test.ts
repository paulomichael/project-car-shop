import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
// import { CarMock, CarMockWithId } from '../../mocks/CarMock';
// import { carMock } from '../../mocks/carMock';
import CarController from '../../../controllers/carController';
import CarService from '../../../services/carService';
import CarModel from '../../../models/carModel';


describe('Car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request; 
  const res = {} as Response;

  const carMock = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  };

  // before(async() => {
  //   sinon.stub(carService, 'create').resolves(carMock);
  //   // sinon.stub(carService, 'read').resolves(carMock);
  //   // sinon.stub(carService, 'readOne').resolves([carMock]);
  //   sinon.stub(carService, 'update').resolves(carMock);
  //   sinon.stub(carService, 'delete').resolves(null);
  //   sinon.stub(carService, 'create').resolves(carMock);

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns(res);
  // });

  // after(() => {
  //   sinon.restore()
  // })

  describe('Create Car', () => {
    it('Success', async () => {
      sinon.stub(carService, 'create').resolves(carMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      // expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
      sinon.restore()

    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      sinon.stub(carService, 'readOne').resolves(carMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.params = { id: 'identifier' };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      // expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
      sinon.restore()
    });
  });
});