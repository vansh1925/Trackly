import express from 'express';
import { addexpense,getexpense,deleteexpense,updateexpense,totalexpense,getallexpenses } from '../controllers/expense.controller.js';
const expenserouters=express.Router();

expenserouters.post('/add',addexpense);
expenserouters.get('/get/:id',getexpense);
expenserouters.get('/getall',getallexpenses);
expenserouters.delete('/delete/:id',deleteexpense);
expenserouters.put('/update/:id',updateexpense);
expenserouters.get('/total',totalexpense);
export default expenserouters;

