import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject",
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  feedbackComments : {
    type: String,
    required : true
  }
});

export default mongoose.model("feedback", feedbackSchema);