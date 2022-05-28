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