import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AccountContext } from "../../context/AccountContext";
import { Box, Typography, styled } from "@mui/material";
import Spinner from "../comman/Spinner";
import { getTime } from "../../utils/utility_functions";

export default function MenuContent({ searchText, allConversations }) {
    const [users, setUsers] = useState([]);
    const { loggedInAccount, setPerson, person } = useContext(AccountContext);

    const fetchAllUsers = async () => {
        try {
            const response = await axios('/user');
            const data = await response.data;
            const searchedUser = data.filter(user => user.name.toLowerCase().trim().includes(searchText.toLowerCase().trim()))
            if (searchedUser.length === 0) setUsers([...data])
            else setUsers([...searchedUser]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, [searchText]);

    const createConversation = async (info) => {
        try {
            if (info.senderId !== undefined && info.receiverId !== undefined) {
                const response = await axios.post('/conversation', info);
                await response.data;
            } else {
                console.log('error', info);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const FlexBox = styled(Box)`
        display: flex;
        flex-flow: column;
    `;

    const UserContainer = styled(Box)`
        display: flex;
        align-items: start;
        padding: 10px;
        gap: 20px;
        cursor: pointer;
        border-bottom: 2px solid #f0f2f5;
        :hover {
            background-color: #f0f2f5;
        }
    `;

    const FlexRow = styled(Box)`
        display: flex;
        justify-content:space-between;
        align-items:start;
        & > p {
            font-size: 15px;
            color: #737272e3;
        }
    `;

    const handleSetPerson = (user) => {
        setPerson(user);
    }

    return (
        <Box style={ { height: '100%' } }>
            { users.length > 0 ? (
                users.map((user) =>
                    user.sub !== loggedInAccount.sub && (
                        <UserContainer
                            key={ user.sub }
                            onClick={ () => {
                                handleSetPerson(user);
                                createConversation({
                                    senderId: loggedInAccount.sub,
                                    receiverId: user.sub,
                                });
                            } }
                            style={ {
                                backgroundColor: person.sub === user.sub ? '#f0f2f5' : '#fff',
                            } }
                        >
                            { user?.picture &&
                                <img
                                    src={ user.picture }
                                    alt="profile pic"
                                    width="40"
                                    height="40"
                                    style={ {
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                    } }
                                />
                            }
                            <FlexBox>
                                <Typography>{ user.name }</Typography>
                                { allConversations &&
                                    allConversations.length > 0 &&
                                    allConversations.map((conv) => {
                                        const isUserInConversation =
                                            (conv.members.senderId === loggedInAccount.sub && conv.members.receiverId === user.sub) ||
                                            (conv.members.receiverId === loggedInAccount.sub && conv.members.senderId === user.sub);

                                        if (isUserInConversation && conv.messages?.length > 0) {
                                            const latestMessage = conv.messages[conv.messages.length - 1];
                                            return (
                                                <FlexRow key={ conv.id }>
                                                    <Typography style={ { maxWidth: '50%', wordWrap: 'break-word' } }>{ latestMessage.text }</Typography>
                                                    <Typography style={ { maxWidth: '50%', wordWrap: 'break-word' } }>{ getTime(latestMessage.createdAt) }</Typography>
                                                </FlexRow>
                                            );
                                        }
                                        return null;
                                    }) }
                            </FlexBox>
                        </UserContainer>
                    )
                )
            ) : (
                <Box style={ { display: 'flex', height: '80%', justifyContent: 'center', alignItems: 'center' } }>
                    <Spinner />
                </Box>
            ) }
        </Box>
    );
}
