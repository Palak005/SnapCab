export const HomeRightCard = ()=>{
    return <div className="flex-1 relative">
      <img
        src="https://images.unsplash.com/photo-1731178683825-07c4552940ae?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Ride Background"
        className="w-full h-full object-cover"
      />
      {/* Optional: Overlay text or blur effect */}
      <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white text-xl p-4 backdrop-blur-sm">
        Your Ride, On Demand
      </div>
    </div>
}
