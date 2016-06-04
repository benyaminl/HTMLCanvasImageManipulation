/*
					Benyamin Limanto
	Manipulating Image, Project for Madana Web Tiles
	Based on my Thoughts, Under survilance of my Boss :v
					Robert William :p
	Using Canvas for 1st time anyway, It's interesting
	
	Since It's using HTML Canvas, so It doesn't support cross domain image fetch,
	so you need to change your image into a 
*/

var rpil, gpil, bpil, bayangan, domBayangan; // Warna yang user pilih untuk merubah warna itu
var rget, gget, bget; // Warna yang select oleh user, dari bayangan
rpil = 200; gpil = 100; bpil = 250;
$(function(){
	$(".tog").click(function(){
		$(".test").toggle();
	});
	// CSS is sucks, using css is scalling the real width and height, so it will cause chaos
	// http://stackoverflow.com/questions/15793702/drawing-image-on-canvas-larger-than-real
	$("#mycanvas").attr({"width" : $(".rawdata").width(),"height" : $(".rawdata").height()});
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
		var color = $('.hasil')[0]; var color2 = $('.hasil2')[0];
		function pick(event) {
			var x = event.layerX;
			var y = event.layerY;
			var pixel = bctx.getImageData(x, y, 1, 1);
			var data = pixel.data;
			var rgba = 'rgba(' + data[0] + ',' + data[1] +
					 ',' + data[2] + ',' + data[3] + ')';
			rget = data[0]; gget = data[1]; bget = data[2];
			color.textContent =  rgba;
			color.style.background = rgba;
			var rgba = 'rgba(' + rpil + ',' + bpil +
			',' + gpil + ',' + 255 + ')';
			color2.textContent =  rgba;
			color2.style.background = rgba;
			//------------------------------
			var mycanvas = $("#mycanvas").get(0);
			var chasil = mycanvas.getContext("2d");
			var imgdata = chasil.getImageData(0,0, mycanvas.width, mycanvas.height);
			var bdata = bctx.getImageData(0,0,mycanvas.width, mycanvas.height);
			for (var i = 0; i < imgdata.data.length; i+=4) {
				var r = bdata.data[i];
				var g = bdata.data[i+1];
				var b = bdata.data[i+2];
				var a = bdata.data[i+3];
				if(r == rget && g == gget && b == bget){
					imgdata.data[i] = rpil; // red
					imgdata.data[i+1] = gpil; // green
					imgdata.data[i+2] = bpil; // blue
				}
			}
			chasil.putImageData(imgdata,0,0);
		}
		mycanvas.addEventListener('click',pick); // jQuery is messing with my code, the dom selector is not working properly and I don't know why, it's sucks, so I decided to rollback to Javascript		
		
		domBayangan = $("<canvas></canvas>").addClass("bayangan");
		$("body").append(domBayangan);
		$(".bayangan").css("display","none");
		bayangan = $(".bayangan").get(0); bctx = bayangan.getContext("2d");
		bctx.drawImage(rawdata,0,0,mycanvas.width,mycanvas.height);
	});	
	
	$(".colorset .child").click(function(){
		rpil = $(this).attr("r");
		gpil = $(this).attr("g");
		bpil = $(this).attr("b");
		var color2 = $('.hasil2')[0];
		var rgba = 'rgba(' + rpil + ',' + gpil +
			',' + bpil + ',' + 255 + ')';
			color2.textContent =  rgba;
			color2.style.background = rgba;
	});
});	