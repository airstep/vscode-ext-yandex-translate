'use strict';

import * as vscode from 'vscode';
import Window = vscode.window;
import {Configuration} from './Configuration';
import QuickPickItem = vscode.QuickPickItem;
import QuickPickOptions = vscode.QuickPickOptions;

let async = require('async');

let config = new Configuration();
let yt = require('yandex-translate-api')(config.getApiKey());

let isDefaultLocale = isLocaleDefault(vscode.env.language);

let languages = ["af","ar","az","be","bg","bs","ca","cs","cy","da","de","el","en","es","et","eu","fi","fr","ga","gl","he","hr","ht","hu","hy","id","is","it","ka","kk","ky","la","lt","lv","mg","mk","mn","ms","mt","nl","no","pl","pt","ro","ru","sk","sl","sq","sr","sv","sw","tg","tl","tr","tt","udm","uk","uz","vi"];

let languages_description = {"az":"Azerbaijan","sq":"Albanian","en":"English","ar":"Arab","hy":"Armenian","af":"Afrikaans","eu":"Basque","ba":"Bashkir","be":"Belarusian","bg":"Bulgarian","bs":"Bosnian","cy":"Welsh","hu":"Hungarian","vi":"Vietnamese","ht":"Haitian","gl":"Galician","nl":"Dutch","el":"Greek","ka":"Georgian","da":"Danish","he":"Hebrew","id":"Indonesian","ga":"Irish","is":"Icelandic","es":"Spanish","it":"Italian","kk":"Kazakh","ca":"Catalan","ky":"Kyrgyz","zh":"Chinese","ko":"Korean","la":"Latin","lv":"Latvian","lt":"Lithuanian","mk":"Macedonian","mg":"Malagasy","ms":"Malay","mt":"Maltese","mn":"Mongolian","de":"German","no":"Norwegian","fa":"Persian","pl":"Polish","pt":"Portuguese","ro":"Romanian","ru":"Russian","sr":"Serbian","sk":"Slovak","sl":"Slovenian","sw":"Swahili","tl":"Tagalog","tg":"Tajik","th":"Thai","tt":"Tatar","tr":"Turkish","udm":"Udmurt","uz":"Uzbek","uk":"Ukrainian","ur":"Urdu","fi":"Finnish","fr":"French","hr":"Croatian","hi":"Hindi","cs":"Czech","sv":"Swedish","sjn":"Elven (Sindarin)","et":"Estonian","ja":"Japanese"};

let languages_description_ru = {"az":"Азербайджанский","sq":"Албанский","en":"Английский","ar":"Арабский","hy":"Армянский","af":"Африкаанс","eu":"Баскский","ba":"Башкирский","be":"Белорусский","bg":"Болгарский","bs":"Боснийский","cy":"Валлийский","hu":"Венгерский","vi":"Вьетнамский","ht":"Гаитянский","gl":"Галисийский","nl":"Голландский","el":"Греческий","ka":"Грузинский","da":"Датский","he":"Иврит","id":"Индонезийский","ga":"Ирландский","is":"Исландский","es":"Испанский","it":"Итальянский","kk":"Казахский","ca":"Каталанский","ky":"Киргизский","zh":"Китайский","ko":"Корейский","la":"Латынь","lv":"Латышский","lt":"Литовский","mk":"Македонский","mg":"Малагасийский","ms":"Малайский","mt":"Мальтийский","mn":"Монгольский","de":"Немецкий","no":"Норвежский","fa":"Персидский","pl":"Польский","pt":"Португальский","ro":"Румынский","ru":"Русский","sr":"Сербский","sk":"Словацкий","sl":"Словенский","sw":"Суахили","tl":"Тагальский","tg":"Таджикский","th":"Тайский","tt":"Татарский","tr":"Турецкий","udm":"Удмуртский","uz":"Узбекский","uk":"Украинский","ur":"Урду","fi":"Финский","fr":"Французский","hr":"Хорватский","hi":"Хинди","cs":"Чешский","sv":"Шведский","sjn":"Эльфийский (cиндарин)","et":"Эстонский","ja":"Японский"};

