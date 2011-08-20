var artisan = (function(window, undefined) {
	/* 
	Artisan.js by David Brooks. Details at http://www.artisanjs.com
	*/
	if (!document.createElement('canvas').getContext) {
		return;
	} 
	// Stacks are the collections of layers, and histories
	var stacks = [];
	var color_schemes = [];
	// Default values
	var default_colors = ['#AC4A08', '#6C88A1', '#D9DCC6', '#EB9E1A', '#FBCC37'];
	var contexts = [];
	var global_rotate = 0;
	var current_history = [];
	var images = [];
	
	return {
		define: {
			canvas: function() {
			
			},
			stack: function(){
				var colors = [];
			},
			defaultColors: function(new_default){
				default_colors = new_default;
			}
		},
		setupCanvas: function(target){
			var canvas = document.getElementById(target); 
			var context = canvas.getContext('2d');
			var this_context_pair = [target, context];
			contexts.push(this_context_pair);
		},
		create: {
			canvas: function(parent, width, height){
				// This creates a canvas element inside of parent selector
			},
			stack: function(){
				// This adds a stack to the stacks
				var new_stack = [];
				var new_layer = [];
				var new_history = [];
				new_layer.push(new_history);
				new_stack.push(new_layer);
				stacks.push(new_stack);
				return stacks.length - 1;
			},
			layer: function(stack){
				// This creates a layer and adds it to the stack
				if (!stack || isNaN(stack)) {
					stack = 0;
				}
				var new_layer = [];
				var new_history = [];
				new_layer.push(new_history);
				stacks[stack].push(new_layer);
				return stacks[stack].length - 1;
			},
			history: function(stack, layer){
				// This adds a history layer to a data set
				if (!stack || isNaN(stack)) {
					stack = 0;
				}
				if (!layer || isNaN(layer)) {
					layer = 0;
				}
				var new_history = [];
				stacks[stack][layer].push(new_history);
				return stacks[stack][layer].length - 1;
			}
		},
		clear: {
			layer: function(stack, layer){
				// This clears the given layer of data
				if (!stack || isNaN(stack)) {
					stack = 0;
				}
				if (!layer || isNaN(layer)) {
					layer = 0;
				}
				var target_layer = stacks[stack][layer];
				for(l=0; l < target_layer.length; l++) {
					target_layer[l] = [];
				}
			}
		},
		collect: {
			current_history: function(){
				return current_history;
			}
		},
		convertTo: {
			PNG: function(target){
				var image_file = document.getElementById(target);
				image_file = image_file.toDataURL();
				return image_file;
			}
		},
		addToHistory: function(stack, layer, history_step, directive, information){
			if (!stack || isNaN(stack)) {
				stack = 0;
			}
			if (!layer || isNaN(layer)) {
				layer = 0;
			}
			if (!history_step || isNaN(history_step)) {
				history_step = 0;
			}
			var new_history = [];
			new_history.push(directive, information);
			stacks[stack][layer][history_step].push(new_history);
		},
		interpretElement: function(element){
			var target = document.getElementById(element).tagName;
			return target;
		},
		findContext: function(element) {
			var context = '';
			for(c = 0; c < contexts.length; c++) {
				if (contexts[c][0] == element) {
					context = contexts[c][1];
				}
			}
			if (context === '') {
				artisan.setupCanvas(element);
				context = artisan.findContext(element);
			}
			return context;
		},
		drawCircle: function(target, placex, placey, radius, fill_color, line_width, stroke_color, alpha, shadow_blur, shadow_color, shadow_offset_x, shadow_offset_y){
			// This handles the drawing of a circle in all three supported formats
			var targeted = document.getElementById(target);
			var target_width = targeted.width;
			var target_height = targeted.height;
			placex = artisan.interpretRequest(placex, target_width);
			placey = artisan.interpretRequest(placey, target_height);
			line_width = artisan.interpretRequest(line_width, target_width);
			radius = artisan.interpretRequest(radius, target_width);
			fill_color = artisan.interpretColor(fill_color);
			alpha = artisan.interpretAlpha(alpha);
			stroke_color = artisan.interpretColor(stroke_color);
			shadow_color = artisan.interpretColor(shadow_color);
			if (shadow_blur !== 'random') {
				shadow_blur = parseInt(shadow_blur, 10);
			}
			shadow_offset_x = parseInt(shadow_offset_x, 10);
			shadow_offset_y = parseInt(shadow_offset_y, 10);
			if (!shadow_blur) {
				shadow_blur = 0;
			} else if (shadow_blur === 'random') {
				shadow_blur = artisan.randomize(0,30);
			} 
			if (!shadow_offset_x || isNaN(shadow_offset_x)){
				shadow_offset_x = 0;
			}
			if (!shadow_offset_y || isNaN(shadow_offset_y)){
				shadow_offset_y = 0;
			}
			var this_circle = [placex, placey, radius, fill_color, line_width, stroke_color, alpha, shadow_blur, shadow_color, shadow_offset_x, shadow_offset_y];
			var this_set = ['circle', this_circle];
			current_history.push(this_set);
			
			var format = artisan.interpretElement(target);			
			switch(format) {
			case "CANVAS":
				// Canvas
				var context = artisan.findContext(target);
				context.beginPath();
				context.lineWidth = line_width;
				context.globalAlpha = alpha;
				context.arc(placex, placey, radius, 0, Math.PI * 2, true);
				context.closePath();
				context.fillStyle = fill_color;
				if (line_width !== 0) {
					context.strokeStyle = stroke_color;
					context.stroke();
				}
				if (shadow_blur) { 
					context.shadowOffsetX = shadow_offset_x;
					context.shadowOffsetY = shadow_offset_y;
					context.shadowBlur = shadow_blur;
					context.shadowColor = shadow_color;
				}
				if (fill_color !== '') {
					context.fill();
				}
				break;
			default:
				// Standard Code
			}
		},
		drawRectangle: function(target, start_x, start_y, width, height, fill_color, line_width, stroke_color, alpha, shadow_blur, shadow_color, shadow_offset_x, shadow_offset_y){
			var targeted = document.getElementById(target);
			var target_width = targeted.width;
			var target_height = targeted.height;
			start_x = artisan.interpretRequest(start_x, target_width);
			start_y = artisan.interpretRequest(start_y, target_height);
			width = artisan.interpretRequest(width, target_width);
			height = artisan.interpretRequest(height, target_height);
			line_width = artisan.interpretRequest(line_width, target_width);
			stroke_color = artisan.interpretColor(stroke_color);
			fill_color = artisan.interpretColor(fill_color);
			alpha = artisan.interpretAlpha(alpha);
			if (shadow_blur !== 'random') {
				shadow_blur = parseInt(shadow_blur, 10);
			}
			shadow_offset_x = parseInt(shadow_offset_x, 10);
			shadow_offset_y = parseInt(shadow_offset_y, 10);
			if (!shadow_blur) {
				shadow_blur = 0;
			} else if (shadow_blur === 'random') {
				shadow_blur = artisan.randomize(0,30);
			} 
			if (!shadow_color) {
				shadow_color = '';
			} else if (shadow_color === 'random') {
				shadow_color = default_colors[artisan.randomize(0,default_colors.length)];
			} else if (shadow_color.constructor.toString().indexOf("Array") !== -1) {
				shadow_color = shadow_color[artisan.randomize(0,shadow_color.length)];
			}
			if (!shadow_offset_x || isNaN(shadow_offset_x)){
				shadow_offset_x = 0;
			}
			if (!shadow_offset_y || isNaN(shadow_offset_y)){
				shadow_offset_y = 0;
			}
			var format = artisan.interpretElement(target);	
			switch(format) {
			case "CANVAS":
				// Canvas
				var context = artisan.findContext(target);
				context.fillStyle = fill_color;
				context.strokeStyle = stroke_color;
				context.lineWidth = line_width;
				context.globalAlpha = alpha;
				if (shadow_blur) { 
					context.shadowOffsetX = shadow_offset_x;
					context.shadowOffsetY = shadow_offset_y;
					context.shadowBlur = shadow_blur;
					context.shadowColor = shadow_color;
				}
				context.fillRect(start_x, start_y, width, height);
				if (line_width !== 0) {
					context.strokeRect(start_x, start_y, width, height);
				}
				break;
			default:
				// Standard Code
			}
		},
		drawImage: function(target, src, placex, placey, width, height, alpha, fill_color, line_width, stroke_color, shadow_blur, shadow_color, shadow_offset_x, shadow_offset_y){
			var targeted = document.getElementById(target);
			var target_width = targeted.width;
			var target_height = targeted.height;
			if (src) {
				placex = artisan.interpretRequest(placex, target_width);
				placey = artisan.interpretRequest(placey, target_height);
				width = artisan.interpretRequest(width, target_width);
				height = artisan.interpretRequest(height, target_height);
				line_width = artisan.interpretRequest(line_width, target_width);
				fill_color = artisan.interpretColor(fill_color);
				alpha = artisan.interpretAlpha(alpha);
				stroke_color = artisan.interpretColor(stroke_color);
				shadow_color = artisan.interpretColor(shadow_color);
				if (shadow_blur !== 'random') {
					shadow_blur = parseInt(shadow_blur, 10);
				}
				shadow_offset_x = parseInt(shadow_offset_x, 10);
				shadow_offset_y = parseInt(shadow_offset_y, 10);
				if (!shadow_blur) {
					shadow_blur = 0;
				} else if (shadow_blur === 'random') {
					shadow_blur = artisan.randomize(0,30);
				} 
				if (!shadow_color) {
					shadow_color = '';
				} else if (shadow_color === 'random') {
					shadow_color = default_colors[artisan.randomize(0,default_colors.length)];
				} else if (shadow_color.length) {
					shadow_color = shadow_color[artisan.randomize(0,shadow_color.length)];
				}
				if (!shadow_offset_x || isNaN(shadow_offset_x)){
					shadow_offset_x = 0;
				}
				if (!shadow_offset_y || isNaN(shadow_offset_y)){
					shadow_offset_y = 0;
				}
				var format = artisan.interpretElement(target);	
				switch(format) {
				case "CANVAS":
					// Canvas
					var context = artisan.findContext(target);
					var this_image = new Image();
					this_image.src = src;
					this_image.style.opacity = alpha;
					this_image.style.MozOpacity = alpha;
					this_image.onload = function(){
						context.shadowOffsetX = shadow_offset_x;
						context.shadowOffsetY = shadow_offset_y;
						context.shadowBlur = shadow_blur;
						context.shadowColor = shadow_color;
						context.strokeStyle = stroke_color;
						context.fillStyle = fill_color;
						context.drawImage(this_image, placex, placey, width, height);
					};
					break;
				default:
					// Standard Code
				}
			}
		},
		drawPath: function(target, path, line_width, line_color, fill_color, alpha) {
			var targeted = document.getElementById(target);
			var target_width = targeted.width;
			var target_height = targeted.height;
			var cp1x, cp1y, cp2x, cp2y, cur_x, cur_y;
			var context = artisan.findContext(target);
			if (!path) {
				path = [[0,0]];
			}
			line_width = artisan.interpretRequest(line_width, target_width);
			fill_color = artisan.interpretColor(fill_color);
			alpha = artisan.interpretAlpha(alpha);
			line_color = artisan.interpretColor(line_color);
			var starting_point_x = path[0][0];
			starting_point_x = artisan.interpretRequest(starting_point_x, target_width);
			var starting_point_y = path[0][1];
			starting_point_y = artisan.interpretRequest(starting_point_y, target_height);
			context.beginPath();
			context.moveTo(starting_point_x, starting_point_y);
			for (p = 1; p < path.length; p++) {
				var point_x = path[p][0];
				point_x = artisan.interpretRequest(point_x, target_width);
				var point_y = path[p][1];
				point_y = artisan.interpretRequest(point_y, target_height);
				if (!path[p][2]) {	
					context.lineTo(point_x, point_y);
				} else if (path[p][2] === 'bezier'){
					cp1x = path[p][3];
					cp1x = artisan.interpretRequest(cp1x, target_width);
					cp1y = path[p][4];
					cp1y = artisan.interpretRequest(cp1y, target_height);
					cp2x = path[p][5];
					cp2x = artisan.interpretRequest(cp2x, target_width);
					cp2y = path[p][6];
					cp2y = artisan.interpretRequest(cp2y, target_height);
					context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, point_x, point_y);
				} else if (path[p][2] === 'quadratic') {
					cp1x = cur_x + 2.0/3.0*(path[p][3] - cur_x); 
					cp1x = artisan.interpretRequest(cp1x, target_width); 
					cp1y = cur_y + 2.0/3.0*(path[p][4] - cur_y); 
					cp1y = artisan.interpretRequest(cp1y, target_height); 
					cp2x = cp1x + (point_x - cur_x)/3.0;  
					cp2x = artisan.interpretRequest(cp2x, target_width);
					cp2y = cp1y + (point_y - cur_y)/3.0;  
					cp2y = artisan.interpretRequest(cp2y, target_height);
					context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, point_x, point_y);
				}
				cur_x = point_x;
				cur_y = point_y;
			}
			if (line_width !== 0 && line_color !== '') {
				line_width = artisan.analyzeValue(line_width, target_width);
				context.lineWidth = line_width;
				context.stroke();
			}
			if (fill_color !== '') {
				context.fillStyle = fill_color;
				context.fill();
			}
			context.closePath();
		},
		drawLine: function(target, start_x, start_y, end_x, end_y, line_width, line_color, type, cp1_x, cp1_y, cp2_x, cp2_y){
			var targeted = document.getElementById(target);
			var target_width = targeted.width;
			var target_height = targeted.height;
			start_x = artisan.interpretRequest(start_x, target_width);
			start_y = artisan.interpretRequest(start_y, target_height);
			end_x = artisan.interpretRequest(end_x, target_width);
			end_y = artisan.interpretRequest(end_y, target_height);
			cp1_x = artisan.interpretRequest(cp1_x, target_width);
			cp1_y = artisan.interpretRequest(cp1_y, target_height);
			cp2_x = artisan.interpretRequest(cp2_x, target_width);
			cp2_y = artisan.interpretRequest(cp2_y, target_height);
			line_width = artisan.interpretRequest(line_width, target_width);
			line_color = artisan.interpretColor(line_color);
			var context = artisan.findContext(target);
			context.beginPath();
			context.moveTo(start_x, start_y);
				if (!type) {	
					context.lineTo(end_x, end_y);
				} else if (type === 'bezier'){
					cp1_x = parseInt(cp1_x, 10);
					cp1_y = parseInt(cp1_y, 10);
					cp2_x = parseInt(cp2_x, 10);
					cp2_y = parseInt(cp2_y, 10);
					context.bezierCurveTo(cp1_x, cp1_y, cp2_x, cp2_y, end_x, end_y);
				} else if (type === 'quadratic') {
					cp1_x = start_x + 2.0/3.0*(cp1_x - start_x);  
					cp1_y = start_y + 2.0/3.0*(cp1_y - start_y);  
					cp2_x = cp1_x + (end_x - start_x)/3.0;  
					cp2_y = cp1_y + (end_y - start_y)/3.0;  
					cp1_x = parseInt(cp1_x, 10);
					cp1_y = parseInt(cp1_y, 10);
					cp2_x = parseInt(cp2_x, 10);
					cp2_y = parseInt(cp2_y, 10);
					context.bezierCurveTo(cp1_x, cp1_y, cp2_x, cp2_y, end_x, end_y);
				}
			if (line_width !== 0 && line_color !== '') {
				context.strokeStyle = line_color;
				context.lineWidth = line_width;
				context.stroke();
			}
		},
		closePath: function(target) {
			var context = artisan.findContext(target);
			context.closePath();
		},
		drawText: function(target, place_x, place_y, text, text_color, weight, size, font, align, alpha, line_width, line_color, baseline){
			var targeted = document.getElementById(target);
			var target_width = targeted.width;
			var target_height = targeted.height;
			place_x = artisan.interpretRequest(place_x, target_width);
			place_y = artisan.interpretRequest(place_y, target_height);
			text_color = artisan.interpretColor(text_color);
			alpha = artisan.interpretAlpha(alpha);
			line_width = artisan.interpretRequest(line_width, target_width);
			line_color = artisan.interpretColor(line_color);
			if (!text) {
				text = '';
			}
			if (!weight) {
				weight = '';
			}
			if (size !== 'random' && size) {
				size = artisan.analyzeValue(size, target_width) + 'px';
			} else if (size === 'random') {
				size = artisan.randomize(0,190) + 'px';
			} else if (!size) {
				size = '15px';
			}
			if (!font) {
				font = 'sans-serif';
			}
			var font_style = weight + ' ' + size + ' ' + font;
			if (!align) {
				align = 'left';
			}
			if (!baseline) {
				baseline = 'top';
			}
			var context = artisan.findContext(target);
			context.textAlign = align;
			context.globalAlpha = alpha;
			context.fillStyle = text_color;
			context.font = font_style;
			context.textBaseline = baseline;
			context.fillText(text, place_x, place_y);
			if (line_width !== 0) {
				context.strokeText(text, place_x, place_y);		
			}
		},
		drawStack: function(target, stack, history){
			// This draws the stack to the targeted element
			if (stack === 'latest') {
				stack = stacks.length - 1;
			} else if (!stack || isNaN(stack) || stack === 'first') {
				stack = 0;
			}
			// Iterate through the layers
			for (l = 0; l < stacks[stack].length; l++) {
				// Iterate through the history
				if (history === 'first' || history === 0) {
					history = 0;
				} else if (!history || isNaN(history) || history === 'latest') {
					history = stacks[stack][l].length - 1;
				}
				artisan.drawLayer(target, stack, l, history);
			}
		},
		drawLayer: function(target, stack, layer, history) {
				// This draws the stack to the targeted element
				if (!stack || isNaN(stack)) {
					stack = 0;
				}
				if (layer === 'latest') {
					layer = stacks[stack].length - 1;
				} else if (!layer || isNaN(layer) || layer === 'first') {
					layer = 0;
				}
					// Iterate through the history
					if (history === 'previous') {
						history = stacks[stack][layer].length - 2;
					} else if (!history || isNaN(history) || history === 'latest') {
						history = stacks[stack][layer].length - 1;
					} else if (history === 'first' || history === 0) {
						history = 0;
					}
					// Iterate through the steps of this history
					current_history = [];
					for (h=0; h < stacks[stack][layer][history].length; h++) {
						// do things, like render circles and whatnot.
						var directive = stacks[stack][layer][history][h][0];
						var information = stacks[stack][layer][history][h][1];			
						artisan.handleDirective(target,directive,information);
					}
					var old_history = stacks[stack][layer][history].toString();
					var new_history = current_history.toString();
					if (new_history !== old_history) {
						stacks[stack][layer][history].push(current_history);
					}
		},
		randomize: function(l,h){
			var generated = parseInt(l + (Math.random() * (h - l)), 10);
			return generated;
		},
		convertToPercentage: function(value, maximum) {
			var percentage = (100 / maximum) * value;
			return percentage;
		},
		convertToPixels: function(value, maximum) {
			var pixel =  maximum * (value / 100);
			return pixel;
		},
		rotateCanvas: function(target, amount) {
			if (amount === 'reset') {
				amount = global_rotate * -1;
			} else if (amount === 'random') {
				amount = artisan.randomize(-1, 360);
			}
			var context = artisan.findContext(target);
			var div = 360 / amount;
			global_rotate = global_rotate + amount;
			if (global_rotate < 0) {
				global_rotate = 360 - Math.abs(global_rotate);
			} else if (global_rotate > 360) {
				var diff = global_rotate - 360;
				global_rotate = diff;
			}
			context.rotate((Math.PI * 2) / div);  
		},
		clearCanvas: function(target){
			var targeted = document.getElementById(target);
			var target_width = targeted.width;
			var target_height = targeted.height;
			var context = artisan.findContext(target);
			context.clearRect(0, 0, target_width, target_height);
		},
		resetDefaults: function(context){
			context.globalAlpha = 1;
		},
		analyzeValue: function(measurement, scale_measure) {
			var measurement = measurement.toString();
			if (!!(measurement.match('%'))) {
				// This is a percentage value
				measurement = parseFloat(measurement);
				measurement = artisan.convertToPixels(measurement, scale_measure);
			} else if (!!(measurement.match('px'))){
				// This is a pixel value
				measurement = parseInt(measurement);
			} else {
				// This is neither specified as pixel or percentage
				measurement = parseInt(measurement);
			}
			return measurement;
		},
		interpretRequest: function(request, scale_measure){
			var num_check = parseInt(request);
			if (request === 'random') {
				request = artisan.randomize(0, scale_measure);
			} else if (request === 'center') {
				request = scale_measure / 2;
			} else if (!request || isNaN(num_check)){
				request = 0;
			} else {
				request = artisan.analyzeValue(request, scale_measure);
			}
			return request;
		},
		interpretColor: function(request) {
			if (request === null || !request) {
				request = '';
			} else if (request.constructor.toString().indexOf("Array") !== -1) {
				var chosen = artisan.randomize(0,request.length);
				request = request[chosen];
			} else if (request === 'random'){
				var chosen_fill = artisan.randomize(0, default_colors.length);
				request = default_colors[chosen_fill];
			} else {
				request = request;
			}
			return request;
		},
		interpretAlpha: function(alpha){
			if (alpha) {
				alpha = alpha.toString();
				if (!!(alpha.match('%'))){
					alpha = parseFloat(alpha) / 100;
				} else if (alpha === 'random') {
					alpha = artisan.randomize(0, 100) / 100;
				}
			} else {
				alpha = 1;
			}
			return alpha;
		},
		handleDirective: function(target, directive, information){
			switch(directive) {
				case "circle":
					// Circle
					artisan.drawCircle(target, information[0], information[1], information[2], information[3], information[4], information[5], information[6], information[7], information[8], information[9], information[10], information[11], information[12]);
					break;
				case "rectangle":
					// Rectangle
					artisan.drawRectangle(target, information[0], information[1], information[2], information[3], information[4], information[5], information[6], information[7], information[8], information[9], information[10], information[11], information[12]);
					break;
				case "path": 
					// Path
					artisan.drawPath(target, information[0], information[1], information[2], information[3], information[4], information[5], information[6], information[7], information[8], information[9], information[10], information[11], information[12]);
					break;
				case "image": 
					// Image
					artisan.drawImage(target, information[0], information[1], information[2], information[3], information[4], information[5], information[6], information[7], information[8], information[9], information[10], information[11], information[12]);
					break;
				case "line": 
					// Image
					artisan.drawLine(target, information[0], information[1], information[2], information[3], information[4], information[5], information[6], information[7], information[8], information[9], information[10], information[11], information[12]);
					break;	
				case "text":
					// Text
					artisan.drawText(target, information[0], information[1], information[2], information[3], information[4], information[5], information[6], information[7], information[8], information[9], information[10], information[11], information[12]);
					break;
				default:
					// Standard Code
			}
		}
	};
})(this);
artisan.create.stack();