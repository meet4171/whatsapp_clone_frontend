import Login from "./components/auth/Login";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useContext } from "react";
import Home from "./components/Home";
import { AccountContext } from './context/AccountContext';



function App() {

  const { loggedInAccount } = useContext(AccountContext)



  const CLIENT_ID = '214391928639-c6877jmbjpojcv6etftjr641m75rj1lr.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={ CLIENT_ID }>
      {
        loggedInAccount
          ? <Home />
          : <Login />
      }
    </GoogleOAuthProvider>


  );
}

export default App;
