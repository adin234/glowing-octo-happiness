GAMERS.TM
=====
Gamers.tm frontend codebase

Asset structure
```
.
├── css
│   ├── less
│   ├── scss
│   ├── main.css
│   ├── [other plugin css]
├── images
├── js
│	├── components
│	├── dist
│	├── libs
│	├── pages
│	├── [other js scripts]
└── templates
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