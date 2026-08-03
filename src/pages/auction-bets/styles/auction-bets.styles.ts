import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const AuctionBetsPageContainerStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(5),

  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(7),
  },
}));

export const AuctionBetsBackButtonStyled = styled(Button)(({ theme }) => ({
  width: '100%',
  minHeight: 40,
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.action.hover,

  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },

  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

export const AuctionBetsHeaderBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),

  [theme.breakpoints.up('sm')]: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export const AuctionBetsCardsBoxStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  alignItems: 'start',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'minmax(0, 1fr)',

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
}));

export const AuctionBetRootPaperStyled = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  minWidth: 0,
  padding: theme.spacing(2),
}));

export const AuctionBetHeaderBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: theme.spacing(1),

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export const AuctionBetChipsBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
}));

export const AuctionBetValuesBoxStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.75),
}));

export const AuctionBetValueRowBoxStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.25),
  gridTemplateColumns: 'minmax(0, 1fr)',

  [theme.breakpoints.up('sm')]: {
    alignItems: 'baseline',
    columnGap: theme.spacing(1.5),
    gridTemplateColumns: 'minmax(140px, 38%) minmax(0, 1fr)',
  },
}));

export const AuctionBetValueLabelTypographyStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
