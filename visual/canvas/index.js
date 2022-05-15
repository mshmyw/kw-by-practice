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
    _createPolygon(ctx, i, (i - 2) * 100, 75, 40);
    ctx.fillStyle = 'HotPink';
    ctx.fill();
  }
}
const main = () => {
  // 绘制多边形
  createPolygon();
  
  // TODO 绘制圆角矩形 createRoundedRect

}

main();

