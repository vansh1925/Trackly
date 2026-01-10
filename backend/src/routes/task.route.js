import express from 'express';        
import { addtask, gettask, deletetask, updatetask, getalltasks } from '../controllers/task.controller.js';
const taskrouters=express.Router();

taskrouters.post('/add',addtask);
taskrouters.get('/get/:id',gettask);
taskrouters.get('/getall',getalltasks);
taskrouters.delete('/delete/:id',deletetask);
taskrouters.put('/update/:id',updatetask);

export default taskrouters;