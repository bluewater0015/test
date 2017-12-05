
$(function(){
	var submit = $('.submit');
	var phone_number_box = $('.phone_number_box');
	var phone_number = $('.phone_number');
	var phone_number_tips = $('.phone_number_tips');
	var username_box = $('.username_box');
	var usernames = $('.usernames');
	var userphone_box = $('.userphone_box');
	var userphones = $('.userphones');
	var get_cooperate = $('.get_cooperate');
	var user_tips = $('.user_tips');
	var phone_tips = $('.phone_tips');

	//校验顶部的电话号码
	//添加点击事件
	phone_number.click(function(){
		phone_number_box.css('border','1px solid orange');
		//phone_number_box.addClass('borderOrange');
	})
	//失去焦点
	phone_number.blur(function(){
		phone_number_box.css('border','1px solid #ccc');
		//phone_number_box.addClass('borderGrey').removeClass('borderOrange');
		checkPhoneNumber();
	})
	function checkPhoneNumber() {
		if(phone_number.val()){
            if(!(/^1[34578]\d{9}$/.test(phone_number.val()))){ 
            	phone_number_box.css('border','1px solid red');
            	phone_number_tips.text("请输入正确的手机号码");
                phone_number_tips.show();
            	//phone_number_box.addClass('borderRed').removeClass('borderOrange borderGrey');
            	//console.log('添加一个类',phone_number_box.addClass('borderRed'));
                //phone_tips.text("请输入正确的手机号码");
                //phone_tips.show();
                //console.log('addclass',phone_number_box.addClass('borderRed'));
            }else{
            	phone_number_tips.hide();
            	//phone_number_box.addClass('borderGrey');
            	phone_number_box.css('border','1px solid #ccc');
                //phone_tips.hide();
            }
        }else{
        	phone_number_tips.text("手机号码不能为空");
            phone_number_tips.show();
        	//phone_number_box.addClass('borderRed').removeClass('borderOrange borderGrey');
        	phone_number_box.css('border','1px solid red');
        	//phone_number_box.css('border') === '1px solid yellow';
            //phone_tips.text("手机号码不能为空");
            //phone_tips.show();
        }
	}
	
	//校验姓名
	usernames.click(function(){
		username_box.css('border','2px solid orange');
	})
	usernames.blur(function() {
		username_box.css('border','2px solid #999');
		checkName();
	})
	//校验手机
	userphones.click(function(){
		userphone_box.css('border','2px solid orange');
	})
	userphones.blur(function(){
		userphone_box.css('border','2px solid #999');
		checkphone();
	})

	//检查用户名
	function checkName() {
		if(usernames.val()){
            if(!(/^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/.test(usernames.val()))){ 
                user_tips.text("1-10字符");
                user_tips.show();
                //console.log('是否隐藏1',user_tips.is('hidden'));
            }else{
                user_tips.hide();
                //console.log('是否隐藏2',user_tips.is(':hidden'));
                //console.log('ww',user_tips.hide());
            }
        }else{
            user_tips.text("用户名不能为空");
            user_tips.show();
        }
	}
	//检查手机号
	function checkphone(){
    	if(userphones.val()){
            if(!(/^1[34578]\d{9}$/.test(userphones.val()))){ 
                phone_tips.text("请输入正确的手机号码");
                phone_tips.show();
            }else{
                phone_tips.hide();
                //console.log('phone_tips',$('.phone_tips'));
            }
        }else{
            phone_tips.text("手机号码不能为空");
            phone_tips.show();
        }
    }
    //获取url中的参数
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    var source = $.getUrlParam('reurl');
    //console.log('source',source);
	//点击提交
	submit.click(function(){
		//点击时，获取电话号码
		console.log('提交');
		var cellPhone = phone_number.val();
		//console.log('cellPhone',cellPhone);
		//console.log('返回class',phone_number_box.attr('class') == 'borderRed');

		//console.log('验证border',$('.phone_number_box').css('border-color') === '1px solid red');
		if(cellPhone && phone_number_tips.is(':hidden')){
			$.ajax({
				url:'/api/franchisee/join',
				method: 'POST',
				dataType: 'json',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: JSON.stringify({
					franchiseeName: '',
					cellPhone: cellPhone,
					provinceName: '',
	                cityName: '',
	                source:source?source:'',
				}),
				success: function(data){
					console.log('data',data);
					if( data.result === 0) {
						console.log('数据请求成功！');
						$('.shade').css('visibility','visible');
						$('.pop_model').css('visibility','visible');
						phone_number.val('');
					}
				},
				fail: function(){
					console.log('数据请求失败！');
				}
			})
		}else {
			checkPhoneNumber();
		}
	})
	//点击关闭按钮时，弹出框消失
	$('.close').click(function(){
		$('.shade').css('visibility','hidden');
		$('.pop_model').css('visibility','hidden');
		$('.usernames').text('');
		$('.userphones').text('');
	})
	//点击获取合作详情
	get_cooperate.click(function(){
		var franchiseeName = usernames.val();
		var cellPhone = userphones.val();
		console.log(franchiseeName,cellPhone);
		if(franchiseeName && cellPhone && user_tips.is(':hidden') && phone_tips.is(':hidden')) {
			$.ajax({
				url:'/api/franchisee/join',
				method: 'POST',
				dataType: 'json',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				data: JSON.stringify({
					franchiseeName: franchiseeName,
					cellPhone: cellPhone,
					provinceName: '',
	                cityName: '',
	                //source:source?source:''
				}),
				success: function(data){
					//console.log('data',data);
					if( data.result === 0) {
						console.log('数据请求成功！');
						$('.shade').css('visibility','visible');
						$('.pop_model').css('visibility','visible');
						usernames.val('');
						userphones.val('');
					}
				},
				fail: function(){
					console.log('数据请求失败！');
				}
			})
		}else {
			checkName();
			checkphone();
		}
		
	})

})

/*回到头部函数*/
$(function() {
	$('.return_header').on('touchend',function(){
        var T = $(window).scrollTop();
        var t = setInterval(function(){
            if(T < 0){
                clearInterval( t );
            }else{
                T -= 50;
                $(window).scrollTop(T);
            }
        },13);
    });
    //获取url参数
    /*获取url的参数*/
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === variable) {
                return pair[1];
            }
        }
        return (false);
    }
})