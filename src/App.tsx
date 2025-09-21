import "./App.css";  
import { useState } from "react";
import { AppRoutes } from "./routes";
import { Layout } from "./components/layouts";
import { LoginModal } from "./components/modal/login";
import { RegisterModal } from "./components/modal/register";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="App">
      <Layout onLoginClick={() => setIsLoginOpen(true)}>
        <AppRoutes />
      </Layout>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => setIsRegisterOpen(true)}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => setIsLoginOpen(true)}
      />
    </div>
  );
}

export default App;
