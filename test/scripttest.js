function documentDone(){
    console.log("done");
}
document.write('\x3cscript type="text/javascript" src="loadfile.js" onload="documentDone()" onerror="documentDone()"\x3e\x3c/script\x3e');
