import mongoose,{Schema} from "mongoose";
const expenseSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    amount:{  
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,    
    }
},{
    timestamps:true,
});
const Expense=mongoose.model('Expenses',expenseSchema);
export default Expense; 
