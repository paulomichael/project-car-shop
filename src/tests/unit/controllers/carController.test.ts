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
  // fazemos o cast de um objeto para um `Request` pois nosso controller só vai aceitar um objeto do tipo `Request` como primeiro parâmetro
  const req = {} as Request; 
  // o mesmo acontece com o segundo parâmetro
  const res = {} as Response;

  const carMock = {
    model: 'Volkswagen Beetle Type 1',
    year: 1977,
    color: 'beige',
    buyValue: 20000,
    seatsQty: 4,
    doorsQty: 2
  };

  before(async() => {
    sinon.stub(carService, 'create').resolves(carMock);
    // sinon.stub(carService, 'read').resolves(carMock);
    // sinon.stub(carService, 'readOne').resolves([carMock]);
    sinon.stub(carService, 'update').resolves(carMock);
    sinon.stub(carService, 'delete').resolves(null);
    sinon.stub(carService, 'create').resolves(carMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);
      // o cast de `res.status` é feito pois `res` foi criado como do tipo `Resquest` 
      // e agora, que queremos validar com o que foi chamado, precisar ser tratado como um `sinon.SinonStub`
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  // describe('ReadOne Car', () => {
  //   it('Success', async () => {
  //     // como fizemos o dublê da service o valor do `req.params.id` não vai chegar na model
  //     // logo ele só precisa ser um string e existir
  //     req.params = { id: carMock._id };
  //     await carController.readOne(req, res);

  //     expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
  //     expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
  //   });
  // });
});