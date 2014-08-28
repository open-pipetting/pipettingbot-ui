module.exports = function (grunt) {
	grunt.initConfig({
		nodewebkit: {
			options: {
				build_dir: './build',
				win: false,
				mac: false,
				linux64: true
			},
			src: [
				'./package.json',
				'./app/**/*',
				'./node_modules/**/*',
				'./bower_components/**/*'
			]
		}
	});

	grunt.loadNpmTasks('grunt-node-webkit-builder');

	grunt.registerTask('build', ['nodewebkit']);

};
