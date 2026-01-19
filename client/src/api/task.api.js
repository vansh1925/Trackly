import api from './axios';


function handleError(error) {
	const message = error?.response?.data?.message || error?.message || 'Request failed';
	const status = error?.response?.status;
	const data = error?.response?.data;
	const err = new Error(message);
	// attach useful context for callers
	err.status = status;
	err.data = data;
	throw err;
}
export async function addTask(input) {
  try {
    const res = await api.post('/tasks/add', input);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}
export async function getTask(id) {
  try {
    const res = await api.get(`/tasks/get/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}
export async function getAllTasks() {
  try{
    const res=await api.get('/tasks/getall');
    return res.data;
  } catch (error) {
    handleError(error);
  }
}
export async function deleteTask(id) {
  try {
    const res = await api.delete(`/tasks/delete/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}
export async function updateTask(id, input) {
  try {
    const res = await api.put(`/tasks/update/${id}`, input);
    return res.data;
  }
  catch (error) {
    handleError(error);
  } 
}
export async function toggleTaskStatus(id) {
  try {
    const res = await api.put(`/tasks/toggle/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
}
export async function getTotalProductivity() {
  try {
    const res = await api.get('/tasks/totalProductivity');
    return res.data;
  } catch (error) {
    handleError(error);
  } 
}
export async function getTaskCompletedCount() {
  try {
    const res = await api.get('/tasks/taskcompletedcount');
    return res.data;
  } catch (error) {
    handleError(error);
  }
}

