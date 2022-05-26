const getCtx = () => {
  const canvasElement = document.querySelector('#canvas');
  const ctx = canvasElement.getContext("2d");
  return ctx;
}

/** 
 * ctx: canvas 上下文
 * n: n 边型
 * dx, dy: n 边型中心点坐标
 * size: n 边型半径
*/
const _createPolygon = (ctx, n, dx, dy, size) => {
  ctx.beginPath();
  const degree = (2*Math.PI)/n;
  for(let i = 0; i < n; i++) {
    const x = Math.cos(i * degree);
    const y = Math.sin(i * degree);
    ctx.lineTo(x * size + dx, y*size + dy);
  }
  ctx.closePath();
}

const createPolygon = () => {
  const ctx = getCtx();
  for(let i = 3; i < 10; i++) {
    const n = i;
    const dx = n > 6 ? (n - 5) * 100 : (n -2) * 100;
    const dy = n > 6 ? 3*75 : 75;
    _createPolygon(ctx, i, dx, dy, 40);
    ctx.fillStyle = 'HotPink';
    ctx.fill();
  }
}

/**
 * 绘制圆角矩形
 * width height 宽高
 * r 圆角半径
 * dx, dy 左上角顶点坐标
 */
const _createRoundedRect = (ctx, dx, dy, width, height, r) => {
  ctx.beginPath();
  ctx.moveTo(dx + r, dy);

  ctx.lineTo(dx + width - r, dy);
  ctx.arcTo(dx + width, dy, dx + width, dy + r, r);
  
  ctx.lineTo(dx + width, dy + height - r);
  ctx.arcTo(dx + width, dy + height, dx + width - r, dy + height, r);

  ctx.lineTo(dx + r, dy + height);
  ctx.arcTo(dx, dy + height, dx, dy + height - r, r);

  ctx.lineTo(dx, dy + r);
  ctx.arcTo(dx, dy, dx + r, dy, r);

  // ctx.closePath();
};

const createRoundedRect = () => {
  const ctx = getCtx();
  _createRoundedRect(ctx, 200, 300, 200, 200, 20);
  ctx.strokeStyle = 'HotPink';
  ctx.stroke();  
}

/**
 * 绘制扇形
 * dx dy 原点坐标
 * r 圆角半径
 * angle1 angle2 起始和结束角度
 */
const _createSector = (ctx, dx, dy, r, angle1, angle2) => {
  ctx.beginPath();
  ctx.moveTo(dx, dy);
  ctx.arc(dx, dy, r, angle1 * Math.PI/180, angle2*Math.PI/180, false);
  ctx.closePath();
}

const createSector = () => {
  const ctx = getCtx();
  _createSector(ctx, 300, 600, 100, 30, 120);
  ctx.fillStyle = 'HotPink';
  ctx.fill();
};


const createRadialGradient = () => {
  const ctx = getCtx();
  let i = 0;
  const _createRadialGradient = () => {
    const gradient = ctx.createRadialGradient(60, 60, 0, 60, 60, 60);
    gradient.addColorStop(i * 0, "magenta");
    gradient.addColorStop(i * 0.25, 'blue');
    gradient.addColorStop(i * 0.5, 'green');
    gradient.addColorStop(i * 0.75, 'yellow');
    gradient.addColorStop(i * 1.0, 'HotPink');
    
    ctx.fillStyle = gradient;
    i = i+0.1;
    if(i >= 1) {
      i = 0;
    }
    ctx.fillRect(0, 0, 120, 120);            
  };
  setInterval(_createRadialGradient, 500);
}

const main = () => {
  // 绘制多边形
  createPolygon();
  
  // 绘制圆角矩形 
  createRoundedRect();

  // 绘制扇形
  createSector();

  // 动态圆形渐变
  createRadialGradient();

}

main();

