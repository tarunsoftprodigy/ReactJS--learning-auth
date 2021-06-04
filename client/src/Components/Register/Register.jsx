import React , {useEffect , useState, useRef} from 'react'
import axios from 'axios'
import {Link , useHistory} from 'react-router-dom'
import '../Login/Login.css'


const Register = () => {

    const [error, setError] = useState("")
    const email = useRef()
    const password = useRef()    
    const confirmPassword = useRef()    
    const username = useRef()

    const history = useHistory()

     useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push('/')
        }
    }, [history])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password.current.value !== confirmPassword.current.value) {
            password.current.value = '' 
            confirmPassword.current.value = ''
            setTimeout(() => {
                setError("")
            }, 4000)
           return setError("Passwords do not match")
        }

        const config = {
                  headers: {
                    'Content-Type': 'application/json'
                }
        }

        const userData = {
            username: username.current.value, 
            email : email.current.value ,
            password: password.current.value    
        }

        await axios.post('/api/auth/register', userData , config)
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

                <h3>Sign Up</h3>

                {error && <span className="error-msg">{error}</span>}

                <form onSubmit={handleSubmit}>

                    <input 
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        ref= {username}
                        required
                    />

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
                    
                     <input type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        ref = {confirmPassword}
                        required  />

                     <button>Register</button>

                     <p> Already a user? <Link to="/login"> Login</Link> </p>
                </form>
        </div>
    )
}

export default Register
