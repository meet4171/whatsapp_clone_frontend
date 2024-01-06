import { createContext, useState } from "react"
export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
    const [currentChat, setCurrentChat] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);


    return (


        < ChatContext.Provider value={ {
            currentChat,
            setCurrentChat,
            newMessageFlag,
            setNewMessageFlag,
            file,
            setFile,
            loading,
            setLoading,

        } }>
            { children }
        </ChatContext.Provider >

    )

}