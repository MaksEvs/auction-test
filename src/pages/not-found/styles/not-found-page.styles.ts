import { Box, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const NotFoundPageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}))

export const NotFoundCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 560,
  padding: theme.spacing(5),
  textAlign: 'center',
  borderRadius: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 2),
    borderRadius: theme.spacing(2),
  },
}))

export const NotFoundCode = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontSize: 96,
  fontWeight: 700,
  lineHeight: 1,

  [theme.breakpoints.down('sm')]: {
    fontSize: 72,
  },
}))

export const NotFoundTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,

  [theme.breakpoints.down('sm')]: {
    fontSize: 26,
  },
}))

export const NotFoundDescription = styled(Typography)(({ theme }) => ({
  maxWidth: 440,
  margin: `0 auto ${theme.spacing(4)}`,
  color: theme.palette.text.secondary,
}))

export const NotFoundActions = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  gap: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))