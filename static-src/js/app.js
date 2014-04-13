/*global $, requestAnimationFrame, window, document, Image*/
var $vitals, Vitals, vitals, $infoBox, InfoBox, infoBox,
    __bind = function (fn, me) {
        "use strict";
        return function () {
            return fn.apply(me, arguments);
        };
    };

Vitals = (function () {
    "use strict";
    Vitals.prototype.context = null;
    Vitals.prototype.startAngle1 = null;
    Vitals.prototype.startAngle2 = null;
    Vitals.prototype.startAngle3 = null;
    Vitals.prototype.canvasHeight = 0;
    Vitals.prototype.canvasWidth = 0;
    Vitals.prototype.centerX = 0;
    Vitals.prototype.centerY = 0;

    function Vitals($context) {
        this.$context = $context;
        this.animate = __bind(this.animate, this);
        this.context = $context.get(0).getContext("2d");
        this.canvasHeight = this.$context.height();
        this.canvasWidth = this.$context.width();
        this.centerX = 60;
        this.centerY = 265;
        setInterval(this.animate, 130);
        return;
    }

    Vitals.prototype.animate = function () {
        this.$context[0].height = this.canvasHeight;
        this.$context[0].width = this.canvasWidth;

        if (this.startAngle1 >= 1.56) {
            this.startAngle1 = null;
        }
        this.startAngle1 = this.drawVital(230, 25, 1, this.startAngle1, 0.005, "#00ff66", true, '/static/images/o2_360.png', 15);
        this.startAngle2 = this.drawVital(190, 25, 1, this.startAngle2, 0.25, "#ffea00", false, '/static/images/energy_360.png', 55);
    };

    Vitals.prototype.drawVital = function (radius, width, direction, midValue, variance, color, strictlyDecrease, image_path, image_height_offset) {
        midValue = this.drawCircle(radius, width, direction, midValue, 0, variance, color, strictlyDecrease, false, image_path, image_height_offset);
        this.drawCircle(radius, width, direction, 1.570796326797, midValue, variance, color, strictlyDecrease, true, null, null);
        return midValue;
    };

    Vitals.prototype.drawCircle = function (radius, width, direction, startAngle, endAngle, variance, color, strictlyDecrease, invert, image_path, image_height_offset) {
        var x, y, imageObj, time, minutes, hour;
        x = 0;
        y = 0;
        if (!invert) {
            if ((startAngle === "undefined" || startAngle === null) || !strictlyDecrease) {
                startAngle = 0.58 - Math.random() * variance;
            } else {
                startAngle = startAngle + Math.random() * variance;
            }
        }

        this.context.save();
        if (image_path) {
            imageObj = new Image();
            imageObj.src = image_path;
            this.context.drawImage(imageObj, this.centerX - 50, image_height_offset);
        }

        if (invert) {
            this.context.globalAlpha = 0.8;
        } else {
            this.context.globalAlpha = 0.3;
        }

        time = new Date();
        minutes = time.getMinutes();
        hour = time.getHours();

        this.context.font = "bold 40px Georgia white";
        this.context.fillStyle = "#FFF";
        this.context.fillText(String(hour) + ":" + String(minutes), 60, 230);

        imageObj = new Image();
        imageObj.src = "/static/images/clock_360.png";
        this.context.drawImage(imageObj, this.centerX - 50, 200);

        this.context.beginPath();
        this.context.shadowColor   = color;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.shadowBlur    = 45;

        this.context.lineWidth = width;
        this.context.strokeStyle = color;
        this.context.translate(this.centerX, this.centerY);
        this.context.rotate(-90 * (Math.PI / 180));
        this.context.arc(x, y, radius, startAngle, endAngle, direction);
        this.context.stroke();
        this.context.closePath();
        this.context.restore();
        return startAngle;
    };

    return Vitals;

})();

$(document).ready(function () {
    "use strict";
    $vitals = $("#vitals");

    vitals = new Vitals($vitals);

    var topRightPaths = [[30, 0], [350, 0], [350, 130], [100, 130], [30, 80]],
        bottomRightPaths = [[30, 30], [350, 30], [350, 150], [100, 150], [30, 100]];

    var drawSidePoly = function (paths, boxId) {
        var c2 = document.getElementById(boxId).getContext('2d');
        c2.globalAlpha = 0.6;
        c2.shadowColor   = "#00c0ff";
        c2.shadowOffsetX = 0;
        c2.shadowOffsetY = -6;
        c2.shadowBlur    = 45;
        c2.fillStyle = '#00c0ff';
        c2.beginPath();
        c2.moveTo(paths[0][0], paths[0][1]);
        var path_length = paths.length;
        var i, path;
        for (i = 1; i < path_length; i = i + 1) {
            path = paths[i];
            c2.lineTo(path[0], path[1]);

        }
        c2.fill();
        c2.closePath();
    };
    drawSidePoly(topRightPaths, 'infoBoxTopRight');
    drawSidePoly(bottomRightPaths, 'infoBoxBottomRight');

});