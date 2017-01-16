export default function(state = {
    docs: []
}, action) {
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
            if (action.payload.fetchMoreFiles)
                return {
                    docs: [...state.docs.concat(action.payload.data)],
                    fetching: false,
                    total: state.total
                };
            return {docs: action.payload.data, fetching: false, total: state.total};
            break;
        case 'TOTAL_FILES':
            return {
                ...state,
                total: action.payload
            };
            break;

    }
    //  return state;

    return state;
}
