
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';
import Loading from './Loading.jsx';

function ProtectedRoute({children}) {

  const {user,loading}=useAuth();
  if(loading){
    return <Loading />;
  }
  if(!user){
    return <Navigate to="/login" />;
  }
  return children;
}


export default ProtectedRoute
