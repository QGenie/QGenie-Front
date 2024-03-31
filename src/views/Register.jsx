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

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

const Register = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // Hooks
  const { lang: locale } = useParams()
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <div className='flex justify-center items-center h-screen'>
      <AuthIllustrationWrapper>
        <Card className='flex flex-col sm:is-[450px]'>
          <CardContent className='sm:!p-12'>
            <div className='flex justify-center mbe-6'>
            <img src='/qgenie-logo.png' alt='QGenie Logo' style={{ width: '50%' }} />
            </div>
            <div className='flex flex-col gap-1 mbe-6'>
              <Typography variant='h4'>Adventure starts here 🚀</Typography>
              <Typography>Generate an unlimited amount of questions with our AI!</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
            <div className='flex gap-6'>
              <CustomTextField autoFocus fullWidth label='First Name' placeholder='Samy' />
              <CustomTextField autoFocus fullWidth label='Last Name' placeholder='Mebarki' />
            </div>
              <CustomTextField autoFocus fullWidth label='Username' placeholder='Enter your username' />
              <CustomTextField fullWidth label='Email' placeholder='Enter your email' />
              <CustomTextField
                fullWidth
                label='Password'
                placeholder='············'
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
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <span>I agree to </span>
                    <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                      privacy policy & terms
                    </Link>
                  </>
                }
              />
              <Button fullWidth variant='contained' type='submit'>
                Sign Up
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Already have an account?</Typography>
                <Typography component={Link} href='/login' color='primary'>
                  Sign in instead
                </Typography>
              </div>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </div>
  )
}

export default Register
