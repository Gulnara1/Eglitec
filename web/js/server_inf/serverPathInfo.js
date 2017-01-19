function getPath() {

    var host = '192.168.11.31'; //  example.com
    var port = '8080'; //  12345
    var protocol = 'http';
    var path = protocol+'://'+host+':'+port+'/'; //  /blog/foo/bar
    
    return path;
}

