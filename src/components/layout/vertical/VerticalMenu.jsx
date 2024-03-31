'use client'

// MUI Imports
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'
import classnames from 'classnames'
import Typography from '@mui/material/Typography'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const { isBreakpointReached } = useVerticalNav()

  // Vars
  const { transitionDuration } = verticalNavOptions
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
        sx={{
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 200,
            left: -325,
            width: '700px',
            height: '700px',
            backgroundImage: "url('/background.png')", // Reference the image directly
            backgroundSize: '600px 600px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            zIndex: -1,
            opacity: 0.08 // Ensure the image stays behind other content
          }}
        />
        <MenuSection label='Apps'></MenuSection>
        <MenuItem href='/home'>Question Generator</MenuItem>
        <MenuSection label='Sessions'></MenuSection>
        <MenuItem href='/session' icon={<i className='tabler-info-circle' />}>
          Session 01
        </MenuItem>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            p: 2, // Adjust padding as needed
            backgroundColor: theme => theme.palette.background.paper,
            boxShadow: 3,
            display: 'flex',
            alignItems: 'center',
            borderTop: theme => `1px solid ${theme.palette.primary.main}` // Set upper border color to primary color
          }}
        >
          <div style={{ marginRight: 5 }}>
            <UserDropdown />
          </div>
          <Typography color='text.primary'>Samy Mebarki</Typography>
          <div style={{ marginLeft: 50 }}>
            <NavToggle />
          </div>
        </Box>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
