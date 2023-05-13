import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";
import { off, onValue, ref } from "firebase/database";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        let profileRef;

        const authUnsub = auth.onAuthStateChanged(authObj => {
            if(authObj){
                profileRef = ref(database, `profiles/${authObj.uid}`);
                onValue(profileRef, (snapshot)=>{
                    const { email, name } = snapshot.val();

                    const data = {
                        uid: authObj.uid,
                        email,
                        name,
                    }

                    setProfile(data);
                    setLoading(false);
                })
            }
            else{
                setProfile(null);
                
                if(profileRef){
                    off(profileRef);
                }
                setLoading(false);
            }
        })
        
        return () => {
            authUnsub();

            if(profileRef){
                off(profileRef);
            }
        }
    },[])

    return <ProfileContext.Provider value={{ profile , loading}}>
        {children}
    </ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext);