import React, {useState, useEffect, useReducer} from 'react'

const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 6 } 
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6 }
    }

    return { value: "", isValid: false };
}

const passwordReducer = (state, action) => {
    if (action.type === "PASSWORD_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 6 }
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6 }
    }

    return { value: "", isValid: false };
}

const LoginForm = (props) => {
        const [formIsValid, setFormIsValid] = useState(false);

        const [emailState, dispatchEmail] = useReducer(emailReducer, {
            value: "",
            isValid: null
        })

        const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
            value: "",
            isValid: null
        })

        const {isValid: emailIsValid} = emailState;
        const {isValid: passwordIsValid} = passwordState;

        useEffect(() => {
            const identifier = setTimeout(() => {
              console.log('Checking form validity!');
              setFormIsValid(
                emailIsValid && passwordIsValid
              );
            }, 500);
        
            return () => {
              console.log('CLEANUP');
              clearTimeout(identifier);
            };
          }, [emailIsValid, passwordIsValid]);

        const emailChangeHandler = (event) => {
            dispatchEmail({type: "USER_INPUT", val: event.target.value})
        
            setFormIsValid(
              event.target.value.length > 6 && passwordState.isValid
            );
          };
        
          const passwordChangeHandler = (event) => {
            dispatchPassword({type:"PASSWORD_INPUT", val: event.target.value})
        
            setFormIsValid(
              emailState.isValid && event.target.value.trim().length > 6
            );
          };
        
          const validateEmailHandler = () => {
            dispatchEmail({type: "INPUT_BLUR"})
          };
        
          const validatePasswordHandler = () => {
              dispatchPassword({type: "INPUT_BLUR"})
          };



        const submitHandler = (e) => {
            e.preventDefault();

            props.Login(emailState.value, passwordState.value); 
        }

    return (
        <div>     
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                        <h1>Kite</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input className={` ${emailState.isValid === false ? "inputUser-invalid" : "inputUser" }` } onChange={emailChangeHandler} onBlur={validateEmailHandler} type="text" name="username" id="username" autoComplete="off" value={emailState.value}/>
                    </div>

                    <div className = "form-group">
                        <label htmlFor="password">Password</label>
                        <input className={` ${passwordState.isValid === false ? "inputUser-invalid" : "inputPass" }` } onChange={passwordChangeHandler} onBlur={validatePasswordHandler} type="password" name="password" id="password" autoComplete="off" value={passwordState.value} />
                    </div>
                        <button type="submit" className="login-button" disabled={!formIsValid} >Login</button>
                    </div>
            </form>
        </div>
    )
}

export default LoginForm
