import { Box, styled } from "@mui/system";
import { AccountContext } from "../../context/AccountContext";
import { useContext } from "react";
import { useMediaQuery, Typography } from "@mui/material";
import { theme } from "../auth/LoginCustomComponents";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ArrowBack } from "@mui/icons-material";


export default function ChatHeader() {

    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { person, setPerson, activeUsers } = useContext(AccountContext);
    const CustomCont = styled(Box)`
        background-color: #f0f2f5;
        display:flex;
        justify-content:space-between;
        padding:4px;        
    `;
    const FlexBox = styled(Box)`
    display:flex;
    gap:15px;
    align-items:center;
    
    `



    return (
        <header>
            <CustomCont>
                <FlexBox>
                    {
                        isSmallScreen && <ArrowBack onClick={ () => setPerson({}) } style={ { cursor: 'pointer' } } />
                    }
                    { person?.picture &&
                        <img src={ person.picture } alt='profile pic'
                            style={ {
                                borderRadius: '100%',
                                height: isMediumScreen ? '30px' : '40px',
                                width: isMediumScreen ? '30px' : '40px',
                                cursor: 'pointer'
                            } }


                        />
                    }
                    <Box sx={ { display: 'flex', flexFlow: 'column' } }>
                        <Typography>{ person.name }</Typography>
                        { }
                        <Typography sx={ { fontSize: '15px', color: 'gray' } }>
                            { activeUsers?.some(user => user.sub === person.sub)
                                ? 'Online' : 'Offline'
                            }
                        </Typography>
                    </Box>
                </FlexBox>
                <FlexBox>
                    <SearchIcon />
                    <MoreVertIcon />
                </FlexBox>
            </CustomCont>
        </header>
    );
}
