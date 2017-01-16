import axios from 'axios';

export const addFolder = (data) => {
    console.log("Adding Folder name: ", data);
    return {type: 'ADD_FOLDER', payload: data}
};
export const deleteFile = (data) => {
    return ((dispatch) => {

        console.log("id", data);
        var query = new CB.CloudQuery("_File");
        query.findById(data, {
            success: function(obj) {
                obj.delete({
                    success: function(obj) {
                        console.log("delete", obj);
                        dispatch({type: "DELETE_FILE", payload: data});

                    },
                    error: function(err) {}
                })
            },
            error: function(err) {}
        })
    });
}
export const fetchAllFiles = (data) => {
    console.log(data);
    let response = [];
    let {path, searchText, regex, skip, fetchMoreFiles} = data;
    if (path == "/")
        path = "/home";
    var query = new CB.CloudQuery("_File");
    if (searchText)
        query.regex('name', '(.*)' + searchText + '(.*)', true);
    if (regex)
        query.regex('contentType', regex, true);

    //query.containedIn('name', searchText.split(" "));

    return ((dispatch) => {
        dispatch({type: "FETCHING_ALL_FILES"});
        query.equalTo('path', path);
        query.setLimit(999999999);
        query.count({
            success: function(number) {
                dispatch({
                    type: 'TOTAL_FILES',
                    payload: Math.ceil(number / 10)
                })
            },
            error: function(error) {
                //error
            }
        });
        query.setSkip((skip - 1) * 10)
        query.setLimit(10);
        query.orderByDesc('createdAt');
        query.find({
            success: function(files) {
                console.log("files", files);
                files.forEach((cloudFile) => {
                    let file = cloudFile.document;
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
                        title: file.name.length > 20
                            ? file.name.substring(0, 14) + '.....' + file.name.substring(file.name.length - 5, file.name.length)
                            : file.name,
                        modified: new Date(parseInt(file.createdAt)).toLocaleString(), //to be changed later
                        type: file.contentType == 'folder'
                            ? 'folder'
                            : 'file',
                        img: img
                    })
                });
                dispatch({
                    type: "FETCH_ALL_FILES",
                    payload: {
                        data: response,
                        fetchMoreFiles: fetchMoreFiles
                    }
                })

            },
            error: function(error) {}
        });

    })

}
