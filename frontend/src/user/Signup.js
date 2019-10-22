import React, { Component } from 'react';

class Signup extends Component {
    constructor(){
        super();
        this.state = {
            name:"",
            email: "",
            password: "",
            confirmPassword: "",
            error: ""
        };
    }
    render() {
        return (
            <div className="flex h-screen w-screen"> 
                <div className="flex-col flex-1 flex justify-center items-center">
                    <h2 className="text-3xl text-center font-semibold p-4">사이공드래곤즈의 회원이 되세요</h2>
                    <span className='pb-8 text-center text-xl font-normal'>Sign up and Get a membership</span>
                    <form className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    FullName
                                </label>
                            </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="YourEmail@domain.com" />
                        </div>
                        
                       </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Password
                                </label>
                            </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="**********" />
                        </div>
                        
                       </div>
                        <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3"></div>
                            <label class="md:w-2/3 block text-gray-500 font-bold">
                              <input class="mr-2 leading-tight" type="checkbox"/>
                              <span class="text-sm">
                                I agree with signup
                              </span>
                            </label>
                        </div>
                        <div class="md:flex md:items-center">
                            <div class="md:w-1/3"></div>
                            <div class="md:w-2/3">
                            <button class="shadow bg-blue-400 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                              Sign Up
                            </button>
                            </div>
                        </div>
             
                    </form>
                    
                </div>
                <div className="flex-1">
                    this is card page
                </div>
            </div>
            
        );
    }
}

export default Signup;