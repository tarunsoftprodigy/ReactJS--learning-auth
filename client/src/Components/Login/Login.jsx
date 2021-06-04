import React , {useEffect , useState, useRef} from 'react'
import axios from 'axios'
import {Link , useHistory} from 'react-router-dom'
import '../Login/Login.css'


const Register = () => {

    const [error, setError] = useState("")
    const email = useRef()
    const password = useRef()    

    const history = useHistory()

     useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push('/')
        }
    }, [history])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const config = {
              headers: {
                    'Content-Type': 'application/json'
                }
        }

        const userData = {
            email : email.current.value ,
            password: password.current.value, 
        }

        await axios.post('/api/auth/login', userData , config)
        .then(response => { 
           const data = response.data
           localStorage.setItem('authToken', data.token)
           history.push('/')
        })
        .catch(error => {
            setError(error.response.data.error)
            setTimeout(() =>{
                setError('')
            }, 4500)
        });
        
    }
    return (
             <div className="login-form">

                <h3>Sign In</h3>

                {error && <span className="error-msg">{error}</span>}

                <form onSubmit={handleSubmit}>

                    <input 
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        ref={email}
                        required />

                     <input type="password"
                        name="password"
                        placeholder="Enter your password"
                        ref = {password}
                        required  />
                    
                     <button>Login</button>
                     
                     <p>Don't have an account yet? <Link to ="/register"> Register </Link></p>
                </form>
        </div>
    )
}

export default Register
