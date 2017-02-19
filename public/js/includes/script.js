
(function ($){
    var $imgSvg = jQuery('img.images-svg');

    jQuery(document).ready(function () {
        // img to svg converter
        $imgSvg.each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');
            jQuery.get(imgURL, function (data) {
                var $svg = jQuery(data).find('svg');
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' svg');
                }
                $svg = $svg.removeAttr('xmlns:a');
                $img.replaceWith($svg);
            }, 'xml');
        });
    });
})(jQuery);

