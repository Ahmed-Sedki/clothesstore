import React from 'react'
import { useState} from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
// import { UserContext } from '../../contexts/user.context';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function SignUpForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;


    const resetFordFields = () =>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName})
            resetFordFields();


        } catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('This email has already been registered')
            }
            console.log('error' ,error);

        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }
    
    return (
        <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label='Display Name'
                type='text'
                name='displayName'
                value={displayName}
                required
                onChange={handleChange}/>

                
                <FormInput
                label='Email'
                type='email'
                name='email'
                value={email}
                required
                onChange={handleChange}/>

                <FormInput
                label='Password'
                type='password'
                name='password'
                value={password}
                required
                onChange={handleChange}/>

                <FormInput
                label='Confirm Password'
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                required
                onChange={handleChange}/>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>

    )
}
