/*
API Document : https://docs.google.com/spreadsheets/d/1UaNpssETGpOsEoaHQThARCNV1D45McaeWAfnTVq0MsU/edit
*/

//所有要共用的變數都放在最外層
var pageNow;

$(document).ready(function(){
	pageNow = $('body').attr('rel');

	$('.leave-overlay').on('click',function(){
		$('.overlay-content').html('');
		overlay(false);
	});

	// $('body').on('click','.like-wrap',function(){
	// 	var theRel = $(this).attr('rel');
	// 	var thisLikeWrap = $(this);
	// 	addFavi(theRel,function(data){
	// 		thisLikeWrap.find('[datakey="faviCount"]').text(data);
	// 	});
	// });
});

$(window).load(function(){
	get_park_info();
	get_area_list();
});

//你可以寫很多自己的 function 在各個地方用;
function get_park_info(){
	$.ajax({
		url: "http://trusty-moment-134623.appspot.com/park_info",
		type: "POST",
		dataType: "json",
		cache: false,
		success: function(data) {
			// console.log(data);
			// if(data["status"] && data["park"]){
			// 	$('.park-info').find('h1').text(data["park"]["title"]);
			// 	$('.park-info').find('h3').text(data["park"]["description"]);
			// 	$('.park-info').find('.address span').text(data["park"]["address"]);
			// 	$('.park-info').find('.tel span').text(data["park"]["tel"]);

			// 	$.each(data["park"],function(k,v){
			// 		// $('.park-info').find('[datakey="title"]').text(data["park"]["title"]);
			// 		$('.park-info').find('[datakey="' + k + '"]').text(v);
			// 	});
			// } else {
			// 	console.log(data["error"]);
			// }
		},
		error : function( jqxhr, textStatus, error ) {
			console.log("get_park_info API error!!!");
		}
	});
}

function get_area_list(){
	$.ajax({
		url: "http://trusty-moment-134623.appspot.com/area_list",
		type: "POST",
		dataType: "json",
		cache: false,
		success: function(data) {
			// console.log(data);
			// if(data["status"] && data["area_list"]){
			// 	var areaUI = $('.web-ui-template .area-list-item');
			// 	$.each(data["area_list"],function(i,area){
			// 		var newAreaUI = areaUI.clone();
			// 		$.each(area,function(k,v){
			// 			if(k == "img"){
			// 				newAreaUI.find('[datakey="' + k + '"]').attr('src',v);
			// 			} else {
			// 				newAreaUI.find('[datakey="' + k + '"]').text(v);
			// 			}
			// 		});
			// 		newAreaUI.attr('rel',area["ID"]);
			// 		$('.area-list').append(newAreaUI);
			// 	});

			// 	$('.click-item').on('click',function(){
			// 		var areaID = $(this).parents('.area-list-item').attr('rel');
			// 		getAreaInfo(areaID);
			// 	});
			// } else {
			// }
		},
		error : function( jqxhr, textStatus, error ) {
		}
	});
}

function getAreaInfo(areaid){
	$.ajax({
		url: "http://trusty-moment-134623.appspot.com/area_info",
		type: "POST",
		dataType: "json",
		cache: false,
		data:{
			area_id : areaid
		},
		success: function(data) {
			// console.log(data);
			// if(data["status"] && data["area"]){
			// 	var areaUI = $('.web-ui-template .area-info');
			// 	var newAreaUI = areaUI.clone();
			// 	$.each(data["area"],function(k,v){
			// 		if(k == "img"){
			// 			newAreaUI.find('[datakey="' + k + '"]').attr('src',v);
			// 		} else if(k == "animals_list" ){
			// 			var animalUI = $('.web-ui-template .animal-list-item');
			// 			$.each(v,function(i,animal){
			// 				console.log(animal);
			// 				var newAnimalUI = animalUI.clone();
			// 				$.each(animal,function(animalk,animalv){
			// 					if(animalk == "img"){
			// 						newAnimalUI.find('[datakey="' + animalk + '"]').attr('src',animalv);
			// 					} else {
			// 						newAnimalUI.find('[datakey="' + animalk + '"]').text(animalv);
			// 					}
			// 				});

			// 				newAreaUI.find('.animals-list').append(newAnimalUI);
			// 			});
			// 		} else {
			// 			newAreaUI.find('[datakey="' + k + '"]').text(v);
			// 		}
			// 	});

			// 	$('.overlay-content').append(newAreaUI);
			// 	overlay(true);
			// } else {
			// }
		},
		error : function( jqxhr, textStatus, error ) {
		}
	});
}

function addFavi(areaid,callback){
	// var thisCallback = callback;
	// $.ajax({
	// 	url: "http://trusty-moment-134623.appspot.com/add_favi_count",
	// 	type: "POST",
	// 	dataType: "json",
	// 	data:{
	// 		"area_id" : areaid
	// 	},
	// 	cache: false,
	// 	success: function(data) {
	// 		if(data["status"] && data["faviCount"]){
	// 			if(thisCallback && typeof(thisCallback) == "function"){
	// 				console.log(data["faviCount"]);
	// 				thisCallback(data["faviCount"]);
	// 			}
	// 		}
	// 	},
	// 	error : function( jqxhr, textStatus, error ) {
	// 	}
	// });
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
