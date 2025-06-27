## 📍 Pickup & Destination Search + Ride Creation

### ✅ Functionality Overview
This page allows users to:
- Enter **pickup** and **destination** addresses with **real-time auto-suggestions**.
- Select a **vehicle type** from a dropdown (Car, Auto, Bike, Tuk-Tuk).
- **Book a ride** by submitting the selected options.

---

### 🧠 Key Features & Logic

#### 1. Auto-Suggestion with Debounce
- API call to `/api/map/autoSuggestion` with `address` param.
- Debounced using `setTimeout` (1000ms delay) in `useEffect`.
- Suggestions shown based on focused input (pickup/destination).

#### 2. Focus-Based Suggestion Control
- Tracks the active input using `focusedField` state.
- Suggestions are conditionally rendered under the appropriate input.

#### 3. Suggestion Selection
- Clicking a suggestion:
  - Autofills the corresponding input.
  - Clears the suggestion list.

#### 4. Ride Creation
- On clicking **Book Ride**, a `POST` request is sent to `/api/ride/create`:
```json
{
  "pickup": "Selected Pickup Location",
  "destination": "Selected Destination",
  "vehicleType": "bike"
}


```
### 📍 Distance Calculation Using Latitude and Longitude

This project calculates the distance between two geographic points (pickup and destination) using the **Haversine formula**. This method considers the curvature of the Earth for accurate distance measurement.

#### 🔧 JavaScript Implementation

```js
function getDistanceInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

# ⚡ Socket.IO Integration – Backend & Frontend Logic

This document outlines the **working logic** of implementing real-time communication using **Socket.IO** in a ride-booking app context. The setup allows users and captains to establish socket connections and communicate efficiently.

---

## 🖥️ Backend (Node.js + Express + Socket.IO)

### 🔧 Setup
- Create an HTTP server with Express.
- Initialize Socket.IO on top of the HTTP server.
- Connect to MongoDB using a `connectDb` function.

### 🔄 Socket Logic

#### 1. **Client Connection**
When a new client connects, the server logs their `socket.id`.

#### 2. **Join Event**
The client emits a `join` event with their `id` and `type` (`user` or `captain`).  
The server:
- Identifies the user type.
- Finds the user or captain in the MongoDB collection.
- Updates their document with the new `socketId`.

#### 3. **Disconnect Event**
When a client disconnects, their disconnection is logged.

### 🧠 Purpose
- Enables targeted socket communication (e.g., sending events to a specific captain or user).
- Stores the socket ID persistently for later use (e.g., during ride requests).

---

## 💻 Frontend (React + Socket.IO Client)

### 🔧 Setup
- Connect to the backend server using `io("http://localhost:3000/")`.
- Use React Context API to wrap the socket logic and make it accessible app-wide.

### 🔄 Socket Logic

#### 1. **Automatic Connection**
- When the app loads, the socket connects to the server.
- Connection and disconnection are logged via `useEffect`.

#### 2. **Sending Events**
- `sendMessage(event, data)`: emits a socket event to the server (e.g., `join`, `ride-request`).

#### 3. **Receiving Events**
- `recieveMessage(event, callback)`: listens for a socket event and handles it via a callback.

#### 4. **Context Provider**
- Wraps children components with `SocketContext.Provider`, exposing `sendMessage` and `recieveMessage`.

### 🧠 Purpose
- Provides real-time communication hooks across the app.
- Used for ride status updates, driver location tracking, etc.

---

## 🔄 Flow Summary

1. **User/Captain opens app** → Socket connects.
2. **Client emits `join`** with ID + type.
3. **Server saves `socketId`** for that ID.
4. **Both ends** can now communicate with events (e.g., `ride-accepted`, `location-update`).

---

## ✅ Benefits

- Real-time updates between users and captains.
- Centralized socket logic using context in React.
- Persistent `socketId` tracking on backend for user-to-user messaging.


