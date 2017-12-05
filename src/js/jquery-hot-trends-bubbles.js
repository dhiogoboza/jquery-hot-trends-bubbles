/**
 * Created by dhiogoboza on 30/11/17.
 * Available at: https://github.com/dhiogoboza/jquery-hot-trends-bubbles
 * A jQuery plugin to display bubbles with sizes relative to topics relevance.
 */

(function ($) {
    
    $.fn.hotTrendsBubbles = function (options) {
        var settings = $.extend({
            data: null,
            key: "name",
            value: "value",
            minSize: 100
        }, options );
        
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function getRandom(min, max) {
            return Math.random() * (max - min + 1) + min;
        }
        
        return this.each(function() {
            var $this = $(this);
            var $container;
            var bubbles = [];
            
            var mainCanvas;
            
            function moveBubbles() {
                var context = mainCanvas.getContext("2d");
                var width = mainCanvas.width;
                var height = mainCanvas.height;
                
                context.clearRect(0, 0, width, height);
                
                var bubble;
                for (var i = 0; i < bubbles.length; i++) {
                    bubble = bubbles[i]
                    temp = bubble.x + bubble.dx;
                    
                    if (temp < bubble.radius || temp > bubble.limitx) {
                        bubble.dx *= -1;
                    } else {
                        bubble.x = temp;
                    }
                    
                    bubble.y += bubble.dy;
                    temp = bubble.y + bubble.dy;
                    
                    if (temp < bubble.radius || temp >  bubble.limity) {
                        bubble.dy *= -1;
                    } else {
                        bubble.y = temp;
                    }
                    
                    drawBubble(context, bubble)
                }
            }
            
            function checkCollisions(x, y, radius) {
                var collisions = 0;
                var a, _x, _y, d;
                for (var i = 0; i < bubbles.length; i++) {
                    a = radius + bubbles[i].radius;
                    _x = Math.abs(x - bubbles[i].x);
                    _y = Math.abs(y - bubbles[i].y);
                    d = Math.sqrt((_x * _x) + (_y * _y));
                    if (a > d) {
                        collisions++;
                    }
                }
                
                return collisions;
            }
            
            function drawBubble(context, bubble) {
                context.beginPath();
                context.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI, false);
                context.fillStyle = 'green';
                context.fill();
                context.lineWidth = 3;
                context.strokeStyle = '#003300';
                context.stroke();
                
                context.fillStyle = '#FFFFFF';
                context.fillText(bubble.text.str, bubble.x + bubble.text.x, bubble.y + bubble.text.y);
            }
            
            function initDom() {
                var width = $this.width();
                var height = $this.height();
                var len = settings.data.length;
                
                var greatterBubble = (width < height? width : height) * 0.30;
                
                $container = $("<div/>")
                        .addClass("htb-container");
                
                $this.empty();
                $this.append($container);
                
                var $canvas = $("<canvas />")
                        .attr("id", "mainCanvas")
                        .attr("width", width)
                        .attr("height", height);
                
                $container.append($canvas);
                
                mainCanvas = document.getElementById("mainCanvas");
                
                var context = mainCanvas.getContext("2d");
                context.font = "14px Arial";
                
                var max = 0;
                var i, current;
                
                for (i = 0; i < len; i++) {
                    current = settings.data[i][settings.value];
                    if (current > max) {
                        max = current;
                    }
                }
                
                var radius, size, left, top, text, bubble, collisions, c, tleft, ttop, j;
                bubbles = [];
                for (i = 0; i < len; i++) {
                    current = settings.data[i];
                    
                    size = settings.minSize + (current[settings.value] / max) * (greatterBubble);
                    radius = (size / 2);
                    
                    text = current[settings.key]
                    
                    textMeasure = context.measureText(text);
                    collisions = 999;
                    for (j = 0; j < 10; j++) {
                        tleft = getRandomInt(size, width - size);
                        ttop = getRandomInt(size, height - size);
                        
                        c = checkCollisions(tleft, ttop, radius);
                        
                        if (c < collisions) {
                            collisions = c;
                            left = tleft;
                            top = ttop;
                        }
                        
                        if (c == 0) {
                            break;
                        }
                    }
                    
                    bubble = {
                        "radius": radius,
                        "radius2": size,
                        "x": left,
                        "y": top,
                        "limitx": width - radius,
                        "limity": height - radius,
                        "dx": getRandom(-0.5, 0.5),
                        "dy": getRandom(-0.5, 0.5),
                        "text": {
                            "str": text,
                            "x": -(textMeasure.width / 2),
                            "y": 0,
                        }
                    }
                    
                    drawBubble(context, bubble);
                    bubbles.push(bubble);
                }
                
                setInterval(moveBubbles, 100);
            }
                       
            function initEvents() {
                
            }
            
            initDom();
            initEvents();
        });
    };
})(jQuery);
