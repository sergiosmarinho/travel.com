var dataAnimationBase = {
    color: '#333',
    strokeWidth: 12,
    from: {color: '#AAA'},
    to: {color: '#333'},
    step: stepCircleData
};

function stepCircleData(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    let value = Math.round(circle.value() * circle._opts.total);
    circle.setText(value);
}

function customAnimateCircle(circleId, circleDataValue, circleduration) {
    let circleContainer = $(circleId)[0];
    let circleData = $.extend( true, {}, dataAnimationBase);
    circleData.total = circleDataValue;
    circleData.duration = circleduration;
    let circle = new ProgressBar.Circle(circleContainer, circleData);
    circle.animate(1.0);
}

function showGalleryImages(option) {
    if( option == 'all'){
        $('.gallery-box').fadeIn();
    } else {
        $('.gallery-box').fadeOut('slow');
        $('.img-' + option).fadeIn();
    }
}

$(document).ready(function() {
    // Starting the progress bar animation only when the user sees that part of the screen
    let dataAreaOffset = $('#data-area').offset();
    let animated = false;

    $(window).scroll(function (e) {
        let scroll = $(window).scrollTop();
        
        if(scroll > (dataAreaOffset.top - 500) && !animated) {
            customAnimateCircle('#circle-a', 800, 2400);
            customAnimateCircle('#circle-b', 100, 2200);
            customAnimateCircle('#circle-c', 120, 2000);
            customAnimateCircle('#circle-d', 25, 1800);
            animated = true;
        }
    });

    // Parallax
    // Waiting for all other images to load
    setTimeout(function() {
        $('#data-area').parallax({imageSrc: 'img/dataparallax.jpg'});
        $('#more-area').parallax({imageSrc: 'img/bannerparallaxmore.jpg'});
    }, 700);

    // Click event on gallery
    $('.filter-btn').on('click', function() {
        let option = $(this).attr('id').replace('btn-', '');
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        showGalleryImages(option);
    });

    // scroll to
    $('.nav-link').on('click', function() {
        let id = $(this).attr('id').replace('-menu', '');
        id = '#' + id;
        if ($(window).width() <= 768) {
            $('#mobile-button').click();
        }
        $('html').animate({
            scrollTop: $(id).offset().top - 70
        }, 1500);
    });

});