//! --class-path src --define hxnodejs --define no-deprecation-warnings --library hxnodejs --library tink_core
import haxe.Timer;
import js.glob_watcher.GlobWatcher;
import js.lib.Error as JsError;
using tink.CoreApi;

/** Watches for file changes. **/
function main() {
	measureCommand("lix Build --debug");
	GlobWatcher.watch("src/mc2it_card/**/*.hx", done -> {
		measureCommand(done, "haxe --debug build.hxml");
		Sys.command("node --enable-source-maps bin/mc2it_card.js");
	});
}

/** Measures the time it takes to run the specified `command`. **/
private function measureCommand(?done: Callback<Null<JsError>>, command: String)
	measurePromise(done, command, Promise.irreversible((resolve, reject) ->
		Sys.command(command) == 0 ? resolve(Noise) : reject(new Error('The command "$command" failed.'))
	));

/** Measures the time it takes to run the specified `promise`. **/
private function measurePromise(?done: Callback<Null<JsError>>, prompt: String, promise: Promise<Any>) {
	Sys.print('$prompt ');
	final timestamp = Timer.stamp();
	promise.handle(outcome -> switch outcome {
		case Failure(error): done != null ? done.invoke(error.toJsError()) : throw error;
		case Success(_): Sys.println('> ${Tools.formatDuration(Timer.stamp() - timestamp)}'); done?.invoke(null);
	});
}
