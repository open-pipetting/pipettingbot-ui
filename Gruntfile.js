module.exports = function (grunt) {
	grunt.initConfig({
		nodewebkit: {
			options: {
				build_dir: './build',
				win: true,
				mac: true,
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
