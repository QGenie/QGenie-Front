'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import {login} from '../utils/user'
// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'
import { useRouter } from 'next/navigation'

const Login = () => {
  // States
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // Hooks
  const { lang: locale } = useParams()
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onPasswordChange = (event) =>{
    setPassword(event.target.value);
  }
  const onEmailChange = (event) =>{
    setEmail(event.target.value);
  } 

  const onSubmit = async(e)=>{
    try{
      e.preventDefault();
  
      const response = await login(email,password);
      if(response.token !=null)
      {
          localStorage.setItem('email', email);
          localStorage.setItem('auth', response.token);
          router.push('/home');
      }

    }catch(err)
    {
      console.error(err);
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
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
              <Typography>Please sign-in to your account to use our features</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={(e) => onSubmit(e)} className='flex flex-col gap-6'>
              <CustomTextField
                autoFocus
                fullWidth
                value={email}
                onChange={onEmailChange}
                label='Email or Username'
                placeholder='Enter your email or username'
              />
              <CustomTextField
                fullWidth
                label='Password'
                value={password}
                onChange={onPasswordChange}
                placeholder='············'
                id='outlined-adornment-password'
                type={isPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography className='text-end' color='primary' component={Link} href='/forgotpassword'>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Login
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography component={Link} href='/register' color='primary'>
                  Create an account
                </Typography>
              </div>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </div>
  )
}

export default Login
