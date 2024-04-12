import { Routes, Route } from "react-router-dom";

import { AuthProvider  } from "./contexts/AuthContext";
import { TripProvider } from "./contexts/TripContext";
import { Navigation } from "./components/Navigation";

function App() {

    return (
        <AuthProvider>
            <TripProvider>
                <div className="site">
                    <Navigation />
                    <main className="site-main">
                        <Routes >
                           
                        </Routes>
                    </main>
                </div>
            </TripProvider>
        </AuthProvider>
    )
}

export default App;
