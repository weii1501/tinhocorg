import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import Iconify from '@/components/iconify'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { buildFullUrl } from '@/utils/utils'

const SORT_BY_OPTIONS = [
  { value: 'created_at', label: 'Gần đây' },
  { value: 'num_views', label: 'Phổ biết' }
]

const findFilter = (value) => {
  if (value) {
    return SORT_BY_OPTIONS.find((option) => option.value === value)
  } else {
    return SORT_BY_OPTIONS[0]
  }
}

function Filter () {
  const router = useRouter()
  const { filter: filterQuery, page } = router.query
  const theme = useTheme()
  const [open, setOpen] = useState(null)
  const filter = findFilter(filterQuery)

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = (event) => {
    setOpen(null)
  }

  return (
    <>
      <Button
        color='inherit'
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
        sx={{
          fontWeight: 400,
          border: `1px solid ${theme.palette.divider}`,
          color: theme.palette.grey[600]
        }}
      >
        <span>
          {filter.label}
        </span>
      </Button>

      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            component={Link}
            href={buildFullUrl(
              router.asPath.split('?')[0],
              {
                filter: option.value
              }
            )}
            key={option.value}
            selected={option.value === filter.value}
            onClick={handleClose}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Filter
