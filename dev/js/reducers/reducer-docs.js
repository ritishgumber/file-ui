export default function(state = {
    docs: []
}, action) {
    console.log(action);

    switch (action.type) {
        case 'DELETE_FILE':
            return {
                docs: [...state.docs.filter((doc) => doc.id != action.payload)]
            };
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
        case 'TOTAL_FILES':
            return {
                ...state,
                total: action.payload
            };
        case 'UPLOAD_PROGRESS':
            return {
                ...state,
                percentComplete: action.payload
            }
        case 'ADD_FILE_SUCCESS':
            return {
                ...state,
                percentComplete: 0,
                fileAddSuccess: true
            }

    }
    //  return state;

    return state;
}
