import React from 'react';
import "./CssComponents/AboutUs.css";
import Racheli from "../Common/Team/racheli.jpg"
import Stav from "../Common/Team/stav.jpg"
import Yael from "../Common/Team/yael.jpg"
import Keren from "../Common/Team/keren.jpg"
import Shiran from "../Common/Team/shiran.jpg"
import Adi from "../Common/Team/adi.jpg"
import Maayan from "../Common/Team/maayan.jpg"

class AboutUs extends React.Component {


    render(){
        const elements = [
            {'name': "Racheli","role":"Web developer",'img': Racheli,'website':"https://racheliver.github.io/",'github':"https://github.com/racheliver",'linkedin': "https://www.linkedin.com/in/racheli-verechzon-5343bb123/","mail":"mailto:racheliver@gmail.com","about":"Developer of business websites and expert in improving website performance through Vue.js / React."},
            {'name': "Keren","role":"Fullstack Developer",'img': Keren,'about': "Software engineer with passion for developing new products, both independently and as a part of a team","website":"website","linkedin":"https://www.linkedin.com/in/keren-omero/","github":"github","mail":"kerenomero@gmail.com"},
            {'name': "Yael","role":"Web Developer",'img': Yael,'about': "about","website":"website","linkedin":"linkedin","github":"github","mail":"mail"},
            {'name': "Stav","role":"Backend Developer",'img': Stav,  'about': "backend developer (c++/python), trying to improve the world with some technology","website":"website","linkedin":"https://www.linkedin.com/in/stav-reznik-107579151/","github":"https://github.com/StavRez","mail":"stav.reznik@gmail.com"},
            {'name': "Shiran","role":"Fullstack Developer",'img': Shiran,'about': "Technology enthusiast, passionate about software development. Love challenges, a team player with a can-do attitude","website":"website","linkedin":"https://www.linkedin.com/in/shiran-steinberg-48801686/","github":"https://github.com/steinshi","mail":"mailto:shiranste@gmail.com"},
            {'name': "Adi","role":"Senior Backend Developer",'img': Adi,'about': "Experienced backend developer (node.js/c#), technology lover who crossed to the dark side and played with the client side.","website":"website","linkedin":"https://www.linkedin.com/in/adi-regev-53279a53/","github":"https://github.com/adirDev","mail":"mailto:adi.kor1@gmail.com"}
        ];
        return (
            <div>
                <div className="container container-about pt-2">
                <h1 className="text-center pt-5 pb-3">MEET OUR TEAM</h1>
                    <div className="row">
                        {elements.map((keyName,key) => (
                                <div className="col-md-4 col-sm-6" key={key}>
                                <div className="our-team">
                                    <div className="pic">
                                        <img src={keyName.img}/>
                                    </div>
                                    <ul className="social">
                                    <li><a href={keyName.github} ><i className="fab fa-github"></i></a></li>
                                    <li><a href={keyName.mail}><i className="fab fa-google"></i></a></li>
                                    <li><a href={keyName.website}><i className="fas fa-globe"></i></a></li>
                                    <li><a href={keyName.linkedin}><i className="fab fa-linkedin"></i></a></li>
                                    </ul>
                                    <div className="team-content pb-4">
                                        <h3 className="title">{keyName.name}</h3>
                                        <span className="post pl-1">{keyName.role}</span>
                                        <p className="description"> {keyName.about}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <section className="wrapper style2">
                    <div className="inner">
                        <div className="flex flex-2">
                            <div className="col col2">
                                <h5>Maayan Ezra, Mentor At BAOT</h5>
                                <h6>Senior Data Intelligence Engineer at Nvidia</h6><br/><br/>
                                <h6>The project was built step by step in individual and independent work,
                                     combined with the guidance of our technology mentor, Maayan.
                                     Maayan helped us realize the full potential of the group,
                                    We were glad we got to collaborate with someone like her, who was able to support the team in the small moments.</h6>
                    
                                <a href="https://extend-tech.com/baot?fbclid=IwAR0uiR-j9HslihxPPwFf5tDBp6Vg-nf2dJ8QXVDR-REwAsHfAzQ5YO5SxsE" className="button button-aboutus">Learn More</a>
                            </div>
                            <div className="col col1 first">
                                <div className="image round fit">
                                    <a href="https://www.linkedin.com/in/maayan-ezra-658b7bab/" className="link"><img src={Maayan} alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default AboutUs;