import React, { Component } from 'react'
import axios from 'axios';
// import "./CssComponents/SignInForm.css"

export class SignIn extends React.Component {

    constructor(){
        super();
        this.state = {
            userName: '',
            password: '',
        }
        this.changeUserName = this.changeUserName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    changeUserName(event){
        this.setState({userName:event.target.value})
    }

    changePassword(event){
        this.setState({password:event.target.value})
    }


    async onSubmit(event){
        event.preventDefault();

        const registered = { 
            userName: this.state.userName,
            password: this.state.password,
        }

        try{
            const res = await axios.post('http://localhost:5000/api/signin', registered);
            if (res.data === -1){
                alert("password is not correct")
            }
            else{
                window.location='/'; 
            }
        }
        catch(error){
            console.log(error.response.data);
            console.log(error.response.status);
        }   
    }

    render() {
        return (
            <div>
                        <form onSubmit={this.onSubmit}>
                        <div className='form-div'>
                           <h1>Sign In</h1>
                           <p>Please fill in this form to get in an account.</p>
                            <input type = 'text'
                             placeholder='username'
                             onChange={this.changeUserName}
                             value={this.state.userName}
                             className='form-control form-group'
                             />
                             <input type = 'password'
                             placeholder='password'
                             onChange={this.changePassword}
                             value={this.state.password}
                             className='form-control form-group'
                             />
                             <input type='submit' className='btn btn-danger btn-block' value='log in'/>
                             <div className="container signin">
                                <p>Dont have an account? <a href="SignUp">Sign up</a>.</p>
                            </div>
                         </div>

                        </form>


                </div>
        )
    }
}

export default SignIn;