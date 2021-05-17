const messagesSection = document.querySelector(".all-messages");

$(function () {
    $(".all-messages").niceScroll({ cursorcolor: "#3498db", cursorwidth: "4px", cursoropacitymax: .8, mousescrollstep: 15 });

    $(".recipe__textarea").niceScroll({ cursorcolor: "#3498db", cursorwidth: "2px" })
});