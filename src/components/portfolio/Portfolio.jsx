import React from "react";
import './portfolio.css';
import IMG1 from '../../assets/images/portfolio1.jpg'
import IMG2 from '../../assets/images/portfolio2.jpg'
import IMG3 from '../../assets/images/portfolio3.jpg'
import IMG4 from '../../assets/images/portfolio4.jpg'
import IMG5 from '../../assets/images/portfolio5.png'
import IMG6 from '../../assets/images/portfolio6.jpg'
const data=[
    {
        id:1,
        image:IMG1,
        title:'Image 1',
        github:'https://github.com/RasimAghayev/rest-api-php',
        demo:'https://github.com/RasimAghayev/rest-api-php'
    },
    {
        id:2,
        image:IMG2,
        title:'Image 2',
        github:'https://github.com/RasimAghayev/rest-api-php',
        demo:'https://github.com/RasimAghayev/rest-api-php'
    },
    {
        id:3,
        image:IMG3,
        title:'Image 3',
        github:'https://github.com/RasimAghayev/rest-api-php',
        demo:'https://github.com/RasimAghayev/rest-api-php'
    },
    {
        id:4,
        image:IMG4,
        title:'Image 4',
        github:'https://github.com/RasimAghayev/rest-api-php',
        demo:'https://github.com/RasimAghayev/rest-api-php'
    },
    {
        id:5,
        image:IMG5,
        title:'Image 5',
        github:'https://github.com/RasimAghayev/rest-api-php',
        demo:'https://github.com/RasimAghayev/rest-api-php'
    },
    {
        id:6,
        image:IMG6,
        title:'Image 6',
        github:'https://github.com/RasimAghayev/rest-api-php',
        demo:'https://github.com/RasimAghayev/rest-api-php'
    },
]

const Portfolio=()=>{
    return (
        <section id='portfolio'>
            <h5>My Recent Work</h5>
            <h2>Portfolio</h2>
            <div className="container portfolio__container">
                {
                    data.map(({id, image, title, github, demo})=>{
                        return(
                            <article key={id} className="portfolio__item">
                                <div className="portfolio__item-image">
                                    <img src={image} alt={title} />
                                </div>
                                <h3>{title} e</h3>
                                <div className="portfolio__item-cta">
                                    <a href={github} className='btn'>GitHub</a>
                                    <a href={demo} className='btn btn-primary' target='blank'>LiveDemo</a>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Portfolio