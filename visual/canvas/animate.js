const getCtx = () => {
  const canvasElement = document.querySelector('#canvas');
  const ctx = canvasElement.getContext('2d');
  return ctx;
};

const getMouse = () => {
  const canvasElement = document.querySelector('#canvas');  
  const ctx = canvasElement.getContext('2d');
  const mouse = tools.getMouse(canvasElement);
  canvasElement.addEventListener("mousemove", () => {
    console.log("mouse: ", mouse);
  });
}

const getDirection = () => {
  const key = tools.getKey();
  console.log('key', key);
};


const moveBall = () => {
  const canvasElement = document.querySelector('#canvas');
  const cxt = canvasElement.getContext('2d');
  const drawBall = (x, y) => {
    cxt.beginPath();
    cxt.arc(x,y, 20, 0, 360*Math.PI/180, true);
    cxt.closePath();
    cxt.fillStyle = "#6699FF";
    cxt.fill();
  };

  drawBall(canvasElement.width/2, canvasElement.height/2);
  let x = 100, y = 75;
  const key = tools.getKey();
  window.addEventListener('keydown', (e) => {
    cxt.clearRect(0, 0, canvasElement.width, canvasElement.height);
    switch (key.direction) {
      case 'up':
        y -= 2;
        drawBall(x, y);
        break;
      case 'down':
        y += 2;
        drawBall(x, y);
        break;
      case 'left':
        x -= 2;
        drawBall(x, y);
        break;
      case 'right':
        x += 2;
        drawBall(x, y);
        break;
      default:
        drawBall(x, y);
    }
  });
}

const ballAnimation = () => {
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

const arrowAnimate = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');

  const arrow = new Arrow(cnv.width/2, cnv.height/2);
  const mouse = tools.getMouse(cnv);
  const drawFrame = () => {
    requestAnimationFrame(drawFrame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    const dx = mouse.x - cnv.width/2;
    const dy = mouse.y - cnv.height/2;
    arrow.angle = Math.atan2(dy, dx);
    arrow.fill(cxt);
  }
  drawFrame();
}

const distanceAnimate = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const [x, y] = [cnv.width/2, cnv.height/2];
  const mouse = tools.getMouse(cnv);
  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    cxt.save();
    cxt.beginPath();
    cxt.moveTo(x, y);
    cxt.lineTo(mouse.x, mouse.y);
    cxt.closePath();
    cxt.strokeStyle = 'red';
    cxt.stroke();
    cxt.restore();

    const dx = mouse.x - x;
    const dy = mouse.y - y;
    const distance = Math.sqrt(dx**2 + dy**2);
    const s = distance.toFixed(2);
    console.log('dx dy', dx**2, dy**2);

    document.querySelector('#text').innerHTML = `distance is: ${s}, 
    axis is: (${mouse.x}, ${mouse.y})`;
  }

  frame();
}


const ballCircleSport = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const ball = new Ball(100, 25, 20);
  const centerX = cnv.width/2;
  const centerY = cnv.height/2;
  const radius = 50;
  let angle = 0;
  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width,cnv.height);
    cxt.beginPath();
    cxt.arc(centerX, centerY, radius, 0, 360*Math.PI/180, false);
    cxt.closePath();
    cxt.stroke();

    ball.x = centerX + Math.cos(angle) * radius;
    ball.y = centerY + Math.sin(angle) * radius;
    ball.fill(cxt);
    angle += 0.05;
  }

  frame();
}

const ballWaveX = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const ball = new Ball(cnv.width/2, cnv.height/2);
  const range = 80;
  let angle = 0;

  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    ball.x = cnv.width/2 + Math.sin(angle) * range;
    ball.fill(cxt);
    angle += 0.05;
  }
  frame();
}

const ballWaveY = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const ball = new Ball(0, cnv.height / 2);
  const range = 40;
  let angle = 0;

  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    ball.x += 1;
    ball.y = cnv.height / 2 + Math.sin(angle) * range;
    ball.fill(cxt);
    angle += 0.05;
  };
  frame();
};

const ballScale = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');
  const ball = new Ball(cnv.width/2, cnv.height / 2, 25);
  const range = 0.5;
  let angle = 0;

  const frame = () => {
    requestAnimationFrame(frame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    ball.scaleX = 1 + Math.sin(angle) * range;
    ball.scaleY = 1 + Math.sin(angle) * range;
    ball.fill(cxt);
    angle += 0.05;
  };
  frame();
};

const arrowMove = () => {
  const cnv = document.querySelector('#canvas');
  const cxt = cnv.getContext('2d');

  const arrow = new Arrow(cnv.width / 2, cnv.height / 2);
  const mouse = tools.getMouse(cnv);
  let speed = 1.5;
  let angle = 0;
  const drawFrame = () => {
    requestAnimationFrame(drawFrame);
    cxt.clearRect(0, 0, cnv.width, cnv.height);
    const dx = mouse.x - cnv.width / 2;
    const dy = mouse.y - cnv.height / 2;
    const angle = Math.atan2(dy, dx);
    const vx = Math.cos(angle)*speed;
    const vy = Math.sin(angle)*speed;
    arrow.x +=vx;
    arrow.y +=vy;
    arrow.angle = angle;
    arrow.fill(cxt);
  };
  drawFrame();
};

const main = () => {
  // getMouse();
  // getDirection();
  // moveBall();
  // ballAnimation();
  // arrowAnimate();
  // distanceAnimate();
  // ballCircleSport();
  // ballWaveX();
  // ballWaveY();
  ballScale();
  arrowMove();
};

main();
