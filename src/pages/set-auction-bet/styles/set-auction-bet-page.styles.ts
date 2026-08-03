import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const SetAuctionBetPageContainerStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(5),

  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(7),
  },
}));

export const SetAuctionBetBackButtonStyled = styled(Button)(({ theme }) => ({
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

export const SetAuctionBetRootPaperStyled = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 720,
  marginRight: 'auto',
  marginLeft: 'auto',
  padding: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
}));

export const SetAuctionBetHeaderBoxStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(3),
}));
