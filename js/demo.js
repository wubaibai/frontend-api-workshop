//所有要共用的變數都放在最外層
var jq_GET = (function(qurl) {
	if (qurl == "") return {};
	var b = {};
	for (var i = 0; i < qurl.length; ++i)
	{
		var p=qurl[i].split('=');
		if (p.length != 2) continue;
		var nValue = decodeURIComponent(p[1].replace(/\+/g, " "));
		if(typeof b[p[0]] == "string"){
			var newArr = [];
			newArr.push(b[p[0]]);
			newArr.push(nValue);
			b[p[0]] = newArr;	
		} else {
			b[p[0]] = nValue;	
		}
	}
	return b;
})(window.location.search.substr(1).split('&'));

var winW;
var winH;
var pageNow;
var serverhost = "http://trusty-moment-134623.appspot.com"
var apiURL = {
	"park_info" : serverhost+"/park_info",
	"area_list" : serverhost+"/area_list",
	"area_info" : serverhost+"/area_info",
	"add_favi_count" : serverhost+"/add_favi_count" 
}

$(document).ready(function(){
	winW = $(window).width();
	winH = $(window).height();
	pageNow = $('body').attr('rel');

	$('.leave-overlay').on('click',function(){
		$('.overlay-content').html('');
		overlay(false);
	});

	$('body').on('click','.like-wrap',function(){
		var theRel = $(this).attr('rel');
		var thisLikeWrap = $(this);
		addFavi(theRel,function(data){
			thisLikeWrap.find('[datakey="faviCount"]').text(data);
		});
	});
});

$(window).resize(function(){
	winW = $(window).width();
	winH = $(window).height();
});

$(window).load(function(){
	if(pageNow == "index"){
		get_park_info();
		get_area_list();
	}

	if(pageNow == "area"){
		if(jq_GET["area"] && jq_GET["area"] != ""){
			getAreaInfo2(jq_GET["area"]);
		}
	}
});

//你可以寫很多自己的 function 在各個地方用;
function get_park_info(){
	$.ajax({
		url: apiURL["park_info"],
		type: "POST",
		dataType: "json",
		cache: false,
		success: function(data) {
			var parkInfoEle = $('.park-info');
			if(data["status"] && data["park"]){
				$.each(data["park"],function(k,v){
					parkInfoEle.find('[datakey="'+k+'"]').text(v);
				});
			} else {
				console.log(data["error"]);
			}
		},
		error : function( jqxhr, textStatus, error ) {
			console.log("get_park_info API error!!!");
		}
	});
}

function get_area_list(callback){
	var thisCallback = callback;
	$.ajax({
		url: apiURL["area_list"],
		type: "POST",
		dataType: "json",
		cache: false,
		success: function(data) {
			if(data["status"] && data["area_list"]){
				var areaListContainer = $('.area-list');
				var areaListItem = $('.web-ui-template .area-list-item');
				valueToDom(areaListContainer,areaListItem,data["area_list"],function(){
					setAreaListJS();
				});
			} else {
				console.log(data["error"]);
			}
		},
		error : function( jqxhr, textStatus, error ) {
			console.log("get_area_list API error!!!");
		}
	});
}

function setAreaListJS(){
	$('.area-list-item .click-item').off('click');
	$('.area-list-item .click-item').on('click',function(){
		var theRel = $(this).parents('.area-list-item').attr('rel');
		getAreaInfo(theRel);
	});
}

function getAreaInfo(areaid){
	$.ajax({
		url: apiURL["area_info"],
		type: "POST",
		dataType: "json",
		data:{
			"area_id" : areaid
		},
		cache: false,
		success: function(data) {
			if(data["status"] && data["area"]){
				var areainfoTemplate = $('.web-ui-template .area-info').clone();
				$.each(data["area"],function(k,v){
					var areaInfo = areainfoTemplate.find('.area-info-main');
					var target = areaInfo.find('[datakey="'+k+'"]');
					var targetPos = target.attr('datapos');
					if(targetPos && targetPos != ""){
						areaInfo.find('[datakey="'+k+'"]').attr(targetPos,v);
					} else {
						areaInfo.find('[datakey="'+k+'"]').text(v);
					}
				});
				$('.overlay-content').append(areainfoTemplate);

				if(data["area"]["animals_list"]){
					var animalListContainer = $('.overlay-content .animals-list');
					var animalListItem = $('.web-ui-template .animal-list-item');
					valueToDom(animalListContainer,animalListItem,data["area"]["animals_list"],function(){
						setAreaListJS();
					});
				}
				overlay(true);
			} else {
				console.log(data["error"]);
			}
		},
		error : function( jqxhr, textStatus, error ) {
		}
	});
}

function getAreaInfo2(areaid){
	$.ajax({
		url: apiURL["area_info"],
		type: "POST",
		dataType: "json",
		data:{
			"area_id" : areaid
		},
		cache: false,
		success: function(data) {
			if(data["status"] && data["area"]){
				var areainfoTemplate = $('.web-ui-template .area-info').clone();
				$.each(data["area"],function(k,v){
					var areaInfo = areainfoTemplate.find('.area-info-main');
					var target = areaInfo.find('[datakey="'+k+'"]');
					var targetPos = target.attr('datapos');
					if(targetPos && targetPos != ""){
						areaInfo.find('[datakey="'+k+'"]').attr(targetPos,v);
					} else {
						areaInfo.find('[datakey="'+k+'"]').text(v);
					}
				});
				$('.single-area').append(areainfoTemplate);

				if(data["area"]["animals_list"]){
					var animalListContainer = $('.single-area .animals-list');
					var animalListItem = $('.web-ui-template .animal-list-item');
					valueToDom(animalListContainer,animalListItem,data["area"]["animals_list"],function(){
						setAreaListJS();
					});
				}
			} else {
				$('.single-area').text(data["error"]);
			}
		},
		error : function( jqxhr, textStatus, error ) {
		}
	});
}

function addFavi(areaid,callback){
	var thisCallback = callback;
	$.ajax({
		url: apiURL["add_favi_count"],
		type: "POST",
		dataType: "json",
		data:{
			"area_id" : areaid
		},
		cache: false,
		success: function(data) {
			if(data["status"] && data["faviCount"]){
				if(thisCallback && typeof(thisCallback) == "function"){
					console.log(data["faviCount"]);
					thisCallback(data["faviCount"]);
				}
			}
		},
		error : function( jqxhr, textStatus, error ) {
		}
	});
	
}

function valueToDom(uiarea,uitemplate,dataset,callback){
	var thisCallback = callback;
	var uiarea = uiarea;

	if(dataset && typeof dataset == "object"){
		$.each(dataset,function(i,uidata){
			var newUIitem = uitemplate.clone().removeClass('web-ui-template');
			$.each(uidata,function(k,v){
				var data_target = newUIitem.find('[datakey="'+k+'"]');
				var data_Pos = data_target.attr('datapos');
				if(data_Pos && data_Pos != ""){
					newUIitem.find('[datakey="'+k+'"]').attr(data_Pos,v);
				} else {
					newUIitem.find('[datakey="'+k+'"]').text(v);
				}
				if(k == "ID"){
					newUIitem.attr('rel',v);
				}
			});
			uiarea.append(newUIitem);
		});

		if(thisCallback && typeof(thisCallback) == "function"){
			thisCallback();
		}
	}
}

function overlay(status){
	if(status){
		$('.full-overlay').scrollTop(0);
		$('.full-overlay').addClass('showed');
		$('body').addClass('overflow-hidden');
	} else {
		$('.full-overlay').removeClass('showed');
		$('body').removeClass('overflow-hidden');
	}
}