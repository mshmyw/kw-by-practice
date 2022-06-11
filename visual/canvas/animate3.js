// 碰撞检测
const ballCollision = () => {
  const cnv = document.querySelector("#canvas");
  const cxt = cnv.getContext("2d");
  const msg = document.querySelector("#text");
  const ballA = new Ball(cnv.width/2, cnv.height/2, 20, tools.getRandomColor());
  const rectA = ballA.getRect();
  const mouse = tools.getMouse(cnv);

  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    ballA.fill(cxt);
    cxt.strokeRect(rectA.x, rectA.y, rectA.width, rectA.height);

    // 定义一个位置不固定的小球
    const ballB = new Ball(mouse.x, mouse.y, 30);
    const rectB = ballB.getRect();
    ballB.fill(cxt);
    cxt.strokeRect(rectB.x, rectB.y, rectB.width, rectB.height);

    if(tools.checkRect(rectA, rectB)) {
    //   msg.innerHtml = '撞上了！';
      console.log('撞上了！');
    } else {
      // msg.innerHtml = '哈哈，哎没撞！';
      console.log('哈哈，哎没撞！');
    }
  }
  frame();
}

// 碰撞
const ballsCollision = () => {
  const cnv = document.querySelector("#canvas");
  const cxt = cnv.getContext("2d");
  const n = 32;
  const balls = [];
  const randomFactor = 3;
  for(let i = 0; i < n; i++) {
    const ball = new Ball();
    ball.x = Math.random()*cnv.width;
    ball.y = Math.random() * cnv.height;
    ball.radius = 10;
    ball.color = tools.getRandomColor();
    ball.vx = (Math.random()*2-1)*randomFactor;
    ball.vy = (Math.random() * 2 - 1) * randomFactor;
    balls.push(ball);
  }

  const checkCollision = (ballA, i) => {
    for(let j = i+1; j < balls.length; j++) {
      const ballB = balls[j];
      if(tools.checkCircle(ballB, ballA)) {
        ballA.vx = -ballA.vx;
        ballA.vy = -ballA.vy;
        ballB.vx = -ballB.vx;
        ballB.vy = -ballB.vy;

        // 避免重叠
        const fixFactor = 5;
        if(ballA.vx > 0) {
          ballA.x += fixFactor;
        } else {
          ballA.x -= fixFactor;
        }

        if (ballA.vy > 0) {
          ballA.y += fixFactor;
        } else {
          ballA.y -= fixFactor;
        }
        if (ballB.vx > 0) {
          ballB.x += fixFactor;
        } else {
          ballB.x -= fixFactor;
        }

        if (ballB.vy > 0) {
          ballB.y += fixFactor;
        } else {
          ballB.y -= fixFactor;
        }
      }
    }
  }

  const checkBorder = (ball) => {
    if(ball.x < ball.radius) {
      ball.x = ball.radius;
      ball.vx = -ball.vx;
    }
    if (ball.y < ball.radius) {
      ball.y = ball.radius;
      ball.vy = -ball.vy;
    }
    if(ball.x > cnv.width - ball.radius) {
      ball.x = cnv.width - ball.radius;
      ball.vx = -ball.vx;
    }
    if (ball.y > cnv.height - ball.radius) {
      ball.y = cnv.height - ball.radius;
      ball.vy = -ball.vy;
    }
  }
  const drawBall = (ball) => {
    ball.fill(cxt);
    ball.x += ball.vx;
    ball.y += ball.vy;
  }

  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    for(let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      checkCollision(ball, i);
      checkBorder(ball);
      drawBall(ball);
    }
  }
  frame();
}
const main = () => {
  // 碰撞检测
  ballsCollision();
};

main();
