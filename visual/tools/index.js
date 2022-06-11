// 全局对象
window.tools = {};

// 鼠标操作
window.tools.getMouse = (element) => {
  const mouse = {x: 0, y: 0};
  element.addEventListener('mousemove', (e) => {
    let x, y; // 要获取的是在canvas(它也是个dom元素)元素中的位置，w3c坐标系
    // 鼠标当前位置
    [x, y] = [e.pageX, e.pageY];

    // 将当前坐标值减去canvas元素偏移位置，则x,y为鼠标在canvas中的相对坐标
    x = x - element.offsetLeft;
    y = y - element.offsetTop;
    mouse.x = x;
    mouse.y = y;
  });
  return mouse;
};

window.tools.getKey = () => {
  const key = {};
  window.addEventListener('keydown', (e) => {
    console.log("e.key", e.key, e.code);
    switch (e.key) {
      case 'a':
      case 'ArrowLeft':
        key.direction = 'left';
        break;
      case 'd':
      case 'ArrowRight':
        key.direction = 'right';
        break;
      case 'w':
      case 'ArrowUp':
        key.direction = 'up';
        break;
      case 's':
      case 'ArrowDown':
        key.direction = 'down';
        break;
      default:
        key.direction = '';
    }
  });

  return key;
};

class Arrow {
  // 箭头中心点 x,y
  x = 0;
  y = 0;
  color = '#ff0099';
  angle = 0;
  constructor(x = 0, y = 0, color='#ff0099', angle=0) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = angle;
  }

  stroke(cxt) {
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(this.angle);
    cxt.strokeStyle = this.color;
    cxt.beginPath();
    cxt.moveTo(-20, -10);

    cxt.lineTo(0, -10);
    cxt.lineTo(0, -20);

    cxt.lineTo(20, 0);
    cxt.lineTo(0, 20);

    cxt.lineTo(0, 10);
    cxt.lineTo(-20, 10);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();
  }

  fill(cxt) {
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(this.angle);
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.moveTo(-20, -10);

    cxt.lineTo(0, -10);
    cxt.lineTo(0, -20);

    cxt.lineTo(20, 0);
    cxt.lineTo(0, 20);

    cxt.lineTo(0, 10);
    cxt.lineTo(-20, 10);
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  }
}

window.Arrow = Arrow;

class Ball {
  x;
  y;
  radius;
  color;
  scaleX;
  scaleY;
  rotation;
  constructor(x = 0, y = 0, radius = 12, color = '#6699ff') {
    // 小球中心点
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.scaleX = 1;
    this.scaleY = 1;
    this.rotation = 0;
  }
  stroke(cxt) {
    cxt.save();
    cxt.scale(this.scaleX, this.scaleY);
    cxt.strokeStyle = this.color;
    cxt.beginPath();
    cxt.arc(this.x, this.y, this.radius, 0, (360 * Math.PI) / 180, false);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();
  }

  fill(cxt) {
    cxt.save();
    cxt.translate(this.x, this.y);
    cxt.rotate(this.rotation);
    cxt.scale(this.scaleX, this.scaleY);
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.arc(0, 0, this.radius, 0, (360 * Math.PI) / 180, false);
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  }

  getRect() {
    const rect ={
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius *2,
      height: this.radius * 2
    };
    return rect;
  }
}

window.Ball = Ball;

window.tools.getRandomColor = () => {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return '#' + hex.padEnd(6, '0');
};

// 矩形碰撞检测
window.tools.checkRect = (rectA, rectB) => {
  return !(
    rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y
  );
}

// 圆形碰撞检测
window.tools.checkCircle = (circleA, circleB) => {
  const dx = circleB.x - circleA.x;
  const dy = circleB.y - circleA.y;
  const distance = Math.sqrt(dx*dx + dy*dy);
  if(distance < circleA.radius + circleB.radius) {
    return true;
  }
  return false;
};