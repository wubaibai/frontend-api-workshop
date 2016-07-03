$.ajax({
	url: "http://trusty-moment-134623.appspot.com/park_info", // API 網址
	type: "GET",            // POST
	dataType: "json",
	data:{                  // 非必要
		key: value
	}, 
	cache: false,
	success: function(data) {
		//AJAX 成功
		if(data["status"]){
			//API 成功
		} else {
			//API 失敗
		}
	},
	error : function( jqxhr, textStatus, error ) {
		//AJAX 失敗
	}
});

$.ajax({
	url: "http://trusty-moment-134623.appspot.com/park_info",
	type: "POST",
	dataType: "json",
	cache: false,
	success: function(data) {
		if(data["status"]){
		} else {
		}
	},
	error : function( jqxhr, textStatus, error ) {
	}
});

