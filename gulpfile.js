import {deleteAsync} from "del";
import {execa} from "execa";
import gulp from "gulp";
import pkg from "./package.json" with {type: "json"};

// Runs a command.
const $ = execa({preferLocal: true, stdio: "inherit"});

// Builds the project.
export function build() {
	return $`tsc --project src/tsconfig.json`;
}

// Deletes all generated files.
export function clean() {
	return deleteAsync(["lib", "var/**/*"]);
}

// Performs the static analysis of source code.
export async function lint() {
	await build();
	await $`tsc --project tsconfig.json`;
	return $`eslint --config=etc/eslint.js gulpfile.js bin src`;
}

// Publishes the package.
export async function publish() {
	for (const action of [["tag"], ["push", "origin"]]) await $`git ${action} v${pkg.version}`;
}

// Watches for file changes.
export async function watch() {
	const execaNode = execa({node: true, nodeOptions: ["--enable-source-maps"], reject: false, stdio: "inherit"});
	await build();

	gulp.watch(["bin/*.js", "src/**/*.ts"], async function restart() {
		await $`tsc --sourceMap --project src/tsconfig.json`;
		return execaNode(pkg.bin.mc2it_card);
	});
}

// The default task.
export default gulp.series(
	clean,
	build
);
