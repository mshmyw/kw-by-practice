const getCtx = () => {
  const canvasElement = document.querySelector('#canvas');
  const ctx = canvasElement.getContext('2d');
  return ctx;
};

const ballMove = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  let x = 0;
  const frame = () => {
    requestAnimationFrame(frame);
    // first clear
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    // circle
    cxt.beginPath();
    cxt.arc(x, 70, 20, 360*Math.PI/180, 0, true);
    cxt.closePath();
    cxt.fillStyle="#6699ff";
    cxt.fill();
    x +=2;
  };
  frame();
}

const ballGravityMove = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const ball = new Ball(0, cnv.height);
  let vx = 4, vy = -5;
  const gravity = 0.2;

  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    ball.x += vx;
    ball.y +=vy;
    ball.fill(cxt);

    vy += gravity;
  };
  frame();
};

const ballUpAndDown = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const ball = new Ball(cnv.width/2, 0);
  let vy = 0;
  let gravity = 0.2;
  const bounce = -0.8;
  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0,0, cnv.width, cnv.height);
    ball.y += vy;
    if(ball.y > cnv.height - ball.radius) {
      ball.y = cnv.height - ball.radius;
      vy = vy*bounce;
    }
    ball.fill(cxt);
    vy += gravity;
  }
  frame();
}

const main = () => {
  ballGravityMove();
  // 下落和反弹
  ballUpAndDown();
};

main();
