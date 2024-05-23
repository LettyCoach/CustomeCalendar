
$(function(){
    $('#calendar_div').on('click', '.resv_ok, .resv_few', function(){
        $('.resv_ok, .resv_few').removeClass('resv_select');
        $(this).addClass('resv_select');
    });
});


//アラートポップアップ
$(function(){
	$('#calendar_div').on('click', '.resv_ng', function(){
		$('.calender_full_alert').fadeIn();
	})
	$('.js-modal-close').on('click',function(){
		$('.calender_full_alert').fadeOut();
	})
});

