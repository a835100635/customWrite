type EleType = HTMLElement;
type LineWidthType = number;
type StrokeStyleType = string | CanvasGradient | CanvasPattern;
type LineJoinType = CanvasLineJoin;

type Canvas2dType = CanvasRenderingContext2D;
type CtxType = Canvas2dType | null;

interface AttrType {
  [key: string]: string | number | boolean;
}

type LocationType = {
  x: number;
  y: number;
}

export interface OptionsType {
  el: EleType;
  attr?: AttrType;
  lineWidth?: LineWidthType;
  strokeStyle?: StrokeStyleType;
  lineJoin?: LineJoinType
}

export interface RestOptionsType {
  [key: string]: string | number | boolean | AttrType;
}

class Base {
  // 挂载元素
  protected el: EleType;
  // 元素属性
  protected attr: AttrType;
  // canvas 元素
  protected canvas: HTMLCanvasElement;
  // canvas 2d 实例
  protected ctx: CtxType;
  // 线条宽度
  protected lineWidth: LineWidthType;
  // 线条颜色
  protected strokeStyle: StrokeStyleType;
  protected lineJoin: LineJoinType;
  // 鼠标移动最后的位置
  protected lastLocation: LocationType;

  // 鼠标是否被按下
  protected isMouseDown: Boolean;

  constructor(options: OptionsType) {
    const { el, attr, lineWidth, strokeStyle, lineJoin } = options;
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('el 未传入”HTMLElement“类型元素');
    }
    this.el = el;
    this.attr = attr || {};
    this.lineWidth = lineWidth || 10;
    this.strokeStyle = strokeStyle || 'black';
    this.lineJoin = lineJoin || 'round';
    // 最后的位置
    this.lastLocation = {
      x: 0,
      y: 0
    };
    this.isMouseDown = false;
    
    // 创建canvas元素
    const canvas = this.createEle();
    if (!canvas) {
      throw new Error('创建canvas元素失败');
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    // 初始化鼠标事件
    this.initEventAction();
  }

  // 创建canvas元素
  private createEle() {
    const { el, attr } = this;
    const { clientWidth, clientHeight } = el;
    const can = document.createElement('canvas');

    // 默认width height 继承父级
    can.width = clientWidth;
    can.height = clientHeight;

    // 设置自定义属性
    for (const key of Object.keys(attr)) {
      can.setAttribute(key, `${attr[key]}`);
    }
    el.appendChild(can);
    return can;
  }

  // 初始化事件监听
  protected initEventAction() {
    const { canvas } = this;
    const self = this;
    // 鼠标按下
    canvas.onmousedown = function(e: MouseEvent): void{
      e.preventDefault();

      self.isMouseDown = true;
      // 记录按下去位置，作为开始位置
      const { x, y } = self.location(e);
      Object.assign(self.lastLocation, { x, y });

      // 鼠标移动
      canvas.onmousemove = function(e: MouseEvent): void{
        e.preventDefault();
        self.draw(e);
      };
    };

    // 鼠标抬起
    canvas.onmouseup = function(e: MouseEvent): void{
      e.preventDefault();

      self.isMouseDown = false;
      // 清空鼠监移动事件
      canvas.onmousemove = null;
    };

    // 鼠标进入
    canvas.onmouseenter = function(e: MouseEvent): void{
      // 进入canvas元素 设置开始位置
      const { x, y } = self.location(e);
      Object.assign(self.lastLocation, { x, y });
    }

    // 鼠标离开
    canvas.onmouseleave = function(e: MouseEvent): void{
    }

    // 鼠标抬起
    document.onmouseup = function(e: MouseEvent): void {
      // 鼠标离开canvas元素之外 鼠标抬起 清空移动事件
      if (self.isMouseDown) {
        self.isMouseDown = false;
        canvas.onmousemove = null;
      }
    }

  }

  // 画线事件
  private draw(e: MouseEvent) {
    const { ctx, lineWidth, strokeStyle, lastLocation, lineJoin } = this; 
    const { x, y } = this.location(e);

    if(!ctx) return; 
    // 设置线宽度
    ctx.lineWidth = lineWidth;

    // 新路径
    ctx.beginPath();
    // 开始位置
    ctx.moveTo(lastLocation.x,lastLocation.y);
    // 结束位置
    ctx.lineTo(x, y);
    // 线条颜色
    ctx.strokeStyle = strokeStyle;
    ctx.lineCap = "round";

    ctx.lineJoin = lineJoin;
    // 将起点和终点连接起来
    ctx.stroke();

    Object.assign(lastLocation, { x, y });

  }

  // 获取canvas元素位置
  private location(e?: MouseEvent): LocationType {
    const { left, top } = this.canvas.getBoundingClientRect();
    if (!e) {
      return {
        x: left,
        y: top
      }
    }
    const { clientX, clientY } = e;
    return {
      x: clientX - left,
      y: clientY - top
    }
  }

  // 清空画布
  protected clearRectAction() {
    let { width, height } =  this.canvas.getBoundingClientRect();
    this.ctx?.clearRect(0, 0, width as number, height as number );
  }

  // 画布导出图片 默认导出 base64
  protected convertCanvasToImage(): string {
    return this.canvas.toDataURL('image/png');
  }

  // 刷新画布大小
  protected refreshSize():void {
    const { el, canvas, attr } = this;
    const { clientWidth, clientHeight } = el;
    const { width = 0, height = 0 } = attr;
    // 默认width height 继承父级
    canvas.width = width as number || clientWidth;
    canvas.height = height as number || clientHeight;
  }

  // 重置属性
  protected resetOptionsAction(options: RestOptionsType):void {
    for(const key of Object.keys(options)) {
      // 过滤没有的属性
      if(!(key in this)) return;
      Object.assign(this, {
        [key]: options[`${key}`]
      })
    }
  }

  // 消灭监听
  protected destroyedAction() {
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
    this.canvas.onmouseenter = null;
    this.canvas.onmouseleave = null;
    document.onmouseup = null;
  }
}

class CWrite extends Base {
  constructor(options: OptionsType) {
    super(options);
  }

  clearRect() {
    this.clearRectAction();
  }

  canvasToImage(): string {
    return this.convertCanvasToImage();
  }

  refresh() {
    this.refreshSize();
  }

  resetOptions(options: RestOptionsType) {
    this.resetOptionsAction(options);
  }

  initEvent() {
    this.initEventAction()
  }

  destroyed() {
    this.destroyedAction();
  }

}
// 挂载window之上
// Object.assign(window, {
//   CWrite
// });

export default CWrite
