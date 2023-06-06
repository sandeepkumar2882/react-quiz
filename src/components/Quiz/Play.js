import { Button } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight, faHeartPulse, faHourglass, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import questions from '../../questions.json';
import isEmpty from '../../utils/IsEmpty';
import CorrectSound from '../../assets/audio/correct-answer.mp3';
import WrongSound from '../../assets/audio/wrong-answer.mp3';
import ButtonSound from '../../assets/audio/button-sound.mp3';
import { useNavigate } from 'react-router-dom';

const Play = () => {
    //defines states
    const [state, setState] = useState({
        questions,
        currentQuestion: {},
        nextQuestion: {},
        previousQuestion: {},
        answer: '',
        numberOfQuestions: 0,
        numberOfAnsweredQuestions: 0,
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        hints: 5,
        previousRandomNumbers: [],
        fiftyFifty: 2,
        usedFiftyFifty: false,
        nextButtonDisabled: false,
        previousButtonDisabled: true,
        time: {},
        interval: null
    });

    const navigate = useNavigate();

    //main function that is responsible for display the things
    function displayQuestions(questions = state.questions, currentQuestion, nextQuestion, previousQuestion) {
        let { currentQuestionIndex, previousRandomNumbers } = state;
        if (!isEmpty(state.questions)) {
            questions = state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            setState({
                ...state,
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer,
                previousRandomNumbers: [],
            });
            showOptions();
            handleDisableButton();
        }
    }

    //Use for render the data when browser first time loaded, and every time when currentQuestionIndex will be changed
    useEffect(() => {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = state;
        displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        return () => {
            clearInterval(state.interval);
        }
    }, [state.currentQuestionIndex]);

    useEffect(()=>{
        startTimer();
    },[]);
    //handle the click events of the options, define answer is correct or not
    const handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === state.answer.toLowerCase()) {
            document.getElementById('correct-sound').play();
            correctAnswer();
        } else {
            document.getElementById('wrong-sound').play();
            wrongAnswer();
        }
    }

    //display a pop up message for correct answer
    const correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        setState((prevState) => ({
            ...prevState,
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }));
        if (state.nextQuestion === undefined) {
            endGame();
        }
    }

    //display a pop up message for wrong answer
    const wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        setState((prevState) => ({
            ...prevState,
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }));
        if (state.nextQuestion === undefined) {
            endGame();
        }
    }

    //handle next button click event
    const handleNextButtonClicked = () => {
        playButtonSound();
        setState((prevState) => ({
            ...prevState,
            currentQuestionIndex: prevState.currentQuestionIndex + 1
        }));
    }

    //handle previous button click event
    const handlePreviousButtonClicked = () => {
        playButtonSound();
        setState((prevState) => ({
            ...prevState,
            currentQuestionIndex: prevState.currentQuestionIndex - 1
        }));
    }

    //handle quit button click event
    const handleQuitButtonClicked = (props) => {
        playButtonSound();
        if (window.confirm('Are You Sure To Want To Quit This Quiz?')) {
            navigate("/");
        }
    }

    //responsible for button click sound play
    const playButtonSound = () => {
        document.getElementById('button-sound').play();
    }

    //show all options after change the question if you use hints in previous question
    const showOptions = () => {
        const options = Array.from(document.querySelectorAll('.option'));

        options.forEach(option => {
            option.style.visibility = 'visible';
        });
        setState((prevState) => ({
            ...prevState,
            usedFiftyFifty: false
        }));
    }

    //handle hints
    const handleHints = () => {
        if (state.hints > 0) {
            const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            })

            //generate random number
            while (true) {
                const randomNumber = Math.round(Math.random() * 3);
                console.log(randomNumber);
                if (randomNumber !== indexOfAnswer && !state.previousRandomNumbers.includes(randomNumber)) {
                    options.forEach((option, index) => {
                        if (index === randomNumber) {
                            option.style.visibility = 'hidden';
                            setState((prevState) => ({
                                ...prevState,
                                hints: prevState.hints - 1,
                                previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                            }));
                            console.log(state.previousRandomNumbers);
                        }
                    });
                    break;
                }
                if (state.previousRandomNumbers.length >= 3) break;
            }
        }
    }

    //handle fifty fifty
    const handleFiftyFifty = () => {
        if (state.fiftyFifty > 0 && state.usedFiftyFifty === false) {
            const options = Array.from(document.querySelectorAll('.option'));
            let randomNumbers = [];
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.innerHTML.toLowerCase() === state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });

            let count = 0;
            do {
                const randomNumber = Math.round(Math.random() * 3);
                if (randomNumber !== indexOfAnswer) {
                    if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                        randomNumbers.push(randomNumber);
                        count++;
                    }
                    else {
                        while (true) {
                            const newRandomNumber = Math.round(Math.random() * 3);
                            if (!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                                randomNumbers.push(newRandomNumber);
                                count++;
                                break;
                            }
                        }
                    }
                }
            }
            while (count < 2)
            options.forEach((option, index) => {
                if (randomNumbers.includes(index)) {
                    option.style.visibility = 'hidden';
                }
            });
            setState((prevState) => ({
                ...prevState,
                fiftyFifty: prevState.fiftyFifty - 1,
                usedFiftyFifty: true
            }));
        }
    }

    //handle button's disable functionality
    const handleDisableButton = () => {
        //for previous button
        if (state.previousQuestion !== undefined && state.currentQuestionIndex === 0) {
            setState((prevState) => ({
                ...prevState,
                previousButtonDisabled: 'disable'
            }));
        }
        else {
            setState((prevState) => ({
                ...prevState,
                previousButtonDisabled: false
            }))
        }

        //for next button
        if (state.nextQuestion !== undefined && state.currentQuestionIndex + 1 === state.numberOfQuestions) {
            setState((prevState) => ({
                ...prevState,
                nextButtonDisabled: 'disable'
            }))
        }
        else {
            setState((prevState) => ({
                ...prevState,
                nextButtonDisabled: false
            }))
        }
    }

    //Add timer for the quiz
    const startTimer = () => {
        const countDownTime = Date.now() + 180000;
        state.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(state.interval);
                setState((prevState) => ({
                    ...prevState,
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }), endGame());
            } else {
                setState((prevState) => ({
                    ...prevState,
                    time: {
                        minutes,
                        seconds,
                        distance
                    }
                }));
            }
        }, 1000);
    }

    //End the game with player States
    const endGame = () => {
        alert("Quiz has ended");
        const playerStates = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: (state.correctAnswers + state.wrongAnswers),
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            usedFiftyFifty: 2 - state.fiftyFifty,
            hintsUsed: 5 - state.hints
        };
        navigate('/play/summary', {
            state: {
                playerStates
            }
        });
    }

    //Destructuring
    let { currentQuestion, currentQuestionIndex, numberOfQuestions, hints, fiftyFifty, time, previousButtonDisabled, nextButtonDisabled } = state;

    return (
        <Fragment>
            <Helmet><title>React Quiz Page</title></Helmet>
            <div>
                <audio id='correct-sound' src={CorrectSound}>Correct</audio>
                <audio id='wrong-sound' src={WrongSound}>Wrong</audio>
                <audio id='button-sound' src={ButtonSound}>Button</audio>
            </div>
            <div className='questions'>
                <h2>Quiz Mode</h2>
                <div className='lifeline-container'>
                    <p>
                        <span className='lifeline lifeline-icon' onClick={handleFiftyFifty}><FontAwesomeIcon icon={faHeartPulse} /> {fiftyFifty}</span>
                    </p>
                    <p>
                        <span className='lifeline lifeline-icon' onClick={handleHints} >{hints} <FontAwesomeIcon icon={faLightbulb} /></span>
                    </p>
                </div>
                <div className='lifeline-container'>
                    <p>
                        <span className='lifeline lifeline-icon'><FontAwesomeIcon icon={faHandPointRight} /> {currentQuestionIndex + 1} of {numberOfQuestions}</span>
                    </p>
                    <p>
                        <span className='lifeline lifeline-icon'>{time.minutes}:{time.seconds} <FontAwesomeIcon icon={faHourglass} /></span>
                    </p>
                </div>
                <h5>{currentQuestion.question}</h5>
                <div className='options-container'>
                    <p onClick={handleOptionClick} className='option'>{currentQuestion.optionA}</p>
                    <p onClick={handleOptionClick} className='option'>{currentQuestion.optionB}</p>
                </div>
                <div className='options-container'>
                    <p onClick={handleOptionClick} className='option'>{currentQuestion.optionC}</p>
                    <p onClick={handleOptionClick} className='option'>{currentQuestion.optionD}</p>
                </div>
                <div className='button-container'>
                    <Button variant='warning' className={previousButtonDisabled} onClick={handlePreviousButtonClicked}>Previous</Button>
                    <Button variant='success' className={nextButtonDisabled} onClick={handleNextButtonClicked}>Next</Button>
                    <Button variant='danger' onClick={handleQuitButtonClicked}>Quit</Button>
                </div>
            </div>
        </Fragment>
    )
}

export default Play