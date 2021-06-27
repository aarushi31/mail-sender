import React from 'react'
import '../css/home.css'
import { Button } from '@material-ui/core';



function Home() {
    return (
        <div className="home-container">
            <img src="/images/home.svg" className="home-image"/>
            <div className="content">
                <h1 className="home-heading">Send mails easily. Anytime. Anywhere.</h1>
                <p className="home-para">Send timely and personalized emails without having to hit the send button each time. Mail-Sender empowers you to quickly and easily keep in touch with your customers and grow your business - while spending much less time and money.</p>
                <div className="buttons">
            <Button variant="contained" color="primary" href="/login">
                Login
            </Button>
            <Button variant="outlined" color="primary" style={{marginLeft:"1rem"}} href="/signup">
            Create an account
            </Button>
            </div>
            </div>
            
        </div>
    )
}

export default Home
