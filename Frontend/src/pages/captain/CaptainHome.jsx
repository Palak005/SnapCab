import React, { useState } from 'react';

const CaptainHome = () => {
  // State
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('available');

  // Sample data
  const availableRides = [
    {
      id: 'ride_101',
      pickup: "Sector 18 Market",
      drop: "Delhi Metro Station",
      fare: 280,
      distance: "8 km",
      passenger: { name: "Ankit Verma", rating: 4.5 }
    },
    {
      id: 'ride_102',
      pickup: "DLF Mall of India",
      drop: "Indira Gandhi Airport",
      fare: 520,
      distance: "18 km",
      passenger: { name: "Priya Singh", rating: 4.9 }
    }
  ];

  const recentRides = [
    {
      id: 'ride_001',
      date: 'Today, 10:30 AM',
      pickup: "Connaught Place",
      drop: "Khan Market",
      fare: 320,
      status: 'completed',
      rating: 5
    },
    {
      id: 'ride_002',
      date: 'Today, 9:15 AM',
      pickup: "Rajiv Chowk",
      drop: "Cyber City",
      fare: 280,
      status: 'completed',
      rating: 4
    }
  ];

  const driverProfile = {
    name: "Rajesh Kumar",
    rating: 4.8,
    totalRides: 287,
    vehicle: "Swift Dzire (DL8CAR1234)",
    joined: "15 Jan 2022"
  };
  

  const acceptRide = (rideId) => {
    // In real app, would update backend here
    alert(`Accepted ride ${rideId}`);
    setActiveTab('active');
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Status Bar */}
      <div className="flex justify-between items-center mb-6 p-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 font-bold">
            {driverProfile.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold">{driverProfile.name}</h3>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{driverProfile.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`px-4 py-2 rounded-full ${isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <span>{isOnline ? 'Online' : 'Offline'}</span>
              <input 
                type="checkbox" 
                checked={isOnline}
                onChange={() => setIsOnline(!isOnline)}
                className="hidden"
                id="onlineToggle"
              />
              <div className={`w-12 h-6 rounded-full relative ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isOnline ? 'transform translate-x-6' : ''}`}></div>
              </div>
            </label>
          </div>
          
          <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full">
            <span>Today: ₹2,450</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'available' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('available')}
        >
          Available Rides
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'active' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('active')}
        >
          Active Ride
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'recent' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('recent')}
        >
          Recent Trips
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          My Profile
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        {activeTab === 'available' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Available Rides ({availableRides.length})</h2>
            
            {availableRides.length > 0 ? (
              availableRides.map(ride => (
                <div key={ride.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{ride.pickup} → {ride.drop}</h3>
                      <p className="text-gray-600">{ride.distance} • Approx ₹{ride.fare}</p>
                      <div className="flex items-center mt-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          {ride.passenger.name.charAt(0)}
                        </div>
                        <span>{ride.passenger.name}</span>
                        <span className="ml-2 text-yellow-400">★ {ride.passenger.rating}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => acceptRide(ride.id)}
                      className="self-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Accept Ride
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No available rides at the moment
              </div>
            )}
          </div>
        )}

        {activeTab === 'active' && (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">No active ride currently</div>
            <button 
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setActiveTab('available')}
            >
              Check Available Rides
            </button>
          </div>
        )}

        {activeTab === 'recent' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Trips</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Trip ID</th>
                    <th className="text-left py-2">Date/Time</th>
                    <th className="text-left py-2">Route</th>
                    <th className="text-left py-2">Fare</th>
                    <th className="text-left py-2">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRides.map(ride => (
                    <tr key={ride.id} className="border-b hover:bg-gray-50">
                      <td className="py-3">#{ride.id.slice(-4)}</td>
                      <td className="py-3">{ride.date}</td>
                      <td className="py-3">
                        <div className="font-medium">{ride.pickup}</div>
                        <div className="text-sm text-gray-500">to {ride.drop}</div>
                      </td>
                      <td className="py-3">₹{ride.fare}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1">{ride.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptainHome;