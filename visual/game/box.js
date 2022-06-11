class Box {
  x;
  y;
  width;
  height;
  color;
  constructor(x=0, y=0, width=80, height=40, color=red) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  stroke(cxt) {
    cxt.save();
    cxt.strokeStyle=this.color;
    cxt.beginPath();
    cxt.rect(this.x, this.y, this.width, this.height);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();
  }
  fill() {
    cxt.save();
    cxt.fillStyle = this.color;
    cxt.beginPath();
    cxt.rect(this.x, this.y, this.width, this.height);
    cxt.closePath();
    cxt.fill();
    cxt.restore();
  }
}