import React from 'react'
import SignInForm from '../../components/sign-in-form/sign-in-fprm.component';
import SignUpForm from '../../components/sign-up-form/sign-up-fprm.component';
import './authentication.styles.scss'
export default function Authentication() {
    
  return (
    <div className='authentication-container'>
        <SignInForm/>
        <SignUpForm />
    </div>
  )
}
