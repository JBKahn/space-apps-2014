/*global $, requestAnimationFrame, window, document*/
var $vitals, Vitals, vitals,
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
        this.centerX = this.canvasWidth / 2;
        this.centerY = this.canvasHeight / 2;
        setInterval(this.animate, 130);
        return;
    }

    Vitals.prototype.animate = function () {
        this.$context[0].height = this.canvasHeight;
        this.$context[0].width = this.canvasWidth;

        if (this.startAngle1 <= 0.01) {
            this.startAngle1 = null;
        }
        this.startAngle1 = this.drawCircle(230, 25, 1, this.startAngle1, 0.005, "#96CDCD", true);
        this.startAngle2 = this.drawCircle(210, 25, 1, this.startAngle2, 0.25, "#ff6666", false);
    };

    Vitals.prototype.drawCircle = function (radius, width, direction, startAngle, variance, color, strictlyDecrease) {
        var x, y, endAngle;
        endAngle = 0;
        x = 0;
        y = 0;
        if ((startAngle === "undefined" || startAngle === null) || !strictlyDecrease) {
            startAngle = 0.98 + Math.random() * variance;
        } else {
            startAngle = startAngle - Math.random() * variance;
        }

        this.context.save();
        this.context.beginPath();
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
});