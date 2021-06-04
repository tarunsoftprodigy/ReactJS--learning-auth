import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import './Homepage.css'

const Homepage = () => {

    const [error, setError] = useState('')

    const history = useHistory()

    useEffect(() => {
        if(!localStorage.getItem('authToken')) {
            history.push('/login')
        }

     const fetchPage = async () => {
         await axios.get('/api/private', {
                headers: {
                    "Content-Type": "application/json" ,
                    Authorization : `Bearer ${localStorage.getItem('authToken')}`
                }
        })
        .then(response => { 
           const data = response.data
           console.log(data)
        })
        .catch(error => {
            localStorage.removeItem('authToken')
            console.log(error.response)
            setError(error)
        });
      }
        fetchPage()
    }, [history])

    const handleLogout = (e) => {
            e.preventDefault()
            localStorage.removeItem('authToken')
            history.push('/login')
    }

    return (
            error ? <span className="error-msg">{error}</span>
            : <div className="homepage">
                <h3>Welcome to the jungle !!</h3>
                <button onClick={handleLogout}>Logout</button>
              </div>
    )
}

export default Homepage
