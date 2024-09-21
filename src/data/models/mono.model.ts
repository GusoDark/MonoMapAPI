import mongoose from "mongoose";
const monoSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  isSent: {
    type: Boolean,
    //required: false
    default: false
  },
  genre: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

export const MonoModel = mongoose.model("Mono", monoSchema);