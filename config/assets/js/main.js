$(document).ready(function(){
    console.log('document is ready')
    $.material.init();

    loadOptions();
    formHandler();
    submitHandler();
});

function formHandler(){

    $("#config-form").bind('submit',function(e){
        e.preventDefault();
    })

    $("#color-btn-group .btn").click(function () {
        $("#backgroundColorPicker").val($(this).attr('data-color'));
    });
}

function submitHandler() {
    var $submitButton = $('#submitButton');

    $submitButton.on('click', function() {
        console.log('Submit');

        var return_to = getQueryParam('return_to', 'pebblejs://close#');
        document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
    });
}

function loadOptions() {
    var $backgroundColorPicker = $('#backgroundColorPicker');
    var $animateSecondsCheckbox = $('#animateSecondsCheckbox');



    if (localStorage.backgroundColor) {
        console.log('Background color: '+localStorage.backgroundColor);
        $backgroundColorPicker[0].value = localStorage.backgroundColor;

    }

    if (localStorage.animateSeconds) {
        console.log('Animate seconds: '+localStorage.animateSeconds);
        $animateSecondsCheckbox[0].checked = localStorage.animateSeconds === 'true';
    }
}

function getAndStoreConfigData() {
    var $backgroundColorPicker = $('#backgroundColorPicker');
    var $animateSecondsCheckbox = $('#animateSecondsCheckbox');

    var options = {
        backgroundColor: $backgroundColorPicker.val(),
        animateSeconds: $animateSecondsCheckbox[0].checked
    };

    localStorage.backgroundColor = options.backgroundColor;
    localStorage.animateSeconds = options.animateSeconds;

    console.log('Got options: ' + JSON.stringify(options));
    return options;
}

function getQueryParam(variable, defaultValue) {
    var query = location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return defaultValue || false;
}