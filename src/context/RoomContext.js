import { off, onValue, ref } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../misc/firebase";
import { transformToArray } from "../misc/helpers";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [rooms, setRooms] = useState(null);

    useEffect(()=>{
        const roomdbRef = ref(database, "rooms");

        onValue(roomdbRef, (snap)=> {
            const data = snap.val();
            const roomData = transformToArray(data);
            
            setRooms(roomData);
        })

        return () => {
            off(roomdbRef);
        }

    },[])

    return <RoomContext.Provider value={rooms}>
        {children}
    </RoomContext.Provider>
}

export const useRooms = () => useContext(RoomContext);