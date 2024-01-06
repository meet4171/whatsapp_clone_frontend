import { styled, ListItem, Typography, useMediaQuery, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 1800
        },
    },
});

export const Title = styled(Typography)`
    font-size: 28px;
    color: #525252;
`;

export const StyledListItem = styled(ListItem)`
    padding-left: 0;
    white-space: ${({ theme }) => !useMediaQuery(theme.breakpoints.down('md')) && 'nowrap'};
`;

export const Components = styled(Box)`
    display: flex;
    flex-flow: ${({ theme }) => useMediaQuery(theme.breakpoints.down('md')) ? 'column' : 'row'};
    justify-content: space-around;
    align-items: center;
    margin: 30px 0;
    min-width: ${({ theme }) => useMediaQuery(theme.breakpoints.down('md')) && '100%'};
`;
