module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/style.css': 'src/sass/style.scss',
                    'dist/test.css': 'src/sass/test.scss'
                }
            }
        },
        concat: {
            dist: {
                dest: 'dist/jquery.sharrre.src.js',
                options: {
                    sourceMap: true
                },
                src: [
                    "src/js/platform/platform.js",
                    "src/js/platform/*.js",
                    "src/js/**/*.js"
                ]
            }
        },
        uglify: {
            options: {
                "sourceMap": true,
                "separator": ";",
                "preserveComments": function (node, comment) {
                    // preserve comments that start with a bang
                    return /^!/.test(comment.value);
                }
            },
            my_target: {
                files: {
                    "dist/jquery.sharrre.min.js": [
                        "src/js/platform/platform.js",
                        "src/js/platform/*.js",
                        "src/js/**/*.js"
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [
                    {src: ['dist/jquery.sharrre.min.js'], dest: 'jquery.sharrre.min.js', filter: 'isFile'}
                ]
            }
        },
        watch: {
            sass: {
                files: ['src/**/*.scss'],
                tasks: ['sass']
            },
            uglify: {
                files: ['src/**/*.js'],
                tasks: ['uglify', 'copy']
            }
        }
    });
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['watch']);

};