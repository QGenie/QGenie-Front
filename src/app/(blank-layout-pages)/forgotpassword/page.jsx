// Component Imports
import ForgotPassword from '@views/ForgotPassword'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Forgot Password',
  description: 'Reset your password'
}

const ForgotPasswordPage = () => {
  // Vars
  const mode = getServerMode()

  return <ForgotPassword mode={mode} />
}

export default ForgotPasswordPage
