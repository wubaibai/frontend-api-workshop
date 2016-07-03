//所有要共用的變數都放在最外層
var winW;
var winH;
var pageNow;

var apiURL = {
	"park_info" : "http://trusty-moment-134623.appspot.com/park_info",
	"area_list" : "http://trusty-moment-134623.appspot.com/area_list",
	"area_info" : "http://trusty-moment-134623.appspot.com/area_info"
}

$(document).ready(function(){
	winW = $(window).width();
	winH = $(window).height();

	pageNow = $('body').attr('rel');

	$('.leave-overlay').on('click',function(){
		$('.overlay-content').html('');
		overlay(false);
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
		}
	});
}

function setAreaListJS(){
	$('.area-list-item').off('click');
	$('.area-list-item').on('click',function(){
		var theRel = $(this).attr('rel');
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
				if(k == "ID"){
					newUIitem.attr('rel',v);
				} else {
					var data_target = newUIitem.find('[datakey="'+k+'"]');
					var data_Pos = data_target.attr('datapos');
					if(data_Pos && data_Pos != ""){
						newUIitem.find('[datakey="'+k+'"]').attr(data_Pos,v);
					} else {
						newUIitem.find('[datakey="'+k+'"]').text(v);
					}
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