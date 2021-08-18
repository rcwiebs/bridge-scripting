// Set metadata fields in selected images for upload to SquareSpace gallery
// Filename format must be artistName_imageTitle.jpg
//      TITLE = imageTitle field from filename
//      DESCRIPTION = © artistName field from filename, optionalWebsiteLink
//      Tags = imageTitle field • artistName field
//  © symbol = Alt key + keypad 0169
//  • symbol = Alt key + keypad 0149
//
// Copyright © 2020 Dick Wieboldt. All rights reserved.
//-----------------------------------------------------------------------------
//
// USE THIS JSX !!! - It combines the older FestivalTagging.jsx & SquarespaceCreateDescription.jsx scripts. *********
//
//------------------------------------------------------------------------------

#target bridge
if (BridgeTalk.appName == "bridge") {
    try {
        // create menus if they don't exist
        if (MenuElement.find('pmwTools') == null) {
            // menu not created yet
            MenuElement.create('menu', 'PhotoMidwest Tools', 'at the end of Tools', 'pmwTools');
            var ftCmd = MenuElement.create('command', 'Add Festival Image Tags', 'at the end of pmwTools', 'pmwTools/sub1');
            //var csdCmd = MenuElement.create('command', 'Create SquareSpace Description', 'at the end of pmwTools', 'pmwTools/sub2');
            var igtCmd = MenuElement.create('command', 'Add Interest Group Tags', 'at the end of pmwTools', 'pmwTools/sub2');
        }
        if (MenuElement.find('cpmwTools') == null) {
            // create contextual menu
            MenuElement.create('menu', 'PhotoMidwest Tools', 'after Thumbnail/Open', 'cpmwTools');
            var ftContCmd = MenuElement.create('command', 'Add Festival Image Tags', 'at the end of cpmwTools', 'cpmwTools/sub1');
            //var csdContCmd = MenuElement.create('command', 'Create SquareSpace Description', 'at the end of cpmwTools', 'cpmwTools/sub2');
            var igtContCmd = MenuElement.create('command', 'Add Interest Group Tags', 'at the end of cpmwTools', 'cpmwTools/sub2');
        }
    } catch (e) {
        alert(e + ' ' + e.line);
    }
}

ftCmd.onSelect = function () {
    displayDialogFT();
};

ftContCmd.onSelect = function () {
    displayDialogFT();
};

csdCmd.onSelect = function () {
    displayDialogCSD();
};

csdContCmd.onSelect = function () {
    displayDialogCSD();
};

igtCmd.onSelect = function () {
    displayDialogIGT();
};

igtContCmd.onSelect = function () {
    displayDialogIGT();
};

function displayDialogFT() {
    // Display modeless dialog
    var FestPalette = new Window('palette');
    FestPalette.text = "PhotoMidwest Tools > Add Festival Image Tags";
    FestPalette.orientation = "row";
    FestPalette.alignChildren = ["fill", "top"];
    FestPalette.spacing = 10;
    FestPalette.margins = 16;
    // GROUP1
    // ======
    var group1 = FestPalette.add("group", undefined, {
        name: "group1"
    });
    group1.orientation = "column";
    group1.alignChildren = ["fill", "top"];
    group1.spacing = 10;
    group1.margins = 0;
    var myText = group1.add("group");
    myText.orientation = "column";
    myText.alignChildren = ["fill", "top"];
    myText.spacing = 0;
    myText.minimumSize = [300, -1];
    myText.add("statictext", undefined, "1. Move all images to a single folder to your computer.\r2. Open the folder in Bridge.\r3. Select all the images (Edit > Select All). Only\r    the image files will be processed.\r4. Click the Run Script button.", {
        multiline: true
    });
    // GROUP2
    // ======
    var group2 = FestPalette.add("group", undefined, {
        name: "group2"
    });
    group2.orientation = "column";
    group2.alignChildren = ["fill", "top"];
    group2.spacing = 10;
    group2.margins = 0;
    group2.alignment = ["right", "fill"];
    var btnRun = group2.add("button", undefined, undefined, {
        name: "btnRun"
    });
    btnRun.helpTip = "Click this button to run script on all selected images";
    btnRun.text = "Run Script";
    var btnCancel = group2.add("button", undefined, undefined, {
        name: "btnCancel"
    });
    btnCancel.helpTip = "Cancel script and close this dialog";
    btnCancel.text = "Cancel";
    FestPalette.show();
    //~     $.writeln("myText.bounds = " + myText.bounds);
    //~     $.writeln("myText.dimension = " + myText.dimension);

    btnCancel.onClick = function () {
        FestPalette.close();
    };

    btnRun.onClick = function () {
        FestPalette.close();
        runScriptFT();
    };
}

