const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const connectiondb = require("../../model/connectiondb");
const peopleController = require("../../controller/people.controller");

describe("PeopleController", () => {
  let sandbox;
  let queryStub;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    queryStub = sandbox.stub(connectiondb, "query");
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe("getAll", () => {
    it("should return 200 and data when there are people", async () => {
      const people = [
        {
          id: 1,
          name: "Alsarmendia",
          email: "alsarmendia@coldmail.com",
          address: "La marmota 900",
        },
      ];
      queryStub.resolves([people]);

      const req = {};
      const res = {
        status: sinon.stub().returns({
          json: sinon.spy(),
        }),
      };

      await peopleController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.status().json).to.have.been.calledWith({ data: people });
    });

    it("should return 400 and message when there are no people", async () => {
      queryStub.resolves([[]]);

      const req = {};
      const res = {
        status: sinon.stub().returns({
          json: sinon.spy(),
        }),
      };

      await peopleController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.status().json).to.have.been.calledWith({
        message: "Nothing to see..",
      });
    });

    it("should return response with connection error when there is an error", async () => {
      queryStub.rejects();

      const req = {};
      const res = {
        json: sinon.spy(),
      };

      await peopleController.getAll(req, res);

      expect(res.json).to.have.been.calledWith({
        response: "connection error",
      });
    });
  });

  describe("getById", () => {
    it("should return 200 and data when there is a person", async () => {
      const person = [
        {
          id: 1,
          name: "Alsarmendia",
          email: "alsarmendia@coldmail.com",
          address: "La marmota 900",
        },
      ];
      queryStub.resolves([person]);

      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returns({
          json: sinon.spy(),
        }),
      };

      await peopleController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });

    describe("Update a person", () => {
      it("should update a person with given id", async () => {
        const person = [
          {
            id: 1,
            name: "Alsarmendia",
            email: "alsarmendia@coldmail.com",
            address: "La marmota 900",
          },
        ];
        queryStub.resolves([person]);

        const request = {
          body: {
            name: "Alsarmendia",
            email: "alsarmendia@coldmail.com",
            address: "La marmota 900",
          },
          params: { id: 1 },
        };
        const response = {
          status: (statusCode) => {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.be.an("object");
                expect(data).to.have.property("data");
              },
            };
          },
        };

        await peopleController.update(request, response);
      });
    });

    describe("Delete a person", () => {
      it("should delete a person with given id", async () => {
        const person = [
          {
            id: 1,
            name: "Alsarmendia",
            email: "alsarmendia@coldmail.com",
            address: "La marmota 900",
          },
        ];
        queryStub.resolves([person]);

        const request = { params: { id: 1 } };
        const response = {
          status: (statusCode) => {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.be.an("object");
                expect(data).to.have.property("data");
              },
            };
          },
        };

        await peopleController.delete(request, response);
      });
    });

    describe("Create a person", () => {
      it("should create a person with given details", async () => {
        const request = {
          body: {
            name: "Alsarmendia",
            email: "alsarmendia@coldmail.com",
            address: "La marmota 900",
          },
        };
        const response = {
          status: (statusCode) => {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.be.an("object");
                expect(data).to.have.property("data");
              },
            };
          },
        };

        await peopleController.create(request, response);
      });

      it("should return error message if name or address is missing", async () => {
        const request = {
          body: {
            email: "alsarmendia@coldmail.com",
            address: "La marmota 900", 
          },
        };
        const response = {
          status: (statusCode) => {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.be.an("object");
                expect(data).to.have.property("message");
                expect(data.message).to.equal("Name and Address is required");
              },
            };
          },
        };

        await peopleController.create(request, response);
      });
    });
  });
});
