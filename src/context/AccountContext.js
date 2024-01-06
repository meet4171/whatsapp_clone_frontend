import axios from "axios";
import { createContext, useEffect, useState, useRef } from "react"
import { io } from 'socket.io-client';


export const AccountContext = createContext(null);

export function AccountProvider({ children }) {
    const [loggedInAccount, setLoggedInAccount] = useState(null);
    const [person, setPerson] = useState({});
    const [conversation, setConversation] = useState({});
    const [activeUsers, setActiveUsers] = useState([]);

    const socket = useRef();





    useEffect(() => {
        socket.current = io('ws://localhost:9000');
    }, [])

    useEffect(() => {
        if (loggedInAccount) {
            socket.current.emit('getUsers', loggedInAccount);
            socket.current.on('activeUsers', (activeUsers) => {
                setActiveUsers([...activeUsers])
            })
        }
    }, [loggedInAccount])


    useEffect(() => {
        const getConversation = async () => {
            try {
                const response = await axios.post('/conversation/get',
                    { senderId: loggedInAccount.sub, receiverId: person.sub });
                const data = await response.data;
                setConversation(data);
            } catch (error) {
                console.log(error);
            }
        }
        loggedInAccount && person && getConversation()

    }, [person.sub])



    return (


        < AccountContext.Provider value={ {
            loggedInAccount,
            setLoggedInAccount,
            person,
            setPerson,
            conversation,
            setConversation,
            activeUsers,
            setActiveUsers,
            socket
        }
        }>
            { children }
        </AccountContext.Provider >

    )

}