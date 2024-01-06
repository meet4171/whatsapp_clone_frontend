import { Box, styled, useMediaQuery } from "@mui/material";
import { theme } from "./auth/LoginCustomComponents"
import Chat from '../components/chat/Chat';
import Menu from '../components/menu/Menu';
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";

export default function Home() {

    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isGtThLargeScreen = useMediaQuery(theme.breakpoints.up('xxl'));
    const { person } = useContext(AccountContext);

    const greenBoxStyle = {
        height: '130px',
        backgroundColor: '#00A884',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
    }

    const boxSx = {
        backgroundColor: '#f0f2f5',
        minWidth: isMediumScreen && '100%',

    }
    const CustomContainer = styled(Box)`
    display:flex;    
    height:100%;
    box-shadow: 6px 4px 10px rgba(0, 0, 0, 0.2);
     `

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const condition_Menu = Object.keys(person).length !== 0 && isSmallScreen;
    const condition_Chat = Object.keys(person).length === 0 && isSmallScreen;







    return (
        <Box sx={ { boxSx } }>
            <div style={ greenBoxStyle }  >

            </div>
            <Box

                style={ {
                    maxWidth: isGtThLargeScreen ? '80%' : '100%',
                    position: 'fixed',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%',
                    width: '95%',
                    height: '90%',
                    minHeight: '500px',
                    margin: '0 auto',

                } }

            >

                <CustomContainer>
                    <Box style={ { width: isSmallScreen ? '100%' : 'fit-content', display: condition_Menu ? 'none' : 'block' } }>
                        <Menu
                        />
                    </Box>
                    <Box style={ { width: '100%', height: '100%', display: condition_Chat ? 'none' : 'block' } }>
                        <Chat />
                    </Box>

                </CustomContainer>
            </Box>

        </Box >
    )
}