export const transformToArray = (snap) => {
    return snap ? Object.keys(snap).map(roomId => {
        return {...snap[roomId], id: roomId}
    }) : [];
}