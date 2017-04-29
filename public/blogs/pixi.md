#The Source Doc for Pixi
#polyfill

##requestAnimationFrame.js
- Add function `now()` for `Date` Class </br> 
	get current timestamp
- Add function `now()` for `Performance` class</br>
 	get current timestamp offset with start time(start time begin with once you mount the pixi.js)
- make `requestAnimation` correct named in globle, if not exist, create it with timer 

##Object.assign.js
- Add mixture function for object with [object-assign](https://github.com/sindresorhus/object-assign)

##Math.assign.js
- Add `sign` function </br>
	if (number < 0) return -1  else return 1
	
#core

##const.js

- VERSION</br> `return the version of current pixi.js, according to package.json in the project`

- PI_2</br> `return Math.PI * 2`

- RAD\_TO\_DEG</br> `return 180 / Math.PI`

- DEG\_TO\_RAD</br> `return return 180 / Math.PI`

- TARGET\_FPMS</br> `fps defult is 0.06`

- RENDERER/_TYPE</br>
	- UNKONWN
	- WEBGL `//use webgl to render the game`
	- CANVAS `// use canvas to render th game`
- BLEND_MODES</br>
	Blend modes for only webgl supports, there are 
	
	`[NORMAL, ADD, MULTIPLY, SCREEN, OVERLAY, DARKEN, LIGHTEN, COLOR_DODGE, COLOR_BURN, HARD_LIGHT, SOFT_LIGHT, DIFFERENCE, EXCLUSION, HUE, STAURATION, COLOR, LUMINOSITY]`
	
- SCALE\_MODES</br>
	- DEFAULT 
	- LINEAR
	- NEARST

- SHAPES</br>
	retun shapes like
	`POLY, RECT, CIRC, ELIP, RREC`

- SPRITE\_BATCH\_SIZE</br>
	`don't konw the usage`
	
##texture

###BaseTexture.js
	
	
##display