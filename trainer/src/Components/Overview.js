import React from 'react';
import "./CssComponents/Overview.css";
import Racheli from "../Common/Team/racheli.jpg"
import Stav from "../Common/Team/stav.jpg"
import Yael from "../Common/Team/yael.jpg"
import Keren from "../Common/Team/keren.jpg"
import Shiran from "../Common/Team/shiran.jpg"
import Adi from "../Common/Team/adi.jpg"
import Maayan from "../Common/Team/maayan.jpg"

class Overview extends React.Component {


    render(){
        const elements = [
            {'name': "Racheli","role":"Web developer",'img': Racheli,'website':"https://racheliver.github.io/",'github':"https://github.com/racheliver",'linkedin': "https://www.linkedin.com/in/racheli-verechzon-5343bb123/","mail":"mailto:racheliver@gmail.com","about":"Developer of business websites and expert in improving website performance through Vue.js / React, Loves to understand the needs of site users. Builds a customized data layer and other tools that increase sales."},
            {'name': "Keren","role":"Web Developer",'img': Keren,'about': "about","website":"website","linkedin":"linkedin","github":"github","mail":"mail"},
            {'name': "Yael","role":"Web Developer",'img': Yael,'about': "about","website":"website","linkedin":"linkedin","github":"github","mail":"mail"},
            {'name': "Stav","role":"Web Developer",'img': Stav,  'about': "about","website":"website","linkedin":"linkedin","github":"github","mail":"mail"},
            {'name': "Shiran","role":"Web Developer",'img': Shiran,'about': "about","website":"website","linkedin":"linkedin","github":"github","mail":"mail"},
            {'name': "Adi","role":"Web Developer",'img': Adi,'about': "about","website":"website","linkedin":"linkedin","github":"github","mail":"mail"}
        ];
        return (
            <div>
                <div className="container container-about pt-2">
                <h1 className="text-center">MEET OUR TEAM</h1>
                    <div className="row">
                        {elements.map((keyName) => (
                                <div className="col-md-4 col-sm-6">
                                <div className="our-team">
                                    <div className="pic">
                                        <img src={keyName.img}/>
                                    </div>
                                    <ul className="social">
                                    <li><a href={keyName.github}><i className="fab fa-github"></i></a></li>
                                    <li><a href={keyName.mail}><i className="fab fa-google"></i></a></li>
                                    <li><a href={keyName.website}><i className="fas fa-globe"></i></a></li>
                                    <li><a href={keyName.linkedin}><i className="fab fa-linkedin"></i></a></li>
                                    </ul>
                                    <div className="team-content pb-3">
                                        <h3 className="title">{keyName.name}</h3>
                                        <span className="post pl-1">{keyName.role}</span>
                                        <p className="description"> {keyName.about}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <section class="wrapper style2">
                    <div class="inner">
                        <div class="flex flex-2">
                            <div class="col col2">
                                <h5>Maayan Ezra, Mentor At BAOT</h5>
                                <h7>Senior Data Intelligence Engineer at Nvidia</h7><br/><br/>
                                <h6>The project was built step by step in individual and independent work,
                                     combined with the guidance of our technology mentor, Maayan.
                                     Maayan helped us realize the full potential of the group,
                                    We were glad we got to collaborate with someone like her, who was able to support the team in the small moments.</h6>
                    
                                <a href="https://www.facebook.com/groups/1433362546987936/about" class="button button-aboutus">Learn More</a>
                            </div>
                            <div class="col col1 first">
                                <div class="image round fit">
                                    <a href="https://www.linkedin.com/in/maayan-ezra-658b7bab/" class="link"><img src={Maayan} alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Overview;