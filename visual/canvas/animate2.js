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

const ballRandomMove = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const balls = [];
  const n = 50;
  const randomFactor = 4;  // 取偶数
  const gravity = 0.15;

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
          ball.vx = (Math.random() * 2 - 1) * randomFactor;
          ball.vy = (Math.random() * 2 - 1) * randomFactor;
        }
        ball.fill(cxt);
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy += gravity;  // 重力加速度 可模拟重力
    }
  }
  frame();
}

// 散弹效果
const ballRandomShotMove = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const balls = [];
  const n = 50;
  const randomFactor = 3; // 取偶数
  const gravity = 0.15;

  // 随机生成n个小球
  for (let i = 0; i < n; i++) {
    const color = tools.getRandomColor();
    const ball = new Ball(cnv.wjidth / 2, cnv.height / 2, 12, color);
    ball.vx = 3;  // 水平恒定
    ball.vy = (Math.random() * 2 - 1) * randomFactor;
    balls.push(ball);
  }
  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    for (const ball of balls) {
      if (
        ball.x < -ball.radius ||
        ball.x > cnv.width + ball.radius ||
        ball.y < -ball.radius ||
        ball.y > cnv.height + ball.radius
      ) {
        ball.x = cnv.width / 2;
        ball.y = cnv.height / 2;
        ball.vx = (Math.random() * 2 - 1) * randomFactor;
        ball.vy = (Math.random() * 2 - 1) * randomFactor;
      }
      ball.fill(cxt);
      ball.x += ball.vx;
      ball.y += ball.vy;
      // ball.vy += gravity; // 重力加速度 可模拟重力
    }
  };
  frame();
};

const ballBounce = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext("2d");
  const ball = new Ball(cnv.width/2, cnv.height/2);
  const randomFactor = 3;
  let vx = (Math.random()*2 - 1)*3;
  let vy = (Math.random()*2 - 1)*3;
  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    ball.x += vx;
    ball.y += vy;
    if(ball.x < ball.radius) {
      ball.x = ball.radius;
      vx = -vx;
    } else if( ball.x > cnv.width - ball.radius) {
      ball.x = cnv.width - ball.radius;
      vx = -vx;
    } else if (ball.y < ball.radius) {
      ball.y = ball.radius;
      vy = -vy;
    } else if (ball.y > cnv.height - ball.radius) {
      ball.y = cnv.width - ball.radius;
      vy = -vy;
    }

    ball.fill(cxt);
  }
  frame();

}

const ballsBounce = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const balls = [];
  const n = 10;
  const randomFactor = 3;
  for(let i = 0;i < n; i++) {
    const ball = new Ball(cnv.width / 2, cnv.height / 2, 20, tools.getRandomColor());
    ball.vx = (Math.random() * 2 - 1) * randomFactor;
    ball.vy = (Math.random() * 2 - 1) * randomFactor;
    balls.push(ball);
  }
  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    for(const ball of balls) {
      ball.x += ball.vx;
      ball.y += ball.vy;
      let [vx, vy] = [ball.vx, ball.vy];
      if (ball.x < ball.radius) {
        ball.x = ball.radius;
        vx = -vx;
      } else if (ball.x > cnv.width - ball.radius) {
        ball.x = cnv.width - ball.radius;
        vx = -vx;
      } else if (ball.y < ball.radius) {
        ball.y = ball.radius;
        vy = -vy;
      } else if (ball.y > cnv.height - ball.radius) {
        ball.y = cnv.width - ball.radius;
        vy = -vy;
      }
      [ball.vx, ball.vy] = [vx, vy];
      ball.fill(cxt);
    }

  };
  frame();
};

const main = () => {
  // ballGravityMove();
  // 下落和反弹
  // ballUpAndDown();
  // 波浪抛出
  // ballWaveRight();
  // ballRandomMove();
  // ballRandomShotMove();

  // 边界反弹
  // ballBounce();
  ballsBounce();
};

main();
