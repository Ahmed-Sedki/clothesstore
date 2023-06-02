import React from 'react'
import { useState} from 'react'
import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
 } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
// import { UserContext } from '../../contexts/user.context';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';


const defaultFormFields = {
    email: '',
    password: '',
}

export default function SignInForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const resetFordFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try { 
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFordFields();

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password': alert('Wrong password'); break;
                case 'auth/user-not-found': alert('User not found'); break;
                default: console.log('error', error);
            }
            // if (error.code === 'auth/wrong-password') {
            //     alert('Wrong password');
            // } else if (error.code === 'auth/user-not-found') {
            //     alert('User not found');
            // }
            // console.log('error', error); 


        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    required
                    onChange={handleChange} />

                <FormInput
                    label='Password'
                    type='password'
                    name='password'
                    value={password}
                    required
                    onChange={handleChange} />
                <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

