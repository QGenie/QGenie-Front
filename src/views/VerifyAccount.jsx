'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'
import { verifyemail } from '@/utils/user'
// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'
import { useRef, useState } from 'react'

const VerifyAccount = () => {

  const [code, setCode] = useState("");
  const inputRefs = useRef([]);
  const onChangeCode = (event, index) => {
    const value = event.target.value;
    const nextIndex = index + 1;

    // Update the value of the current input field
    setCode((prevCode) => {
      const newCode = prevCode.substring(0, index) + value + prevCode.substring(index + 1);
      return newCode;
    });

    // Move focus to the next input field if a number is entered and it's not the last input field
    if (/^\d$/.test(value) && nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const onSubmit = async(e) =>{
        try{
          e.preventDefault();
          const email = localStorage.getItem('email');
          console.log(email);
          const response = await verifyemail(email,code);
          console.log(response);
        }
        catch(err){
          console.err(err);
        }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <AuthIllustrationWrapper>
        <Card className='flex flex-col sm:is-[450px]'>
          <CardContent className='sm:!p-12'>
            <div className='flex justify-center mbe-6'>
              <img src='/qgenie-logo.png' alt='QGenie Logo' style={{ width: '50%' }} />
            </div>
            <div className='flex flex-col gap-1 mbe-6'>
              <Typography variant='h4'>Two Step Verification 💬</Typography>
              <Typography>
                We sent a verification code to your email. Enter the code from the email in the field below.
              </Typography>
              
            </div>
            <form noValidate autoComplete='off' onSubmit={(e)=>onSubmit(e)} className='flex flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <Typography>Type your 5 digit security code</Typography>
                <div className='flex items-center justify-between gap-4'>
                {[...Array(5)].map((_, index) => (
            <CustomTextField
              key={index}
              onChange={(event) => onChangeCode(event, index)}
              size='medium'
              inputRef={(el) => (inputRefs.current[index] = el)}
              className='[&_input]:text-center'
            />
          ))}   </div>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Confirm
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Didn&#39;t get the code?</Typography>
                <Typography color='primary' component={Link} href='/' onClick={(e)=>onSubmit}>
                  Resend
                </Typography>
              </div>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </div>
  )
}

export default VerifyAccount
