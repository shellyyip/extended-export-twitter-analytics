module.exports = function(grunt) {
	// Configure tasks
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		watch : {
			options : {
				livereload : true,//needs LiveReload Chrome extension to be turned on
			},
			scripts : {
				files : ['*.html','scripts/*.js','app.js','Gruntfile.js','scss/*.scss'],
				tasks : ['sass', 'autoprefixer','browserify'],
				options : {
					spawn : false,
				}
			},
		},
		sass : {// Task
			dist : {// Target
				options : {// Target options
					style : 'compressed'
				},
				files : {// Dictionary of files
					'scss/sass-compiled.css' : 'scss/main.scss'
				}
			}
		},
		autoprefixer : {
			dist : {
				files : {
					'style.css' : 'scss/sass-compiled.css'
				}
			}
		},
		browserify: {
			main: {
				files: { 'app.js' : ['scripts/main.js'] },
				external: ['jquery']
			},
			options: {
				watch: true
			}
		}
	});

	// Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-browserify');
	// Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['watch', 'sass', 'autoprefixer','jshint','browserify']);

};
