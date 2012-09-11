/*
See: http://joelongstreet.com/blog/tag/css-effects/

CSS:
-----
.particle            {z-index:99; position:absolute; width:15px; height:15px; -webkit-border-radius:15px; -webkit-transition:all .75s ease-out;}
   .particle.purple  {background-color:rgba(108, 000, 072, 1);}
   .particle.green   {background-color:rgba(189, 190, 000, 1);}
   .particle.yellow  {background-color:rgba(246, 197, 000, 1);}
   .particle.orange  {background-color:rgba(221, 137, 000, 1);}
   .particle.red     {background-color:rgba(189, 058, 000, 1);}
	
*/


function random_from_to(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function Particles(x, y){
	
	var x_range = 500;
	var y_range = 500;
	var max_particles = 1;
	var min_particles = 5;
	
	this.gen_color = function(){
		var rand = random_from_to(0, 4);
		switch(rand){
			case 0:
				rand = 'purple';
				break;
			case 1:
				rand = 'green';
				break;
			case 2:
				rand = 'yellow';
				break;
			case 3:
				rand = 'orange';
				break;
			case 4:
				rand = 'red';
				break;
		}
		return rand;
	};
	var num_particles = random_from_to(min_particles, max_particles);
	var uid = new Date().getTime();
	for(var i=0; i<num_particles; i++){
		var html_template = "<div class='particle uid_" + uid + ' ' + this.gen_color() + "' style='top:" + y + "px; left:" + x + "px;'></div>";
		$('body').append(html_template);
	}
	
	var particle_uid = '.uid_' + uid;	
	$(particle_uid).each(function(){
		var self = $(this);
		var new_x = random_from_to(x - x_range, x + x_range);
		var new_y = random_from_to(y - y_range, y + y_range);
		setTimeout(function(){
			self.css({ 'left':new_x, 'top':new_y, 'opacity':0 });
		});
		setTimeout(function(){
			self.remove();
		}, 500);
	});
};