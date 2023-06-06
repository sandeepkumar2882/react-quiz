import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';

const Home = (props) => (
    <Fragment>
        {console.log(props)}
        <Helmet><title>Home - React Quiz</title></Helmet>
        <div id="home">
            <section>
                <div className="quiz-cube">
                    <span className='cube'><FontAwesomeIcon icon={faCube}/></span>
                </div>
                <h1>Rich React Quiz</h1>
                <div className='play-button-container'>
                    <ul>
                        <li><Link className='play-button' to="/play/instructions">Play</Link></li>
                    </ul>
                </div>
            </section>
        </div>
    </Fragment>
);

export default Home;