import axios from 'axios';

export const addFolder = (data) => {
    console.log("Adding Folder name: ", data);
    return {type: 'ADD_FOLDER', payload: data}
};
export const deleteFile = (data) => {
    console.log(data);
    return ((dispatch) => {
        axios.get(CB.apiUrl + '/file/' + CB.appId + '/' + data).then(function(res) {
            console.log("deleting file", res);
            var file = new CB.CloudFile(res.data);
            file.delete({
                success: function(file) {
                    //File deleted
                    console.log(file);
                },
                error: function(err) {
                    //error in deleting File
                    console.log(err);
                }
            });
            dispatch({type: 'DELETE_FILE', payload: data})
        })

    })

}
export const fetchAllFiles = (data) => {
    let response = [];
    if (data.path == "/")
        data.path = "/home";
    return ((dispatch) => {
        dispatch({type: "FETCHING_ALL_FILES", payload: response})

        axios.post(CB.apiUrl + '/allfile/' + CB.appId, {
            path: data.path,
            skip: data.skip,
            pageSize: 5
        }).then(function(res) {
            console.log("count", res.data.total);
            dispatch({
                type: "TOTAL_RECORDS",
                payload: Math.ceil(res.data.total / 5)
            });
            const files = res.data.docs; //array of files is returned;
            files.forEach((file) => {
                let img = "./assets/file.png",
                    str = file.contentType;
                switch (str) {
                    case(str.match(/(.*)image(.*)/i) || {}).input:
                        img = "./assets/png.png";
                        break;
                    case(str.match(/(.*)folder(.*)/) || {}).input:
                        img = "./assets/folder.png";
                        break;
                    case(str.match(/(.*)pdf(.*)/) || {}).input:
                        img = "./assets/pdf.png";
                        break;
                    case(str.match(/(.*)audio(.*)/) || {}).input:
                        img = "./assets/audio.png";
                        break;

                }
                response.push({
                    id: file._id,
                    url: file.url,
                    title: file.name,
                    modified: new Date(parseInt(file.createdAt)).toLocaleString(), //to be changed later
                    type: file.contentType == 'folder'
                        ? 'folder'
                        : 'file',
                    img: img
                })
            });
        }).then(function() {

            dispatch({type: "FETCH_ALL_FILES", payload: response})

        });

    })

}
