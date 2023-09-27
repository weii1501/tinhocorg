import React from 'react'
import { emphasize, styled, useTheme } from '@mui/material/styles'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Container, Stack } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import * as PropTypes from 'prop-types'
import Link from 'next/link'
import Iconify from '@/components/iconify'

const StyledBreadcrumb = styled(Link)(({ theme }) => ({
  fontSize: '13px',
  textDecoration: 'none',
  backgroundColor: theme.palette.grey[100],
  height: theme.spacing(3),
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover, &:focus': {
    backgroundColor: 'transparent'
  },
  '&:active': {
    boxShadow: theme.shadows[1],
    backgroundColor: emphasize(theme.palette.grey[100], 0.12)
  },
  '& span': {
    padding: 0
  }
}))

function HomeIcon (props) {
  return null
}

HomeIcon.propTypes = {
  sx: PropTypes.shape({ mr: PropTypes.number }),
  fontSize: PropTypes.string
}

function BreadcrumbsContainer ({ breadcrumbs, maxWidth }) {
  const theme = useTheme()
  // const router = useRouter()
  const breadcrumbsComponent = breadcrumbs?.map((breadcrumb, index) => (
    // <StyledBreadcrumb
    //   key={uuidv4()}
    //   component='a'
    //   href={breadcrumb.url}
    //   label={breadcrumb.label}
    //   sx={{
    //     '& span': {
    //       color: (index === breadcrumbs.length - 1) ? theme.palette.grey[600] : theme.palette.primary.main
    //     }
    //   }}
    // />
    <StyledBreadcrumb
      key={uuidv4()}
      color='inherit'
      href={breadcrumb.url}
      sx={{
        backgroundColor: 'transparent',
        '& span': {
          color: (index === breadcrumbs.length - 1) ? theme.palette.grey[600] : theme.palette.primary.main
        }
      }}
    >
      {breadcrumb.url === '/' &&
        <Iconify icon='iconamoon:home-thin' color={theme.palette.text.primary} width={16} height={16} sx={{ pb: '2px', mr: 0.5 }} />}
      <span>
        {breadcrumb.label}
      </span>
    </StyledBreadcrumb>
  ))

  return (
    <Container
      maxWidth={maxWidth || 'lg'}
    >
      <Stack
        direction='row'
        alignItems='start'
        justifyContent='start'
      >
        <Breadcrumbs
          separator='›'
          aria-label='breadcrumb'
        >
          {breadcrumbsComponent}
        </Breadcrumbs>
      </Stack>
    </Container>
  )
}

export default BreadcrumbsContainer
