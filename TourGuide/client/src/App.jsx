import { Routes, Route } from "react-router-dom";

import { AuthProvider  } from "./contexts/AuthContext";
import { TripProvider } from "./contexts/TripContext";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { CreateAccount } from "./components/CreateAccount";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { NotFound } from "./components/NotFound";
import { Profile } from "./components/Profile";
import { EditProfile } from "./components/EditProfile";
import { CreateTrip } from "./components/CreateTrip";
import { RouteGuard } from "./components/RouteGuards";
import { AllTrips } from "./components/AllTrips";
import { MyTrips } from "./components/MyTrips";
import { TripDetails } from "./components/TripDetails";
import { EditTrip } from "./components/EditTrip";

function App() {

    return (
        <AuthProvider>
            <TripProvider>
                <div className="site">
                    <Navigation />
                    <main className="site-main">
                        <Routes >
                            <Route path="/" element={<Home />} />
                            <Route path="/user/login" element={<Login />} />
                            <Route path="/user/create-account" element={<CreateAccount />} />
                            <Route element={<RouteGuard />}>
                                <Route path="/user/profile/:userId" element={<Profile />} />
                                <Route path="/user/edit-profile/:userId" element={<EditProfile />} />
                                <Route path="/trip/create-trip" element={<CreateTrip />} />
                                <Route path="/trip/edit-trip/:tripId" element={<EditTrip />} />
                                <Route path="/trip/my-trips" element={<MyTrips />} />
                            </Route>
                            <Route path="/all-trips" element={<AllTrips />} />
                            <Route path="/trip/trip-details/:tripId" element={<TripDetails />} />
                            <Route path="/user/logout" element={<Logout />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </TripProvider>
        </AuthProvider>
    )
}

export default App;
