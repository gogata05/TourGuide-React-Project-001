import { Routes, Route } from "react-router-dom";

import { AuthProvider  } from "./contexts/AuthContext";
import { TripProvider } from "./contexts/TripContext";

function App() {

    return (
        <AuthProvider>
            <TripProvider>
                <div className="site">
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
