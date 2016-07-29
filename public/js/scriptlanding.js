$(function() {
    var c = {
        lines: 9,
        length: 4,
        width: 3,
        radius: 4,
        corners: 1,
        rotate: 0,
        color: "#fff",
        speed: 1.2,
        trail: 50,
        shadow: false,
        hwaccel: false,
        className: "spinner",
        zIndex: 2000000000,
        top: "13px",
        left: "auto"
    };
    var d = ["#aaacac", "#867d73", "#5f5c6a"];
    var a = 0;
    $("#iphone").hover(function() {
        $(".screen").addClass("hover")
    }, function() {
        $(".screen").removeClass("hover")
    });
    $("#iphone").click(function() {
        if (!$(".screen").is(":animated") && !$(".pagebg").is(":animated")) {
            b()
        } else {
            console.log("shit")
        }
    });
    var e = setInterval(function() {
        b();
    }, 10000);

    function b() {
        a = ((a == 6) ? 0 : a + 1);
        nextScreen = ((a == 6) ? 0 : a + 1);
        $(".screen").delay(300).animate({
            left: "-=288"
        }, 400, function() {
            $("#screen_" + nextScreen).animate({
                left: "288"
            }, 0)
        });
        if (a == 0) {
            $("#bg_0").animate({
                opacity: 1
            }, 0);
            $("#bg_2").animate({
                opacity: 0
            }, 1000)
        } else {
            $("#bg_" + a).animate({
                opacity: 1
            }, 1000, function() {
                $("#bg_" + (a - 1)).animate({
                    opacity: 0
                }, 0)
            })
        }
        $(".footer").removeClass("bg_1 bg_2 bg_3").addClass("bg_" + a);
        $("#submit").removeClass("bg_1 bg_2 bg_3").addClass("bg_" + a)
    }

    $("#submit").click(function(){
    	window.location.href = "/comenzar";
    });

    $("#googlePlay").click(function(){
        window.open('https://play.google.com/store/apps/details?id=com.galavi.inprix','_blank');
    });

    $("#appStore").click(function(){
        window.open('https://play.google.com/store/apps/details?id=com.galavi.inprix','_blank');
    });
});