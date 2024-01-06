import { memo, useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Input } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { AccountContext } from "../../context/AccountContext";
import { addMessage, uploadFile } from "../../services/api";
import toast from "react-hot-toast";
import { ChatContext } from "../../context/ChatContext";

function ChatFooter({ scrollToBottom, setRealTimeMessage, setRealTimeFile, setFileFlag }) {
    const [messageText, setMessageText] = useState('');
    const { loggedInAccount, person, conversation, socket } = useContext(AccountContext);
    const { setNewMessageFlag, file, setFile, setLoading } = useContext(ChatContext);

    useEffect(() => {
        socket.current.on('getMessage', (message) => {
            setRealTimeMessage({
                ...message,
                createdAt: Date.now()
            });
        });
    }, [setRealTimeMessage, socket]);


    useEffect(() => {
        socket.current.on('fileDetails', (message) => {
            setRealTimeFile({
                ...message,
                createdAt: Date.now()
            });
        });
    }, [setRealTimeFile, socket])

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const resetState = () => {
        setNewMessageFlag((prev) => !prev);
        setLoading(false);
        setFile(null);
    };

    useEffect(() => {
        scrollToBottom();
    }, [file, scrollToBottom]);

    const handleSend = async () => {
        setLoading(true);
        try {
            if (messageText.trim() !== '' && conversation && file === null) {
                const message = {
                    senderId: loggedInAccount.sub,
                    receiverId: person.sub,
                    text: messageText,
                };

                await addMessage({ message, conversationId: conversation._id });
                message && conversation._id && socket.current.emit('addMessage', message);
                resetState();
            } else if (file !== null) {
                const formData = new FormData();
                formData.append('file', file);

                const fileUploaded = await uploadFile(formData);
                if (fileUploaded?.status === 200) {
                    toast.success('File sent successfully');
                    const message = {
                        senderId: loggedInAccount.sub,
                        receiverId: person.sub,
                        text: file.name,
                        url: fileUploaded.fileUrl
                    };
                    await addMessage({ message, conversationId: conversation._id });
                    message && conversation._id && socket.current.emit('addFile', message);
                    setFileFlag(prev => !prev)
                    resetState()

                } else {
                    toast.error('Error while sending file');
                }

                resetState();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An unexpected error occurred');
            resetState();
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        setMessageText(file?.name || '');
    }, [file]);

    return (
        <Box
            sx={ {
                backgroundColor: '#f0f2f5',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                position: 'absolute',
                padding: '10px 0',
                width: '100%',
                bottom: 0,
                height: '50px',
            } }
        >
            <Box
                sx={ {
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center',
                } }
            >
                <EmojiEmotionsOutlinedIcon />
                <input type="file" style={ { display: 'none' } } name="file" id="sendFile" onChange={ handleFileChange } />
                <label htmlFor="sendFile">
                    <AddOutlinedIcon style={ { cursor: 'pointer' } } />
                </label>
            </Box>
            <Input
                type="text"
                placeholder="Type a message"
                value={ messageText }
                onChange={ (e) => setMessageText(e.target.value) }
                autoFocus={ false }
                disableUnderline={ true }
                onKeyDown={ handleEnter }
                sx={ {
                    border: 'none',
                    borderRadius: '10px',
                    background: 'white',
                    width: '80%',
                    outline: 'none',
                    padding: '8px',
                    fontSize: '16px',
                    '::placeholder': {
                        color: 'gray',
                    },
                    '&:focus': {
                        caretColor: 'red',
                        border: 'none',
                    },
                } }
            />
            { messageText.length > 0 ? (
                <SendIcon onClick={ handleSend } style={ { cursor: 'pointer' } } />
            ) : (
                <MicIcon />
            ) }
        </Box>
    );
}

export default memo(ChatFooter);
