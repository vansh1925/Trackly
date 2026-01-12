import Task from "../models/task.model";
const addtask=async(req,res)=>{
  try {
    const{title,duration,date}=req.body;
    if(!title || !duration || !date){
      return res.status(400).json({message:"All fields are required"});
    }
    const task=await Task.create({
      title,
      duration,
      date,
      userId:req.user._id
    })
    res.status(201).json({message:"Task added successfully",task});
  } catch (error) {
    res.status(500).json({message:"Internal server error"});
  }

}
const deletetask=async(req,res)=>{
  try {
    const task=await Task.findOneAndDelete({
      _id:req.params.id,
      userId:req.user._id
    });
    if(!task){
      return res.status(404).json({message:"Task not found"});
    }
    res.status(200).json({message:"Task deleted successfully"});
  
  } catch (error) {
    res.status(500).json({message:"Internal server error"});
  }
}
const gettask=async(req,res)=>{
  try {
    const task=await Task.findOne({
      _id:req.params.id,
      userId:req.user._id
    });
    if(!task){
      return res.status(404).json({message:"Task not found"});
    }
    res.status(200).json({message:"Task fetched successfully",task});
  } catch (error) {
    res.status(500).json({message:"Internal server error"});
  }
}
const getalltasks=async(req,res)=>{
  try {
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;
    const skip=(page-1)*limit;
    const tasks=await Task.find({userId:req.user._id}).skip(skip).limit(limit).sort({createdAt:-1});
    const totaltasks=await Task.countDocuments({userId:req.user._id});
    const totalpages=Math.ceil(totaltasks/limit);
    res.status(200).json({message:"Tasks fetched successfully",tasks,page,totalpages,totaltasks});
  } catch (error) {
    res.status(500).json({message:"Internal server error"});
  }
}
const updatetask=async(req,res)=>{
  try {
    const { title,duration,date } = req.body;
    if (!title && !duration && !date) {
      return res.status(400).json({ message: "At least one field required" });
    }
    const updatedtask=await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title,duration,date },
      { new: true }
    );
    if(!updatedtask){
      return res.status(404).json({message:"Task not found"});
    }
    res.status(200).json({message:"Task updated successfully",updatedtask});
  } catch (error) {
  res.status(500).json({message:"Internal server error"});
}

}

const taskToggleStatus=async(req,res)=>{
  try {
    const task=await Task.findOne({_id:req.params.id,userId:req.user._id});
    if(!task){
      return res.status(404).json({message:"Task not found"});
    }
    task.completed=!task.completed;
    await task.save();
    res.status(200).json({message:"Task status toggled successfully",task});
  } catch (error) {
    res.status(500).json({message:"Internal server error"});
  }
   

}
const totalProductivity=async(req,res)=>{//minutes of tasks completed in a date range
  try{
    const startTime=new Date(req.query.startDate);
    const endTime=new Date(req.query.endDate);
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return res.status(400).json({ message: "Invalid startDate or endDate" });
    }
    endTime.setDate(endTime.getDate()+1);//include end date fully
    endTime.setHours(0,0,0,0);
    /*
    ex->startTime = 2024-01-10 00:00
    endTime   = 2024-01-13 00:00 
    |----10 Jan----|----11 Jan----|----12 Jan----|----13 Jan----|
    10 11 12 all included
    */
   
    const tasks=await Task.aggregate([
      {$match:{
        userId:new mongoose.Types.ObjectId(req.user._id),
        completed:true,
        date:{$gte:startTime,$lt:endTime}//start inclusive, end exclusive 
      }},{
        $group:{
          _id:null,
          totalDuration:{$sum:"$duration"}
        }
      }
    ]);

    const totalTasks=tasks.length>0?tasks[0].totalDuration:0;
    res.status(200).json({message:"Total productivity fetched successfully",totalTasks});
  } catch(error){
    res.status(500).json({message:"Internal server error"});
  }
}
const taskcompletedcount=async(req,res)=>{
  try {
    const tasks=await Task.aggregate([
      {$match: {
        userId:new mongoose.Types.ObjectId(req.user._id),
      }},{
        $group:{
          _id:"$completed",
          totalTask:{$sum:1}
        }
      }
    ])
    let completed=0;
    let pending=0;
    tasks.forEach((t)=>{
      if(t._id===true){
        completed=t.totalTask;
      }else{
        pending=t.totalTask;
      }
    })
    res.status(200).json({message:"Task status fetched successfully",completed,pending});
  
  } catch (error) {
    res.status(500).json({message:"Internal server error"});
    
  }
}

export {addtask,deletetask,gettask,getalltasks,updatetask,taskToggleStatus,totalProductivity,taskcompletedcount};