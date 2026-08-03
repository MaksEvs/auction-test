import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'

export const AuctionListCardRootCardStyled = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',
  height: '400px',
  borderColor: theme.palette.divider,
  boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06)',
  transition: theme.transitions.create(['transform', 'box-shadow', 'border-color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: theme.palette.primary.light,
    boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
  },
}))

export const AuctionListCardContentStyled = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: theme.spacing(1.5),
  '&:last-child': {
    paddingBottom: theme.spacing(1.5),
  },
}))

export const AuctionListCardRouteBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  alignItems: 'center',
}))

export const AuctionListCardChipsBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),
}))