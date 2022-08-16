import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {useContext, useState} from "react";
import {
    createUserDocumentFromAuth, signInUserWithEmailAndPassword,
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';
import {UserContext} from "../../contexts/user/user.context";

const SignInForm = () => {
    const defaultFormFields = {
        email: '',
        password: ''
    }

    const {setCurrentUser} = useContext(UserContext);

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                alert('There is a mistake in email or password');
            }
        }
    }

    const [formFields, setFormFields] = useState(defaultFormFields)
    console.log(formFields);
    const {email, password} = formFields;
    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' name='email' required value={email} onChange={handleOnChange}/>
                <FormInput label='Password' type='password' name='password' required value={password}
                           onChange={handleOnChange}/>

                <div className='buttons-container'>
                    <Button type='submit'>SIGN IN</Button>
                    <Button buttonType='google' type='button' onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
