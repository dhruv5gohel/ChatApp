import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react"
import { database } from "./firebase";

export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches
    )

    useEffect(()=>{
        const tempQuery = window.matchMedia(query);
        setMatches(tempQuery.matches);

        const listener = ev => setMatches(ev.matches);

        tempQuery.addEventListener("change", listener)

        return ()=>{
            tempQuery.removeEventListener("change", listener);
        }
    },[query]);

    return matches;
}

export const usePresence = (uid) => {
    const [presence, setPresence] = useState(null);

    useEffect(()=>{
        const profileStatusRef = ref(database, `/status/${uid}`);

        onValue(profileStatusRef, snap => {
            if(snap.exists()){
                const data = snap.val();
                setPresence(data);
            }
        });

        return ()=>{
            if(profileStatusRef){
                off(profileStatusRef);
            }
        };
    },[uid])

    return presence;
}