/*
					Benyamin Limanto
	Manipulating Image, Project for Madana Web Tiles
	Based on my Thoughts, Under survilance of my Boss :v
					Robert William :p
	Using Canvas for 1st time anyway, It's interesting
	
	Since It's using HTML Canvas, so It doesn't support cross domain image fetch,
	so you need to change your image into a 
*/

$(function(){
	$(".tog").click(function(){
		$(".test").toggle();
	});
	// CSS is sucks, using css is scalling the real width and height, so it will cause chaos
	// http://stackoverflow.com/questions/15793702/drawing-image-on-canvas-larger-than-real
	$("#mycanvas").attr({"width" : $(".rawdata").width(),"height" : $(".rawdata").height()});
	// That's why I use the real measurement of HTML NOT CSS!
	$(".rawdata").ready(function() {
		var mycanvas = $("#mycanvas").get(0); //This get same as getElementById("mycanvas"), the zero means get the first data, from jQuery
		var ctx = mycanvas.getContext("2d");
		var rawdata = $(".rawdata").get(0); //This get same as getElementById("mycanvas"), the zero means get the first data, from jQuery
		ctx.drawImage(rawdata,0,0,mycanvas.width, mycanvas.height); //Like on the old times on VB, it , image resource, start x, start y and width and height
		var imgdata = ctx.getImageData(0,0, mycanvas.width, mycanvas.height);	
		for(i=0; i<=imgdata.data.length; i+=4){
			var r = imgdata.data[i]; 
			var g = imgdata.data[i+1];
			var b = imgdata.data[i+2];
			var a = imgdata.data[i+3];
		}
		ctx.putImageData(imgdata,0,0);		
		var color = $('.hasil')[0];
		function pick(event) {
		  var x = event.layerX;
		  var y = event.layerY;
		  var pixel = ctx.getImageData(x, y, 1, 1);
		  var data = pixel.data;
		  var rgba = 'rgba(' + data[0] + ',' + data[1] +
					 ',' + data[2] + ',' + data[3] + ')';
		  color.textContent =  rgba;
		  color.style.background = rgba;
		}
		mycanvas.addEventListener('mousemove',pick);
	});	
	
	$(".transform").click(function(){
		var mycanvas = $("#mycanvas").get(0); //This get same as getElementById("mycanvas"), the zero means get the first data, from jQuery
		var ctx = mycanvas.getContext("2d");
		var rawdata = $(".rawdata").get(0); //This get same as getElementById("mycanvas"), the zero means get the first data, from jQuery
		ctx.drawImage(rawdata,0,0,mycanvas.width, mycanvas.height); //Like on the old times on VB, it , image resource, start x, start y and width and height	
		var imgdata = ctx.getImageData(0,0, mycanvas.width, mycanvas.height);	
		for (var i = 0; i < imgdata.data.length; i+=4) {
			var r = imgdata.data[i];
			var g = imgdata.data[i+1];
			var b = imgdata.data[i+2];
			var a = imgdata.data[i+3];
			if(r >= 237 && r <=250){
				imgdata.data[i] = 0; // blue is set to 100%
				imgdata.data[i+1] = 0; // green is set to 100%
			}
		}
		ctx.putImageData(imgdata,0,0);
		
	});
});	