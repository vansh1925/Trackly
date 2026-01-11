import mongoose,{Schema} from "mongoose";

const taskSchema=new Schema({
  title:{
    type:String,
    required:true,
    trim:true
  },
  
  duration:{
    type:Number,
    required:true,
  },
  completed:{
    type:Boolean,
    default:false
  },
  date:{
    type:Date,
    required:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
},
{
  timestamps:true
});
const Task=mongoose.model('Tasks',taskSchema);
export default Task;
