/**
 * Created by Araja Jyothi Babu on 28-Sep-16.
 */
$(document).ready(function () {
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
    //to stop video on close
    $('#video-popup').on('hidden.bs.modal', function () {
        $("#video-popup iframe").attr("src", "");
    });
    $("div.video-link").click(function(){
        $("#video-popup iframe").attr("src", "https://www.youtube.com/embed/HsXaVV6fFDY?autoplay=1&rel=0");
    });
    $("form.contact-form").submit(function(event){
        event.preventDefault();
        $("#sign-up").removeClass("btn-primary").addClass("btn-info").text(" ... ");
        /*var obj = new Object();
         obj.name = $("#name").val();
         obj.email = $("#email").val();
         obj.company = $("#company").val();
         obj.designation = $("#designation").val();
         //obj.password = $("#password").val();
         obj.number = $("#number").val() || "N/A";*/
        var channel = '#demo-requests';
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
            url : "https://hooks.slack.com/services/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",
            method : "POST",
            dataType: 'text',
            async: true,
            data: JSON.stringify(obj),
            timeout : 30000     //30 seconds timeout
        }).done(function(status){
            $("#message").addClass("success").removeClass("error").text("Thank you, we will get back to you shortly.");
            setTimeout( function(){$('#contact-popup').modal('toggle');}, 4000);
            $("#sign-up").removeClass("btn-info").addClass("btn-primary").text("Schedule Demo");
        }).fail(function(){
            $("#message").addClass("error").removeClass("success").text("Something went wrong. Please try again..!");
            $("#sign-up").removeClass("btn-info").addClass("btn-primary").text("Schedule Demo");
        });
    });

    $("form.feature-form").submit(function(event){
        event.preventDefault();
        $("#feature-submit").removeClass("btn-info").addClass("btn-primary").text("Requesting..");
        var channel = "#customer-features";
        var customerName = $("#customer-name").val();
        var text = "*Features selected:* \n\n";
        var featuresSelected = document.getElementsByName("features");
        var index = 1;
        for (i = 0; i < featuresSelected.length; i++) {
            if (featuresSelected[i].checked == true) {
                text +=  ":cherries: " + (index++) +  ". _" + featuresSelected[i].value + "_\n\n";
            }
        }
        var obj = {};
        obj.channel = channel;
        obj.username = customerName;
        obj.text = text;
        obj.icon_emoji = ":seedling:";

        $.ajax({
            url : "https://hooks.slack.com/services/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",
            method : "POST",
            dataType: 'text',
            async: true,
            data: JSON.stringify(obj),
            timeout : 30000     //30 seconds timeout
        }).done(function(status){
            $("#feature-acknowledgement").addClass("success").removeClass("error").text("Thank you, we will get back to you shortly.");
            $("#feature-submit").removeClass("btn-primary").addClass("btn-info").text("Request Quote");
        }).fail(function(){
            $("#feature-acknowledgement").addClass("error").removeClass("success").text("Something went wrong. Please try again..!");
            $("#feature-submit").removeClass("btn-primary").addClass("btn-info").text("Sign Up");
        });
    });

    //Bootsratp tooltip
    $('[data-toggle="tooltip"]').tooltip();

});