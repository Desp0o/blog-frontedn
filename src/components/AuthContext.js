import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
    
    const [currentUser, setCurrentUSer] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [currentMail, setCurrentMail] = useState(JSON.parse(localStorage.getItem("mail")) || null)
    const [refreshToken, setRefreshToken] = useState(JSON.parse(localStorage.getItem("refreshToken")) || null)
    const [tokenStatus, setTokenStatus] = useState('')
    const intervalInMilliseconds = (3 * 60 * 60 * 1000) + (55 * 60 * 1000);
  

    useEffect(()=>{
        setCurrentUSer(JSON.parse(localStorage.getItem("user")))  
        setCurrentMail(JSON.parse(localStorage.getItem("mail")))
    },[currentUser])
  

    const chekToken = async () => {
      try {
        const response = await axios.get("http://localhost:3300/users/checktoken", {withCredentials: true})
        setTokenStatus(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      chekToken()

      if (tokenStatus === 'no-token') {
        localStorage.setItem('user', null);
        localStorage.setItem('mail', null);
        setCurrentUSer(JSON.parse(localStorage.getItem("user")));
        setCurrentMail(JSON.parse(localStorage.getItem("mail")));
      }

      console.log(tokenStatus);
    }, [tokenStatus]);

    const logOutHandler = async ()=>{
      try {
        await axios.get("http://localhost:3300/users/logout", { withCredentials: true });
        
        window.location.href = '/';
      } catch (error) {
        console.log(error);
      }
    }

    const revokeToken = async () => {
      if(refreshToken){
        try {
          await axios.post('http://localhost:3300/users/refreshtoken', refreshToken, ({withCredentials: true}))
        } catch (error) {
          console.log(error);
        }
      }else{
        console.log('refresh token is not vaild');
      }
    }

    useEffect(()=>{
      if(tokenStatus === "token-valid"){
        revokeToken()
        const timer = setInterval(revokeToken, intervalInMilliseconds)

        return () => {
          clearInterval(timer);
        };
      }
      
    },[tokenStatus,intervalInMilliseconds ])
   

    return (
      <AuthContext.Provider value={{tokenStatus, currentUser, currentMail,chekToken, setCurrentMail, setRefreshToken, setCurrentUSer, logOutHandler }}>
        {children}
      </AuthContext.Provider>
    );
  };

