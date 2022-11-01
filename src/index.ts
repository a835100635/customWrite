type EleType = HTMLElement;

interface AttrType {
  [key: string]: string | number | boolean;
}

export interface OptionsType {
  el: EleType;
  attr: AttrType;
}

class Base {
  protected el: EleType;
  protected attr: AttrType;

  protected ctx: EleType;

  constructor(options: OptionsType) {
    console.log('Base options--->', options);
    const { el, attr } = options;
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('el 未传入”HTMLElement“类型元素');
    }
    this.el = el;
    this.attr = attr;
    
    // 创建canvas元素
    const ctx = this.createEle();
    if (!ctx) {
      throw new Error('创建canvas元素失败');
    }
    this.ctx = ctx;
    // 初始化鼠标事件
    this.initEvent();
  }

  // 创建canvas元素
  createEle() {
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
  initEvent() {
    const { ctx } = this;
    const self = this;
    // 鼠标按下
    ctx.onmousedown = function(e: MouseEvent): void{
      e.preventDefault();
      console.log("鼠标按下---");
      // 鼠标移动
      ctx.onmousemove = function(e: MouseEvent): void{
        e.preventDefault();
        console.log("鼠标移动---");
        self.draw(e);
      };
    };

    // 鼠标抬起
    ctx.onmouseup = function(e: MouseEvent): void{
      e.preventDefault();
      console.log("鼠标抬起---");
      // 清空鼠标移动事件
      ctx.onmousemove = null
    };
  }

  // 画线事件
  private draw(e: MouseEvent) {
    console.log('draw-->', e);
  }
}

class CWrite extends Base {
  constructor(options: OptionsType) {
    super(options);
    this.init();
  }

  // 初始化
  init() {
    return {};
  }
}
// 挂载window之上
Object.assign(window, {
  CWrite
});
