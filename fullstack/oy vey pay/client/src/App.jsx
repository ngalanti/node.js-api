import { AuthForm, Dashboard, Navbar, useAuth, Expenses } from "./components";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";

function App() {
  const { isLoggedIn, user, isPendig } = useAuth();
  if (isPendig) {

    return <div>Loading...</div>;
  }
  
  
  return (
    <>
      {isLoggedIn ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
      <ToastContainer position="top-right" theme="colored" autoClose={5000} />
    </>
  );
}

export default App;
