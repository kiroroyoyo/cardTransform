var cardAnimate = {
  prex: '',
  prey: '',
  speed: 0,
  lon: 0,
  frondCard: '',
  backCard: '',
  prePos: 0,
  fingerMove: true, //控制可否移动
  fingerMoving: false,
  moveDirect: 0, //1表示正向，-1表示反向
  ani_move : false, //动画是否进行
  transNum : 0,
  init: function(frond, back){
    var self = this;
    this.frondCard = document.getElementById(frond);
    this.backCard = document.getElementById(back);
    document.addEventListener("touchstart", this.onDocumentMouseDown.bind(self));
    document.addEventListener("touchmove", this.onDocumentMouseMove.bind(self), {passive: false});
    document.addEventListener("touchend", this.onDocumentMouseUp.bind(self));
  },
  animate: function(){

      if (this.fingerMove) {

        this.prePos += (this.lon - this.prePos) * 0.1;
        if (this.prePos > 40) {
          this.lon = this.lon - 40;
          this.prePos = this.prePos - 40;
        }else if (this.prePos < -40) {
          this.lon = this.lon + 40;
          this.prePos = this.prePos + 40;
        }
          if (Math.abs(this.prePos - this.lon) < 0.01 && Math.abs(this.lon) > 0.01 && (!this.fingerMoving))
          {
            this.ani_move = false;
            this.prePos = 0;
            this.frondCard.style = "transform: translateX("+ this.prePos +"%)";
            this.backCard.style = "transform: translateX("+ this.prePos +"%)";


          }else{

            this.frondCard.style = "transform: translateX("+ this.prePos +"%)";
            this.backCard.style = "transform: translateX("+ (-this.prePos) +"%)";
            requestAnimationFrame(this.animate.bind(this));

          }
                
      }
     

  },
  onDocumentMouseDown : function(e){
    if( this.ani_move && this.fingerMoving == false) {
    }
      else {
        this.lon = 0;
        cardAnimate.animate();
    }

    e = e.touches[0];
    prex = e.clientX; 
    prey = e.clientY;
    
    this.ani_move = true; //动画开启 

  },
  onDocumentMouseMove : function(e){
    e = e.touches[0];

    
    if( this.ani_move && this.fingerMoving == false) {
      // 判断是否不同向
      if (((e.clientX - prex) > 0 ? 1: -1) == -this.moveDirect ) {
        this.lon = 0;
        this.prePos = 0;
        this.moveDirect = e.clientX - prex > 0 ? 1: -1;
      }
    }

    
    if (Math.abs(e.clientX - prex) >= 4 ) {
      this.fingerMoving = true;
      
      this.speed = (e.clientX - prex) * Math.max(Math.abs(e.clientX - prex), 8) * 0.005;
      this.lon += this.speed;

      prex = e.clientX;
      prey = e.clientY;
    }
  },
  onDocumentMouseUp : function(e){
    
    //判断点击
    if (!this.fingerMoving) {
    }else{
      this.moveDirect = this.lon > 0 ? 1 : -1;
      this.transNum = this.lon/10 + this.moveDirect;
      this.lon = Math.round(this.transNum) * 10;
      this.fingerMoving = false;
    }
    
  }
}

