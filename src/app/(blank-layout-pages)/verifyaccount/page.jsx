import VerifyAccount from '@views/VerifyAccount'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata = {
  title: 'Verify Account',
  description: 'Verify Account'
}

const VerifyAccountPage = () => {
  // Vars
  const mode = getServerMode()

  return <VerifyAccount mode={mode} />
}

export default VerifyAccountPage
