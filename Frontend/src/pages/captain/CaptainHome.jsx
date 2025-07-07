// import { useState } from "react";
// import axios from "axios";
// import RideCard from "../../components/RideCard";
// import { CaptainContext } from "../../context/CaptainContext";
// import { useEffect } from "react";
// import { SocketContext } from "../../context/SocketContext";
// import toast from "react-hot-toast";

// const CaptainHome = () => {
//   // State
//   const [isOnline, setIsOnline] = useState(true);
//     const [rides, setRides] = useState([]);
//     const [captain, setCaptain] = CaptainContext();
//     const { socket } = SocketContext();

//   const [activeRide, setActiveRide] = useState({
//     id: 'ride_789',
//     passenger: { name: 'Amit Patel', rating: 4.9 },
//     pickup: "Connaught Place",
//     drop: "Delhi Airport T3",
//     fare: 650,
//     distance: "22 km",
//     duration: "45 min",
//     paymentMethod: "Cash"
//   });

//   // Sample data
//   const stats = {
//     todayEarnings: 2875,
//     onlineHours: 6.5,
//     acceptanceRate: 92,
//     rating: 4.8,
//     earnedToday: 2875,
//     dailyTarget: 3500,
//     recentRides: [
//       { id: 'ride_001', passenger: 'Neha Gupta', time: '10:30 AM', fare: 320, rating: 5 },
//       { id: 'ride_002', passenger: 'Rahul Singh', time: '9:15 AM', fare: 280, rating: 4 },
//       { id: 'ride_003', passenger: 'Priya Sharma', time: '8:00 AM', fare: 350, rating: 5 },
//       { id: 'ride_004', passenger: 'Vikram Joshi', time: 'Yesterday', fare: 410, rating: 4 },
//     ],
//     incentives: [
//       { title: "Peak Hours Bonus", description: "Complete 5 rides between 5-9 PM", progress: 3, target: 5, reward: "₹250" },
//       { title: "Weekly Challenge", description: "50 rides this week", progress: 28, target: 50, reward: "₹1500" }
//     ]
//   };

//   const completeRide = () => {
//     setActiveRide(null);
//     // In real app, would update backend here
//   };

//     useEffect(()=>{
//         let updateLocation = ()=>{
//             if(navigator.geolocation){
//                 navigator.geolocation.getCurrentPosition(position=>{
//                 const location = {
//                     lat : position.coords.latitude, 
//                     long : position.coords.longitude
//                 }

//                 console.log("updating captain location")
//                 socket.emit("update-captain-location", {
//                     id : captain._id, 
//                     location
//                 });
//             });
//             }
//         }

//         const locationInterval = setInterval(updateLocation, 10000);

//         return ()=>{
//            clearInterval(locationInterval); 
//         } 
//     }, []);

//     useEffect(()=>{
//         try{
//             const calling = async()=>{
//                 const response = await axios.get("/api/ride/liveRide");
//                 const data = response.data;

//                 // console.log(data.rides);
//                 setRides(data.rides);
//             }

//             calling();
//         }catch(error){
//             console.log(error.message);
//         }
//     }, []);

//     useEffect(()=>{
//         socket.emit("join", {id : captain._id , type : "captain"});

//         socket.on("rideCreated", (data)=>{
//             alert(data.message);
//             console.log(data);
//         });

//         return (()=>{
//             socket.off("join");
//         })
//     }, [captain]);

//   return (
//     <div className="flex h-screen bg-gray-100 font-sans">
//       {/* Sidebar */}
//       <div className="w-64 bg-indigo-900 text-white p-4 flex flex-col">
//         {/* Profile */}
//         <div className="flex items-center space-x-3 p-2 border-b border-indigo-700">
//           <div className="bg-yellow-400 rounded-full p-2 text-indigo-900 font-bold">RK</div>
//           <div>
//             <p className="font-bold">Rajesh Kumar</p>
//             <p className="text-xs text-indigo-200">DL04 2018 0056789</p>
//           </div>
//         </div>

