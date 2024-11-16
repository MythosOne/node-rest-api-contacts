const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
    },
  },
  { versionKey: false }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  addSchema,
};
