import "./App.css";
import { useState } from "react";
import { AppRoutes } from "./routes";
import { Layout } from "./components/layouts";
import { LoginModal } from "./components/modal/login";
import { RegisterModal } from "./components/modal/register";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLoginRequired = () => {
    setIsRegisterOpen(false); 
    setIsLoginOpen(true);    
  };

  return (
    <div className="App">
      <Layout onLoginClick={() => setIsLoginOpen(true)}>
        <AppRoutes onLoginRequired={handleLoginRequired} />
      </Layout>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
      
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
