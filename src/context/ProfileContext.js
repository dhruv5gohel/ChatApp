import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";
import { off, onDisconnect, onValue, ref, serverTimestamp, set } from "firebase/database";

const ProfileContext = createContext();

export const isOfflineForDatabase = {
    state: "offline",
    lastChanged: serverTimestamp(),
};

const isOnlineForDatabase = {
    state: "online",
    lastChanged: serverTimestamp(),
}

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        let profileRef;
        let profileStatusRef;

        const authUnsub = auth.onAuthStateChanged(authObj => {
            if(authObj){
                profileRef = ref(database, `profiles/${authObj.uid}`);
                profileStatusRef = ref(database, `status/${authObj.uid}`);

                onValue(profileRef, (snapshot)=>{
                    const { email, name, avatar } = snapshot.val();

                    const data = {
                        uid: authObj.uid,
                        email,
                        name,
                        avatar,
                        createdAt: serverTimestamp()
                    }

                    setProfile(data);
                    setLoading(false);
                })

                onValue(ref(database, ".info/connected"), snap => {
                    if(!!snap.val() === false){
                        return;
                    }

                    onDisconnect(profileStatusRef).set(isOfflineForDatabase).then(()=>{
                        set(profileStatusRef, isOnlineForDatabase)
                    })
                })
            }
            else{
                setProfile(null);
                
                if(profileRef){
                    off(profileRef);
                }

                if(profileStatusRef){
                    off(profileStatusRef);
                }

                off(ref(database, ".info/connected"))
                setLoading(false);
            }
        })
        
        return () => {
            authUnsub();

            if(profileRef){
                off(profileRef);
            }

            if(profileStatusRef){
                off(profileStatusRef)
            }
        }
    },[])

    return <ProfileContext.Provider value={{ profile , loading}}>
        {children}
    </ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext);