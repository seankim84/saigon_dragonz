import React, { Component } from 'react'
import loginPhoto from '../images/loginPhoto.jpeg'

class Signin extends Component {
    constructor(){
      super();
      this.state = {
        email: "",
        password: "",
        error: "",
        redirectToReferer: false
      }
    }

    handleChange =  (name) => (event) => {
      this.setState({ error: "" })
      this.setState({
        [name]:event.target.value
      })
    };

    clickSubmit = (event) => {
      event.preventDefault();
      const { email, password, error, open } = this.state;
      const user = {
        email,
        password,
        error
      };
      this.signin(user)
      .then(data => {
        if(data.error){
          this.setState({
            error: data.error
          })
        } else {
          console.log(user)
          // authenticate
          // redirect
        }
      })
    }

    signin = (user) => {
      return fetch('http://localhost:8000/signin', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
    }

    signupForm = (email, password) => (
      <form className="w-full flex-col justify-center items-center p-4">
         <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                  User Email
              </label>
          </div>
          <div className="md:w-2/3">
              <input onChange={this.handleChange("email")} value={email} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="email" placeholder="Email" />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                  User Password
              </label> 
          </div>
          <div className="md:w-2/3">
              <input onChange={this.handleChange("password")} value={password} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" placeholder="Password" />
          </div>
          
        </div>
        <div className="w-full flex justify-center">
        <button onClick={this.clickSubmit} className="shadow bg-blue-400 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
          Login
        </button>
        </div>
      </form>
    )

    render() {
        const { email, password, error } = this.state;
        return (
          <div className="w-screen h-screen flex-col flex items-center flex justify-center bg-gray-100">
            <h2 className="text-2xl text-center font-mono pb-1 ">Are you Saigon Dragonz Member?</h2>
            <span className="font-mono pb-2">Please Login</span>
            <div className="max-w-lg rounded overflow-hidden shadow-lg">
                <img className="w-full" src={loginPhoto} alt="Sunset in the mountains"/>

                <div style={{display: error ? "" : 'none'}} className="p-3" role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error Message
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-2 text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
                {this.signupForm(email, password)}
                
                <div className="px-6 py-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#I</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Love</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Saigon</span>
                   <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#Dragonz</span>
                </div>
            </div>
          </div>
        )
    }
}

export default Signin;
