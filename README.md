# canvas

## 画板
> 简单使用canvas API，顺便写点东西

## 主要问题：

### 1.画版位置与视口位置不同
```javascript
    canvas.onmousedown = function (aaa) {
        let x = aaa.clientX;//相对于视口的位置不是相对于canvas的位置
        let y = aaa.clientY;
}
```
#### 解决思路：1、在css中加入
```css
canvas{
    height: 100vh;
    width: 100vw;
}
```
结果失败了，原因这个只能做到放大，并没有将画板和视口同步
#### 解决思路：2、在js中获取屏幕宽高，并赋值给画板

```javascript
    function setCanvasSize() {
        let pageWidth = document.documentElement.clientWidth;
        let pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
```

### 2.橡皮与画笔切换

建议使用一个按钮，一个功能，避免复杂导致后期难以维护

### 3.存储位置及更替

使用hash结构存储，在mousemove时间中使用lastPoint = newPoint;更替位置

### 4.优化代码

将代码分为初始化画板大小和监听鼠标
```javascript
autoSetCanvasSize(yyy);
listenToMouse(yyy);
```

### 5.手机适配

#### 1.手机屏幕控制
```html
<meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0, initial-scale=1.0">
```
不允许用户缩放屏幕，初始化、最大、最小的屏幕大小都是1，width=device-width 设置屏幕尺寸和设备相同

#### 2.事件选择设备

直接查看是否可以用touch事件，undefined不支持，null支持
```javascript
console.log(document.body.ontouchstart !== undefined);
```
暂时没用，一下午时间，心态炸裂，在chrome和firefox都没有找到ontouchstart。如果手机适配就暂时用着，到之后再改改看。

用onpointerdown浏览器里手机和pc的都可以用，在手机里会出现短短一笔的问题，之后再改。