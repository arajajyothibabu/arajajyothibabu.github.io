$(document).ready(function () {

    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop : false,
        directionNav: false,
        slideShow: false,
        start:function(slider){
            slider.pause();
        },
        end:function(slider){
            slider.pause();
        },
        after: function(slider){
            slider.pause();
        }
    });

    $(document).on('click', ".custom-next", function () {
        $('.flexslider').flexslider('next');
        return false;
    });

    $(".answer-button").click(function () {
        $(this).removeClass("answer-button").addClass("btn btn-success").html("Next <i class='fa fa-angle-right'></i>");
        var _this = this;
        setTimeout(function () {
            $(_this).addClass("custom-next").removeAttr("data-toggle").attr("href", "#");
        }, 50);
    });

    $(".answer-button-last").click(function () {
        $("#schedule-demo").show("slow");
        $(this).css({display: "none"});
    });

    $(window).scroll(function () {
        $(".banner-inner, .newsletter-home-text").css("opacity", 1 - $(window).scrollTop() / 350);
    });
//parallax
    if (!Modernizr.touch) {
        $('.home-newsletter').parallax("50%", 0.5);
        $('.home-contact').parallax("50%", 0.5);
    }
    //backstretch background slideshow using for banner intro
    $('.banner-slider').backstretch([
        "images/bg.jpg",
    ], {
        fade: 0,
        duration: 0
    });

    //animated fixed header
    $(window).scroll(function () {
        "use strict";
        var scroll = $(window).scrollTop();
        if (scroll > 60) {
            $(".header-transparent").addClass("sticky");
        } else {
            $(".header-transparent").removeClass("sticky");
        }
    });
//smooth scroll
    $(function () {
        $('.scroll-to a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
//Auto Close Responsive Navbar on Click
    function close_toggle() {
        if ($(window).width() <= 768) {
            $('.navbar-collapse a').on('click', function () {
                $('.navbar-collapse').collapse('hide');
            });
        }
        else {
            $('.navbar .navbar-default a').off('click');
        }
    }

    close_toggle();
    $(window).resize(close_toggle);

    //wow animations
    var wow = new WOW(
        {
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 100, // distance to the element when triggering the animation (default is 0)
            mobile: false        // trigger animations on mobile devices (true is default)
        }
    );
    wow.init();
    //to stop video on close
    $('#video-popup').on('hidden.bs.modal', function () {
        $("#video-popup iframe").attr("src", "");
    });
    $("div.video-link").click(function () {
        $("#video-popup iframe").attr("src", "https://www.youtube.com/embed/HsXaVV6fFDY?autoplay=1&rel=0");
    });
    $("form.contact-form").submit(function (event) {
        event.preventDefault();
        $("#sign-up").removeClass("btn-primary").addClass("btn-info").text(" ... ");
        /*var obj = new Object();
         obj.name = $("#name").val();
         obj.email = $("#email").val();
         obj.company = $("#company").val();
         obj.designation = $("#designation").val();
         //obj.password = $("#password").val();
         obj.number = $("#number").val() || "N/A";*/
        var channel = "#demo-requests";
        var customerName = $("#name").val() + ", _" + $("#designation").val() + "_";
        var text = "*Company:* " + $("#company").val() + "\n";
        text += "*Email:* " + $("#email").val() + "\n";
        text += "*Phone:* " + $("#number").val() || "N/A";
        var obj = {};
        obj.channel = channel;
        obj.username = customerName;
        obj.text = text;
        obj.icon_emoji = ":rocket:";
        $.ajax({
            url: "https://hooks.slack.com/services/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",
            method: "POST",
            dataType: 'text',
            async: true,
            data: JSON.stringify(obj),
            timeout: 30000     //30 seconds timeout
        }).done(function (status) {
            $("#message").addClass("success").removeClass("error").text("Thank you, we will get back to you shortly.");
            setTimeout(function () {
                $('#contact-popup').modal('toggle');
            }, 4000);
            /*if(JSON.parse(status)){ //status true condition
             $("#message").addClass("success").removeClass("error").text("Thanks for signing up, we will get back to you shortly.");
             setTimeout( function(){$('#contact-popup').modal('toggle');}, 4000);
             }
             else{
             $("#message").addClass("error").removeClass("success").text("Something went wrong. Please try again..!");
             }*/
            $("#sign-up").removeClass("btn-info").addClass("btn-primary").text("Schedule Demo");
        }).fail(function () {
            $("#message").addClass("error").removeClass("success").text("Something went wrong. Please try again..!");
            $("#sign-up").removeClass("btn-info").addClass("btn-primary").text("Schedule Demo");
        });
    });

    $.validate({
        onSuccess: function ($form) {
            $("#sign-up").css("background", "#33cc33").text(" ... ");
        },
        errorMessagePosition: $("#nothing"),
        borderColorOnError: '#dd4b39'
    });

    $("form.feature-form").submit(function (event) {
        event.preventDefault();
        $("#feature-submit").removeClass("btn-info").addClass("btn-primary").text("Requesting..");
        var channel = "#customer-features";
        var customerName = $("#customer-name").val();
        var text = "*Features selected:* \n\n";
        var featuresSelected = document.getElementsByName("features");
        var index = 1;
        for (i = 0; i < featuresSelected.length; i++) {
            if (featuresSelected[i].checked == true) {
                text += ":cherries: " + (index++) + ". _" + featuresSelected[i].value + "_\n\n";
            }
        }
        var obj = {};
        obj.channel = channel;
        obj.username = customerName;
        obj.text = text;
        obj.icon_emoji = ":seedling:";

        $.ajax({
            url: "https://hooks.slack.com/services/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",
            method: "POST",
            dataType: 'text',
            async: true,
            data: JSON.stringify(obj),
            timeout: 30000     //30 seconds timeout
        }).done(function (status) {
            $("#feature-acknowledgement").addClass("success").removeClass("error").text("Thank you, we will get back to you shortly.");
            $("#feature-submit").removeClass("btn-primary").addClass("btn-info").text("Request Quote");
        }).fail(function () {
            $("#feature-acknowledgement").addClass("error").removeClass("success").text("Something went wrong. Please try again..!");
            $("#feature-submit").removeClass("btn-primary").addClass("btn-info").text("Sign Up");
        });
    });

//Bootsratp tooltip
    $('[data-toggle="tooltip"]').tooltip();

});
