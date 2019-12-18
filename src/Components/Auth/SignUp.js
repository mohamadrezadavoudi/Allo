import React, {useState} from 'react';
import CustomiseInput from '../Inputs/CustomiseInput'
import CustomiseButton from "../Inputs/CustomiseButton";
import '../../Css/LoginAndRegister.css'
import '../../Css/signUp.css'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

window.document.title = 'Allo SignUp'

function SignUp(props) {

    /* state for TextFields */
    const [field, setField] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('')


    function doSignUp() {

        axios.post('http://click.7grid.ir/auth/signup/', {
            email: field.email,
            password: field.password
        })
            .then(function (response) {
                window.localStorage.setItem('token', response.data.data.token)
            })
            .catch(function (error) {
                let errorNumber = error.message.replace(/^\D+/g, '');

                switch (errorNumber) {
                    case '400':
                        setError('Email or Password is wrong!')
                        break
                    case '401':
                        setError('Email or Password is wrong!')
                        break
                    default:
                        setError('try again!')
                }
            });
    }


    function getDataFromCustomiseInput(value, InputName) {
        setField({...field, [InputName]: value})
    }

    function SendErrorsToRedux(error) {
        //console.log('Login::::',error)
        //props.dispatch(SendErrorFromTextFieldAction(error))
    }

    return (
        <React.Fragment>
            <div className={'Container'}>

                <div className={'leftSide signUpImg'}></div>

                <div className={'rightSide'}>
                    <div className={'loginTitle'}>
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal detail to SignUp</p>
                    </div>

                    <div className={'loginInputs'}>
                        <label>{error}</label>
                        <CustomiseInput
                            name={'email'}
                            type={'email'}
                            placeHolder={'Enter your Email'}
                            icon={'mail'}
                            onChange={(value, InputName) => getDataFromCustomiseInput(value, InputName)} //get dada and save it on state
                            onBlur={(error) => SendErrorsToRedux(error)} //check field error onblur
                        />

                        <CustomiseInput
                            name={'password'}
                            type={'password'}
                            placeHolder={'Enter your password'}
                            icon={'lock'}
                            onChange={(value, InputName) => getDataFromCustomiseInput(value, InputName)} //get dada and save it on state
                            onBlur={(error) => SendErrorsToRedux(error)} //check field error onblur
                        />

                        <div style={{textAlign: 'right'}}>
                            <a href={'#'}>Forgot Password?</a>
                        </div>

                    </div>

                    <div className={'loginButtonOrSignUp'}>
                        <div>
                            <CustomiseButton
                                type={'primary'}
                                value={'SIGNUP'}
                                onClick={() => doSignUp()}
                            />
                        </div>
                        <div>
                            <CustomiseButton value={'SIGNIN'} />
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default SignUp