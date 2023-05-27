import { equalTo, get, orderByChild, query, ref } from "firebase/database";

export const transformToArray = (snap) => {
    return snap ? Object.keys(snap).map(roomId => {
        return {...snap[roomId], id: roomId}
    }) : [];
}

export async function getUserUpdates(userId, keyToUpdate, value, db) {
    const updates = {}

    updates[`/profiles/${userId}/${keyToUpdate}`] = value;
    
    const getMsg = get(query(ref(db, "/messages"), orderByChild("/author/uid"), equalTo(userId)));

    const getRooms = get(query(ref(db, "/rooms"), orderByChild("/lastMessage/author/uid"), equalTo(userId)));

    const [mSnap, rSnap] = await Promise.all([getMsg, getRooms]);

    mSnap.forEach(msgSnap => {
        updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
    })

    rSnap.forEach(roomSnap => {
        updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
    });

    return updates;

}