function displayDialogCSD() {
    // Display modeless dialog
    var MyPalette = new Window("palette");
    MyPalette.text = "PhotoMidwest Tools > Create SquareSpace Description";
    MyPalette.orientation = "row";
    MyPalette.alignChildren = ["fill", "top"];
    MyPalette.alignChildren = "fill,top";
    MyPalette.spacing = 10;
    MyPalette.margins = 16;
    // GROUP1
    // ======
    var group1 = MyPalette.add("group", undefined, {
        name: "group1"
    });
    group1.orientation = "column";
    group1.alignChildren = ["fill", "top"];
    group1.spacing = 10;
    group1.margins = 0;
    var myText = group1.add("group");
    myText.orientation = "column";
    myText.alignChildren = ["fill", "top"];
    myText.spacing = 0;
    myText.minimumSize = [300, -1];
    myText.add("statictext", undefined, "1. Download the meeting folder to your computer.", {
        name: "myText"
    });
    myText.add("statictext", undefined, "2. Open the folder in Bridge.", {
        name: "myText"
    });
    myText.add("statictext", undefined, "3. In Bridge, set the option to show items from", {
        name: "myText"
    });
    myText.add("statictext", undefined, "    subfolders (View > Show Items from Subfolders).", {
        name: "myText"
    });
    myText.add("statictext", undefined, "4. Select all the images (Edit > Select All). Only", {
        name: "myText"
    });
    myText.add("statictext", undefined, "    the image files will be processed.", {
        name: "myText"
    });
    myText.add("statictext", undefined, "5. Click the Run Script button.", {
        name: "myText"
    });
    // GROUP2
    // ======
    var group2 = MyPalette.add("group", undefined, {
        name: "group2"
    });
    group2.orientation = "column";
    group2.alignChildren = ["fill", "top"];
    group2.spacing = 10;
    group2.margins = 0;
    group2.alignment = ["right", "fill"];
    var btnRun = group2.add("button", undefined, undefined, {
        name: "btnRun"
    });
    btnRun.helpTip = "Click this button to run script on all selected images";
    btnRun.text = "Run Script";
    var btnCancel = group2.add("button", undefined, undefined, {
        name: "btnCancel"
    });
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

function displayDialogIGT() {
    // Display modeless dialog for Interst Group Tags
    var IGTPalette = new Window('palette');
    IGTPalette.text = "PhotoMidwest Tools > Add Interest Group Tags";
    IGTPalette.orientation = "row";
    IGTPalette.alignChildren = ["fill", "top"];
    IGTPalette.spacing = 10;
    IGTPalette.margins = 16;
    // GROUP1
    // ======
    var group1 = IGTPalette.add("group", undefined, {
        name: "group1"
    });
    group1.orientation = "column";
    group1.alignChildren = ["fill", "top"];
    group1.spacing = 10;
    group1.margins = 0;
    var myText = group1.add("group");
    myText.orientation = "column";
    myText.alignChildren = ["fill", "top"];
    myText.spacing = 0;
    myText.minimumSize = [300, -1];
    myText.add("statictext", undefined, "1. Move all images to a single folder to your computer.\r2. Open the folder in Bridge.\r3. Select all the images (Edit > Select All). Only\r    the image files will be processed.\r4. Click the Run Script button.", {
        multiline: true
    });
    // GROUP2
    // ======
    var group2 = IGTPalette.add("group", undefined, {
        name: "group2"
    });
    group2.orientation = "column";
    group2.alignChildren = ["fill", "top"];
    group2.spacing = 10;
    group2.margins = 0;
    group2.alignment = ["right", "fill"];
    var btnRun = group2.add("button", undefined, undefined, {
        name: "btnRun"
    });
    btnRun.helpTip = "Click this button to run script on all selected images";
    btnRun.text = "Run Script";
    var btnCancel = group2.add("button", undefined, undefined, {
        name: "btnCancel"
    });
    btnCancel.helpTip = "Cancel script and close this dialog";
    btnCancel.text = "Cancel";
    IGTPalette.show();
    //~     $.writeln("myText.bounds = " + myText.bounds);
    //~     $.writeln("myText.dimension = " + myText.dimension);

    btnCancel.onClick = function () {
        IGTPalette.close();
    };

    btnRun.onClick = function () {
        IGTPalette.close();
        runScriptIGT();
    };
}

//********* MAIN FUNCTIONS ***************
// Create description for Festival SquareSpace image block upload
// © {parentFolderName}
function runScriptFT() {
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
            app.synchronousMode = true;
            for (var f = 0; f < thumbs.length; ++f) {
                var thumb = thumbs[f];

                // get filename
                var fn = thumb.name.split("_");
                $.writeln("fn = " + fn);
                var aName = fn[0];
                $.writeln("aName = " + aName);
                var iTitle = fn[1].split(".")[0];
                $.writeln("iTitle = " + iTitle);
                // create text for copyright string
                var date = new Date();
                $.writeln("date = " + date);
                var year = date.getUTCFullYear();
                $.writeln("year = " + year);
                var copyright = "Copyright © " + year + " " + aName + ". All rights reserved.";
                $.writeln("copyright = " + copyright);
                // create text for description
                var desc = "© " + aName;
                $.writeln("desc = " + desc);

                // create text for keywords (SquareSpace Tag)
                // replace all spaces with non-breaking spaces
                aName = aName.replace(/\s/g, '\xa0');
                var keywords = iTitle + " • " + aName;
                // remove any commas because commas create multiple keywords
                keywords = keywords.replace(/,/g, '');
                $.writeln("keywords = " + keywords + " character count = " + keywords.length);

                // TODO: Add a check here to trap for length greater than 72 chars.
                //               This causes an error which jumps out to the catch {}; BUT, for some reason, the loop keeps going...

                // Get the selected file
                var selectedFile = thumb.spec;
                // Get the metadata object - wait for  valid values
                var md = thumb.synchronousMetadata;
                // Get the XMP packet as a string and create the XMPMeta object
                var xmp = new XMPMeta(md.serialize());
                // delete old description
                xmp.deleteProperty(XMPConst.NS_DC, 'description');
                // write new description
                xmp.appendArrayItem(XMPConst.NS_DC, 'description', desc, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'description[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');

                // write title
                xmp.deleteProperty(XMPConst.NS_DC, 'title');
                xmp.appendArrayItem(XMPConst.NS_DC, 'title', iTitle, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'title[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');

                // write creator
                xmp.deleteProperty(XMPConst.NS_DC, 'creator');
                xmp.appendArrayItem(XMPConst.NS_DC, 'creator', aName, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'creator[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');

                // write keywords
                xmp.deleteProperty(XMPConst.NS_DC, 'subject');
                xmp.appendArrayItem(XMPConst.NS_DC, 'subject', keywords, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'subject[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');

                // write copyright
                xmp.deleteProperty(XMPConst.NS_DC, 'rights');
                xmp.appendArrayItem(XMPConst.NS_DC, 'rights', copyright, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'rights[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');

                // Write the packet back to the selected file
                var updatedPacket = xmp.serialize(XMPConst.SERIALIZE_OMIT_PACKET_WRAPPER | XMPConst.SERIALIZE_USE_COMPACT_FORMAT);
                thumb.metadata = new Metadata(updatedPacket);

                // Write the metadata back to the file
                xmp = new XMPFile(thumb.spec.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE);
            }
            alert('Add Festival Image Tags\r\rAll done.');
        }
    } catch (e) {
        alert(e + ' ' + e.line);
    }
}

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
                var str = "© " + folder;
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
                var date = new Date();
                $.writeln("date = " + date);
                var year = date.getUTCFullYear();
                $.writeln("year = " + year);
                var copyright = "Copyright © " + year + " " + folder + ". All rights reserved.";
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
                xmp = new XMPFile(thumb.spec.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE);
            }
        }
    } catch (e) {
        alert(e + ' ' + e.line);
    }
}

