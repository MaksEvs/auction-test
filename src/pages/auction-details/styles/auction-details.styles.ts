import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const AuctionDetailsPageContainerStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(5),

  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(7),
  },
}));

export const AuctionDetailsBackButtonStyled = styled(Button)(({ theme }) => ({
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

export const AuctionDetailsHeaderBoxStyled = styled(Box)(({ theme }) => ({
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

export const AuctionDetailsActionsBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(3),

  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

export const AuctionDetailsBetsHistoryButtonStyled = styled(Button)(({ theme }) => ({
  width: '100%',
  minHeight: 44,
  paddingInline: theme.spacing(2.5),
  boxShadow: theme.shadows[2],

  '&:hover': {
    boxShadow: theme.shadows[4],
  },

  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

export const AuctionDetailsSectionsBoxStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  alignItems: 'start',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'minmax(0, 1fr)',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
}));

export const AuctionDetailsSectionPaperStyled = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  minWidth: 0,
  padding: theme.spacing(2),
}));

export const AuctionDetailsFullWidthSectionPaperStyled = styled(AuctionDetailsSectionPaperStyled)(
  () => ({
    gridColumn: '1 / -1',
  }),
);

export const AuctionDetailsValuesBoxStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.75),
}));

export const AuctionDetailsCompactValuesBoxStyled = styled(AuctionDetailsValuesBoxStyled)(
  ({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
      columnGap: theme.spacing(3),
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
  }),
);

export const AuctionDetailsValueRowBoxStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.25),
  gridTemplateColumns: 'minmax(0, 1fr)',

  [theme.breakpoints.up('sm')]: {
    alignItems: 'baseline',
    columnGap: theme.spacing(1.5),
    gridTemplateColumns: 'minmax(140px, 42%) minmax(0, 1fr)',
  },
}));

export const AuctionDetailsValueLabelTypographyStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const AuctionDetailsRoutePointsBoxStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  alignItems: 'start',
  gap: theme.spacing(1.5),

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
}));

export const AuctionDetailsRoutePointPaperStyled = styled(Paper)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  minWidth: 0,
  padding: theme.spacing(1.5),
}));

export const AuctionDetailsChipsBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
}));

export const AuctionDetailsCargoOptionsGridStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'minmax(0, 1fr)',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
}));

export const AuctionDetailsCargoOptionBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  minWidth: 0,
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));
