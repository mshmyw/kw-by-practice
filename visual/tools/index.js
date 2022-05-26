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