GAMERS.TM
=====
Gamers.tm frontend codebase

Asset structure
```
.
├── css
│   ├── less
│   ├── scss							//sass styles
│   ├── main.css 						//compiled used for all pages css
│   ├── [other plugin css]				//some css from plugins
├── images
├── js
│	├── components						//contains basic components organized by folder
│	├── dist							//compiled components and pages minified for production
│	├── libs							//plugins and libs
│	├── pages							//page specific js codes
│	├── config.js						//contains environment configuration and defines global variables like serve paths, etc.
│	├── util.js							//contains helper functions for things like connecting socket server, checking login status, etc..
│	├── [other js scripts]				//initialization scripts and some old js
└── templates							//contains JST templates used as an alternative to html template
```

Page structure

A page includes the following scripts/styles.
```
	assets/css/main.css
	assets/css/{additional css for plugins}.css
	assets/js/config.js
	assets/js/util.js
	assets/js/dist/{page specific js}.js
```


###Setup
```npm install gulp -g```

```npm install```

###Compressing images
```gulp image-compressed```

###Compiling styles
```gulp sass```

###Compiling templates
```gulp template-compile```

###Development MODE
```gulp dev```