let combinations = ["en-ru","ru-en","en-uk","uk-en","uk-ru","ru-uk","en-es","en-it","tr-en","tr-ru","be-ru","bg-ru","cs-en","cs-ru","da-en","da-ru","de-en","de-ru","de-tr","el-en","el-ru","en-cs","en-da","en-de","en-el", "en-et","en-fi","en-fr","en-lt","en-lv","en-nl","en-no","en-pt","en-sk","en-sv","en-tr","es-en","es-ru","et-en","et-ru","fi-en","fi-ru","fr-en","fr-ru","it-en","it-ru","lt-en","lt-ru","lv-en","lv-ru","nl-en","nl-ru","no-en","no-ru","pl-ru","pt-en","pt-ru","ru-be","ru-bg","ru-cs","ru-da","ru-de","ru-el","ru-es","ru-et","ru-fi","ru-fr","ru-it","ru-lt","ru-lv","ru-nl","ru-no","ru-pl","ru-pt","ru-sk","ru-sv","ru-tr","ru-tt","sk-en","sk-ru","sv-en","sv-ru","tr-de","tt-ru"];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {    
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "yandex-translate" is now active!');
       
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposableTranslateSelected = vscode.commands.registerCommand('extension.translateSelected', () => {
        // The code you place here will be executed every time your command is executed
        if (config.getApiKey().length == 0) {
            vscode.window.showErrorMessage('Please input Yandex API Key!');
            showInputYandexApiKey();
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

    });

    context.subscriptions.push(disposableTranslateSelected);
    
    let disposableTranslateAndroidStringsXML = vscode.commands.registerCommand('extension.translateAndroidStringsXML', () => {
        if (config.getApiKey().length == 0) {
            vscode.window.showInformationMessage('Please input Yandex API Key!');
            return;
        }                
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Please select any text!');
            return; // No open text editor
        }

		var lines = editor.document.lineCount;
        var target = [];
        for (var i = 0; i < lines - 1; i++) {
            var line = editor.document.lineAt(i);
            var startIndex = line.text.indexOf(">") + 1;
            var endIndex = line.text.lastIndexOf("<");
            if (endIndex < startIndex) continue;
            var start = new vscode.Position(i, startIndex);
            var end = new vscode.Position(i, endIndex);
            var selection = new vscode.Selection(start, end);
            var text = editor.document.getText(selection);            
            target.push({text: text, selection: selection});
        }
        
        async.map(target, translate, function(err, results) {
            console.log(results);
            editor.edit(builder => {
                for (var i = 0; i < results.length; i++) {
                    var selection = results[i].selection;
                    var newText = results[i].newText;
                    builder.replace(selection, newText); 
                }
            });
        });
    });
    context.subscriptions.push(disposableTranslateAndroidStringsXML);
    
    let disposableChooseLanguages = vscode.commands.registerCommand('extension.chooseLanguages', chooseLanguages);
    context.subscriptions.push(disposableChooseLanguages);    
    
    let disposableChageApiKey = vscode.commands.registerCommand('extension.changeApiKey', showInputYandexApiKey);
    context.subscriptions.push(disposableChooseLanguages);        
}

function translate(target, cb) {
    yt.translate(target.text, { from: config.getFrom(), to: config.getTo() }, function(err, res) {
        if (res.text.length > 0) {
            let newText = res.text[0];
            let selection = target.selection;
            cb(null, {selection: selection, newText: newText});
        }        
    });    
}

function showInputYandexApiKey() {
	var opts: vscode.InputBoxOptions = { 
        placeHolder: (isDefaultLocale) ? "Please input Yandex API Key": "Пожалуйста введите свой ключ от Yandex" 
    };
    
    Window.showInputBox(opts).then((selection) => {
    	let e = Window.activeTextEditor;
        let text = e.document.getText();
        config.setApiKey(text);
    });        
}

function chooseLanguages() {    
	var opts: QuickPickOptions = { 
        matchOnDescription: true, 
        placeHolder: (isDefaultLocale) ? "Please select any languages combination": "Пожалуйста введите любую комбинацию" 
    };
	var items: QuickPickItem[] = [];
    
    for (var i = 0; i < combinations.length; i++) {
        var combination = combinations[i];
        var arr = combination.split("-");
        if (arr.length > 0) {
            var lang1 = arr[0];
            var lang2 = arr[1];
            var desc1 = (isDefaultLocale) ? languages_description[lang1] : languages_description_ru[lang1];
            var desc2 = (isDefaultLocale) ? languages_description[lang2] : languages_description_ru[lang2];
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

function isLocaleDefault(locale) {
    return locale.indexOf("ru") == -1 &&
            locale.indexOf("uk") == -1 &&   
            locale.indexOf("be") == -1;
}

// this method is called when your extension is deactivated
export function deactivate() {
}
