import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

export const SetAuctionBetFormStyled = styled('form')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
}))

export const SetAuctionBetSummaryBoxStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  gridTemplateColumns: 'minmax(0, 1fr)',

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
}))

export const SetAuctionBetSummaryItemStyled = styled(Box)(({ theme }) => ({
  minWidth: 0,
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}))

export const SetAuctionBetActionsBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),

  '& > *': {
    width: '100%',
  },

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    '& > *': {
      width: 'auto',
    },
  },
}))