// Create description for Interst Group Galleries SquareSpace image block upload
function runScriptIGT() {
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
            app.synchronousMode = true;
            for (var f = 0; f < thumbs.length; ++f) {
                var thumb = thumbs[f];

                // get filename
                var fn = thumb.name.split("_");
                $.writeln("fn = " + fn);

                // check for sequence number in first field
                var seq = fn[0];
                $.writeln("seq = " + seq);
                if (Number.isInteger(seq)) {
                    // It's a number. Delete the first field.
                    fn.splice(0,1);
                    $.writeln("fn after splicing out first element = " + fn);
                }

                var aName = fn[0];
                $.writeln("aName = " + aName);
                var iTitle = fn[1].split(".")[0];
                $.writeln("iTitle = " + iTitle);
                // create text for copyright string
                var date = new Date();
                $.writeln("date = " + date);
                var year = date.getUTCFullYear();
                $.writeln("year = " + year);
                var copyright = "Copyright © " + year + " " + aName + ". All rights reserved.";
                $.writeln("copyright = " + copyright);
                // create text for description
                var desc = "© " + aName;
                $.writeln("desc = " + desc);

                // create text for keywords (SquareSpace Tag)
                // replace all spaces with non-breaking spaces
                aName = aName.replace(/\s/g, '\xa0');
                var keywords = iTitle + " • " + aName;
                // remove any commas because commas create multiple keywords
                keywords = keywords.replace(/,/g, '');
                $.writeln("keywords = " + keywords + " character count = " + keywords.length);

                // TODO: Add a check here to trap for length greater than 72 chars.
                //               This causes an error which jumps out to the catch {}; BUT, for some reason, the loop keeps going...

                // Get the selected file
                var selectedFile = thumb.spec;
                // Get the metadata object - wait for  valid values
                var md = thumb.synchronousMetadata;
                // Get the XMP packet as a string and create the XMPMeta object
                var xmp = new XMPMeta(md.serialize());
                // delete old description
                xmp.deleteProperty(XMPConst.NS_DC, 'description');
                // write new description
                xmp.appendArrayItem(XMPConst.NS_DC, 'description', desc, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'description[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');

                // write title
                xmp.deleteProperty(XMPConst.NS_DC, 'title');
                xmp.appendArrayItem(XMPConst.NS_DC, 'title', iTitle, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'title[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');

                // write creator
                xmp.deleteProperty(XMPConst.NS_DC, 'creator');
                xmp.appendArrayItem(XMPConst.NS_DC, 'creator', aName, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'creator[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');

                // write keywords
                xmp.deleteProperty(XMPConst.NS_DC, 'subject');
                xmp.appendArrayItem(XMPConst.NS_DC, 'subject', keywords, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'subject[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');

                // write copyright
                xmp.deleteProperty(XMPConst.NS_DC, 'rights');
                xmp.appendArrayItem(XMPConst.NS_DC, 'rights', copyright, 0, XMPConst.ALIAS_TO_ALT_TEXT);
                xmp.setQualifier(XMPConst.NS_DC, 'rights[1]', 'http://www.w3.org/XML/1998/namespace', 'lang', 'x-default');

                // Write the packet back to the selected file
                var updatedPacket = xmp.serialize(XMPConst.SERIALIZE_OMIT_PACKET_WRAPPER | XMPConst.SERIALIZE_USE_COMPACT_FORMAT);
                thumb.metadata = new Metadata(updatedPacket);

                // Write the metadata back to the file
                xmp = new XMPFile(thumb.spec.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE);
            }
            alert('Add Festival Image Tags\r\rAll done.');
        }
    } catch (e) {
        alert(e + ' ' + e.line);
    }
}
