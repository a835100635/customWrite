# customWrite

#### 在线体验：https://a835100635.github.io/customWrite/public/
#### 觉得有趣、对大佬有用的话点个star✨呗
![在这里插入图片描述](https://img-blog.csdnimg.cn/91e61fc4807c4c1da4478c5dfded5ece.png)

## 简述
---
此项目主要是canvas写字板功能，也就是电子签名插件。功能包含画笔粗细、画笔颜色、生成图片、禁止书写、重置事件、并且支持自定义配置

## 安装
#### npm
```javascript
$ npm install c-write
```
#### 直接安装
```javascript
<script type="module" src="/path/to/lib.js"></script>
<script type="module">
  import CWrite from '/path/to/lib.js'

  const cWrite = new CWrite(options);
</script>
```


## 如何导入ES模块的示例

```javascript
// 引入库
import CWrite from 'CWrite';
// 初始化库 传入配置项 options
const cWrite = new CWrite(options);

```

## 配置项 options
---
#### el 挂载元素
类型定义
```typescript
type EleType = HTMLElement;
```
```javascript
options: {
  // HTMLElement
  el: document.querySelector('#app'),
}

===>
<div id="app">
  <canvas></canvas>
</div>

```

#### attr 元素自定义属性
类型定义
```typescript
interface AttrType {
  [key: string]: string | number | boolean;
}
```
```javascript
attr: {
  width: 100,
  height: 100,
  class: 'canvas-block',
  id: 'canvas'
  ... 其他自定义属性
}

===>
<canvas 
  width="100" 
  height="100" 
  class="canvas-block" 
  id="canvas">
</canvas>

```

#### lineWidth 线条宽度
类型定义
```typescript
type LineWidthType = number;
```
```javascript
options: {
  lineWidth: 1
}
```

#### strokeStyle 线条颜色
类型定义
```typescript
type StrokeStyleType = string | CanvasGradient | CanvasPattern;
```
```javascript
options: {
  strokeStyle: 'pink' // '#cccccc'
}
```
#### lineJoin 线条拐角样式
类型定义
```typescript
type LineJoinType = CanvasLineJoin; // 'bevel' | 'miter' | 'round'
```
```javascript
options: {
  lineJoin: 'bevel' | 'miter' | 'round'
}
```

## 画布操作 action

#### 切换画笔属性
修改画笔粗细、颜色、拐角样式等

**修改完后必须调用 此方法 否则不生效**
类型定义
```typescript
interface RestOptionsType {
  [key: string]: string | number | boolean;
}

// 参数可选
cWrite.resetOptions(options: RestOptionsType)
```
```javascript
// 内部判断逻辑
for(const key of Object.keys(options)) {
  // 过滤没有的属性
  if(!(key in this)) return;
  Object.assign(this, {
    [key]: options[`${key}`]
  })
}
// 所以除默认设置属性以外的属性一律不生效

// 参数可选
cWrite.resetOptions({
  lineWidth: 1,
  strokeStyle: 'red',
  lineJoin: 'round'
})
```
#### 清空画布
```javascript
cWrite.resetOptions()
```

#### 导出图片
暂时默认导出 **base64** 数据
```javascript
const imgData = cWrite.canvasToImage()
console.log(imgData);
// data:image/png;base64,QI....ggg==
```
##### 页面展示示例
```javascript
const imgData = cWrite.canvasToImage();
const img = document.createElement('img');
img.style.width = '400px';
img.style.height = '300px';
img.src = imgData;
document.body.appendChild(img);
```

#### 重置画布大小
当我们页面突然发生大小的改变需要改变画布大小时可以调用此函数
```javascript
cWrite.refresh();
```
```javascript
 window.addEventListener('resize', () => {
    cWrite.refresh();
 });
```

#### 销毁画布监听事件
画布监听还是依赖与原生事件监听，为了垃圾回收机制还是考虑一下销毁事件监听
```javascript
cWrite.destroyed();
```
调用此方法后，画布活动一切禁止

#### 恢复画布监听事件
在禁止画布活动后需要恢复操作可以抵用此函数
```javascript
cWrite.initEvent();
```
调用后发现画布活动又可正常操作


#### 橡皮擦功能
橡皮擦功能还是经常用到的，但是没有内置默认的橡皮擦功能，但是可以把颜色设置为白色，
线条变粗一些，这样简易的橡皮擦功能就好了，利用 **resetOptions** 函数操作
```javascript
cWrite.resetOptions({
  lineWidth: 10,
  strokeStyle: '#fff'
})
```