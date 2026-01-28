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
// Performance indexes for common queries
expenseSchema.index({ userId: 1, date: 1 });
expenseSchema.index({ userId: 1, category: 1 });
const Expense=mongoose.model('Expenses',expenseSchema);
export default Expense; 
