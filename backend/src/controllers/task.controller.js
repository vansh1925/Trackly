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


export {addtask,deletetask,gettask,getalltasks,updatetask,taskToggleStatus};