const connectiondb = require("../model/connectiondb");

const peopleController = {
  getAll: async (_request, response) => {
    try {
      const [people] = await connectiondb.query("select * from people");
      if (people.length == 0){
        return response.status(400).json({ message: "Nothing to see.." });
      }
        return response.status(200).json({ data: people })
    } catch (error) {
      console.log(error);

      response.json({
        response: "connection error",
      });
    }
  },

  getById: async (request, response) => {
    try {
      const { id } = request.params;
      const [people] = await connectiondb.query(
        "select * from people where id=?",
        [id]
      );
      if (people.length === 0) {
        return response.status(400).json({ message: "Nothing to see.." });
      }

      return response.status(200).json({ data: people });
    } catch (error) {
      console.log(error);
      response.json({ response: "connection error" });
    }
  },

  create: async (request, response) => {
    try {
      const { name, email, address } = request.body;
      const q = "insert into people (name, email, address) values (?,?,?)";
      const [people] = await connectiondb.query(q, [name, email, address]);

      if (!name || !address)
        return response
          .status(400)
          .json({ message: "Name and Address is required" });

      return response.status(200).json({ data: people });
    } catch (error) {
      return error;
    }
  },

  update: async (request, response) => {
    try {
      const { name, email, address } = request.body;
      const { id } = request.params;
      const q = "update people set name=?, email=?, address=? where id=?";
      const [people] = await connectiondb.query(q, [name, email, address, id]);

      return response.status(200).json({ data: people });
    } catch (error) {
      response.json({
        response: "connection error",
      });
    }
  },

  delete: async (request, response) => {
    try {
      const { id } = request.params;
      const q = "DELETE FROM people WHERE id=?";
      const [people] = await connectiondb.query(q, [id]);

      return response.status(200).json({ data: people });
    } catch (error) {
      response.json({
        response: "connection error",
      });
    }
  },
};

module.exports = peopleController;
