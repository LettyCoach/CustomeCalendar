$(function(){
        var _088_001 = '入力内容をご確認ください。';
        var _088_002 = 'への同意をチェックしてください';
        var _088_003 = 'お名前を入力してください。';
        var _088_004 = 'フリガナを入力してください。';
        var _088_005 = '郵便番号を入力してください。';
        var _088_006 = '郵便番号は半角数字で入力してください。';
        var _088_007 = '住所を都道府県から入力してください。';
        var _088_008 = '電話番号を入力してください。';
        var _088_009 = '電話番号は数字または「-(ハイフン)」で正しく入力してください。';
        /*var _088_013 = '利用規約への同意をチェックしてください';
        var _088_014 = '個人情報のお取り扱いについて同意する';
        var _088_015 = '個人情報のお取り扱いについての同意を解除する';*/
        var _088_017 = '';
		var _098_118 = '会員認証が完了しました。';
		var _098_119 = '該当の会員情報が存在しません。お客さま番号及びログインパスワードをご確認ください。';
		var _098_120 = 'お客さま番号及びログインパスワードを入力ください';

		
	var spc_login = window.sessionStorage.getItem([Number(0)]);
	$('#preview').on('click', function(){
		$('#name,#name_kana,#zip_code,#address,#email,#email_chk,#tel_no,#ticket_no_1').trigger('blur');
		var err_chk = 0;
		$('.form_err_msg').each(function() {
			if($(this).html() != ''){
				err_chk = 1;
				return false;
			}
		});
		if(err_chk == 0){
			$('#mode').val('preview');
			$('#form1').submit();
		}else{
			alert(_088_001);
		}
	});
	$('#cal_form').on("click", function(){
		$('#mode').val('cal_form');
		$('#form1').submit();
	});
	$('#application').on('click', function(){
		$('#mode').val('application');
		$('#form1').submit();
	});
	$('#send').on('click', function(){
		if($('#agreement_chk').prop('checked')){
			document.charset='Shift_JIS';
			$('#form').submit();
		}else{
			$('#agreement_chk_err').html("<span>"+_088_017+$('#kiyaku_title').html()+_088_002+"</span>");
		}
	});
	$('#name').on('blur', function(){
		var name = $(this).val();
		if(name!=''){
			$('#name_err').html("").removeClass('tooltip');
		}else{
			$('#name_err').html(_088_003).addClass('tooltip');
		}
	});
	$('#name_kana').on('blur', function(){
		var name_kana = $(this).val();
		if(name_kana!=''){
			$('#name_kana_err').html("").removeClass('tooltip');
		}else{
			$('#name_kana_err').html(_088_004).addClass('tooltip');
		}
	});
	$('#zip_code').on('blur', function(){
		var zip_code = $(this).val();
		if(zip_code==''){
			$('#zip_code_err').html(_088_005).addClass('tooltip');
		}else{
			if(zip_code.match(/^\d{3}\-\d{4}$/)||zip_code==''){
				$('#zip_code_err').html("").removeClass('tooltip');
			}else{
				if(zip_code.match(/^\d{7}$/)){
					$('#zip_code').val(zip_code.substr(0, 3)+'-'+zip_code.substr(3,4));
					$('#zip_code_err').html("").removeClass('tooltip');
				}else{
					$('#zip_code_err').html(_088_006).addClass('tooltip');
				}
			}
		}
	});
	$('#address').on('blur', function(){
		var address = $(this).val();
		if(address!=''){
			$('#address_err').html("").removeClass('tooltip');
		}else{
			$('#address_err').html(_088_007).addClass('tooltip');
		}
	});
	$('#tel_no').on('blur', function(){
		var tel_no = $(this).val();
		if(tel_no==''){
			$('#tel_no_err').html(_088_008).addClass('tooltip');
		}else{
			if(tel_no.match(/^[0-9\-]+$/)||tel_no==''){
				$('#tel_no_err').html("").removeClass('tooltip');
			}else{
				$('#tel_no_err').html(_088_009).addClass('tooltip');
			}
		}
	});
	$('.spc_input').on('blur', function() {
		if(spc_login >= 30){
			$('#spc_success').html('');
			$('#spc_err').html(_098_119).addClass('tooltip');
		}else{
			spc_num = $('#spc_num').val();
			spc_pass = $('#spc_pass').val();

			if(spc_num+spc_pass== ''){
				$('#spc_success').html('');
				$('#spc_err').html('').removeClass('tooltip');
			}else{
				if(spc_num!='' && spc_pass!=''){
					var data = {
						spc_num : spc_num,
						spc_pass : spc_pass,
						mode : 'spc_chk'
						};
					$.ajax({
						type: 'POST',
						url: "/",
						data: data,
					})
					.done(function(data){
						console.log(data);
						if(data=='success'){
							$('#spc_success').html(_098_118);
							$('#spc_err').html('').removeClass('tooltip');
						}else{
							spc_login++;
							window.sessionStorage.setItem(['spc_login'],[spc_login]);
							// console.log(spc_login);
							$('#spc_success').html('');
							$('#spc_err').html(_098_119).addClass('tooltip');
						}
					})
					.fail(function(XMLHttpRequest, textStatus, errorThrown){
						console.log(errorThrown);
					});
				}else{
					$('#spc_success').html('');
					$('#spc_err').html(_098_120).addClass('tooltip');
				}
			}
		}
	});
	/*$('#agreement_chk').on('change', function(){
		var agreement_chk = $(this).val();
		if(agreement_chk=='1'){
			$('#agreement_chk_err').html("").removeClass('tooltip');
		}else{
			$('#agreement_chk_err').html(_088_013).addClass('tooltip');
		}
	});
	$('#privacy_agreement_btn').on('click', function(){
		if($('#privacy_agreement_flg').val()=='1'){
			$(this).val(_088_014).removeClass('invalid');
			var wH = $(window).height()*0.8;
			$('body,html').animate({scrollTop:($('#input-form').offset().top-wH)},800,'swing');
			$('#privacy_agreement_flg').val('');
			$('.input-form').fadeOut("slow");
		}else{
			$(this).val(_088_015).addClass('invalid');
			$('#privacy_agreement_flg').val('1');
			$('.input-form').fadeIn("slow");
			$('body,html').animate({scrollTop:$('#input-form').offset().top},800,'swing');
		}
	});*/
});
 







































// アコーディオン
$(function(){
	$('#wheelchair,#allergy,#lottery').on('change', function(){
		var wheelchair = $('#wheelchair').prop('checked');
		var allergy = $('#allergy').prop('checked');
		var lottery = $('#lottery').prop('checked');
		if(wheelchair){
			$('#tba_wheelchair').show();
		}else{
			$('#tba_wheelchair').hide();
		}
		if(allergy){
			$('#tba_allergy').show();
		}else{
			$('#tba_allergy').hide();
		}
		if(lottery){
			$('#tba_lottery').show();
		}else{
			$('#tba_lottery').hide();
		}
	});
});

// 入力が完了したら背景色を変更
$(function(){
    const inputs = document.querySelectorAll('.form-table input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value !== '') {
                this.classList.add('complete'); // 入力が完了したら背景色を変更
            } else {
                this.classList.remove('complete'); // 入力が空の場合は背景色を戻す
            }
        });
    });
});

 