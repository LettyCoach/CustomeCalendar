// JavaScript Document




//////////////////// アコーディオン ////////////////////
$(function(){  
    $(".section-train-type .btn-internal").click(function(){
        $(".section-date-select").slideToggle(300);
        $(this).toggleClass("open");
    }); 
});



