import { styled } from '@mui/material/styles'
import Link from 'next/link'

export const StyledUsername = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.info.dark,
  textDecoration: 'none'
}))

export const StyledDate = styled('span')(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.grey[700]
}))

export const StyledTitle = styled(Link)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 'bold',
  color: theme.palette.grey[900],
  marginTop: '2px',
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

export const Styledp = styled('span')(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.grey[900],
  marginBottom: '8px'
}))

export const StyledTag = styled(Link)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: '400',
  color: theme.palette.grey[700],
  textDecoration: 'none',
  backgroundColor: theme.palette.grey[300],
  padding: '2px 8px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.primary.lighter,
    color: theme.palette.primary.dark
  }
}))
