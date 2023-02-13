const supertest = require("supertest");
const {app, server} = require("../../index.js");
const api = supertest(app);

describe("People Controller", () => {

  describe("GET /people", () => {
    it("should return all people", async () => {
      await api.get("/people")
      .expect(200);
    });
  });

  describe("GET /people/:id", () => {

    it("should return a person by id", async () => {

      await api.get("/people/2")
      .expect(200);

    });
  });

  describe("POST /people", () => {

    it("should create a person", async () => {
      await api
        .post("/people")
        .send({
          name: "Manolo",
          email: "manolito@gmail.com",
          address: "Poraca 123",
        })
        .expect(200);
    });

  });

  describe("PUT /people/:id", () => {
    it("should update a person", async () => {
       await api
        .put("/people/1")
        .send({
          name: "Manolo",
          email: "manolito@gmail.com",
          address: "Poraca 123",
        })
        .expect(200)
    });
  });

  describe("DELETE /people/:id", () => {
    it("should delete a person", async () => {
       await api.delete("/people/1")
      .expect(200)
    });
  });

  after(() => server.close() );

});
