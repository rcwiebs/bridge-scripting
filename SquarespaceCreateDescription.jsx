// Set metadata Description text to (c) parent folder name
// Copyright (c) 2020 Dick Wieboldt. All rights reserved.
//-----------------------------------------------------------------------------

#target bridge
if (BridgeTalk.appName == "bridge") {
    try {
        // create menus if they don't exist
        if (MenuElement.find('pmwTools') == null) {
            // menu not created yet
            MenuElement.create('menu', 'PhotoMidwest Tools', 'at the end of Tools', 'pmwTools');
            var csdCmd = MenuElement.create('command', 'Create SquareSpace Description', 'at the end of pmwTools', 'pmwTools/sub1');
       }
        if (MenuElement.find('cpmwTools') == null) {
            // create contextual menu
            MenuElement.create('menu', 'PhotoMidwest Tools', 'after Thumbnail/Open', 'cpmwTools')
            var csdContCmd = MenuElement.create('command', 'Create SquareSpace Description', 'at the end of cpmwTools', 'cpmwTools/sub1');
        }
    } catch (e) {
        alert(e + ' ' + e.line);
    }
}

csdCmd.onSelect = function () {
    displayDialogCSD();
}

csdContCmd.onSelect = function () {
    displayDialogCSD();
}

function displayDialogCSD() {
    // Display modeless dialog
    var MyPalette = new Window("palette"); 
    MyPalette.text = "PhotoMidwest Tools > Create SquareSpace Description"; 
    MyPalette.orientation = "row"; 
    MyPalette.alignChildren = ["fill","top"]; 
    MyPalette.alignChildren = "fill,top";
    MyPalette.spacing = 10; 
    MyPalette.margins = 16; 
    // GROUP1
    // ======
    var group1 = MyPalette.add("group", undefined, {name: "group1"}); 
        group1.orientation = "column"; 
        group1.alignChildren = ["fill","top"]; 
        group1.spacing = 10; 
        group1.margins = 0; 
    var myText = group1.add("group"); 
        myText.orientation = "column"; 
        myText.alignChildren = ["fill","top"]; 
        myText.spacing = 0; 
        myText.minimumSize = [300,-1];
        myText.add("statictext", undefined, "1. Download the meeting folder to your computer.", {name: "myText"}); 
        myText.add("statictext", undefined, "2. Open the folder in Bridge.", {name: "myText"}); 
        myText.add("statictext", undefined, "3. In Bridge, set the option to show items from", {name: "myText"}); 
        myText.add("statictext", undefined, "    subfolders (View > Show Items from Subfolders).", {name: "myText"}); 
        myText.add("statictext", undefined, "4. Select all the images (Edit > Select All). Only", {name: "myText"}); 
        myText.add("statictext", undefined, "    the image files will be processed.", {name: "myText"}); 
        myText.add("statictext", undefined, "5. Click the Run Script button.", {name: "myText"}); 
    // GROUP2
    // ======
    var group2 = MyPalette.add("group", undefined, {name: "group2"}); 
        group2.orientation = "column"; 
        group2.alignChildren = ["fill","top"]; 
        group2.spacing = 10; 
        group2.margins = 0; 
        group2.alignment = ["right","fill"]; 
    var btnRun = group2.add("button", undefined, undefined, {name: "btnRun"}); 
        btnRun.helpTip = "Click this button to run script on all selected images"; 
        btnRun.text = "Run Script"; 
    var btnCancel = group2.add("button", undefined, undefined, {name: "btnCancel"}); 
        btnCancel.helpTip = "Cancel script and close this dialog"; 
        btnCancel.text = "Cancel"; 
    MyPalette.show();
//~     $.writeln("myText.bounds = " + myText.bounds);
//~     $.writeln("myText.dimension = " + myText.dimension);

    btnCancel.onClick = function () {
        MyPalette.close();
        };

    btnRun.onClick = function () {
        MyPalette.close();
        runScriptCSD();
        };
    }

//********* MAIN FUNCTION ***************
// Create description for SquareSpace image block upload
// © {parentFolderName}
function runScriptCSD() {
    // Load the XMP Script library
    var pathToLib;
    if (xmpLib == undefined) {
        if (Folder.fs == "Windows") {
            pathToLib = Folder.startup.fsName + "/AdobeXMPScript.dll";
        } else {
            pathToLib = Folder.startup.fsName + "/AdobeXMPScript.framework";
        }

        var libfile = new File(pathToLib);
        var xmpLib = new ExternalObject("lib:" + pathToLib);
    }
    try {
        if (app.document.selectionLength == 0) {
            alert("Please select one or more images.");
//~             $.writeln("No thumnails selected");
        } else {
            // Get the selected Thumbnail objects - only accept these file types
            var thumbs = app.document.getSelection("psd, jpg, jpeg, png, tif, gif");

            for (var f = 0; f < thumbs.length; ++f) {
                var thumb = thumbs[f];
                // create text for new description
                var folder = thumb.parent.name;
                var str =  "© " + folder;
                // Get the selected file
                var selectedFile = thumb.spec;
                // Get the metadata object - wait for  valid values
                app.synchronousMode = true;
                var md = thumb.synchronousMetadata;
                // Get the XMP packet as a string and create the XMPMeta object
                var xmp = new XMPMeta(md.serialize());
                // delete old description
                xmp.deleteProperty(XMPConst.NS_DC, 'description');            
                // write new description
                xmp.appendArrayItem(XMPConst.NS_DC, 'description', str, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'description[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');
                // or, simply do this:
                // xmp.setLocalizedText(XMPConst.NS_DC, "description", "en", "en-us", str);

               // create text for copyright string
                var date = new Date() ;
                $.writeln("date = " + date);
                var year = date.getUTCFullYear();
                $.writeln("year = " + year);
                var copyright =  "Copyright © " + year + " " + folder + ". All rights reserved.";
                $.writeln("str = " + str);
                // delete old copyright
                xmp.deleteProperty(XMPConst.NS_DC, 'rights');            
                // write new copyright
                xmp.appendArrayItem(XMPConst.NS_DC, 'rights', copyright, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'rights[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');

                // Write the packet back to the selected file
                var updatedPacket = xmp.serialize(XMPConst.SERIALIZE_OMIT_PACKET_WRAPPER | XMPConst.SERIALIZE_USE_COMPACT_FORMAT);
                thumb.metadata = new Metadata(updatedPacket);
              
                // Write the metadata back to the file
                xmp = new XMPFile( thumb.spec.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE );
             }
        }
    } catch (e) {
        alert(e + ' ' + e.line);
    }
}