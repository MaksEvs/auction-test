import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

export const AuctionsListFiltersRootPaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
}))

export const AuctionsListFiltersFieldsBoxStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}))

export const AuctionsListFiltersActionsBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}))