import React, {useState, useEffect} from 'react'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage/MainPage'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const storedUserInfo = localStorage.getItem("isLoggedIn");
        if (storedUserInfo === "1") {
            setIsLoggedIn(true);
        }
    },[]);

    const Login = (email, password) => {
            console.log("Login")
            localStorage.setItem("isLoggedIn", "1");
            setIsLoggedIn(true);
    }
    const Logout = () => {
        localStorage.removeItem("isLoggedIn")
        setIsLoggedIn(false);
        
    }
    return (
        <React.Fragment>
                <main>
                    {!isLoggedIn && <LoginForm Login={Login} />}
                    {isLoggedIn && <MainPage Logout={Logout} />}
                </main>
        </React.Fragment>
    )
}

export default App
