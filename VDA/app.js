var app = new Vue({
  el: "#app",
  data: {
    vueCanvas: null,
    painting: false,
    canvas: null,
    ctx: null,
  },
  mounted() {
    // On mount, compute height/width
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");

    // Resizes the canvas to be equal to the canvas ele
    this.canvas.height = window.innerHeight - 200;
    this.canvas.width = window.innerWidth - 100;
  },
  methods: {
    startPainting(e) {
      this.painting = true;
    },
    finishedPainting(e) {
      this.painting = false;
      this.ctx.beginPath();
    },
    draw(e) {
      if (!this.painting)
        return;

      this.ctx.lineWidth = 5;
      this.ctx.lineCap = "round";
    
      rect = this.canvas.getBoundingClientRect();
      var x_val = e.clientX - rect.left;
      var y_val = e.clientY - rect.top;
      this.ctx.lineTo(x_val, y_val);
      this.ctx.stroke();
    },
    erase(e) {
      // Just clear the whole canvas rectangle
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  },
});
