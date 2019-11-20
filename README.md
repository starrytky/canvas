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