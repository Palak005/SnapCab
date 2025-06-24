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
