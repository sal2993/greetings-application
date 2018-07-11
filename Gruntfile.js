/*
 *
 * What my build needs:
 * watch
 * jshint
 * uglify
 * maybe changelog
 * run
 * nodemon
 * concurrent
 *
 */
module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            server: {
                src:[
                    'server/**/*.js',
                    'app.js',
                    'bin/www'
                ],
                options: {
                    jshintrc: '.jshintrc'
                }
            },
            build: {
                src: ['Gruntfile.js'],
                options: {
                    jshintrc: '.jshintrc',
                }
            },
            tests: {
                src: ['./*.test.js'],
                options: '.jshintrc.test'
            }
        },
        watch: {
            js: {
                files: ['server/**/*.js'],
                tasks: ['jshint:server', 'run:commands']
            },
            testjs: {
                files: ['./**/*.test.js'],
                tasks: ['jshint:tests']
            },
            rebuild: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:build']
            }
        },
        run: {
            commands: {
                options: {
                    wait: true
                },
                exec: 'npm test'
            }
        },
        nodemon: {
            dev: {
                script: './bin/www',
                options: {
                    env: {
                        DEBUG: 'greetings-application:*',
                        SECRETKEY: 'testSecret1'
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch', 'run:commands'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', ['jshint']);
    grunt.registerTask('dev', ['build', 'concurrent']);
};
