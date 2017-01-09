const CB = require('cloudboost');
CB.CloudApp.init('xlamefwqcqyd', '0f07bd06-ee6c-4eed-9aa0-fa291747b757');

exports.addFile = function(file) {
    console.log("hey from files", file);
    /*var name = "photo.jpg";
    var cloudFile = new CB.CloudFile(file);
    cloudFile.set('name', name);
    cloudFile.save({
        success: function(cloudFile) {
            console.log(cloudFile.URL);
        },
        error: function(error) {
            //error
        },
        uploadProgress: function(percentComplete) {
            //upload progress.
        }
    })*/
}
