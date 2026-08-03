import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

export const AuctionsListPageContainerStyled = styled(Container)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.xl,
}))

export const AuctionsListPageContentBoxStyled = styled(Box)(({ theme }) => ({
  minHeight: '100dvh',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))

export const AuctionsListGridBoxStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridAutoRows: 'max-content',
  gridTemplateColumns: 'minmax(0, 1fr)',
  alignContent: 'start',
  alignItems: 'start',

  '& > *': {
    alignSelf: 'start',
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
}))

export const AuctionsListStateBoxStyled = styled(Box)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))

export const AuctionsListPaginationBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}))