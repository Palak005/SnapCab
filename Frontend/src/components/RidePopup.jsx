const RidePopup = ({setShowPopup, ride})=>{
    console.log(ride);
    return (
        <>
            {ride && (
            <div className="fixed inset-0 bg-[#000000ac] bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-4">
                <h2 className="text-2xl font-bold mb-4">Ride Created!</h2>
                <div className="mb-4">
                    <p><strong>Pickup:</strong> {ride.pickup}</p>
                    <p><strong>Destination:</strong> {ride.destination}</p>
                    <p><strong>Vehicle:</strong> {ride.vehicleType}</p>
                    <p><strong>Distance:</strong> {Math.round(ride.distance)}</p>
                    <p><strong>Fare:</strong> ₹{ride.fare}</p>
                    <p><strong>Status:</strong> {ride.status}</p>
                </div>

                <button
                    onClick={() => {
                        setShowPopup(false);
                    }}
                    className="w-full bg-[#1a355b] text-white py-3 rounded-xl hover:bg-[#1a355bb6]"
                >
                    Close
                </button>
                </div>
            </div>
            )}
        </>
    );
}

export default RidePopup;
