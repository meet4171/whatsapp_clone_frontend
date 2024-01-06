import { Box, Dialog, List, useMediaQuery } from "@mui/material";
import whatsappLogo from '../../assets/whatsappLogo.png';
import { qrCodeImage } from "../../constants/data";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Components, Title, theme, StyledListItem } from './LoginCustomComponents'
import { useContext } from "react";
import { AccountContext } from "../../context/AccountContext";
import { addUser } from "../../services/api";
export default function Login() {
    const { setLoggedInAccount } = useContext(AccountContext)
    // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isGtThLargeScreen = useMediaQuery(theme.breakpoints.up('xxl'));

    const handleLoginSuccess = async (credentialResponse) => {
        const decodedUserInfo = jwtDecode(credentialResponse.credential);
        setLoggedInAccount(decodedUserInfo)
        await addUser(decodedUserInfo)

    }


    const greenBoxStyle = {
        height: '210px',
        backgroundColor: '#00A884',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        maxWidth: isGtThLargeScreen ? '60%' : '100%',


    }
    const DialogStyle = {
        maxWidth: isGtThLargeScreen ? '60%' : '100%',
        width: '100%',
        height: '100%',
        marginTop: '240px',
        padddingBottom: '100px',
        borderRadius: '0',
        minWidth: isMediumScreen && '100%'

    }
    const BackdropProps = {
        style: { backgroundColor: 'rgba(17, 27, 32, 0.1)' }
    };
    const LogoTextStyle = {
        marginLeft: '10px',
        color: "white",
        fontSize: '15px',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
    const boxSx = {
        backgroundColor: '#F0F2F5',
        height: '100vh',
        minWidth: isMediumScreen && '100%',
    }



    return (
        <Box sx={ { boxSx } }>
            <div style={ greenBoxStyle }  >
                <div style={ { maxWidth: isGtThLargeScreen ? '60%' : '100%', width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center', height: 'fit-content', margin: '30px' } }>
                    <span>
                        <img src={ whatsappLogo } alt="whatsapp_logo" />
                    </span>
                    <span style={ LogoTextStyle }>
                        Whatsapp Web
                    </span>
                </div>
            </div>
            <Dialog open={ true } PaperProps={ { sx: DialogStyle } } BackdropProps={ BackdropProps }>
                <Components>
                    <Box sx={ { padding: isMediumScreen && '0 20px' } }>
                        <Title>Use Whatsapp on your computer</Title>
                        <List sx={ { marginTop: '50px' } }>
                            <StyledListItem >1. Open WhatsApp on your phone</StyledListItem>
                            <StyledListItem>2. Go to settings by tapping on your profile photo , Menu or Settings
                            </StyledListItem>
                            <StyledListItem >1. Open WhatsApp on your phone</StyledListItem>
                        </List>
                    </Box>
                    <Box sx={ { padding: isMediumScreen && '0 20px', position: 'relative' } }>
                        <img src={ qrCodeImage } alt="qrCode" width='200px' />
                        <Box sx={ { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' } }>
                            <GoogleLogin
                                onSuccess={ (credentialResponse) => { handleLoginSuccess(credentialResponse) } }
                                onError={ () => {
                                    console.log('Login Failed');
                                } }
                            />
                        </Box>
                    </Box>
                </Components>
            </Dialog>

        </Box >
    )
}