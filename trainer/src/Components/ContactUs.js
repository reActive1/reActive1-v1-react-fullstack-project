import React from 'react';
import "./CssComponents/ContactUs.css";
import emailjs from 'emailjs-com';
import axios from 'axios';


class ContactUs extends React.Component {
    constructor() {
        super();
        this.state = {
          fullName: '',
          email: '',
          phone: '',
          message: '',
        };
        this.onChange = this.onChange.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
      }

      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

    async onSubmit(){
        const { fullName, email, phone, message }  = this.state;
        try{
            const res = await axios.post('http://localhost:5000/api/contactus', { fullName, email, phone, message });
        }
        catch(error){
            console.log(error.response.data);
            console.log(error.response.status);
        }   
    }

    
    sendEmail(e) {
        e.preventDefault();
		emailjs.sendForm('default_service', 'template_reactiveContact', e.target, 'user_Z7LFrvscaqMDqmneHCVWV')
		  .then((result) => {
			  console.log(result.text);
		  }, (error) => {
			  console.log(error.text);
		  });
          e.target.reset()
          this.onSubmit();
	}
    render(){
        const { fullName, email, phone, message } = this.state;
        return (
            <div className="container card-container">
                <div className="myCard">
                    <div className="row card-row">
                        <div className="col-md-6">
                            <div className="myLeftCtn"> 
                                <form className="myForm text-center" onSubmit={this.sendEmail}>
                                    <header>Contact Us</header>
                                    <div className="form-group">
                                        <i className="fas fa-user"></i>
                                        <input 
                                           className="myInput" 
                                           onChange={this.onChange} 
                                           type="text"
                                           placeholder="Full Name"
                                           id="username" 
                                           name="fullName"
                                           required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <i className="fas fa-envelope"></i>
                                        <input
                                            className="myInput" 
                                            onChange={this.onChange}
                                            type="email" 
                                            placeholder="E-mail" 
                                            id="email" 
                                            name="email" 
                                            required
                                         />
                                    </div>
                                    <div className="form-group">
                                        <i className="fas fa-phone"></i>
                                        <input 
                                            className="myInput" 
                                            onChange={this.onChange} 
                                            type="text" 
                                            id="phone" 
                                            placeholder="Phone" 
                                            name="phone"
                                        /> 
                                    </div>
                                    <div className="form-group text-area">
                                        <i className="fas fa-envelope-open-text textarea-contact"></i>
                                        <textarea
                                            className="myInput" 
                                            onChange={this.onChange} 
                                            id="message" 
                                            placeholder="Your Message" 
                                            rows="4" cols="30" 
                                            name="message"
                                        />
                                    </div>
                                    <input type="submit"  className="butt" value="SEND"/>
                                </form>
                            </div>
                        </div> 
                        <div className="col-md-6">
                            <div className="myRightCtn">
                                <div className="box text-white pb-5 text-center"><header>We’d love to hear from you</header>
                                    <p className="contact-text pt-4">Whether you have a question about the application, have feedback to give, idea to improve or just share anything in your heart and mind, we would love to hear from you</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}

export default ContactUs;