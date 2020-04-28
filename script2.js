var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var myArr =
[
	'red', 'blue', 'green', 'white', 'black', 'grey', 'yellow', 'pink', 'purple', 'violet', 'orange', 'brown' 
];
var mouse = {
	x:undefined,
	y:undefined
}
window.addEventListener('mousemove', function(event){
	mouse.x=event.x;
	mouse.y=event.y;
})
var maxrad=100;
var minrad=5;
function Circle(x, y, r, dx, dy)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = dx;
	this.dy = dy;
	this.color = myArr[Math.floor(Math.random()*myArr.length)];
	this.draw = function()
	{
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
		c.stroke();
		c.fillStyle = this.color;
		c.fill();
	}
	
	this.update = function()
	{
		this.x += this.dx;
		this.y += this.dy;
		if( this.x > innerWidth - this.r || this.x < this.r )
		{
			this.dx = -this.dx;
		}
		if( this.y > innerHeight - this.r || this.y < this.r )
		{
			this.dy = -this.dy;
		}
		
		if(mouse.x-this.x<50&&mouse.x-this.x>-50)
		{
			if(mouse.y-this.y<50&&mouse.y-this.y>-50)
			{
				if(this.r<maxrad)
				{
					this.r += 1;
				}
				
			}
		}
		else if(this.r>minrad)
		{
			this.r -= 1;
		}
		this.draw();
	}
}

var circlearr = [];

for(var i = 0 ; i < 1000 ; i++)
{
	var x = Math.random()*innerWidth;
	var y = Math.random()*innerHeight;
	var r = Math.random()*8;
	var dx = (Math.random()-0.5)*3;
	var dy = (Math.random()-0.5)*3;
	circlearr.push(new Circle(x,y,r,dx,dy));
}

function animate()
{
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	for(i=0;i<circlearr.length;i++)
	{
		circlearr[i].update();
	}
}
animate();