//         {/* Online Toggle */}
//         <div className="my-6 flex flex-col items-center">
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input 
//               type="checkbox" 
//               className="sr-only peer" 
//               checked={isOnline}
//               onChange={() => setIsOnline(!isOnline)}
//             />
//             <div className={`w-14 h-7 rounded-full peer ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}>
//               <div className={`absolute top-1 left-1 bg-white rounded-full h-5 w-5 transition-transform ${isOnline ? 'transform translate-x-7' : ''}`}></div>
//             </div>
//           </label>
//           <span className="mt-2 text-sm">{isOnline ? 'AVAILABLE' : 'OFFLINE'}</span>
//           <span className="text-xs text-indigo-300">{isOnline ? 'Accepting rides' : 'Not visible'}</span>
//         </div>

//         {/* Navigation */}
//         <nav className="space-y-1 flex-1">
//           <button className="w-full text-left p-3 bg-indigo-800 rounded flex items-center">
//             <span className="mr-2">🏠</span> Dashboard
//           </button>
//           <button className="w-full text-left p-3 hover:bg-indigo-800 rounded flex items-center">
//             <span className="mr-2">💰</span> Available Rides
//           </button>
//           <button className="w-full text-left p-3 hover:bg-indigo-800 rounded flex items-center">
//             <span className="mr-2">📅</span> Recent Rides
//           </button>
//           <button className="w-full text-left p-3 hover:bg-indigo-800 rounded flex items-center">
//             <span className="mr-2">🚗</span> My Vehicle
//           </button>
//           <button className="w-full text-left p-3 hover:bg-indigo-800 rounded flex items-center">
//             <span className="mr-2">📄</span> Documents
//           </button>
//           <button className="w-full text-left p-3 hover:bg-indigo-800 rounded flex items-center">
//             <span className="mr-2">🏆</span> Incentives
//           </button>
//         </nav>

//         {/* Footer */}
//         <div className="mt-auto border-t border-indigo-700 pt-3 space-y-2">
//           <button className="w-full text-left p-2 hover:bg-indigo-800 rounded flex items-center">
//             <span className="mr-2">🆘</span> 24x7 Support
//           </button>
//           <button className="w-full text-left p-2 text-red-300 hover:bg-indigo-800 rounded flex items-center">
//             <span className="mr-2">🚪</span> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto p-6">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <StatCard 
//             title="Today's Earnings" 
//             value={`₹${stats.todayEarnings}`} 
//             change="+12% from yesterday" 
//             color="green"
//           />
//           <StatCard 
//             title="Online Time" 
//             value={`${stats.onlineHours}h`} 
//             change="Daily avg: 6.2h" 
//             color="blue"
//           />
//           <StatCard 
//             title="Acceptance" 
//             value={`${stats.acceptanceRate}%`} 
//             change="Target: 85%" 
//             color="purple"
//           />
//           <StatCard 
//             title="Your Rating" 
//             value={stats.rating.toFixed(1)} 
//             change="100+ ratings" 
//             color="yellow"
//           />
//         </div>

//         {/* Active Ride */}
//         {activeRide && (
//           <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-green-500">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="font-bold text-lg">ACTIVE RIDE</h3>
//                 <div className="flex items-center mt-2">
//                   <div className="bg-gray-100 p-3 rounded-full mr-3 font-bold">
//                     {activeRide.passenger.name.charAt(0)}
//                   </div>
//                   <div>
//                     <p className="font-medium">{activeRide.passenger.name}</p>
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <span key={i} className={i < Math.floor(activeRide.passenger.rating) ? 'text-yellow-400' : 'text-gray-300'}>
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="text-right">
//                 <p className="text-2xl font-bold">₹{activeRide.fare}</p>
//                 <p className="text-sm text-gray-500">{activeRide.distance} • {activeRide.duration}</p>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <RideDetail title="Pickup" value={activeRide.pickup} />
//               <RideDetail title="Drop" value={activeRide.drop} />
//               <RideDetail title="Payment" value={activeRide.paymentMethod} />
//             </div>

