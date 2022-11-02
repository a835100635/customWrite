!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){"use strict";class t{constructor(t){const{el:n,attr:e,lineWidth:o}=t;if(this.options=t,!(n&&n instanceof HTMLElement))throw new Error("el 未传入”HTMLElement“类型元素");this.el=n,this.attr=e,this.lineWidth=o||10,this.lastLocation={x:0,y:0},this.isMouseDown=!1;const i=this.createEle();if(!i)throw new Error("创建canvas元素失败");this.canvas=i,this.ctx=i.getContext("2d"),this.initEvent()}createEle(){const{el:t,attr:n}=this,{clientWidth:e,clientHeight:o}=t,i=document.createElement("canvas");i.width=e,i.height=o;for(const t of Object.keys(n))i.setAttribute(t,`${n[t]}`);return t.appendChild(i),i}initEvent(){const{canvas:t}=this,n=this;t.onmousedown=function(e){e.preventDefault(),n.isMouseDown=!0;const{x:o,y:i}=n.location(e);Object.assign(n.lastLocation,{x:o,y:i}),t.onmousemove=function(t){t.preventDefault(),n.draw(t)}},t.onmouseup=function(e){e.preventDefault(),n.isMouseDown=!1,t.onmousemove=null},t.onmouseenter=function(t){const{x:e,y:o}=n.location(t);Object.assign(n.lastLocation,{x:e,y:o})},t.onmouseleave=function(t){},document.onmouseup=function(e){n.isMouseDown&&(n.isMouseDown=!1,t.onmousemove=null)}}draw(t){const{ctx:n,lineWidth:e,lastLocation:o}=this,{x:i,y:s}=this.location(t);n&&(n.lineWidth=e,n.beginPath(),n.moveTo(o.x,o.y),n.lineTo(i,s),n.strokeStyle="red",n.lineCap="round",n.lineJoin="round",n.stroke(),Object.assign(o,{x:i,y:s}))}location(t){const{left:n,top:e}=this.canvas.getBoundingClientRect();if(!t)return{x:n,y:e};const{clientX:o,clientY:i}=t;return{x:o-n,y:i-e}}clearRectAction(){var t;let{width:n,height:e}=this.options.attr||{};if(!n||!e){const t=this.canvas.getBoundingClientRect();n=t.width,e=t.height}null===(t=this.ctx)||void 0===t||t.clearRect(0,0,n,e)}}Object.assign(window,{CWrite:class extends t{constructor(t){super(t)}clearRect(){this.clearRectAction()}}})}));