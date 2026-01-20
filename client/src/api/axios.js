import axios from 'axios';
import toast from 'react-hot-toast';

const api=axios.create({
  baseURL: 'http://localhost:5000/api',
})

api.interceptors.request.use((req)=>{
  const token=localStorage.getItem('token');
  if(token){
    req.headers.Authorization=`Bearer ${token}`;
  }
  return req;
})


api.interceptors.response.use(
  (response) => {
    // Check for rate limit headers and warn user if approaching limit
    const remaining = response.headers['ratelimit-remaining'];
    const limit = response.headers['ratelimit-limit'];
    
    if (remaining && limit && parseInt(remaining) <= 3) {
      toast.warning(`⚠️ Rate limit warning: ${remaining}/${limit} requests remaining`, {
        duration: 4000,
      });
    }
    
    return response;
  },
  (error) => {
    // Handle 429 Too Many Requests
    if (error.response?.status === 429) {
      const reset = error.response.headers['ratelimit-reset'];
      const minutes = reset ? Math.ceil(reset / 60) : null;
      
      toast.error(
        minutes
          ? `Too many attempts. Try again in ${minutes} minute(s).`
          : 'Too many requests. Please try again later.',
        { duration: 6000 }

      );
    }
    
    return Promise.reject(error);
  }
);

export default api;