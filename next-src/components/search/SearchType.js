import React, { useState } from 'react'
import Iconify from '@/components/iconify'
import { Typography, Button, Menu, MenuItem } from '@mui/material'

const SORT_BY_OPTIONS = [
  { value: 'articles', label: 'Bài viết' },
  { value: 'threads', label: 'Câu hỏi' }
]

function SearchType () {
  const [open, setOpen] = useState(null)
  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = (event) => {
    console.log('event:', event.target.value)
    setOpen(null)
  }
  return (
    <>
      <Button
        color='inherit'
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Tìm kiếm:&nbsp;
        <Typography component='span' variant='subtitle2' sx={{ color: 'text.secondary' }}>
          Bài viết
        </Typography>
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
            key={option.value}
            selected={option.value === 'newest'}
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

export default SearchType
