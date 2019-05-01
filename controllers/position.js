const mongoose = require("mongoose");
const { Position } = require("../models/position");

module.exports = {
  newPosition: async function(data) {
    try {
      const newPosition = await new Position(data);
      const position = await newPosition.save();
      return position._doc;
    } catch (e) {
      console.log(e);

      return { err: e.message };
    }
  },
  findPosition: async function({ pID }) {
    try {
      const position = await Position.findById(pID).populate({
        path: "testMetaDatas",
        populate: {
          path: "test"
        }
      });
      return position;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
  findPositions: async function({ cID }) {
    try {
      const positions = await Position.find({
        company: mongoose.Types.ObjectId(cID)
      });

      return positions;
    } catch (e) {
      console.log(e);

      return { err: e.message };
    }
  }
};
