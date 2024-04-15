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
