import { styled } from '@mui/material/styles'

export const Styledh1 = styled('h1')(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  lineHeight: '40px',
  color: theme.palette.text.primary,
  marginBottom: '16px'
}))
