import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import handlebarsHelpers from 'handlebars-helpers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
	// base: '/github-repo-name/',
	root: resolve(__dirname, 'src'),
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src', 'index.html'),
			},
			output: {
				dir: resolve(__dirname, 'dist'),
			},
		},
	},
	plugins: [
		handlebars({
			context: {
				title: 'Hello, 123!',
			},
			helpers: handlebarsHelpers(),
			partialDirectory: resolve(__dirname, 'src', 'partials'),
		}),
		createSvgIconsPlugin({
			iconDirs: [resolve(__dirname, 'src', 'icons')],
			symbolId: '[name]',
			customDomId: '__svg__icons__dom__',
		}),
	],
})
