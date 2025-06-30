import React, { useState } from 'react';
// import { FiHome, FiDollarSign, FiClock, FiCar, FiAward, FiHelpCircle, FiBell, FiUser, FiGlobe } from 'react-icons/fi';
// import { BsThreeDotsVertical } from 'react-icons/bs';

const DeepHome = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [language, setLanguage] = useState('English');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const stats = {
    todayEarnings: 1850,
    todayTrips: 7,
    rating: 4.8,
    onlineHours: 5.5,
    weeklyTarget: 12500,
    earnedThisWeek: 8750
  };

  const recentTrips = [
    { id: 1, customer: 'Rahul', fare: 250, rating: 5, date: '30 Jun' },
    { id: 2, customer: 'Priya', fare: 180, rating: 4, date: '30 Jun' },
    { id: 3, customer: 'Amit', fare: 320, rating: 5, date: '29 Jun' },
    { id: 4, customer: 'Neha', fare: 150, rating: 4, date: '29 Jun' },
    { id: 5, customer: 'Vikram', fare: 275, rating: 5, date: '28 Jun' },
  ];

  const announcements = [
    { id: 1, title: 'Diwali Bonus', content: 'Earn ₹500 extra for 10 trips this week' },
    { id: 2, title: 'Fuel Price Update', content: 'Petrol prices reduced by ₹2 in Delhi' }
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-orange-600">Snap Cab</h1>
        </div>
        
        <nav className="mt-6">
          <NavItem 
            text="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            text="Ride Requests" 
            active={activeTab === 'rides'} 
            onClick={() => setActiveTab('rides')} 
          />
          <NavItem 
            text="My Earnings" 
            active={activeTab === 'earnings'} 
            onClick={() => setActiveTab('earnings')} 
          />
          <NavItem 
            text="My Trips" 
            active={activeTab === 'trips'} 
            onClick={() => setActiveTab('trips')} 
          />
          <NavItem 
            text="My Vehicle" 
            active={activeTab === 'vehicle'} 
            onClick={() => setActiveTab('vehicle')} 
          />
          <NavItem 
            text="Incentives" 
            active={activeTab === 'incentives'} 
            onClick={() => setActiveTab('incentives')} 
          />
          <NavItem 
            text="Support" 
            active={activeTab === 'support'} 
            onClick={() => setActiveTab('support')} 
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold text-gray-800">Captain Dashboard</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent border-none focus:ring-0"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Marathi</option>
                  <option>Bengali</option>
                </select>
              </div>
              
              <button className="relative p-1 text-gray-500 hover:text-gray-700">
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                </div>
                <span className="text-sm font-medium">Rajesh</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Status Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-700">Current Status</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isOnline}
                    onChange={() => setIsOnline(!isOnline)}
                  />
                  <div className={`w-11 h-6 rounded-full peer ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white border rounded-full h-5 w-5 transition-all ${isOnline ? 'transform translate-x-5' : ''}`}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </label>
              </div>
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-gray-800">₹{stats.todayEarnings}</p>
                <p className="text-gray-500">Today's Earnings</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-700 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatCard value={stats.todayTrips} label="Trips Today" />
                <StatCard value={stats.rating} label="Your Rating" isRating />
                <StatCard value={stats.onlineHours} label="Online Hours" />
                <StatCard value="₹12,500" label="Weekly Target" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-700 mb-4">Weekly Target</h3>
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-gray-500">₹{stats.earnedThisWeek} earned</span>
                <span className="text-sm text-gray-500">₹{stats.weeklyTarget} target</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-orange-500 h-2.5 rounded-full" 
                  style={{ width: `${(stats.earnedThisWeek / stats.weeklyTarget) * 100}%` }}
                ></div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Announcements</h4>
                {announcements.map(announcement => (
                  <div key={announcement.id} className="mb-2 p-2 bg-orange-50 rounded">
                    <p className="text-sm font-medium">{announcement.title}</p>
                    <p className="text-xs text-gray-600">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recent Trips */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium text-gray-700">Recent Trips</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fare</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTrips.map(trip => (
                    <tr key={trip.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{trip.customer}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trip.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{trip.fare}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(trip.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-orange-600 hover:text-orange-900">
                          Click
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-6 py-3 text-sm font-medium ${active ? 'text-orange-600 bg-orange-50 border-r-4 border-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

const StatCard = ({ value, label, isRating = false }) => (
  <div>
    <p className="text-lg font-bold text-gray-800">
      {value}
      {isRating && <span className="text-sm text-gray-500">/5</span>}
    </p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

export default DeepHome;