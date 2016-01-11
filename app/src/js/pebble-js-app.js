Pebble.addEventListener('ready', function() {
    console.log('PebbleKit JS ready!');
});

Pebble.addEventListener('showConfiguration', function() {
    //var url = 'http://michael.local/pip-boy-200-round/config/public/';
    var url = 'http://michael.local:9000';

    console.log('Showing configuration page: ' + url);

    Pebble.openURL(url);
});

Pebble.addEventListener('webviewclosed', function(e) {
    var configData = JSON.parse(decodeURIComponent(e.response));

    console.log('Configuration page returned: ' + JSON.stringify(configData));

    if (configData.backgroundColor) {

        console.log('Animate seconds value: '+configData.animateSeconds);

        var configObject = {
            backgroundColor: parseInt(configData.backgroundColor, 8),
            animateSeconds: (configData.animateSeconds) ? "T" : "F" //must be int or will not be sent to the watch correctly
        };

        console.log('ConfigObject from pebble',JSON.stringify(configObject));

        Pebble.sendAppMessage(configObject, function() {
            console.log('Send successful!');
        }, function() {
            console.log('Send failed!');
        });
    }
});