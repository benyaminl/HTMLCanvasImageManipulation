$(function(){
    var canvas = $("#that").get(0);
    var rpil,gpil,bpil,btsR,btsG,btsG;
    rpil = 0; gpil = 0; bpil = 0;
    btsR = 144; btsG = 145; btsB = 131;
    var xget, yget, cCo, iData, sr, sg, sb;
    //Code Based on http://www.javascripter.net/faq/hextorgb.htm
    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
    //Code Based on http://www.javascripter.net/faq/hextorgb.htm
    
    $(".gambar").load(function(){
        var gambar = $(".gambar").get(0);
        var cContext = canvas.getContext("2d");
        canvas.width = gambar.width;
        canvas.height = gambar.height;
        cContext.drawImage(gambar,0,0,gambar.width, gambar.height);
        cCo = canvas.getContext("2d");
    });
    
    $("#cpik").change(function(){
        rpil = hexToR($(this).val());
        gpil = hexToG($(this).val());
        bpil = hexToB($(this).val());
    });
    
    $(".clear").click(function(){
        var gambar = $(".gambar").get(0);
        var cContext = canvas.getContext("2d");
        canvas.width = gambar.width;
        canvas.height = gambar.height;
        cContext.drawImage(gambar,0,0,gambar.width, gambar.height);
    });
    
    $("#that").click(function(event){
        var posX = event.offsetX;
        var posY = event.offsetY;
        getPickColor(posX,posY);
    });
    
    $(".gambarpil").click(function(){
        console.log($(this).attr("src"));
        $(".gambar").attr("src",$(this).attr("src"));
    });
    
    /*  Rekursive 2016 HTML Color Picker
        Benyamin Limanto
        Code works well when it's on somepart canvas that's not too big anyway
    */
    function bucketFloodFill(x,y){
        posData = ((x-1)*4) + ((4*canvas.width)*(y-1));
        iData.data[posData] = rpil;
        iData.data[posData+1] = gpil;
        iData.data[posData+2] = bpil;
        //Atas
        posData = ((x-1)*4) + ((4*canvas.width)*(y-2));
        r = iData.data[posData]; //Red
        g = iData.data[posData+1]; //Green
        b = iData.data[posData+2]; //Blue
        if ((r > btsR || g > btsG || b > btsG )&&(r != rpil || g != gpil || b != bpil)){
            bucketFloodFill(x,y-1);
        }
        //Bawah
        posData = ((x-1)*4) + ((4*canvas.width)*y);
        r = iData.data[posData]; //Red
        g = iData.data[posData+1]; //Green
        b = iData.data[posData+2]; //Blue
        if ((r > btsR || g > btsG || b > btsG )&&(r != rpil || g != gpil || b != bpil)){
            bucketFloodFill(x,y+1);
        }
        //Kiri
        posData = ((x-2)*4) + ((4*canvas.width)*(y-1));
        r = iData.data[posData]; //Red
        g = iData.data[posData+1]; //Green
        b = iData.data[posData+2]; //Blue
        if ((r > btsR || g > btsG || b > btsG )&&(r != rpil || g != gpil || b != bpil)){
            bucketFloodFill(x-1,y);
        }
        //Kanan
        posData = (x*4) + ((4*canvas.width)*(y-1));
        r = iData.data[posData]; //Red
        g = iData.data[posData+1]; //Green
        b = iData.data[posData+2]; //Blue
        if ((r > btsR || g > btsG || b > btsG )&&(r != rpil || g != gpil || b != bpil)){
            bucketFloodFill(x+1,y);
        }
    }
    /* A Code from http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
        Since my code works well but this's suck that JS doesn't support recursion too much because of this
        Reffering to this.. http://programmers.stackexchange.com/questions/179863/performance-recursion-vs-iteration-in-javascript
        JS doesn't support tail recursion optimazation
    */
    
    function matchStartColor(pixelPos)
    {
      var r = iData.data[pixelPos];	
      var g = iData.data[pixelPos+1];	
      var b = iData.data[pixelPos+2];

      return (r == sr && g == sg && b == sb);
    }

    function colorPixel(pixelPos)
    {
      iData.data[pixelPos] = rpil;
      iData.data[pixelPos+1] = gpil;
      iData.data[pixelPos+2] = bpil;
    }
    
    function wmBucket(startX,startY){
        pixelStack = [[startX, startY]];
        while(pixelStack.length)
        {
            var newPos, x, y, pixelPos, reachLeft, reachRight;
            newPos = pixelStack.pop();
            x = newPos[0];
            y = newPos[1];

            pixelPos = (y*canvas.width + x) * 4;
            while(y-- >= 0 && matchStartColor(pixelPos))
            {
                pixelPos -= canvas.width * 4;
            }
            pixelPos += canvas.width * 4;
            ++y;
            reachLeft = false; // Kanan
            reachRight = false; // Kiri
            while(y++ < canvas.height-1 && matchStartColor(pixelPos))
            {
                colorPixel(pixelPos);

                if(x > 0)
                {
                    if(matchStartColor(pixelPos - 4))
                    {
                        if(!reachLeft){
                            pixelStack.push([x - 1, y]);
                            reachLeft = true;
                        }
                    }
                    else if(reachLeft)
                    {
                        reachLeft = false;
                    }
                }

                if(x < canvas.width-1)
                {
                    if(matchStartColor(pixelPos + 4))
                    {
                        if(!reachRight)
                        {
                            pixelStack.push([x + 1, y]);
                            reachRight = true;
                        }
                    }
                    else if(reachRight)
                    {
                        reachRight = false;
                    }
                }
                pixelPos += canvas.width * 4;
            }
        }
        cCo.putImageData(iData, 0, 0);
    }
    /*
        end of William Malone Code. Licensed with MIT Licensed.
        I still consider to port my recursion to iteration in meanwhile
    */
    function getPickColor(startX,startY){
        iData = cCo.getImageData(startX,startY,1,1);
        //Cek apakah hitam tidak di awal, mengurangi percabangan
        if (iData.data[0] > btsR || iData.data[1] > btsG || iData.data[2] > btsB){
            sr = iData.data[0]; sg = iData.data[1]; sb = iData.data[2];
            iData = cCo.getImageData(0,0,canvas.width, canvas.height);
            wmBucket(startX,startY);
        }
            /*bucketFloodFill(startX,startY);
            cCo.putImageData(iData,0,0);
        }*//*
        else{
            console.log("Gagal");
        }*/
    }
    /*
        Created by Ken Fyrstenberg Nilsen / Epistemex.com
        License: CC3.0-Attr.
    */
    function drawTrapezoid(ctx, img, x, y, w, h, factor) {
        var startPoint = x + w * 0.5 * (factor*0.01),
            xi, yi, scale = img.height / h,
            startLine = y,
            endLine = y + h;

        for(; y < endLine; y++) {
            
            xi = interpolate(startPoint, x, (y - startLine) / h);
            yi = (y * scale + 0.5)|0;
            ctx.drawImage(img, 0, yi, img.width, 1, xi, y, w - xi * 2, 1);
        }
        
        function interpolate(x1, x2, t) {
            return x1 + (x2 - x1) * t;
        }
    }

    
    /*
        Start With the Simulation of Room
        16 May 2016
    */
    
    $("#sim").click(function(){
        $("#temp").attr({"width" : 500,
        "height" : 300});
        var tcanvas = $("#temp").get(0);
        var tctx = tcanvas.getContext("2d");
        //Simulate from Up Tiles - Dari atas dilihatnya
        for(var i = 1; i<=11; i++){//Untuk Kolom
            for(var j = 1; j<=9; j++){//Baris
                tctx.drawImage(canvas,((i-1)*50),((j-1)*50),50,50);
            }   
        }
        //make it trapezoid
        $("#trap").attr({"width" : 500,
        "height" : 300});
        var tsrc = $("#trap").get(0);
        var trapctx = tsrc.getContext("2d");
        trapctx.transform(1,0,0.25,1,0,0);
        drawTrapezoid(trapctx,tcanvas,0,0,500,300,60);
        //Diambil taruh di hasil simulasi
        var hsim = $("#hsim").get(0);
        var hctx = hsim.getContext("2d");
        hctx.clearRect(0, 0, hsim.width, hsim.height);
        hctx.drawImage(tsrc,-200,140,800,160);
        var tambahan = $("#coba1").get(0);
        hctx.drawImage(tambahan,0,0,500,300);
        //Export to IMG biasa karena biasa blank ga jelas...
        var dataurl = hsim.toDataURL();
        $("#himg").attr({"src":dataurl,
                        "width":500,
                        "height":300});
    });
    
    $("#skew").click(function(){
        var trapctx = $("#trap").get(0).getContext("2d");
        var tcanvas = $("#temp").get(0);
        var tctx = tcanvas.getContext("2d");
        trapctx.clearRect(0, 0, canvas.width, canvas.height);
        trapctx.transform(1,0,0.1,1,0,0);
        drawTrapezoid(trapctx,tcanvas,0,0,500,300,60);
    });
    
    $("#coba2").click(function(){
        $("#temp").attr({"width" : 500,
        "height" : 300});
        var tcanvas = $("#temp").get(0);
        var tctx = tcanvas.getContext("2d");
        //Simulate from Up Tiles - Dari atas dilihatnya
        for(var i = 1; i<=20; i++){//Untuk Kolom
            for(var j = 1; j<=20; j++){//Baris
                tctx.drawImage(canvas,((i-1)*70),((j-1)*40),70,40);
            }   
        }
        //make it trapezoid
        $("#trap").attr({"width" : 500,
        "height" : 300});
        var tsrc = $("#trap").get(0);
        var trapctx = tsrc.getContext("2d");
        trapctx.transform(1,0,0.6,1,-230,30);
        trapctx.rotate((-18)*Math.PI/180);
        trapctx.transform(1,0.2,1.1,1,0,0);
        //trapctx.rotate((-18)*Math.PI/180);
        trapctx.drawImage(tcanvas,-20,50,550,340);
        //Diambil taruh di hasil simulasi
        var hsim = $("#hsim").get(0);
        var hctx = hsim.getContext("2d");
        hctx.clearRect(0, 0, hsim.width, hsim.height);
        hctx.drawImage(tsrc,0,160,510,210);
        var tambahan = $(this).get(0);
        hctx.drawImage(tambahan,0,0,500,300);
        //Export to IMG biasa karena biasa blank ga jelas...
        var dataurl = hsim.toDataURL();
        $("#himg").attr({"src":dataurl,
                        "width":500,
                        "height":300});
    });

    $("#coba3").click(function (e) { 
        $("#temp").attr({"width" : 500,
        "height" : 300});
        var tcanvas = $("#temp").get(0);
        var tctx = tcanvas.getContext("2d");
        //Simulate from Up Tiles - Dari atas dilihatnya
        for(var i = 1; i<=11; i++){//Untuk Kolom
            for(var j = 1; j<=9; j++){//Baris
                tctx.drawImage(canvas,((i-1)*50),((j-1)*50),50,50);
            }   
        }
        //make it trapezoid
        $("#trap").attr({"width" : 500,
        "height" : 300});
        var tsrc = $("#trap").get(0);
        var trapctx = tsrc.getContext("2d");
        trapctx.transform(1,0,0.1,1,0,0);
        drawTrapezoid(trapctx,tcanvas,0,0,500,300,60);
        //Diambil taruh di hasil simulasi
        var hsim = $("#hsim").get(0);
        var hctx = hsim.getContext("2d");
        hctx.clearRect(0, 0, hsim.width, hsim.height);
        hctx.drawImage(tsrc,-100,140,800,160);
        var tambahan = $(this).get(0);
        hctx.drawImage(tambahan,0,0,500,300);
        //Export to IMG biasa karena biasa blank ga jelas...
        var dataurl = hsim.toDataURL();
        $("#himg").attr({"src":dataurl,
                        "width":500,
                        "height":300});
    });
});