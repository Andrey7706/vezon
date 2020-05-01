$(document).ready(function(){


    /* Слайдер */

    $('.clients_slider').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,

        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint:400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


    /* Модальное окно политики */

    $('body').on('click','.politic_link, .politic-modal', function(){

        $.fancybox.open({
            src  : '#modal-polit-fancybox',
            type : 'inline',
            smallBtn: false,
            buttons: ""
        });

        return false;
    });

    /* Переход по якорям */

    $('a[href*="#work"]').on('click', function(event) {
        event.preventDefault();
        var dn = $("#work").offset().top;

        $('html, body').animate({scrollTop: dn}, 1500);

    });

    /*  Анимация AOS  */

    // aos_onload();
    //
    // function aos_onload(){
    //     setTimeout(function() {
    //         AOS.init();
    //
    //         AOS.init({
    //             duration: 800,
    //             once: true
    //         });
    //     }, 10);
    // }

    // window.onload = function() {
    //     aos_onload();
    // };


    $('body').on('click','.modal-close-form', function(){
        if (window.innerWidth <= 1200) {
            $(".nav-mobile-block").click();
        }
    });

});


$(function() {

});

$(window).ready(function() {
    if(window.innerWidth <= 992 && window.innerWidth >= 560) {
        $('.header').addClass('fixed_header');
        $('.main').addClass('main_margin');
    }
    else if (window.innerWidth >= 992) {
        $('.header').removeClass('fixed_header');
        $('.main').removeClass('main_margin');

        $(window).scroll(function(){
            if($(this).scrollTop()>105){
                $('.header_menu').addClass('fixed');
                $('.header').addClass('header_container_margin');
            }
            else if ($(this).scrollTop()<105){
                $('.header_menu').removeClass('fixed');
                $('.header').removeClass('header_container_margin');
            }
        });
    }
    else if (window.innerWidth <= 560) {
        $('.header').removeClass('fixed_header');
        $('.main').removeClass('main_margin');
    }
});


/* Маска телефона */

$('input[type="tel"]').mask("+7 (999) 999-99-99");


/* Библиотека alertify */

alertify.set('notifier', 'position', 'bottom-right');
alertify.set('notifier', 'delay', 10);

document.addEventListener('wpcf7mailsent', function( event ) {
    alertify.success(event.detail.apiResponse.message);
}, false);

document.addEventListener('wpcf7invalid', function( event ) {
    alertify.warning(event.detail.apiResponse.message);
}, false);

document.addEventListener('wpcf7mailfailed', function( event ) {
    alertify.error(event.detail.apiResponse.message);
}, false);


$(document).on('click', '.wpcf7-submit', function(e){
    if( $('.ajax-loader').hasClass('is-active') ) {
        e.preventDefault();
        return false;
    }
});

/* Мобильная навигация */

$(document).mouseup(function (e){ // событие клика по веб-документу
    if ($(".header .nav-mobile-block").hasClass("active-menu")) {
        var div = $(".mobile-menu-fixed"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            $("header .nav-mobile-block").click();
        }
    }
});

$('body').on('click','.nav-mobile-block', function(){
    if ($(this).hasClass("active-menu")) {
        $(this).removeClass("active-menu");
        $('.mobile-menu-fixed').stop().css({
            "right" : "-300px"
        });
        $("body, html").removeClass("no-scroll");
    } else {
        $(this).addClass("active-menu");
        $('.mobile-menu-fixed').stop().css({
            "right" : "0px"
        });
        $("body, html").addClass("no-scroll");
    }
});


    /* Одинаковая высота слайдов */

function feedback_update_height(){
    var array_feedback_height 	= [];

    for (var i = 0; i < $(".equipment_slider .equipment_slide .equipment_text").length; i++) {
        var unit_feedback_height 	= $(".equipment_slider .equipment_slide .equipment_text:eq("+i+")").innerHeight();
        array_feedback_height.push(+unit_feedback_height);
    }
    var unit_feedback_max_height = Math.max.apply(null, array_feedback_height);
    $(".equipment_slider .equipment_slide .equipment_text").css({
        "min-height": unit_feedback_max_height
    });
}

/* Выпадающее меню */

$(document).ready(function(){  
$('.menu-item-has-children').hover(
        function () {
            $('.sub-menu', this).stop().slideDown(400);
        },
        function () {
            $('.sub-menu', this).stop().slideUp(400);
        }
    );
});

/* Карта */

if ($('div').is("#map")) {

    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
            center: [59.22065256509059,39.90767450000001],
            zoom: 18
        });

        var myPlacemark = new ymaps.Placemark([59.22065256509059,39.90767450000001], {
                hintContent: ' г.Вологда, Пречистенская набережная, 34'
            },
            {
                preset: 'islands#redIcon'
            });

        myMap.geoObjects.add(myPlacemark);
        myMap.controls
            .remove('geolocationControl')
            .remove('fullscreenControl')
            .remove('typeSelector')
            .remove('searchControl')
            .remove('trafficControl')
            .remove('rulerControl')
            .remove('zoomControl');
        myMap.behaviors.disable([
            'scrollZoom',
            'dblClickZoom'
        ]);
    });

}

