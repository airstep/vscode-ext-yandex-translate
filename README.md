# README

This extension allows you translate words and sentences by Yandex Translate service!

## Using

First, you will need to install Visual Studio Code. In the command palette (`cmd-shift-p`) select `Install Extension` and choose `yandex-translate`.

Before translation you can select target languages by pressing (`cmd-shift-t`) or F1 (Yandex Choose Languages).

Than you can select any text and press F1 -> than choose Yandex Translate Selected or press (`cmd-t`).

Also the purpose of creation such plugin was ability to translate Android strings.xml resource file.

So, just select range of lines in strings.xml, that needed to translate and press (cmd-alt-t).

You can translate even JSON localization files, structured like this:

{
    "test001": "string",
    "test002": "next string",
    ...
}

So, by selecting and pressing (cmd+alt+j) -> "string" and "next string" will be translated.

# Changelog

## Version 1.0.5

* **Add** "en-ja" and "ja-en" combinations
* **Add** json value translation (maybe you can implement better JSON parse)
