// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(function () {
    var c = 1,
        timeOut,
        fit,
        isStopped = false,
        boxw = $('.box').outerWidth(true),
        boxh = $('.box').outerHeight(true),
        boxn = $('.box').length;

    $('#slider').width(boxw * boxn);
    $('#gal, #slider').height(boxh);
    //////////////////////////////////
    function measure() {
        var winw = $(window).width();
        fit = Math.ceil(winw / boxw) - 1; // math ceil -1 to get the number of COMPLETELY visible boxes
        //$('#gal').width(winw);

        //$('#t').html('Boxw=' + boxw + ' Boxh=' + boxh + ' Winw=' + winw + ' VisibleBoxes=' + fit);
    }
    measure();

    //$(window).resize(function () {
    //    measure();
    //});
    //////////////////////////////////    
    function b() {
        cc = (c === 1) ? $('.prev').hide() : $('.prev').show();
        ccc = (c >= boxn / fit) ? $('.next').hide() : $('.next').show();
    }
    $('.btn').hide();
    /////////////////////////////////

    function a(cb) {
        $('#slider').animate({ left: '-' + (boxw * fit) * (c - 1) }, 800, cb);
    }
    ////////////////////////////////
    function auto() {
        if (isStopped) { return };
        clearTimeout(timeOut);
        timeOut = setTimeout(function () {
            $('.btn').hide();
            c++;
            if (c >= (boxn / fit) + 1) {
                c = 1;
            }
            a(function () {
                auto();
            });
        }, 2000);
    }
    auto();
    /////////////////////////////////////////////////////////////////
    $('.next').click(function () {
        c++;
        b();
        a();
    });
    $('.prev').click(function () {
        c--;
        b();
        a();
    });
    /////////////////////////////////////////////////////////////////
    $('#gal').bind('mouseenter mouseleave', function (e) {
        (e.type === 'mouseenter') ?
            (isStopped = true, b(), clearTimeout(timeOut)) :
            (isStopped = false, auto());
    });

});