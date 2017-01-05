export const addFolder = (data) => {
  console.log("Adding Folder name: ", data);
  return {type: 'ADD_FOLDER', payload: data}
};
export const deleteFile = (data) => {
  console.log(data);
  return {type: 'DELETE_FILE', payload: data}

}
