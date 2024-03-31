'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import Divider from '@mui/material/Divider'
import MuiStep from '@mui/material/Step'
import TextField from '@mui/material/TextField'

import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import RuleRoundedIcon from '@mui/icons-material/RuleRounded'
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded'
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded'

// Third-party Imports
import { toast } from 'react-toastify'
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import DirectionalIcon from '@components/DirectionalIcon'
import CustomTextField from '@core/components/mui/TextField'

// Styles Component Imports
import StepperWrapper from '@core/styles/stepper'

// Vars
const steps = [
  {
    icon: RuleRoundedIcon,
    title: 'MCQs',
    value: 'mcq'
  },
  {
    icon: ShuffleRoundedIcon,
    title: 'Match the answers',
    value: 'match'
  },
  {
    icon: QuestionMarkRoundedIcon,
    title: 'Simple Questions',
    value: 'simple'
  },
  {
    icon: TaskAltRoundedIcon,
    title: 'True/False',
    value: 'truefalse'
  },
  {
    icon: MinimizeRoundedIcon,
    title: 'Fill in the blanks',
    value: 'fill'
  }
]

const Step = styled(MuiStep)(({ theme }) => ({
  paddingInline: theme.spacing(7),
  '&:first-of-type': {
    paddingLeft: 0
  },
  '&:last-of-type': {
    paddingRight: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '&.Mui-completed .step-title , &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-disabled)'
  },
  [theme.breakpoints.down('md')]: {
    padding: 0,
    ':not(:last-of-type)': {
      marginBlockEnd: theme.spacing(6)
    }
  }
}))

const StepperCustomHorizontal = () => {
  // States
  const [activeStep, setActiveStep] = useState('')
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Grid container justifyContent='center' alignItems='center' style={{ marginBottom: '20px' }}>
        <img src='/logo-2.png' alt='QGenie Logo' style={{ width: '5%' }} />
      </Grid>
      <StepperWrapper>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel>
                  <div className='step-label'>
                    {/* <IconButton
                      size='medium'
                      className={classnames({
                        'shadow-primarySm': activeStep === step.value
                      })}
                      style={{
                        backgroundColor: activeStep === step.value ? theme.palette.primary.main : 'transparent'
                      }}
                      onClick={() => setActiveStep(step.value)}
                    > */}
                    <CustomAvatar
                      variant='rounded'
                      skin={activeStep === step.value ? 'filled' : 'light'}
                      {...(activeStep === step.value && { color: 'primary' })}
                      {...(activeStep === step.value && { className: 'shadow-primarySm' })}
                      size={38}
                    >
                      <IconButton
                        style={{
                          backgroundColor: 'transparent'
                        }}
                        onClick={() => setActiveStep(step.value)}
                      >
                        <step.icon />
                      </IconButton>
                    </CustomAvatar>
                    {/* </IconButton> */}
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      <Card className='mt-4'>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth rows={15} multiline label='Text' defaultValue='' id='textarea-outlined-static' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                rows={15}
                multiline
                label='Results'
                defaultValue=''
                id='textarea-outlined-static'
                disabled
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default StepperCustomHorizontal
