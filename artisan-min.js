/* 
Artisan.js by David Brooks. Details at http://www.artisanjs.com
*/
var artisan=(function(window,undefined){if(!document.createElement('canvas').getContext){return;}
var stacks=[];var color_schemes=[];var default_colors=['#AC4A08','#6C88A1','#D9DCC6','#EB9E1A','#FBCC37'];var stack_limit=5;var layer_limit=5;var data_set_limit=5;var history_limit=300;var contexts=[];var global_rotate=0;var current_history=[];return{define:{canvas:function(){},stack:function(){var colors=[];},defaultColors:function(new_default){default_colors=new_default;}},setupCanvas:function(target){var canvas=document.getElementById(target);var context=canvas.getContext('2d');var this_context_pair=[target,context];contexts.push(this_context_pair);},create:{canvas:function(parent,width,height){},stack:function(){var new_stack=[];var new_layer=[];var new_history=[];new_layer.push(new_history);new_stack.push(new_layer);stacks.push(new_stack);if(stacks.length>stack_limit){stacks.splice(0,1);}},layer:function(stack){if(!stack||isNaN(stack)){stack=0;}
var new_layer=[];var new_history=[];new_layer.push(new_history);stacks[stack].push(new_layer);if(stacks[stack].length>layer_limit){stacks[stack].splice(0,1);}},history:function(stack,layer){if(!stack||isNaN(stack)){stack=0;}
if(!layer||isNaN(layer)){layer=0;}
var new_history=[];stacks[stack][layer].push(new_history);if(stacks[stack][layer].length>history_limit){stacks[stack][layer].splice(0,1);}}},collect:{current_history:function(){return current_history;}},addToHistory:function(stack,layer,history_step,directive,information){if(!stack||isNaN(stack)){stack=0;}
if(!layer||isNaN(layer)){layer=0;}
if(!history_step||isNaN(history_step)){history_step=0;}
var new_history=[];new_history.push(directive,information);stacks[stack][layer][history_step].push(new_history);if(stacks[stack][layer][history_step].length>history_limit){stacks[stack][layer][history_step].splice(0,1);}},interpretElement:function(element){var target=document.getElementById(element).tagName;return target;},findContext:function(element){var context='';for(c=0;c<contexts.length;c++){if(contexts[c][0]==element){context=contexts[c][1];}}
if(context===''){artisan.setupCanvas(element);context=artisan.findContext(element);}
return context;},drawCircle:function(target,placex,placey,radius,fill_color,line_width,stroke_color,alpha,shadow_blur,shadow_color,shadow_offset_x,shadow_offset_y){if(placex!=='random'){placex=parseInt(placex,10);}
if(placey!=='random'){placey=parseInt(placey,10);}
if(line_width!=='random'){line_width=parseInt(line_width,10);}
if(shadow_blur!=='random'){shadow_blur=parseInt(shadow_blur,10);}
shadow_offset_x=parseInt(shadow_offset_x,10);shadow_offset_y=parseInt(shadow_offset_y,10);var targeted=document.getElementById(target);var target_width=targeted.width;var target_height=targeted.height;if(!placex){placex=10;}else if(placex==='random'){placex=artisan.randomize(0,target_width);}
if(!placey){placey=10;}else if(placey==='random'){placey=artisan.randomize(0,target_height);}
if(!radius){radius=10;}else if(radius==='random'){radius=artisan.randomize(0,target_width);}
if(fill_color===null){fill_color='';}else if(!fill_color){fill_color=default_colors[0];}else if(fill_color.constructor.toString().indexOf("Array")!==-1){var chosen=artisan.randomize(0,fill_color.length);fill_color=fill_color[chosen];}else if(fill_color==='random'){var chosen_fill=artisan.randomize(0,default_colors.length);fill_color=default_colors[chosen_fill];}
if(!line_width){line_width=0;}else if(line_width==='random'){line_width=artisan.randomize(0,50);}
if(!stroke_color){stroke_color=default_colors[0];}else if(stroke_color==='random'){stroke_color=default_colors[artisan.randomize(0,default_colors.length)];}else if(stroke_color.constructor.toString().indexOf("Array")!==-1){stroke_color=stroke_color[artisan.randomize(0,stroke_color.length)];}
if(!alpha){alpha=1;}else if(alpha==='random'){alpha=artisan.randomize(0,100)/100;}
if(!shadow_blur){shadow_blur=0;}else if(shadow_blur==='random'){shadow_blur=artisan.randomize(0,30);}
if(!shadow_color){shadow_color='';}else if(shadow_color==='random'){shadow_color=default_colors[artisan.randomize(0,default_colors.length)];}else if(shadow_color.length){shadow_color=shadow_color[artisan.randomize(0,shadow_color.length)];}
if(!shadow_offset_x||isNaN(shadow_offset_x)){shadow_offset_x=0;}
if(!shadow_offset_y||isNaN(shadow_offset_y)){shadow_offset_y=0;}
var this_circle=[placex,placey,radius,fill_color,line_width,stroke_color,alpha,shadow_blur,shadow_color,shadow_offset_x,shadow_offset_y];var this_set=['circle',this_circle];current_history.push(this_set);var format=artisan.interpretElement(target);switch(format){case"CANVAS":var context=artisan.findContext(target);context.beginPath();context.lineWidth=line_width;context.globalAlpha=alpha;context.arc(placex,placey,radius,0,Math.PI*2,true);context.closePath();context.fillStyle=fill_color;if(line_width!==0){context.strokeStyle=stroke_color;context.stroke();}
if(shadow_blur){context.shadowOffsetX=shadow_offset_x;context.shadowOffsetY=shadow_offset_y;context.shadowBlur=shadow_blur;context.shadowColor=shadow_color;}
if(fill_color!==''){context.fill();}
break;default:}},drawRectangle:function(target,start_x,start_y,width,height,fill_color,line_width,stroke_color,alpha,shadow_blur,shadow_color,shadow_offset_x,shadow_offset_y){if(start_x!=='random'){start_x=parseInt(start_x,10);}
if(start_y!=='random'){start_y=parseInt(start_y,10);}
if(width!=='random'){width=parseInt(width,10);}
if(height!=='random'){height=parseInt(height,10);}
if(line_width!=='random'){line_width=parseInt(line_width,10);}
if(shadow_blur!=='random'){shadow_blur=parseInt(shadow_blur,10);}
shadow_offset_x=parseInt(shadow_offset_x,10);shadow_offset_y=parseInt(shadow_offset_y,10);var targeted=document.getElementById(target);var target_width=targeted.width;var target_height=targeted.height;if(!start_x){start_x=10;}else if(start_x==='random'){start_x=artisan.randomize(0,target_width);}
if(!start_y){start_y=10;}else if(start_y==='random'){start_y=artisan.randomize(0,target_height);}
if(!width){width=15;}else if(width==='random'){width=artisan.randomize(0,target_height);}
if(!height){height=15;}else if(height==='random'){height=artisan.randomize(0,target_height);}
if(fill_color===null){fill_color='';}else if(!fill_color){fill_color=default_colors[0];}else if(fill_color.constructor.toString().indexOf("Array")!==-1){var chosen=artisan.randomize(0,fill_color.length);fill_color=fill_color[chosen];}else if(fill_color==='random'){var chosen_fill=artisan.randomize(0,default_colors.length);fill_color=default_colors[chosen_fill];}
if(!line_width){line_width=0;}else if(line_width==='random'){line_width=artisan.randomize(0,50);}
if(!stroke_color){stroke_color=default_colors[0];}else if(stroke_color==='random'){stroke_color=default_colors[artisan.randomize(0,default_colors.length)];}else if(stroke_color.length){stroke_color=stroke_color[artisan.randomize(0,stroke_color.length)];}
if(!alpha){alpha=1;}else if(alpha==='random'){alpha=artisan.randomize(0,100)/100;}
if(!shadow_blur){shadow_blur=0;}else if(shadow_blur==='random'){shadow_blur=artisan.randomize(0,30);}
if(!shadow_color){shadow_color='';}else if(shadow_color==='random'){shadow_color=default_colors[artisan.randomize(0,default_colors.length)];}else if(shadow_color.constructor.toString().indexOf("Array")!==-1){shadow_color=shadow_color[artisan.randomize(0,shadow_color.length)];}
if(!shadow_offset_x||isNaN(shadow_offset_x)){shadow_offset_x=0;}
if(!shadow_offset_y||isNaN(shadow_offset_y)){shadow_offset_y=0;}
var format=artisan.interpretElement(target);switch(format){case"CANVAS":var context=artisan.findContext(target);context.fillStyle=fill_color;context.strokeStyle=stroke_color;context.lineWidth=line_width;context.globalAlpha=alpha;if(shadow_blur){context.shadowOffsetX=shadow_offset_x;context.shadowOffsetY=shadow_offset_y;context.shadowBlur=shadow_blur;context.shadowColor=shadow_color;}
context.fillRect(start_x,start_y,width,height);if(line_width!==0){context.strokeRect(start_x,start_y,width,height);}
break;default:}},drawImage:function(target,src,placex,placey,width,height,alpha,fill_color,line_width,stroke_color,shadow_blur,shadow_color,shadow_offset_x,shadow_offset_y){if(src){if(placex!=='random'){placex=parseInt(placex,10);}
if(placey!=='random'){placey=parseInt(placey,10);}
if(shadow_blur!=='random'){shadow_blur=parseInt(shadow_blur,10);}
width=parseInt(width,10);height=parseInt(height,10);shadow_offset_x=parseInt(shadow_offset_x,10);shadow_offset_y=parseInt(shadow_offset_y,10);var targeted=document.getElementById(target);var target_width=targeted.width;var target_height=targeted.height;if(line_width!=='random'){line_width=parseInt(line_width,10);}
if(!placex){placex=10;}else if(placex==='random'){placex=artisan.randomize(0,target_width);}
if(!placey){placey=10;}else if(placey==='random'){placey=artisan.randomize(0,target_height);}
if(!width){width=100;}else if(width==='random'){width=artisan.randomize(0,target_width);}
if(!height){height=100;}else if(height==='random'){height=artisan.randomize(0,target_height);}
if(fill_color===null){fill_color='';}else if(!fill_color){fill_color=default_colors[0];}else if(fill_color.constructor.toString().indexOf("Array")!==-1){var chosen=artisan.randomize(0,fill_color.length);fill_color=fill_color[chosen];}else if(fill_color==='random'){var chosen_fill=artisan.randomize(0,default_colors.length);fill_color=default_colors[chosen_fill];}
if(!line_width){line_width=0;}else if(line_width==='random'){line_width=artisan.randomize(0,50);}
if(!stroke_color){stroke_color=default_colors[0];}else if(stroke_color==='random'){stroke_color=default_colors[artisan.randomize(0,default_colors.length)];}else if(stroke_color.constructor.toString().indexOf("Array")!==-1){stroke_color=stroke_color[artisan.randomize(0,stroke_color.length)];}
if(!alpha){alpha=1;}else if(alpha==='random'){alpha=artisan.randomize(0,100)/100;}else if(alpha<=1){alpha=alpha*100;}
if(!shadow_blur){shadow_blur=0;}else if(shadow_blur==='random'){shadow_blur=artisan.randomize(0,30);}
if(!shadow_color){shadow_color='';}else if(shadow_color==='random'){shadow_color=default_colors[artisan.randomize(0,default_colors.length)];}else if(shadow_color.length){shadow_color=shadow_color[artisan.randomize(0,shadow_color.length)];}
if(!shadow_offset_x||isNaN(shadow_offset_x)){shadow_offset_x=0;}
if(!shadow_offset_y||isNaN(shadow_offset_y)){shadow_offset_y=0;}
var format=artisan.interpretElement(target);switch(format){case"CANVAS":var context=artisan.findContext(target);var this_image=new Image();this_image.src=src;this_image.style.opacity=alpha;this_image.style.MozOpacity=alpha;this_image.onload=function(){context.shadowOffsetX=shadow_offset_x;context.shadowOffsetY=shadow_offset_y;context.shadowBlur=shadow_blur;context.shadowColor=shadow_color;context.strokeStyle=stroke_color;context.fillStyle=fill_color;context.drawImage(this_image,placex,placey,width,height);};break;default:}}},drawPath:function(target,path,line_width,line_color,fill_color){var cp1x,cp1y,cp2x,cp2y,cur_x,cur_y;var context=artisan.findContext(target);if(!path){path=[[0,0]];}
if(!line_width||isNaN(line_width)||line_width===null){line_width=0;}
if(!line_color||line_color===null){line_color='';}
if(!fill_color||fill_color===null){fill_color='';}
var starting_point_x=path[0][0];var starting_point_y=path[0][1];context.beginPath();context.moveTo(starting_point_x,starting_point_y);for(p=1;p<path.length;p++){var point_x=path[p][0];var point_y=path[p][1];if(!path[p][2]){context.lineTo(point_x,point_y);}else if(path[p][2]==='bezier'){cp1x=path[p][3];cp1y=path[p][4];cp2x=path[p][5];cp2y=path[p][6];context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,point_x,point_y);}else if(path[p][2]==='quadratic'){cp1x=cur_x+2.0/3.0*(path[p][3]-cur_x);cp1y=cur_y+2.0/3.0*(path[p][4]-cur_y);cp2x=cp1x+(point_x-cur_x)/3.0;cp2y=cp1y+(point_y-cur_y)/3.0;context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,point_x,point_y);}
cur_x=point_x;cur_y=point_y;}
if(line_width!==0&&line_color!==''){context.lineWidth=line_width;context.stroke();}
if(fill_color!==''){context.fillStyle=fill_color;context.fill();}
context.closePath();},drawLine:function(target,start_x,start_y,end_x,end_y,line_width,line_color,type,cp1_x,cp1_y,cp2_x,cp2_y){var targeted=document.getElementById(target);var target_width=targeted.width;var target_height=targeted.height;if(start_x==='random'){start_x=artisan.randomize(0,target_width);}else if(!start_x||isNaN(start_y)){start_x='';}
if(start_y==='random'){start_y=artisan.randomize(0,target_height);}else if(!start_y||isNaN(start_y)){start_y='';}
if(end_x==='random'){end_x=artisan.randomize(0,target_width);}else if(!end_x||isNaN(end_y)){end_x='';}
if(end_y==='random'){end_y=artisan.randomize(0,target_height);}else if(!end_y||isNaN(end_y)){end_y='';}
if(cp1_x==='random'){cp1_x=artisan.randomize(0,target_width);}else if(!cp1_x||isNaN(cp1_x)){cp1_x=0;}
if(cp1_y==='random'){cp1_y=artisan.randomize(0,target_height);}else if(!cp1_y||isNaN(cp1_y)){cp1_y=0;}
if(cp2_x==='random'){cp2_x=artisan.randomize(0,target_width);}else if(!cp2_x||isNaN(cp2_x)){cp2_x=0;}
if(cp2_y==='random'){cp2_y=artisan.randomize(0,target_height);}else if(!cp2_y||isNaN(cp2_y)){cp2_y=0;}
if(!line_width||isNaN(line_width)||line_width===null){line_width=0;}
if(line_color==='random'){var chosen_color=artisan.randomize(0,default_colors.length);line_color=default_colors[chosen_color];}else if(!line_color||line_color===null){line_color='';}
var context=artisan.findContext(target);context.beginPath();context.moveTo(start_x,start_y);if(!type){context.lineTo(end_x,end_y);}else if(type==='bezier'){cp1_x=parseInt(cp1_x,10);cp1_y=parseInt(cp1_y,10);cp2_x=parseInt(cp2_x,10);cp2_y=parseInt(cp2_y,10);context.bezierCurveTo(cp1_x,cp1_y,cp2_x,cp2_y,end_x,end_y);}else if(type==='quadratic'){cp1_x=start_x+2.0/3.0*(cp1_x-start_x);cp1_y=start_y+2.0/3.0*(cp1_y-start_y);cp2_x=cp1_x+(end_x-start_x)/3.0;cp2_y=cp1_y+(end_y-start_y)/3.0;cp1_x=parseInt(cp1_x,10);cp1_y=parseInt(cp1_y,10);cp2_x=parseInt(cp2_x,10);cp2_y=parseInt(cp2_y,10);context.bezierCurveTo(cp1_x,cp1_y,cp2_x,cp2_y,end_x,end_y);}
if(line_width!==0&&line_color!==''){context.strokeStyle=line_color;context.lineWidth=line_width;context.stroke();}},closePath:function(target){var context=artisan.findContext(target);context.closePath();},drawText:function(target,place_x,place_y,text,text_color,weight,size,font,align,alpha,line_width,line_color,baseline){var targeted=document.getElementById(target);var target_width=targeted.width;var target_height=targeted.height;if(place_x==='random'){place_x=artisan.randomize(0,target_width);}else if(!place_x||isNaN(place_x)){place_x=0;}
if(place_y==='random'){place_y=artisan.randomize(0,target_height);}else if(!place_y||isNaN(place_y)){place_y=0;}
if(!text){text='';}
if(text_color==='random'){chosen_color=artisan.randomize(0,default_colors.length);text_color=default_colors[chosen_color];}else if(text_color.constructor.toString().indexOf("Array")!==-1){chosen_color=artisan.randomize(0,text_color.length);text_color=text_color[chosen_color];}
if(!weight){weight='';}
if(size==='random'){size=artisan.randomize(0,190)+'px';}else if(!size){size='15px';}
if(!font){font='sans-serif';}
var font_style=weight+' '+size+' '+font;if(!align){align='left';}
if(alpha==='random'){alpha=artisan.randomize(0,100)/100;}else if(!alpha||isNaN(alpha)){alpha=1;}
if(line_width==='random'){line_width=artisan.randomize(0,10);}else if(!line_width||isNaN(line_width)){line_width=0;}
if(line_color==='random'){chosen_color=artisan.randomize(0,default_colors.length);line_color=default_colors[chosen_color];}else if(!line_color){line_color='';}
if(!baseline){baseline='top';}
var context=artisan.findContext(target);context.textAlign=align;context.globalAlpha=alpha;context.fillStyle=text_color;context.font=font_style;context.textBaseline=baseline;context.fillText(text,place_x,place_y);if(line_width!==0){context.strokeText(text,place_x,place_y);}},drawStack:function(target,stack,history){if(stack==='latest'){stack=stacks.length-1;}else if(!stack||isNaN(stack)||stack==='first'){stack=0;}
for(l=0;l<stacks[stack].length;l++){if(history==='first'||history===0){history=0;}else if(!history||isNaN(history)||history==='latest'){history=stacks[stack][l].length-1;}
artisan.drawLayer(target,stack,l,history);}},drawLayer:function(target,stack,layer,history){if(!stack||isNaN(stack)){stack=0;}
if(layer==='latest'){layer=stacks[stack].length-1;}else if(!layer||isNaN(layer)||layer==='first'){layer=0;}
if(history==='previous'){history=stacks[stack][layer].length-2;}else if(!history||isNaN(history)||history==='latest'){history=stacks[stack][layer].length-1;}else if(history==='first'||history===0){history=0;}
current_history=[];for(h=0;h<stacks[stack][layer][history].length;h++){var directive=stacks[stack][layer][history][h][0];var information=stacks[stack][layer][history][h][1];switch(directive){case"circle":artisan.drawCircle(target,information[0],information[1],information[2],information[3],information[4],information[5],information[6],information[7],information[8],information[9],information[10],information[11],information[12]);break;case"rectangle":artisan.drawRectangle(target,information[0],information[1],information[2],information[3],information[4],information[5],information[6],information[7],information[8],information[9],information[10],information[11],information[12]);break;case"path":artisan.drawPath(target,information[0],information[1],information[2],information[3],information[4],information[5],information[6],information[7],information[8],information[9],information[10],information[11],information[12]);break;case"image":artisan.drawImage(target,information[0],information[1],information[2],information[3],information[4],information[5],information[6],information[7],information[8],information[9],information[10],information[11],information[12]);break;case"line":artisan.drawLine(target,information[0],information[1],information[2],information[3],information[4],information[5],information[6],information[7],information[8],information[9],information[10],information[11],information[12]);break;case"text":artisan.drawText(target,information[0],information[1],information[2],information[3],information[4],information[5],information[6],information[7],information[8],information[9],information[10],information[11],information[12]);break;default:}}
var old_history=stacks[stack][layer][history].toString();var new_history=current_history.toString();if(new_history===old_history){}else{stacks[stack][layer].push(current_history);if(stacks[stack][layer].length>history_limit){stacks[stack][layer].splice(0,1);}}},randomize:function(l,h){var generated=parseInt(l+(Math.random()*(h-l)),10);return generated;},convertToPercentage:function(value,maximum){var percentage=(100/maximum)*value;return percentage;},convertToPixels:function(value,maximum){var pixel=maximum*(value/100);return pixel;},rotateCanvas:function(target,amount){if(amount==='reset'){amount=global_rotate*-1;}
var context=artisan.findContext(target);var div=360/amount;global_rotate=global_rotate+amount;if(global_rotate<0){global_rotate=360-Math.abs(global_rotate);}else if(global_rotate>360){var diff=global_rotate-360;global_rotate=diff;}
context.rotate((Math.PI*2)/div);},clearCanvas:function(target){var targeted=document.getElementById(target);var target_width=targeted.width;var target_height=targeted.height;var context=artisan.findContext(target);context.clearRect(0,0,target_width,target_height);},resetDefaults:function(context){context.globalAlpha=1;}};})(this);artisan.create.stack();