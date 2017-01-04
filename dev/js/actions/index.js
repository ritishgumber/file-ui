export const addFolder = (data) => {
    console.log("Adding Folder name: ", data);
    return {
        type: 'ADD_FOLDER',
        payload: data
    }
};
