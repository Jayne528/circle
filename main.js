
$(document).ready(function () {

    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");
    canvas.attr("width",$(window).get(0).innerWidth);
    canvas.attr("height",$(window).get(0).innerHeight);
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();

    //設定按鈕------------------------------------------------

    var playAnimation = true;

    var startButton = $("#startAnimation");
    var stopButton = $("#stopAnimation");
    
    startButton.hide();
    startButton.click(function() {
        $(this).hide();
        stopButton.show();

        playAnimation = true;
        animate();
    });

    stopButton.click(function() {
        $(this).hide();
        startButton.show();

        playAnimation = false;
    });
    


    var canvasX= canvasWidth/2;      //canvas X 起始位置
    var canvasY = canvasHeight/2;   //canvas Y 起始位置
    var Radius = 150;                	//大球的半徑
    var LandscapeBallNum = 360 / 20;        // 横向小球數量
    // PortraitBallNum = 360 / 20;     // 縱向小球數量
    var angleX = Math.PI/100;
    var angleY = Math.PI/100;
 


    function rotateX(){
        var cos = Math.cos(angleX);
        var sin = Math.sin(angleX);

        for(var i=0;i<balls.length;i++){

            var y1 = balls[i].y;
            var z1 = balls[i].z;

            balls[i].y = y1 * cos - z1 * sin;
            balls[i].z = z1 * cos + y1 * sin;

        }
    }

    function rotateY(){
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);

        for(var i=0;i<balls.length;i++){

            var x1 = balls[i].x;
            var z1 = balls[i].z;

            balls[i].x = x1 * cos - z1 * sin;
            balls[i].z = z1 * cos + x1 * sin;

        }
    }

    function rotateZ(){
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);

        for(var i=0;i<balls.length;i++){

            var x1 = balls[i].x;
            var y1 = balls[i].y;

            balls[i].x = x1 * cos - y1 * sin;
            balls[i].y = y1 * cos + x1 * sin;

        }
    }

 
    var ballLine = function (radius, z) {
        this.radius = radius;
        this.x = 0;
        this.y = 0;
        this.z = z;
    }

    var ballLines = new Array();

    var lineNumber = LandscapeBallNum / 2;     
    for (var i = 0; i <=lineNumber; i++) {
        
        for (var j = -1; j <2; j++) {
            if (j == 0) {
                continue ;
            }
            var num = i;
            var z = j;

            var radius = Math.sqrt(Math.pow(Radius,2) - Math.pow(Radius * Math.cos(num * Math.PI * 1 / LandscapeBallNum), 2));

            console.log(Math.cos(num * Math.PI * 2 / LandscapeBallNum))

            ballLines.push(new ballLine(radius, z));
        }
    }

    console.log(ballLines)

    // function draw() {
   
    //     var number = LandscapeBallNum;
    //     for(var i = 0; i <=number; i++) {
    //         context.beginPath();
    //         context.arc(canvasX, canvasY, ballLines[i].radius , 0, 2*Math.PI, true);
    //         context.strokeStyle = "#FFF";
    //         context.stroke();
    //     }
    // }
    // draw();

    var ball = function(x , y , z , r){
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
    }

    var balls = new Array();
        var num = ballLines.length;
    for(var i=0; i<num; i++){
        for(var j=0; j<num; j++){
            var angle =  2 * Math.PI / num * (i+j);
            var x = ballLines[i].radius* Math.cos(angle);
            var y = ballLines[i].radius* Math.sin(angle);
            var z = ballLines[i].z ;                     //差別
            var r = 2;

            console.log(Math.sqrt(Math.pow(Radius, 2) - Math.pow(ballLines[i].radius, 2)))
            balls.push(new ball(x, y, z, r));
        }
    }

    console.log(balls)


    function animate(){


        context.clearRect(0,0,canvasWidth , canvasHeight);
        rotateX();
        rotateY();
        rotateZ();

        for(var i=0;i<balls.length;i++){
            var fl = 450 //焦距
            context.beginPath();
            var scale = fl / (fl - balls[i].z);
            context.arc(canvasX + balls[i].x, canvasY + balls[i].y, balls[i].r*scale , 0 , 2*Math.PI , true);
            context.fillStyle = "rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+"0."+Math.floor(Math.random()*9)+")";
            context.fill();
        }

        if (playAnimation) {
            window.requestAnimationFrame(animate);
        }

    }

    animate();

});

