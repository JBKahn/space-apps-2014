/*global $, requestAnimationFrame, window*/
var $clock, Clock, browserRaf, canceled, clock, targetTime,
    __bind = function (fn, me) {
        "use strict";
        return function () {
            return fn.apply(me, arguments);
        };
    };

Clock = (function () {
    "use strict";
    Clock.prototype.ctx = null;

    Clock.prototype.raf = null;

    Clock.prototype.canvasHeight = 0;

    Clock.prototype.canvasWidth = 0;

    Clock.prototype.centerX = 0;

    Clock.prototype.centerY = 0;

    Clock.prototype.milliDirection = false;

    Clock.prototype.date = null;

    function Clock($context) {
        this.$context = $context;
        this.animate = __bind(this.animate, this);
        this.ctx = $context.get(0).getContext("2d");
        this.canvasHeight = this.$context.height();
        this.canvasWidth = this.$context.width();
        this.centerX = this.canvasWidth / 2;
        this.centerY = this.canvasHeight / 2;
        this.animate();
        return;
    }

    Clock.prototype.animate = function () {
        var radians, shouldChange, time;
        this.$context[0].height = this.canvasHeight;
        this.$context[0].width = this.canvasWidth;
        time = this.getTimeObj();
        radians = this.getRadians(time);
        if (this.min !== time.seconds) {
            shouldChange = true;
            this.min = time.seconds;
        } else {
            shouldChange = false;
        }
        if (this.startAngle1 <= 3.9) {
            this.startAngle1 = null;
        }
        this.startAngle1 = this.drawCircle(230, 10, radians.milliRad, false, this.startAngle1, 0.01, "#96CDCD", shouldChange, true);
        this.startAngle2 = this.drawCircle(210, 10, radians.minutesRad, false, this.startAngle2, 1.1, "#ff6666", shouldChange, false);
        this.startAngle3 = this.drawCircle(190, 10, radians.hoursRad, false, this.startAngle3, 0.5, "#60ec58", shouldChange, false);
        this.printTime(time);
        this.raf = requestAnimationFrame(this.animate);
        return this.raf;
    };

    Clock.prototype.drawCircle = function(radius, width, endAngle, direction, startAngle, variance, color, shouldChange, strictlyDecrease) {
        var x, y;
        direction = 1;
        endAngle = 3;
        x = 0;
        y = 0;
        if (startAngle === null) {
            startAngle = 5 + Math.random() * variance;
        }
        if (shouldChange) {
            if (strictlyDecrease) {
                startAngle = startAngle - Math.random() * variance;
            } else {
                startAngle = 5 + Math.random() * variance;
            }
        }

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color;
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(-90 * (Math.PI / 180));
        this.ctx.arc(x, y, radius, startAngle, endAngle, 1);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        return startAngle;
    };

    Clock.prototype.getTimeObj = function () {
        var date, time;
        date = new Date();
        time = {
            milliseconds: date.getMilliseconds(),
            seconds: date.getSeconds(),
            minutes: date.getMinutes(),
            hours: date.getHours()
        };
        return time;
    };

    Clock.prototype.getRadians = function (time) {
        var hours, hoursDegrees, hoursRadians, milliDegrees, milliRadians, minutesDegrees, minutesRadians;
        milliDegrees = this.map(time.milliseconds, 0, 1000, 0, 360);
        milliRadians = (milliDegrees * Math.PI) / 180;
        minutesDegrees = this.map(time.minutes, 0, 60, 0, 360);
        minutesRadians = (minutesDegrees * Math.PI) / 180;
        hours = time.hours;
        if (hours > 12) {
            hours -= 12;
        }
        hoursDegrees = this.map(hours, 0, 12, 0, 360);
        hoursRadians = (hoursDegrees * Math.PI) / 180;
        this.angles = {
            milliRad: milliRadians,
            milliDeg: milliDegrees,
            minutesRad: minutesRadians,
            minutesDeg: minutesDegrees,
            hoursRad: hoursRadians,
            hoursDeg: hoursDegrees
        };
        return this.angles;
    };

    Clock.prototype.printTime = function (time) {
        var hours, minutes, seconds, textWidth, timeStr;
        hours = time.hours < 10 ? "0" + time.hours : time.hours;
        minutes = time.minutes < 10 ? "0" + time.minutes : time.minutes;
        seconds = time.seconds < 10 ? "0" + time.seconds : time.seconds;
        timeStr = String(hours) + " " + minutes + " " + seconds;
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "14px Verdana";
        textWidth = this.ctx.measureText(timeStr);
        return this.ctx.fillText(timeStr, this.centerX - textWidth.width / 2, this.centerY + 7);
    };

    Clock.prototype.map = function (value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    };

    return Clock;

})();

$(document).ready(function () {
    $clock = $("#clock");

    clock = new Clock($clock);

    (function () {
        "use strict";
        var vendor, _i, _len, _ref;
        _ref = ['ms', 'moz', 'webkit', 'o'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            vendor = _ref[_i];
            if (window.requestAnimationFrame) {
                break;
            }
            window.requestAnimationFrame = window[String(vendor) + "RequestAnimationFrame"];
        }
        window.cancelAnimationFrame = window[String(vendor) + "CancelAnimationFrame"] || window[String(vendor) + "CancelRequestAnimationFrame"];
        return window.cancelAnimationFrame;
    })();

    if (window.requestAnimationFrame) {
        if (!(window.cancelAnimationFrame)) {
            browserRaf = window.requestAnimationFrame;
            canceled = {};
            window.requestAnimationFrame = function (callback) {
                "use strict";
                var id;
                id = browserRaf(function (time) {
                    if (id in canceled) {
                        return delete canceled[id];
                    }
                    return callback(time);
                });
                return id;
            };
            window.cancelAnimationFrame = function (id) {
                "use strict";
                canceled[id] = true;
                return true;
            };
        }
    } else {
        targetTime = 12230;
        window.requestAnimationFrame = function (callback) {
            "use strict";
            var currentTime;
            targetTime = Math.max(targetTime + 12, currentTime = +(new Date));
            return window.setTimeout(
                (function () {
                    return callback(+(new Date));
                }),
                targetTime - currentTime
            );
        };
        window.cancelAnimationFrame = function (id) {
            "use strict";
            return clearTimeout(id);
        };
    }
});