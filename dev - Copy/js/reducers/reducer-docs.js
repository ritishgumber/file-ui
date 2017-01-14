export default function(state = null, action) {
    console.log(action);

    switch (action.type) {
        case 'ADD_FOLDER':
            console.log(state);
            return {
                docs: [
                    ...state.docs, {
                        id: Date.now(),
                        url: action.payload.url,
                        title: action.payload.name,
                        modified: "" + Date.now(),
                        type: action.payload.type,
                        img: action.payload.img
                    }
                ]
            };
            break;
        case 'DELETE_FILE':
            return {
                docs: [...state.docs.filter((doc) => doc.id != action.payload)]
            };
            break;
        case 'FETCHING_ALL_FILES':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_ALL_FILES':
            return {docs: action.payload, fetching: false, total: state.total};
            break;
        case 'TOTAL_RECORDS':
            return {
                ...state,
                total: action.payload
            };
            break;
    }
    //  return state;

    return {docs: []};
}