//             <div className="mt-6 flex flex-col sm:flex-row gap-3">
//               <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg">
//                 Navigate to Pickup
//               </button>
//               <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg">
//                 Call Passenger
//               </button>
//               <button 
//                 onClick={completeRide}
//                 className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
//               >
//                 Complete Ride
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Recent Rides */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="p-4 border-b flex justify-between items-center">
//             <h3 className="font-bold">RECENT RIDES</h3>
//             <button className="text-indigo-600 text-sm">View All</button>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead className="bg-gray-50 text-left text-gray-500 text-xs">
//                 <tr>
//                   <th className="p-3">ID</th>
//                   <th>Passenger</th>
//                   <th>Time</th>
//                   <th>Fare</th>
//                   <th>Rating</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {stats.recentRides.map(ride => (
//                   <tr key={ride.id} className="border-t hover:bg-gray-50">
//                     <td className="p-3 text-sm font-mono">#{ride.id.slice(-4)}</td>
//                     <td>
//                       <div className="flex items-center">
//                         <div className="bg-gray-100 p-2 rounded-full mr-2 font-bold">
//                           {ride.passenger.charAt(0)}
//                         </div>
//                         {ride.passenger}
//                       </div>
//                     </td>
//                     <td className="text-sm text-gray-500">{ride.time}</td>
//                     <td className="font-medium">₹{ride.fare}</td>
//                     <td>
//                       <div className="flex">
//                         <span className="text-yellow-400">★</span>
//                         <span className="ml-1 text-sm">{ride.rating}</span>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Right Sidebar */}
//       <div className="w-72 bg-gray-50 p-4 border-l hidden lg:block">
//         <h3 className="font-bold mb-4">DAILY TARGET</h3>
//         <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
//           <div className="flex justify-between mb-2">
//             <span className="text-sm">₹{stats.earnedToday} earned</span>
//             <span className="text-sm">₹{stats.dailyTarget} target</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-green-500 h-2 rounded-full" 
//               style={{ width: `${(stats.earnedToday/stats.dailyTarget)*100}%` }}
//             ></div>
//           </div>
//         </div>

//         <h3 className="font-bold mb-4">INCENTIVES</h3>
//         <div className="space-y-3">
//           {stats.incentives.map((inc, i) => (
//             <IncentiveCard 
//               key={i}
//               title={inc.title}
//               description={inc.description}
//               progress={inc.progress}
//               target={inc.target}
//               reward={inc.reward}
//             />
//           ))}
//         </div>

//         <div className="mt-6 bg-indigo-50 rounded-lg p-4">
//           <h4 className="font-bold text-indigo-800 mb-2">QUICK LINKS</h4>
//           <button className="flex items-center text-sm p-2 w-full hover:bg-indigo-100 rounded">
//             <span className="mr-2">📥</span> Download Invoice
//           </button>
//           <button className="flex items-center text-sm p-2 w-full hover:bg-indigo-100 rounded">
//             <span className="mr-2">❓</span> Help Center
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Components
// const StatCard = ({ title, value, change, color }) => {
//   const colorClasses = {
//     green: 'bg-green-50 text-green-800',
//     blue: 'bg-blue-50 text-blue-800',
//     purple: 'bg-purple-50 text-purple-800',
//     yellow: 'bg-yellow-50 text-yellow-800'
//   };

//   return (
//     <div className={`${colorClasses[color]} p-4 rounded-lg shadow-sm`}>
//       <h4 className="text-sm font-medium">{title}</h4>
//       <p className="text-2xl font-bold my-2">{value}</p>
//       <p className="text-xs">{change}</p>
//     </div>
//   );
// };

// const RideDetail = ({ title, value }) => (
//   <div className="bg-gray-50 p-3 rounded-lg">
//     <h4 className="text-xs text-gray-500">{title}</h4>
//     <p className="font-medium">{value}</p>
//   </div>
// );

// const IncentiveCard = ({ title, description, progress, target, reward }) => (
//   <div className="bg-white p-3 rounded-lg shadow-sm border">
//     <h4 className="font-medium">{title}</h4>
//     <p className="text-sm text-gray-600 mb-2">{description}</p>
//     <div className="flex items-center justify-between">
//       <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
//         <div 
//           className="bg-orange-500 h-2 rounded-full" 
//           style={{ width: `${(progress/target)*100}%` }}
//         ></div>
//       </div>
//       <span className="text-xs font-medium">{progress}/{target}</span>
//     </div>
//     <p className="text-sm mt-2 text-green-600 font-medium">Reward: {reward}</p>
//   </div>
// );

// export default CaptainHome;









































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