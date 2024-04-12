import { Routes, Route } from "react-router-dom";

import { AuthProvider  } from "./contexts/AuthContext";

function App() {

    return (
        <AuthProvider>
                <div className="site">
                    <main className="site-main">
                        <Routes >
                           
                        </Routes>
                    </main>
                </div>
        </AuthProvider>
    )
}

export default App;
