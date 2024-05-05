'use client'

// React Imports
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

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
import CircularProgress from '@mui/material/CircularProgress'

import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import RuleRoundedIcon from '@mui/icons-material/RuleRounded'
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded'
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded'
import TranslateIcon from '@mui/icons-material/Translate'
import ExplicitIcon from '@mui/icons-material/Explicit'
import {postSession} from '/src/utils/session'
import {getQuestion } from '/src/utils/question'

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
    icon: ExplicitIcon ,
    title: 'English',
    value: 'english'
  },
  {
    icon: TranslateIcon,
    title: 'Arabic',
    value: 'arabic'
  },
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
  const [lang,setLang] = useState('');
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [res,setRes] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const[sessionId, setSessionId] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const sessionId = localStorage.getItem('sessionId');
    if (auth === null) {
      redirect('/login');
  } else {
    setToken(auth);
    setSessionId(sessionId);
  }  
}, []);
  
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const sessionId = localStorage.getItem('sessionId');
    const fetchData = async () => {
            try {
                const sessionResponse = await getQuestion(sessionId, auth);
                console.log('Session:', sessionResponse);
                setText(sessionResponse[0]['text']);
                setActiveStep(sessionResponse[0]['lang']);
                setRes(sessionResponse[0]['question']);
                setAnswer(sessionResponse[0]['answer']);
            } catch (error) {
                console.error('Error fetching session:', error);
            }
    };

    fetchData();
}, []);
    


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
              <TextField fullWidth rows={12} multiline label='Text' defaultValue='' id='textarea-outlined-static' value={text} readOnly />
              <TextField fullWidth rows={1} multiline label='Answer' defaultValue='' id='textarea-outlined-static' value={answer} readOnly  sx={{marginTop: 5 }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </div>
            ) : (
                <TextField
                    fullWidth
                    rows={15}
                    multiline
                    label='Results'
                    value={res}
                    id='textarea-outlined-static'
                    readOnly
                />
            )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default StepperCustomHorizontal
