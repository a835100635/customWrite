
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.CWrite = factory());
})(this, (function () { 'use strict';

    class Base {
        constructor(options) {
            const { el, attr, lineWidth, strokeStyle, lineJoin } = options;
            if (!el || !(el instanceof HTMLElement)) {
                throw new Error('el 未传入”HTMLElement“类型元素');
            }
            this.el = el;
            this.attr = attr || {};
            this.lineWidth = lineWidth || 1;
            this.strokeStyle = strokeStyle || 'black';
            this.lineJoin = lineJoin || 'round';
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
            this.initEventAction();
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
        initEventAction() {
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
            const { ctx, lineWidth, strokeStyle, lastLocation, lineJoin } = this;
            const { x, y } = this.location(e);
            if (!ctx)
                return;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(lastLocation.x, lastLocation.y);
            ctx.lineTo(x, y);
            ctx.strokeStyle = strokeStyle;
            ctx.lineCap = "round";
            ctx.lineJoin = lineJoin;
            ctx.stroke();
            Object.assign(lastLocation, { x, y });
        }
        location(e) {
            const { left, top } = this.canvas.getBoundingClientRect();
            if (!e) {
                return {
                    x: left,
                    y: top
                };
            }
            const { clientX, clientY } = e;
            return {
                x: clientX - left,
                y: clientY - top
            };
        }
        clearRectAction() {
            var _a;
            let { width, height } = this.canvas.getBoundingClientRect();
            (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, width, height);
        }
        convertCanvasToImage() {
            return this.canvas.toDataURL('image/png');
        }
        refreshSize() {
            const { el, canvas, attr } = this;
            const { clientWidth, clientHeight } = el;
            const { width = 0, height = 0 } = attr;
            canvas.width = width || clientWidth;
            canvas.height = height || clientHeight;
        }
        resetOptionsAction(options) {
            for (const key of Object.keys(options)) {
                if (!(key in this))
                    return;
                Object.assign(this, {
                    [key]: options[`${key}`]
                });
            }
        }
        destroyedAction() {
            this.canvas.onmousedown = null;
            this.canvas.onmouseup = null;
            this.canvas.onmouseenter = null;
            this.canvas.onmouseleave = null;
            document.onmouseup = null;
        }
    }

    class CWrite extends Base {
        constructor(options) {
            super(options);
        }
        clearRect() {
            this.clearRectAction();
        }
        canvasToImage() {
            return this.convertCanvasToImage();
        }
        refresh() {
            this.refreshSize();
        }
        resetOptions(options) {
            this.resetOptionsAction(options);
        }
        initEvent() {
            this.initEventAction();
        }
        destroyed() {
            this.destroyedAction();
        }
    }

    return CWrite;

}));
