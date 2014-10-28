function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getEmbedCode(url) {
    var video_url = '',
        match
    if (url.indexOf('xhamster.com') !== -1) {
        match = url.match(/xhamster.com\/movies\/(\d+)/);
        if (match && match.length == 2) {
            video_url = '<iframe width="425" height="355" src="http://xhamster.com/xembed.php?video=' + match[1] + '" frameborder="0" scrolling="no"></iframe>';
        }
    }
    else if (url.indexOf('xvideos.com') !== -1) {
        match = url.match(/xvideos.com\/video(\d+)/);
        if (match && match.length == 2) {
            video_url = '<iframe width="425" height="355" src="http://flashservice.xvideos.com/embedframe/' + match[1] + '" frameborder="0" scrolling="no"></iframe>';
        }
    }
    else if (url.indexOf('youtube.com') !== -1) {
        match = url.match(/youtube.com\/watch?v=(.+)/);
        if (match && match.length == 2) {
            video_url = '<iframe width="425" height="355" src="http://www.youtube.com/embed/' + match[1] + '" frameborder="0" scrolling="no"></iframe>';
        }
    }
    return video_url;
}

$(function () {
    var $videos = $('#videos'),
        video_param = getParameterByName('videos'),
        video_urls = video_param.split(',');
    $.each(video_urls, function () {
        var video_url = this;
        $videos.append(getEmbedCode(video_url));
    })

    $('form').submit(function (evt) {
        evt.preventDefault();
        var videos = $('textarea').val(),
            query_string = $(videos.split('\n')).map(function () {
                return encodeURIComponent(this);
            }).get().join();
        console.log(document.url + '?videos=' + query_string);
        window.location = window.location.pathname + '?videos=' + query_string;
        return false;
    });
});
