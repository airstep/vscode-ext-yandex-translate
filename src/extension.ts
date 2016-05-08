'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Window = vscode.window;
import QuickPickItem = vscode.QuickPickItem;
import QuickPickOptions = vscode.QuickPickOptions;
import {Configuration} from './Configuration';

var config = new Configuration();
var isDefaultLocale = isLocaleDefault(vscode.env.language);
var yt = require('yandex-translate-api')(config.getApiKey());

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "yandex-translate" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposableTranslateSelected = vscode.commands.registerCommand('yandex.translate.selectedText', translateSelectedText);
    let disposableTranslateAndroidStrings = vscode.commands.registerCommand('yandex.translate.androidStrings', translateAndroidStrings);
    let disposableChooseLanguages = vscode.commands.registerCommand('yandex.translate.chooseLanguages', chooseLanguages);
    let disposableChangeApiKey = vscode.commands.registerCommand('yandex.translate.changeApiKey', changeApiKey);
    
    context.subscriptions.push(
        disposableTranslateSelected,
        disposableTranslateAndroidStrings,
        disposableChooseLanguages,
        disposableChangeApiKey);
}

function translateSelectedText() {
    if (config.getApiKey().length == 0) {
        vscode.window.showErrorMessage('Please input Yandex API Key!');
        changeApiKey();
        return;
    }
    
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('Please select any text!');
        return; // No open text editor
    }
    
    var selection = editor.selection;
    var text = editor.document.getText(selection);

    yt.translate(text, { from: config.getFrom(), to: config.getTo() }, function(err, res) {
        if (res.text.length > 0) {
            let newText = res.text[0];
            editor.edit((builder) => {
                builder.replace(selection, newText);
            });                
        }
    });
}

function translateAndroidStrings() {
    if (config.getApiKey().length == 0) {
        vscode.window.showInformationMessage('Please input Yandex API Key!');
        return;
    }                
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('Please select any text!');
        return; // No open text editor
    }

    var targets = [];
    var selection = editor.selection;
    for (let i = selection.start.line; i <= selection.end.line - 1; i++) {
        var line = editor.document.lineAt(i);
        var startIndex = line.text.indexOf(">") + 1;
        var endIndex = line.text.lastIndexOf("<");
        if (endIndex < startIndex) continue;
        var start = new vscode.Position(i, startIndex);
        var end = new vscode.Position(i, endIndex);
        var targetSelection = new vscode.Selection(start, end);
        var text = editor.document.getText(targetSelection);            
        targets.push({text: text, selection: targetSelection});        
    }

    let results = processData(targets);
    results.then((values) => {
        var editor = vscode.window.activeTextEditor;
        applyResults(editor, values);        
    });
}

function chooseLanguages() {
	var opts: QuickPickOptions = { 
        matchOnDescription: true, 
        placeHolder: (isDefaultLocale) ? "Please select any languages combination": "Пожалуйста введите любую комбинацию" 
    };
	var items: QuickPickItem[] = [];
    
    for (var i = 0; i < config.combinations.length; i++) {
        var combination = config.combinations[i];
        var arr = combination.split("-");
        if (arr.length > 0) {
            var lang1 = arr[0];
            var lang2 = arr[1];
            var desc1 = (isDefaultLocale) ? config.languages_description[lang1] : config.languages_description_ru[lang1];
            var desc2 = (isDefaultLocale) ? config.languages_description[lang2] : config.languages_description_ru[lang2];
            items.push({ label: lang1 + "->" + lang2, description: "(" + desc1 + " -> " + desc2 + ")" });
        }
    }

	Window.showQuickPick(items, opts).then((selection) => {
		if (!selection) {
			return;
		}
		let e = Window.activeTextEditor;
		let d = e.document;
		let sel = e.selections;

        let list = selection.label.split("->");
        if (list.length > 0) {
            config.setFrom(list[0]);
            config.setTo(list[1]);            
        } else {
            config.setFrom("en");
            config.setTo("ru");                        
        }
	});
}

function changeApiKey() {
	var opts: vscode.InputBoxOptions = { 
        placeHolder: (isDefaultLocale) ? "Please input Yandex API Key": "Пожалуйста введите свой ключ от Yandex" 
    };
    
    Window.showInputBox(opts).then((selection) => {
    	let e = Window.activeTextEditor;
        let text = e.document.getText();
        config.setApiKey(text);
    });        
}

// helpers
function isLocaleDefault(locale) {
    return locale.indexOf("ru") == -1 &&
            locale.indexOf("uk") == -1 &&   
            locale.indexOf("be") == -1;
}

async function processData(data: any[]) {
  const promises = data.map(async (item) => {
    return await doSomeAsyncStuff(item);
    //you can do other stuff with the `item` here
  });
  return await Promise.all(promises);
  //you can continue with other code here that will execute after all the async code completes
}

async function doSomeAsyncStuff(value) {
  return new Promise((resolve, reject) => {
    //call some async library or do a setTimeout and resolve/reject the promise
    yt.translate(value.text, { from: config.getFrom(), to: config.getTo() }, function(err, res) {
        if (res.text.length > 0) {
            let newText = res.text[0];
            let selection = value.selection;
            resolve({selection: selection, newText: newText});
        }        
    });        
  });
}

function applyResults(editor, results) {
    editor.edit(builder => {
        for (var i = 0; i < results.length; i++) {
            var selection = results[i].selection;
            var newText = results[i].newText;
            builder.replace(selection, newText); 
        }
    });    
}

// this method is called when your extension is deactivated
export function deactivate() {
}
