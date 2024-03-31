'use client'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'

const ForgotPassword = () => {
  // Hooks
  const { lang: locale } = useParams()

  return (
    <div className='flex justify-center items-center h-screen'>
      <AuthIllustrationWrapper>
        <Card className='flex flex-col sm:is-[450px]'>
          <CardContent className='sm:!p-12'>
            <div className='flex justify-center mbe-6'>
            <img src='/qgenie-logo.png' alt='QGenie Logo' style={{ width: '50%' }} />
            </div>
            <div className='flex flex-col gap-1 mbe-6'>
              <Typography variant='h4'>Forgot Password 🔒</Typography>
              <Typography>Enter your email and we&#39;ll send you instructions to reset your password</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
              <CustomTextField autoFocus fullWidth label='Email' placeholder='Enter your email' />
              <Button fullWidth variant='contained' type='submit'>
                Send Reset Link
              </Button>
              <Typography className='flex justify-center items-center' color='primary'>
                <Link href='login' className='flex items-center gap-1.5'>
                  <DirectionalIcon
                    ltrIconClass='tabler-chevron-left'
                    rtlIconClass='tabler-chevron-right'
                    className='text-xl'
                  />
                  <span>Back to login</span>
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </div>
  )
}

export default ForgotPassword