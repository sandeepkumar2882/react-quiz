import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@material-ui/core';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const QuizSummary = () => {
    const location = useLocation();
    const [state, setState] = useState(location.state.playerStates);

    //Destructuring
    let { score, correctAnswers, numberOfQuestions, numberOfAnsweredQuestions, wrongAnswers, hintsUsed, usedFiftyFifty } = state;
    score = (score / numberOfQuestions) * 100;

    let statsOfPlayer, remark;

    //for remark
    if (score <= 30) {
        remark = 'You need more practice!';
    } else if (score > 30 && score <= 50) {
        remark = 'Better luck next time!';
    } else if (score > 50 && score <= 70) {
        remark = 'You can do better!';
    } else if (score > 70 && score <= 90) {
        remark = 'You did great!';
    } else {
        remark = 'You are Perfect';
    }

    //for display statistics
    if (state !== undefined) {
        statsOfPlayer = (
            <Fragment>
                <div style={{ textAlign: 'center' }}>
                    <span className='success-icon'><FontAwesomeIcon icon={faCheckCircle} /></span>
                </div>
                <h1>Quiz has ended</h1>
                <div className="container stats">
                    <h4>{remark}</h4>
                    <h2>Your Score: {score.toFixed(0)}%</h2>
                    <span className="stat left">Total number of questions: </span>
                    <span className="right">{numberOfQuestions}</span><br />

                    <span className="stat left">Number of attempted questions: </span>
                    <span className="right">{numberOfAnsweredQuestions}</span><br />

                    <span className="stat left">Number of Correct Answers: </span>
                    <span className="right">{correctAnswers}</span> <br />

                    <span className="stat left">Number of Wrong Answers: </span>
                    <span className="right">{wrongAnswers}</span><br />

                    <span className="stat left">Hints Used: </span>
                    <span className="right">{hintsUsed}</span><br />

                    <span className="stat left">50-50 Used: </span>
                    <span className="right">{usedFiftyFifty}</span>
                </div>
                <section>
                    <ul>
                        <li>
                        
                            <Link to="/play/quiz"><Button variant='danger'>Play Again</Button></Link>
                        </li>
                        <li>
                            <Link to="/"><Button variant='danger'>Back To Home</Button></Link>
                        </li>
                    </ul>
                </section>
            </Fragment>
        );
    }
    else {
        statsOfPlayer = (
            <section>
                <h1 className="no-stats">No Statistics Available</h1>
                <ul>
                    <li>
                        <Link to="/play/quiz">Take a Quiz</Link>
                    </li>
                    <li>
                    <Button variant='danger'>Quit</Button>
                        <Link to="/">Back to Home</Link>
                    </li>
                </ul>
            </section>
        );
    }

    return (
        <Fragment>
            <Helmet><title>React Quiz - Summary</title></Helmet>
            <div className='quiz-summary'>
                {statsOfPlayer}
            </div>
        </Fragment>
    )
}

export default QuizSummary