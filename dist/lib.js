
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    class Base {
        constructor(options) {
            const { el, attr, lineWidth } = options;
            if (!el || !(el instanceof HTMLElement)) {
                throw new Error('el 未传入”HTMLElement“类型元素');
            }
            this.el = el;
            this.attr = attr;
            this.lineWidth = lineWidth || 10;
            this.lastLocation = {
                x: 0,
                y: 0
            };
            this.isMouseDown = false;
            const canvas = this.createEle();
            if (!canvas) {
                throw new Error('创建canvas元素失败');
            }
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.initEvent();
        }
        createEle() {
            const { el, attr } = this;
            const { clientWidth, clientHeight } = el;
            const can = document.createElement('canvas');
            can.width = clientWidth;
            can.height = clientHeight;
            for (const key of Object.keys(attr)) {
                can.setAttribute(key, `${attr[key]}`);
            }
            el.appendChild(can);
            return can;
        }
        initEvent() {
            const { canvas } = this;
            const self = this;
            canvas.onmousedown = function (e) {
                e.preventDefault();
                self.isMouseDown = true;
                const { x, y } = self.location(e);
                Object.assign(self.lastLocation, { x, y });
                canvas.onmousemove = function (e) {
                    e.preventDefault();
                    self.draw(e);
                };
            };
            canvas.onmouseup = function (e) {
                e.preventDefault();
                self.isMouseDown = false;
                canvas.onmousemove = null;
            };
            canvas.onmouseenter = function (e) {
                const { x, y } = self.location(e);
                Object.assign(self.lastLocation, { x, y });
            };
            canvas.onmouseleave = function (e) {
            };
            document.onmouseup = function (e) {
                if (self.isMouseDown) {
                    self.isMouseDown = false;
                    canvas.onmousemove = null;
                }
            };
        }
        draw(e) {
            const { ctx, lineWidth, lastLocation } = this;
            const { x, y } = this.location(e);
            if (!ctx)
                return;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(lastLocation.x, lastLocation.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'red';
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
            Object.assign(lastLocation, { x, y });
        }
        location(e) {
            const { clientX, clientY } = e;
            const { left, top } = this.canvas.getBoundingClientRect();
            return {
                x: clientX - left,
                y: clientY - top
            };
        }
    }
    class CWrite extends Base {
        constructor(options) {
            super(options);
            this.init();
        }
        init() {
            return {};
        }
    }
    Object.assign(window, {
        CWrite
    });

}));
