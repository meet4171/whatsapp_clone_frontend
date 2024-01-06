import { Box, styled } from "@mui/system";
import { useContext, useState } from 'react';
import communities from '../../assets/communities.png';
import newchat from '../../assets/newchat.png';
import status from '../../assets/status.png';
import menu from '../../assets/menu.png';
import channel from '../../assets/channels.png';
import { AccountContext } from '../../context/AccountContext';
import { useMediaQuery } from "@mui/material";
import { theme } from "../auth/LoginCustomComponents";

export default function MenuHeader({ setOpenDrawer }) {
    const { loggedInAccount, setLoggedInAccount } = useContext(AccountContext);
    const [openMenu, setOpenMenu] = useState(false);



    const CustomCont = styled(Box)`
        background-color: #f0f2f5;
        display: flex;
        position:relative;
        justify-content: space-between;
        align-items: center;
        gap: 10px;

        & > img {
            width: 20px;
            padding: 8px;
            border-radius: 30px;
        }
    `;

    const CustomDropdown = styled(Box)`
        position: relative;

        .dropdown-content {
            top: 100%;
            right: 0;
            position: absolute;
            background-color: #fff;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            z-index: 1;
            width: 100px;
        }

        .dropdown-content > ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .dropdown-content > ul > li {
            padding: 10px;
            text-align: start;
        }

        .dropdown-content li:hover {
            background-color: rgba(0, 0, 0, 0.04);
            cursor: pointer;
        }
    `;
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <header>
            <CustomCont>
                <Box sx={ { padding: '5px' } }>

                    { loggedInAccount?.picture && (
                        <img
                            onClick={ () => setOpenDrawer(true) }
                            src={ loggedInAccount.picture }
                            alt='user avatar'
                            style={ {
                                borderRadius: '100%',
                                height: isMediumScreen ? '30px' : '40px',
                                width: isMediumScreen ? '30px' : '40px',
                                cursor: 'pointer'
                            } }
                        />
                    ) }
                </Box>
                <CustomCont style={ { marginRight: '20px' } }>
                    <img src={ communities } alt='communities icon' />
                    <img src={ status } alt='status icon' />
                    <img src={ channel } alt='channel icon' />
                    <img src={ newchat } alt='new chat icon' />
                    <img
                        onClick={ () => {
                            setOpenMenu(!openMenu);
                        } }
                        src={ menu }
                        alt='menu icon'
                        style={ {
                            cursor: 'pointer',
                            background: openMenu ? 'rgba(0, 0, 0, 0.04)' : '',
                        } }
                    />

                </CustomCont>
            </CustomCont>
            { openMenu && (
                <CustomDropdown>
                    <div className="dropdown-content">
                        <ul>
                            <li onClick={ () => { setOpenMenu(!openMenu); setOpenDrawer(true) } }>Profile</li>
                            <li onClick={ () => { setOpenMenu(!openMenu); setOpenDrawer(true); setLoggedInAccount(null) } }>Logout</li>
                        </ul>
                    </div>
                </CustomDropdown>
            )
            }
        </header >
    );
}
