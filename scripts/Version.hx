//! --class-path src
import mc2it_card.Platform;

/** Updates the version number in the sources. **/
function main()
	Tools.replaceInFile("package.json", ~/"version": "\d+(\.\d+){2}"/, '"version": "${Platform.packageVersion}"');
