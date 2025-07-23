import { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserRideContext } from "../context/UserRideContext";
import toast from "react-hot-toast";
import axios from "axios";

const UserCurrRide = ()=>{

    const {socket} = SocketContext();
    const [currRide, setCurrRide] = UserRideContext();

    const handleClick = async()=>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ride/${currRide._id}/cancel`,  {
          withCredentials : true,
        });
        toast.success(response.data.message);

        localStorage.removeItem("userRideToken");
        setCurrRide(null);
      }catch(error){
        toast.error(error.message);
      }
    }

    const handlePayment = async(price, itemName)=>{
          const loadScript = (src)=>{
            return new Promise((resolve)=>{
                const script = document.createElement('script');
                script.src = src;
                script.onload = ()=>{
                    resolve(true);
                }
                script.onerror = ()=>{
                    resolve(false);
                }

                document.body.appendChild(script);
            })  
        }
        const load = async()=>{
          await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        }

        try{
            load(); 
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payment/createOrder`, {
                rideId: 1,
                fare: "300",
            },  {
            withCredentials : true,
          });

            const data = response.data;
            console.log(response.razorpay_payment_id);

            const paymentObject = new window.Razorpay({
                key : import.meta.env.VITE_RAZORPAY_KEY_ID,
                order_id : data.id,
                ...data,
                handler : async function(response){
                    const options = {
                        order_id : response.razorpay_order_id,
                        payment_id : response.razorpay_payment_id,
                        signature: response.razorpay_signature
                    }

                    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/payment/verifyPayment`, options,  {
                      withCredentials : true,
                    });
                    console.log(res.data);
                    if(res.data.success){
                        alert('Payment Successfull');
                    }else{
                        alert('Payment failed');
                    }
                }
            });

            paymentObject.open();
        }catch(error){
            console.log(error);
        }
    }

      useEffect(()=>{
        socket.on("ride-accepted", ({message, ride})=>{
          setCurrRide(ride);
          toast.success(message);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        })
        console.log(currRide.captain);
      }, [socket]);

    return (
              <div className="flex-1 p-16 bg-gray-50 flex flex-col justify-center space-y-10">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">Ride Detail</h1>

                  <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Ride ID</span>
                      <span className="text-gray-900">{currRide._id}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Pickup</span>
                      <span className="text-gray-900 text-right">{currRide.pickup}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Destination</span>
                      <span className="text-gray-900 text-right">{currRide.destination}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Distance</span>
                      <span className="text-gray-900">{currRide.distance.toFixed(2)} km</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Fare</span>
                      <span className="text-green-600 font-semibold">₹{currRide.fare}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Vehicle Type</span>
                      <span className="text-gray-900">{currRide.vehicleType}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Status</span>
                      <span className={`font-semibold capitalize ${
                        currRide.status === 'accepted' ? 'text-blue-600' :
                        currRide.status === 'pending' ? 'text-yellow-600' :
                        currRide.status === 'completed' ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {currRide.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Requested At</span>
                      <span className="text-gray-900">{new Date(currRide.createdAt).toLocaleString()}</span>
                    </div>

                    {currRide.captain && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Captain Name</span>
                        <span className="text-gray-900">{currRide.captain.username}</span>
                      </div>
                    )}
                  </div>
                </div>

                { currRide.status === 'accepted' && ( <button
                    className="w-full p-4 bg-blue-800 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-1"
                  > Waiting For Captain....
                  </button>)
                }

                { currRide.status === 'pending' &&                   ( <button
                    onClick={handleClick}
                    className="w-full p-4 bg-red-700 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-1"
                  > Cancel Ride
                  </button>)
                }

                { currRide.status === 'completed' && ( <button
                    onClick={handlePayment}
                    className="w-full p-4 bg-green-700 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-1"
                  > Pay Captain
                  </button>)
                }  
              </div>
    )
}

export default UserCurrRide;