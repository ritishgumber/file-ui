export const addFolder = (data) => {
    console.log("Adding Folder name: ", data);
    return {
        type: 'ADD_FOLDER',
        payload: data
    }
};
export const getFolderFiles=(data) =>{
  console.log(data);
  return{
    type:'GET_FOLDER_FILES',
    payload:data
  }


}
