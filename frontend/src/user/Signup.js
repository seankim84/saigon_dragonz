import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import signupImage from '../images/signupPhoto.jpg';


class Signup extends Component {
    constructor(){
        super();
        this.state = {
            name:"",
            email: "",
            password: "",
            confirmPassword: "",
            toggle: false,
            error: "",
            open: false
        };
    }
    
    handleChange = (name) => (event)  => {
        this.setState({error: ""})
        this.setState({
            [name]: event.target.value 
        })
    };

    handleToggle = (toggle) => {
        this.setState({
            toggle: !toggle
        })
    };


    clickSubmit = event => {
        // page reroad 막아줌
        event.preventDefault();
        const { name, email, password, confirmPassword,toggle } = this.state;
        const user = {
            name,
            email,
            password,
            confirmPassword,
            toggle
        };
        // console.log(user)
        this.signup(user)
        .then(data => {
            if(data.error){
                this.setState({
                    error: data.error
                })
            } else {
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    confirmPassword: "",
                    passowrd: "",
                    open: true
                })
            }
        })
    };

    signup = (user) => {
        return fetch('http://localhost:8000/signup', {
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
    };

    signupForm = (name, email, password, confirmPassword, error, open) => (
            <form className="w-full max-w-sm">
                <div style={{display: error ? "" : 'none'}} className="pb-6" role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error Message
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-2 text-red-700">
                    <p>{error}</p>
                  </div>
                </div>

                <div style={{display: open ? "" : 'none'}} className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-4" role="alert">
                  <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                    <div>
                      <p className="font-bold">회원가입 성공</p>
                      <p className="text-sm"><Link to='/signin'>로그인</Link> 해주세요</p>
                    </div>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            FullName
                        </label>
                    </div>
                    
                <div className="md:w-2/3">
                    <input onChange={this.handleChange("name")} value={name} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Name" />
                </div>
               </div>

               <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Email
                        </label>
                    </div>
                    
                <div className="md:w-2/3">
                    <input value={email} onChange={this.handleChange("email")} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="YourEmail@domain.com" />
                </div>
               </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Password
                        </label>
                    </div>
                <div className="md:w-2/3">
                    <input value={password} onChange={this.handleChange("password")} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" placeholder="**********" />
                </div>
               </div>

               <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            ConfirmPassword
                        </label>
                    </div>
                <div className="md:w-2/3">
                    <input value={confirmPassword} onChange={this.handleChange("confirmPassword")} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" placeholder="**********" />
                </div>
               </div>

                <label className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>
                    <label className="md:w-2/3 block text-gray-500 font-bold">
                      <input onClick={this.handleToggle} className="mr-2 leading-tight" type="checkbox"/>
                      <span className="text-sm">
                        I agree with signup
                      </span>
                    </label>
                </label>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                    <button onClick={this.clickSubmit} className="shadow bg-blue-400 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                      Sign Up
                    </button>
                    </div>
                </div>
            </form>
        )

    render() {
        const { name, email, password, confirmPassword, error, open } = this.state;
        return (
            <div className="flex h-screen w-screen"> 
                <div className="flex-col flex-1 flex justify-center items-center">
                    <h2 className="text-3xl text-center font-semibold p-4">사이공드래곤즈의 회원이 되세요</h2>
                    <span className='pb-8 text-center text-xl font-normal'>Sign up and Get a membership</span>
                    {this.signupForm(name, email, password, confirmPassword, error, open )}
                </div>

                <div className="flex-1 flex items-center h-screen">
                    <div className="overflow-hidden shadow-lg">
                        <div className="max-w-sm w-full lg:max-w-full lg:flex">
                          <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug">
                                <img src={signupImage} alt="saigonDragons" />
                          </div>
                          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div className="mb-8">
                              <p className="text-sm text-gray-600 flex items-center">
                                <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                  <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                </svg>
                                Saigon Dragonz Members only
                              </p>
                              <div className="text-gray-900 font-bold text-xl mb-2">호치민에서 가장 좋은 팀에 오고 싶으다구요?</div>
                              <p className="text-gray-700 text-base">우리는 가족입니다. 실력과 나이에 관계없이 <br />모두가 즐기고 운동하는게 목적이라면<br /> 주저하지말고 오세요</p>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Signup;