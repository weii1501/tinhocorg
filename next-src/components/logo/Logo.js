import PropTypes from 'prop-types'
import { forwardRef, useContext } from 'react'
import Link from 'next/link'
// @mui
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import { Context } from '@/hooks/context'

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, footer, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      // component='img'
      // src='/assets/illustrations/tinhocorg_logo.svg'
      // alt='tinhoc.org'
      sx={{
        padding: '0 0 0 0',
        width: {
          lg: '150px',
          md: '150px',
          sm: '110px',
          xs: '110px'
        },
        height: '40px',
        display: 'inline-flex',
        objectFit: 'cover',
        '& img': {
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          backgroundColor: 'transparent'
        },
        backgroundColor: 'transparent',
        ...sx
      }}
      // width={150}
      // height={40}
      {...other}
    >
      <img
        src={!footer ? '/assets/illustrations/logo_rm_bg.svg' : '/assets/illustrations/tinhocorg_footer.svg'}
        alt='tinhoc.org'
        title='tinhoc.org'
        width={150}
        height={40}
        loading='eager'
      />
    </Box>
  )

  if (disabledLink) {
    return <>{logo}</>
  }

  return (
    <Link arial-label='Read more about Seminoles new baby mayor' href='/'>
      {logo}
    </Link>
  )
})

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool
}

export default Logo
