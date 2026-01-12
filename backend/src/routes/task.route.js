import express from 'express';        
import { addtask, gettask, deletetask, updatetask, getalltasks ,taskToggleStatus,totalProductivity,taskcompletedcount} from '../controllers/task.controller.js';
const taskrouters=express.Router();

taskrouters.post('/add',addtask);
taskrouters.get('/get/:id',gettask);
taskrouters.get('/getall',getalltasks);
taskrouters.delete('/delete/:id',deletetask);
taskrouters.put('/update/:id',updatetask);
taskrouters.put('/toggle/:id',taskToggleStatus);
taskrouters.get('/totalProductivity',totalProductivity);
taskrouters.get('/taskcompletedcount',taskcompletedcount);
export default taskrouters;