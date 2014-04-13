module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            js: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
                    'bower_components/jquery-ui/ui/effect-slide.js',
                    'FitText.js/jquery.fittext.js',
                    'static-src/js/app.js'
                ],
                dest: 'static/js/requirements.dist.js'
            },
            css: {
                src: [
                    'bower_components/bootstrap-datepicker/css/datepicker.css',
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
                    'bower_components/font-awesome/css/font-awesome.min.css',
                    'static-src-build/css/style.css'
                ],
                dest: 'static/css/style.dist.css'
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, flatten: true, src: ['bower_components/font-awesome/fonts/*'], dest: 'static/fonts/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['bower_components/jquery/dist/jquery.min.map'], dest: 'static/js/', filter: 'isFile'},
                ]
            }
        },

        connect: {
            server: {
                options: {
                    port: "9001"
                }
            }
        },

        watch: {
            dev: {
                files: [
                    "static-src/sass/*",
                    "static-src/js/*",
                    "static-src/jade/*"
                ],
                tasks: ['default']
            }
        },

        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [{
                  cwd: "static-src/jade/",
                  src: "home.jade",
                  dest: "templates/",
                  expand: true,
                  ext: ".html"
                },
                {
                  cwd: "static-src/jade/",
                  src: "home2.jade",
                  dest: "templates/",
                  expand: true,
                  ext: ".html"
                },
                {
                  cwd: "static-src/jade/",
                  src: "home3.jade",
                  dest: "templates/",
                  expand: true,
                  ext: ".html"
                },
                {
                  cwd: "static-src/jade/",
                  src: "home4.jade",
                  dest: "templates/",
                  expand: true,
                  ext: ".html"
                }]
            }
        },

        sass: {
          dist: {
            files: {
              "static-src-build/css/style.css": 'static-src/sass/style.scss',
            }
          }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['sass', 'concat', 'copy', 'jade']);
    grunt.registerTask('dev', ['default', 'connect', 'watch']);

};
