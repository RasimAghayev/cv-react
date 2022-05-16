import React from "react";
import './experience.css';
import {BsBootstrap, BsPatchCheckFill} from "react-icons/bs";
import {FaCss3, FaHtml5, FaNode, FaPhp, FaPython, FaReact} from "react-icons/fa";
import {SiJavascript, SiTailwindcss} from "react-icons/si";
import {DiMongodb, DiMysql} from "react-icons/di";

const Experience=()=>{
    return (
        <section id='experience'>
            <h5>What Skills I have</h5>
            <h2>My Experience</h2>
            <div className="container experience__container">
                <div className="experience__frontend">
                    <h3>Frontend Development</h3>
                    <div className="experience__content">
                        <article className="experience__details">
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4><FaHtml5/>HTML</h4>
                                <small className="text-light">
                                    Experienced
                                </small>
                            </div>
                        </article>
                        <article className="experience__details">
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4><FaCss3/>CSS</h4>
                                <small className="text-light">
                                    Intermediate
                                </small>
                            </div>
                        </article>
                        <article className="experience__details">
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4><SiJavascript/>JavaScript</h4>
                                <small className="text-light">
                                    Experienced
                                </small>
                            </div>
                        </article>
                        <article className="experience__details">
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4><BsBootstrap/> Bootstrap</h4>
                                <small className="text-light">
                                    Experienced
                                </small>
                            </div>
                        </article>
                        <article className="experience__details">
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4><SiTailwindcss/> Tailwind</h4>
                                <small className="text-light">
                                    Experienced
                                </small>
                            </div>
                        </article>
                        <article className="experience__details">
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4><FaReact/> React</h4>
                                <small className="text-light">
                                    Experienced
                                </small>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="experience__backend">
                    <h3>Backend Development</h3>
                    <div className="experience__content">
                        <article className="experience__details">
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4><FaPhp/>PHP</h4>
                                <small className="text-light">
                                    Experienced
                                </small>
                            </div>
                        </article>
                        <article className="experience__details">
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4><DiMysql/>MySQL</h4>
                                <small className="text-light">
                                    Experienced
                                </small>
                            </div>
                        </article>
                        <article className="experience__details">
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4><FaNode/>Node JS</h4>
                                <small className="text-light">
                                    Experienced
                                </small>
                            </div>
                        </article>
                        <article className="experience__details">
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4><DiMongodb/>MongoDB</h4>
                                <small className="text-light">
                                    Experienced
                                </small>
                            </div>
                        </article>
                        <article className="experience__details">
                            <BsPatchCheckFill className='experience__details-icon'/>
                            <div>
                                <h4><FaPython/>Python</h4>
                                <small className="text-light">
                                    Experienced
                                </small>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience