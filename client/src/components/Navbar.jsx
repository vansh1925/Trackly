import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/useTheme';
import logo from '../assets/41ba87ea-acfb-41fa-9ef3-a404e07d0131.png';

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/expenses', label: 'Expenses' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/analytics', label: 'Analytics' },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded dark:text-slate-300"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <img
                src={logo}
                alt="Trackly logo"
                className="w-9 h-9 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-slate-900 dark:text-white">Trackly</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 -mt-0.5">Track money. Track time. Stay ahead.</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} className="text-slate-300" /> : <Moon size={20} className="text-slate-600" />}
              </button>
              <span className="text-sm text-slate-600 dark:text-slate-300">{user?.email || 'User'}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="px-4 py-3 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
