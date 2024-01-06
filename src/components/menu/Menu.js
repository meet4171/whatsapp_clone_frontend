import { useContext, useEffect, useState } from "react";
import MenuHeader from '../menu/MenuHeader';
import ProfileDrawer from "../comman/ProfileDrawer";
import SearchTab from "../menu/SerachTab";
import MenuContent from "../menu/MenuContent";
import axios from 'axios';
import { ChatContext } from "../../context/ChatContext";

export default function Menu() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [allConversations, setAllConversations] = useState([]);
    const { newMessageFlag } = useContext(ChatContext)


    useEffect(() => {
        const getAllConversations = async () => {

            try {
                const response = await axios.get('/conversation');
                const allConv = await response.data;
                setAllConversations([...allConv]);
            } catch (error) {
                console.log(error);
            }
        }
        getAllConversations();
    }, [newMessageFlag])

    const containerStyle = {
        height: '100%',
        background: '#fff',
        borderRight: '1px solid #e4e5e8',
        minWidth: 'fit-content',
        position: 'relative',
        overflow: 'hidden'
    };

    return (
        <div style={ containerStyle }>
            <MenuHeader setOpenDrawer={ setOpenDrawer } />
            <div style={ { borderBottom: '2px solid #f0f2f5' } }>
                <SearchTab setSearchText={ setSearchText } />
            </div>
            <ProfileDrawer openDrawer={ openDrawer } setOpenDrawer={ setOpenDrawer } style={ { position: 'relative' } } />
            <MenuContent searchText={ searchText } allConversations={ allConversations } />
        </div>
    );
}
