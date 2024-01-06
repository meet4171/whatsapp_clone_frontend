import { Box, Typography, styled, useMediaQuery, Paper } from '@mui/material';
import downloadWhatsapp from '../../assets/downloadWhatsapp.png';
import { theme } from "../auth/LoginCustomComponents"
import ChatHeader from './ChatHeader';
import { AccountContext } from '../../context/AccountContext';
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import whatsappTheme from '../../assets/whatsapp_def_theme.jpg'
import ChatFooter from './ChatFooter';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getTime } from '../../utils/utility_functions';
import { ChatContext } from '../../context/ChatContext';
import { Toaster } from 'react-hot-toast';
import FileIcon from '../comman/FileIcon';

function Chat() {

    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { person, conversation, loggedInAccount } = useContext(AccountContext);
    const { currentChat, setCurrentChat, newMessageFlag } = useContext(ChatContext);
    const [realTimeMessage, setRealTimeMessage] = useState(null);
    const [realTimeFile, setRealTimeFile] = useState(null);
    const memoizedCurrentChat = useMemo(() => currentChat, [currentChat]);
    const [fileFlag, setFileFlag] = useState(false);





    useEffect(() => {
        realTimeMessage && setCurrentChat([...currentChat, realTimeMessage])
    }, [realTimeMessage, newMessageFlag])

    useEffect(() => {
        realTimeFile && setCurrentChat([...currentChat, realTimeFile])
    }, [realTimeFile, newMessageFlag])


    useEffect(() => {
        const getMessages = async () => {

            try {
                const response = await axios.get('/message/' + conversation._id);
                const data = response.data;
                setCurrentChat(data);
            } catch (error) {
                console.log(error);

            }
        }
        conversation._id && getMessages()
    }, [person.sub, newMessageFlag, fileFlag])

    const BackgroundContainer = styled(Box)`
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-image: url(${whatsappTheme});
        background-size: 50%;
        background-repeat: no-repeat;
        background-position: center;
        z-index: -1;
    `;

    const MainContainer = styled(Paper)`
        height: 100%;
        min-height: 500px;
        position: relative;
        z-index: 1;
        overflow: hidden;
    `;

    const ChatContainer = styled(Box)`
        padding: 0 10px;
        height: calc(100% - 130px);
        min-height: 600px;
        overflow-x: hidden;
        overflow-y: scroll;
        position:relative;

        
        ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #a2a2a2; 
            cursor: pointer;
        }
        ::-webkit-scrollbar-track {
            background-color: #f0f0f0; 
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: rgb(111, 111, 111); 
        }
    `;
    const SenderTypography = styled(Box)`
    background:#D9FDD3;
    font-weight:500;
    width:fit-content;
    border-raidus:10px;
    padding:5px 10px;
    max-width:50%;
    margin-left:auto;
    margin-top:20px;
    margin-bottom:20px;
    word-break:break-word;
    min-width:40px;

    & > div { 

        padding:5px 0;
    }
    & > div:nth-of-type(2){
        color:gray;
        font-size:12px;
        text-align:right;

    }

    & > a { 
        text-decoration:none;
        color:black;
    }
    & > a div {
        padding:5px;
        text-align:right;

    }
    & > a div:nth-of-type(3) {
        color:gray;
        font-size:12px;

        
    }

    `
    const ReceiverTypography = styled(Box)`
    background:#ffe9e9;
    font-weight:500;
    width:fit-content;
    border-radius:10px;
    padding:5px 10px;
    max-width:30%;
    word-break:break-word;
    margin:20px 0;

    & > div { 

        padding:5px 0;
    }
    & > div:nth-of-type(2){
        color:gray;
        font-size:12px;
        text-align:left;

    }

    & > a { 
        text-decoration:none;
        color:black;
    }
    & > a div {
        padding:5px;
        text-align:left;

    }
    & > a div:nth-of-type(3) {
        color:gray;
        font-size:12px;

        
    }
    
    
    `
    const ImageCont = styled(Box)`
    background: white;
    padding: 20px 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow:hidden;
}
    
    
    `



    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            const scrollHeightWithPadding =
                chatContainer.scrollHeight + chatContainer.clientHeight;
            chatContainer.scrollTop = scrollHeightWithPadding;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [memoizedCurrentChat]);
    return (
        <>

            <BackgroundContainer />
            <Toaster position="top-center" />
            { Object.keys(person).length === 0 ? (
                <MainContainer>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >

                        <img src={ downloadWhatsapp } alt="downloadWhatsappImage" width={ isMediumScreen ? '150' : '300' } />
                        <Typography variant={ isMediumScreen ? 'h6' : 'h4' }>Download Whatsapp for Windows</Typography>
                    </Box>
                </MainContainer>
            ) : (
                <MainContainer
                    sx={ {
                        height: '100%',
                        backgroundImage: `url(${whatsappTheme})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                    } }
                >
                    <ChatHeader
                    />
                    <ChatContainer id="chatContainer" ref={ chatContainerRef }>
                        <>
                            { memoizedCurrentChat.length > 0 ?
                                memoizedCurrentChat.map((chat) => (
                                    chat.senderId === loggedInAccount.sub ? (
                                        <SenderTypography key={ uuidv4() }>
                                            { chat.url && chat.url !== '' ?

                                                <a href={ chat.url } target='_blank' rel="noreferrer">
                                                    <ImageCont>

                                                        <FileIcon imageUrl={ chat.url } fileName={ chat.text } />
                                                    </ImageCont>

                                                    <div>{ chat.text }</div>
                                                    <div>{ getTime(chat.createdAt) }</div>
                                                </a>

                                                :
                                                <>
                                                    <div>{ chat.text }</div>
                                                    <div>{ getTime(chat.createdAt) }</div>
                                                </>
                                            }
                                        </SenderTypography>
                                    ) : (
                                        <ReceiverTypography key={ uuidv4() }>
                                            { chat.url && chat.url !== '' ?

                                                <a href={ chat.url } target='_blank' rel="noreferrer">
                                                    <ImageCont>

                                                        <FileIcon imageUrl={ chat.url } fileName={ chat.text } />
                                                    </ImageCont>

                                                    <div>{ chat.text }</div>
                                                    <div>{ getTime(chat.createdAt) }</div>
                                                </a>

                                                :
                                                <>
                                                    <div>{ chat.text }</div>
                                                    <div>{ getTime(chat.createdAt) }</div>
                                                </>
                                            }

                                        </ReceiverTypography>
                                    )
                                ))
                                :
                                <Box style={ { height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>

                                    <Typography style={ { fontSize: '20px', color: '#808080' } }>No Chats...</Typography>
                                </Box>
                            }

                        </>

                    </ChatContainer>
                    <ChatFooter
                        scrollToBottom={ scrollToBottom }
                        setRealTimeMessage={ setRealTimeMessage }
                        setRealTimeFile={ setRealTimeFile }
                        setFileFlag={ setFileFlag }
                    />

                </MainContainer >
            )
            }
        </>
    );
}

export default memo(Chat);
