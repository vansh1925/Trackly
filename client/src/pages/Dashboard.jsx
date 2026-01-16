import { useState, useEffect } from 'react'
import api from '../api/axios';
import StatCard from '../components/StatCard';
import Loading from '../components/Loading';

function Dashoard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/dashboard', { signal });
      setData(res.data);
    } catch (err) {
      if (signal?.aborted || err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;
      let message = 'Failed to load dashboard.';
      if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err?.code === 'ERR_NETWORK' || err?.message?.toLowerCase?.().includes('network')) {
        message = 'Network error. Check your internet connection.';
      } else if (err?.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p role="alert" aria-live="assertive" style={{ color: 'red' }}>{error}</p>
        <button onClick={() => fetchData()}>Retry</button>
      </div>
    );
  }

  const expensesToday = data?.expenses?.today ?? 0;
  const expensesThisMonth = data?.expenses?.thisMonth ?? 0;
  const productivityToday = data?.productivity?.today ?? 0;
  const completedTasks = data?.tasks?.completed ?? 0;

  return (
    <div>
      <h1>Dashboard</h1>
      <StatCard title="Today's Expense" value={`₹${expensesToday}`} />
      <StatCard title="This Month" value={`₹${expensesThisMonth}`} />
      <StatCard title="Productivity" value={`${productivityToday} min`} />
      <StatCard title="Completed Tasks" value={completedTasks} />
    </div>
  )
}

export default Dashoard
