import axios from 'axios';

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
    //fetchMoreFiles : for pagination , if true : concatinate the next batch of files to the current array;
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
                        img: imagePath(file.contentType)
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

export const addFile = (payload) => {
    let {file, data, type, path} = payload;
    if (path == "/")
        path = "/home"
    return ((dispatch) => {
        let cloudFile = new CB.CloudFile(file, data, type, path);
        cloudFile.save({
            success: function(cloudFile) {
                dispatch({type: "ADD_FILE_SUCCESS"})
            },
            error: function(error) {},
            uploadProgress: function(percentComplete) {
                dispatch({
                    type: 'UPLOAD_PROGRESS',
                    payload: percentComplete * 100
                });
            }
        });

    })
}

/*
desc : return path of image depending on file type;
*/

function imagePath(type) {
    let img = "./assets/file.png";
    switch (type) {
        case(type.match(/(.*)image(.*)/i) || {}).input:
            img = "./assets/png.png";
            break;
        case(type.match(/(.*)folder(.*)/) || {}).input:
            img = "./assets/folder.png";
            break;
        case(type.match(/(.*)pdf(.*)/) || {}).input:
            img = "./assets/pdf.png";
            break;
        case(type.match(/(.*)audio(.*)/) || {}).input:
            img = "./assets/audio.png";
            break;

    }
    return img;
}
