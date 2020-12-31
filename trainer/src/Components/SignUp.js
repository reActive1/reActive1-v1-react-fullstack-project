import React, { Component } from 'react'
import "./CssComponents/SignUpForm.css"
import axios from 'axios';
import { Form, Radio } from 'semantic-ui-react'
import * as ImIcons from "react-icons/im";
import Input from '@material-ui/core/Input';


export class SignUp extends React.Component {

    constructor(){
        super();
        this.state = {
            name: '',
            userName: '',
            email: '',
            password: '',
            gender: '',
            gender2:'',
            weight: '',
            height: '',
            passHidden: true,
        }
        this.changeName = this.changeName.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.changeWeight = this.changeWeight.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeName(event){
        this.setState({name:event.target.value})
    }

    changeUserName(event){
        this.setState({userName:event.target.value})
    }

    changeEmail(event){
        this.setState({email:event.target.value})
    }

    changePassword(event){
        this.setState({password:event.target.value})
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    changeGender = (e, { gender }) => this.setState({ gender })

    changeWeight(event){
        this.setState({weight:event.target.value})
    }

    changeHeight(event){
        this.setState({height:event.target.value})
    }

    handleChange = (e, { value }) => this.setState({ value })


    async onSubmit(event){
        console.log("on submit methodddddddd")
        event.preventDefault();

        const registered = { 
            name: this.state.name,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            gender: this.state.gender,
            weight: this.state.weight,
            height: this.state.height,
        }

        try{
            const res = await axios.post('http://localhost:5000/api/signup', registered);
            if (res.data === -1){
                alert("username already exists")
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
                        <form >
                        <div className='form-div'>
                           <h1>Sign Up</h1>
                           <p>Please fill in this form to create an account.</p>
                            <input type = 'text'
                             placeholder='name'
                             onChange={this.changeName}
                             value={this.state.name}
                             className='form-control form-group'
                             />
                            <input type = 'text'
                             placeholder='username'
                             onChange={this.changeUserName}
                             value={this.state.userName}
                             className='form-control form-group'
                             />
                             <input type = 'text'
                             placeholder='email'
                             onChange={this.changeEmail}
                             value={this.state.email}
                             className='form-control form-group'
                             />
                             <input type ={this.state.passHidden ? 'password' : 'text'} //ImEye ImEyeBlocked
                             placeholder='password'
                             onChange={this.changePassword}
                             value={this.state.password}
                             className='form-control form-group'
                             />
                            {/* <button className="fa fa-eye"  onClick={this.toggleShow}></button> */}
                            <Form.Field>
                              Gender: <b>{this.state.gender}</b>
                            </Form.Field>
                            <Form.Field>
                            <Radio
                                label='female'
                                name='radioGroup'
                                gender='female'
                                checked={this.state.gender === 'female'}
                                onChange={this.changeGender}
                            />
                            </Form.Field>
                            <Form.Field>
                            <Radio
                                label='male'
                                name='radioGroup'
                                gender='male'
                                checked={this.state.gender === 'male'}
                                onChange={this.changeGender}
                            />
                            </Form.Field>
                            <input type = 'text'
                             placeholder='weight'
                             onChange={this.changeWeight}
                             value={this.state.weight}
                             className='form-control form-group'
                             />
                             <input type = 'text'
                             placeholder='height'
                             onChange={this.changeHeight}
                             value={this.state.height}
                             className='form-control form-group'
                             />
                             <input type='submit' className='btn btn-danger btn-block' value='Submit' onClick={this.onSubmit}/>
                             <div className="container signin">
                                <p>Already have an account? <a href="/SignIn">Sign in</a>.</p>
                            </div>
                         </div>
                        </form>
                </div>
        )
    }
}

export default SignUp;
