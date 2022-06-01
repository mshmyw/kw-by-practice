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
  let gravity = 0.2;  // TODO 为0呢？
  const bounce = -0.9;
  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0,0, cnv.width, cnv.height);
    ball.y += vy;
    console.log('vy ', vy);
    if(ball.y > cnv.height - ball.radius) {
      ball.y = cnv.height - ball.radius;
      vy = vy*bounce;
    }
    ball.fill(cxt);
    vy += gravity;
  }
  frame();
}

const ballWaveRight = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const ball = new Ball(0, cnv.height);
  let vx = 3;
  let vy = -6;
  let gravity = 0.2;
  const bounce = -0.75;
  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    ball.x += vx;
    ball.y += vy;
    if (ball.y + ball.radius > cnv.height) {
      ball.y = cnv.height - ball.radius;
      vy = vy * bounce;
    }
    ball.fill(cxt);
    vy += gravity;
  };
  frame();
};

const BallRandomMove = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const balls = [];
  const n = 50;
  const randomFactor = 8;  // 取偶数

  // 随机生成n个小球
  for(let i = 0; i < n; i++) {
    const color = tools.getRandomColor();
    const ball = new Ball(cnv.wjidth/2, cnv.height/2, 12, color);
    ball.vx = Math.random() * randomFactor - randomFactor/2;
    ball.vy = Math.random() * randomFactor - randomFactor/2;
    balls.push(ball);
  }
  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    for(const ball of balls) {
      if(ball.x < -ball.radius ||
        ball.x > cnv.width + ball.radius ||
        ball.y < -ball.radius ||
        ball.y > cnv.height + ball.radius) {
          ball.x = cnv.width/2;
          ball.y = cnv.height/2;
          ball.vx = Math.random() * randomFactor - randomFactor/2;
          ball.vy = Math.random() * randomFactor - randomFactor/2;
        }
        ball.fill(cxt);
        ball.x += ball.vx;
        ball.y += ball.vy;
    }
  }
  frame();
}

const main = () => {
  // ballGravityMove();
  // 下落和反弹
  // ballUpAndDown();
  // 波浪抛出
  // ballWaveRight();
  BallRandomMove();
};

main();
