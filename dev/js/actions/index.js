import axios from 'axios';

export const initApp = (appId) => {
    return ((dispatch) => {
        axios.defaults.withCredentials = true

        axios.get(USER_SERVICE_URL + 'user').then((userData) => {
            axios.get(USER_SERVICE_URL + 'app/' + appId).then((appdata) => {
                if (appdata.data && appId) {
                    axios.get(USER_SERVICE_URL + 'app').then((data) => {

                        if (__isHosted == "true" || __isHosted == true) {
                            CB.CloudApp.init(appId, appdata.data.keys.master)
                        } else
                            CB.CloudApp.init(SERVER_URL, appId, appdata.data.keys.master)

                        let allApps = [];
                        let length = data.data.length;
                        data.data.forEach((app) => {
                            allApps.push({name: app.name, id: app.appId});
                            length--;
                            if (length == 0)

                                dispatch({
                                    type: 'APP_INIT_SUCCESS',
                                    payload: {
                                        appId: appId,
                                        appName: appdata.data.name,
                                        allApps: allApps
                                    }
                                });
                            }
                        );
                    }, (err) => {
                        console.log(err);
                    });

                } else {
                    window.location.href = DASHBOARD_URL
                }
            }, (err) => {
                console.log(err)
                window.location.href = DASHBOARD_URL
            })
        }, (err) => {
            console.log('err');
            window.location.href = ACCOUNTS_URL
        })

    })
}
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

    if (path.endsWith('/'))
        path = path.slice(0, path.length - 1)
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
                    payload: Math.ceil(number / 20)
                })
            },
            error: function(error) {
                //error
            }
        });
        query.setSkip((skip - 1) * 20)
        query.setLimit(20);
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

    if (path.endsWith('/'))
        path = path.slice(0, path.length - 1)
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
                    payload: parseInt(percentComplete * 100)
                });
            }
        });

    })
}
export const sortDocuments = (data) => {
    return ({type: 'SORT_DOCUMENTS', payload: data});
}

/*
desc : return path of image depending on file type;
*/

function imagePath(type) {
    let img = "/assets/file.png";
    switch (type) {
        case(type.match(/(.*)image(.*)/i) || {}).input:
            img = "/assets/png.png";
            break;
        case(type.match(/(.*)folder(.*)/) || {}).input:
            img = "/assets/folder.png";
            break;
        case(type.match(/(.*)pdf(.*)/) || {}).input:
            img = "/assets/pdf.png";
            break;
        case(type.match(/(.*)audio(.*)/) || {}).input:
            img = "/assets/audio.png";
            break;

    }
    return img;
}
