//global declares
var preX, preY, postX, postY;
var arrowV;
var projectile;
var origin;

function setup() {
	createCanvas(1280, 720);
	preX = 0;
	preY = 0;
	postX = 0;
	postY = 0;
	arrowV = null;
	projectile = null;
}

function draw() {
	background(255);
	if(arrowV != null){
		if(arrowV.isTemp){
			arrowV.changePostVector();
			arrowV.tempdisplay();
		}
	}
	if(projectile != null){
		projectile.display();
	}
	ellipse(0,0,80,80);
}

function mousePressed() {
	if(mouseButton !== 'left'){
		return;
	}
	projectile = null;
	preX = mouseX;
	preY = mouseY;
	arrowV = new arrowVelocity(preX, preY, postX, postY);
}

function mouseReleased() {
	if(mouseButton !== 'left'){
		return;
	}
	arrowV.isTemp = false;
	arrowV.postVector.x = mouseX;
	arrowV.postVector.y = mouseY;
	projectile = new arrowProjectile(preX, preY);
	arrowV = null;
	projectile.moveTo(0,0);
}

function arrowVelocity(preX, preY, postX, postY){
	this.preVector = createVector(preX, preY);
	this.tempPostVector = createVector(mouseX, mouseY);
	this.postVector = createVector(postX, postY);
	this.isTemp = true;

	this.display = function(){
		line(this.preVector.x, this.preVector.y, this.postVector.x, this.postVector.y);
	}
	this.tempdisplay = function(){
		line(this.preVector.x, this.preVector.y, this.tempPostVector.x, this.tempPostVector.y);
	}
	this.changePostVector = function(){
		this.tempPostVector.x = mouseX;
		this.tempPostVector.y = mouseY;
	}
}

function arrowProjectile(startPointX, startPointY){
	this.length = 10;
	this.speed = 100;
	this.startVector = createVector(startPointX, startPointY);
	this.endVector = createVector(startPointX+this.length, startPointY+this.length);

	this.display = function(){
		ellipse(this.startVector.x, this.startVector.y, 10, 10);//, this.endVector.x, this.endVector.y);
	}

	this.moveTo = function(destX, destY){
		var distance = dist(this.startVector.x, this.startVector.y, destX, destY);
		var dirX = null;
		var dirY = null;
		console.log(this.startVector.x + " " + this.startVector.y + " " + destX + " " + destY);
		if(this.startVector.x > destX){
			dirX = 'left';
		}else{
			if(this.startVector.x == destX){
				dirX = 'none';
			}else{
				dirX = 'right';
			}
		}
		if(this.startVector.y < destY){
			dirY = 'down';
		}else{
			if(this.startVector.y == destY){
				dirY = 'none';
			}else{
				dirY = 'up';
			}
		}
		var a = 0;
		while(a < 5){
			console.log(this.startVector.x + " " + this.startVector.y);
			this.move(angle, dirX, dirY);
			distance = dist(this.startVector.x, this.startVector.y, destX, destY);
			a++;
		}
	}

	this.move = function(angle, dirX, dirY){
		// var speedX = this.speed * ();
		// var speedY = this.speed * ();
		if(dirX != 'none' && dirX != null){
			if(dirX == 'left'){
				this.startVector.x -= speedX;
				this.endVector.x -= speedX;
			}else{
				this.startVector.x += speedX;
				this.endVector.x += speedX;
			}
		}
		if(dirY != 'none' && dirY != null){
			if(dirY == 'down'){
				this.startVector.y += speedY;
				this.endVector.y += speedY;
			}else{
				this.startVector.y -= speedY;
				this.endVector.y -= speedY;
			}
		}
		return;
	}

	this.findAngle = function(dirX, dirY, destX, destY){
		
	}
}