import gulp from "gulp";
import {spawn} from "node:child_process";
import {readdir, rm} from "node:fs/promises";
import {delimiter, join, resolve} from "node:path";
import {env} from "node:process";
import pkg from "./package.json" with {type: "json"};

// Initialize the build system.
env.PATH = `${resolve("node_modules/.bin")}${delimiter}${env.PATH}`;

/** Builds the project. */
export function build() {
	return $("tsc", ["--build", "src/tsconfig.json"]);
}

/** Deletes all generated files. */
export async function clean() {
	await rm("lib", {force: true, recursive: true});
	for (const file of await readdir("var")) if (file != ".gitkeep") await rm(join("var", file), {recursive: true});
}

/** Performs the static analysis of source code. */
export async function lint() {
	await build();
	await $("tsc", ["--build", "tsconfig.json"]);
	return $("eslint", ["--config=etc/eslint.js", "gulpfile.js", "bin", "src"]);
}

/** Publishes the package. */
export async function publish() {
	for (const action of [["tag"], ["push", "origin"]]) await $("git", [...action, `v${pkg.version}`]);
}

/** Watches for file changes. */
export async function watch() {
	const startApp = () => spawn("node", ["--enable-source-maps", pkg.bin.mc2it_card], {stdio: "inherit"});
	await build();

	startApp();
	gulp.watch(["bin/*.js", "src/**/*.ts"], async function buildApp() {
		await $("tsc", ["--build", "src/tsconfig.json", "--sourceMap"]);
		return startApp();
	});
}

/** The default task. */
export default gulp.series(
	clean,
	build
);

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @param {import("node:child_process").SpawnOptionsWithoutStdio} [options] The settings to customize how the process is spawned.
 * @return {Promise<void>} Resolves when the command is terminated.
 */
function $(command, args = [], options = {}) {
	const {promise, resolve: fulfill, reject} = /** @type {PromiseWithResolvers<void>} */ (Promise.withResolvers());
	spawn(command, args, {shell: true, stdio: "inherit", ...options}).on("close", code => code ? reject(new Error(command)) : fulfill());
	return promise;
}
