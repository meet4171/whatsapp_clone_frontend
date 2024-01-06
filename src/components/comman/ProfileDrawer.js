import { Box, Typography, styled } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';

export default function ProfileDrawer({ openDrawer, setOpenDrawer }) {
    const { loggedInAccount } = useContext(AccountContext);

    const paperSx = {
        minWidth: 'fit-content',
        width: '100%',
        zIndex: '1000',
        position: 'absolute',
        top: 0,
        transform: `translateX(${openDrawer ? '0%' : '-120%'})`,
        height: '100%',
        transition: 'transform .4s ease-out',
        background: '#f0f2f5',
        boxShadow: '6px 4px 10px rgba(0, 0, 0, 0.2)',
    };

    const DrawerHeader = styled(Box)`
    background-color: #008069;
    height: 94px;
  `;

    const DrawerContent = styled(Box)`
    background: #f0f2f5;
    minWidth: 'fit-content';
    & > div {
      padding: 20px;
    }
  `;

    const boxStyle = {
        color: 'white',
        display: 'flex',
        padding: '20px',
        gap: '30px',
    };

    const CustomBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

    const Text = styled(Typography)`
    font-size: 15px;
  `;

    return (
        <Box
            component="div"
            onClose={ () => setOpenDrawer(false) }
            sx={ paperSx }
        >
            <DrawerHeader>
                <Box style={ boxStyle }>
                    <ArrowBack style={ { cursor: 'pointer' } } onClick={ () => setOpenDrawer(false) } />
                    <Typography style={ { fontWeight: 'bold', fontSize: '18px' } }>Profile</Typography>
                </Box>
            </DrawerHeader>
            <DrawerContent>
                <CustomBox>
                    <img src={ loggedInAccount.picture } alt="Profile Pic" height="200" width="200" style={ { borderRadius: '50%' } } />
                </CustomBox>

                <Box style={ { background: '#fff', color: '#008069' } }>
                    <Text>Your Name</Text>
                    <Text>{ loggedInAccount.name }</Text>
                </Box>

                <Box style={ { color: '#008069' } }>
                    <Text>This is not your username or pin. This name will be visible to your WhatsApp contacts.</Text>
                </Box>

                <Box style={ { background: '#fff', color: '#008069' } }>
                    <Text>About</Text>
                    <Text>Sleeping or Coding!!!</Text>
                </Box>
            </DrawerContent>
        </Box>
    );
}
