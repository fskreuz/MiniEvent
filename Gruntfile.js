module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsbeautifier : {
      files : [
        'src/**/*.js'
      ],
      options : {
        indent_size: 2,
        indent_level: 0,
        indent_with_tabs: false,
        indent_char: ' ',
        preserve_newlines: true,
        max_preserve_newlines: 10,
        jslint_happy: true,
        brace_style: 'collapse',
        keep_array_indentation: true,
        keep_function_indentation: true,
        space_before_conditional: false,
        eval_code: false,
        indent_case: true,
        wrap_line_length: 80,
        unescape_strings: false
      }
    },
    jshint: {
      files: [
        'Gruntfile.js',
        'src/**/*.js',
        'tests/*.js'
      ],
      options: {
        browser : true
      }
    },
    qunit: {
      files: ['tests/*.html']
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle : true,
        compress : true
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: [
        'jsbeautifier',
        'jshint', 
        'qunit'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  //default: build all
  grunt.registerTask('default', [
    'jsbeautifier',
    'jshint', 
    'qunit', 
    'concat', 
    'uglify'
  ]);

  //test task
  grunt.registerTask('test', [
    'jsbeautifier',
    'jshint', 
    'qunit'
  ]);

  //dev mode task, instant test at save
  grunt.registerTask('devmode', [
    'watch'
  ]);
};