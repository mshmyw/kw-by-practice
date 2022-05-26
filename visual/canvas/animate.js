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

const main = () => {
  // getMouse();
  getDirection();
};

main();
