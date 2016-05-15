import {WorkspaceConfiguration} from 'vscode';

export class Configuration {
    private from = "en";
    private to = "ru";
    private key = "trnsl.1.1.20160506T075024Z.afdb1ae6a3736b3d.72241d8bd16449900486e199be85b31ecc385a7a";
    
    public languages = ["af","ar","az","be","bg","bs","ca","cs","cy","da","de","el","en","es","et","eu","fi","fr","ga","gl","he","hr","ht","hu","hy","id","is","it","ja","ka","kk","ky","la","lt","lv","mg","mk","mn","ms","mt","nl","no","pl","pt","ro","ru","sk","sl","sq","sr","sv","sw","tg","tl","tr","tt","udm","uk","uz","vi"];

    public languages_description = {"az":"Azerbaijan","sq":"Albanian","en":"English","ar":"Arab","hy":"Armenian","af":"Afrikaans","eu":"Basque","ba":"Bashkir","be":"Belarusian","bg":"Bulgarian","bs":"Bosnian","cy":"Welsh","hu":"Hungarian","vi":"Vietnamese","ht":"Haitian","gl":"Galician","nl":"Dutch","el":"Greek","ka":"Georgian","da":"Danish","he":"Hebrew","id":"Indonesian","ga":"Irish","is":"Icelandic","es":"Spanish","it":"Italian","kk":"Kazakh","ca":"Catalan","ky":"Kyrgyz","zh":"Chinese","ko":"Korean","la":"Latin","lv":"Latvian","lt":"Lithuanian","mk":"Macedonian","mg":"Malagasy","ms":"Malay","mt":"Maltese","mn":"Mongolian","de":"German","no":"Norwegian","fa":"Persian","pl":"Polish","pt":"Portuguese","ro":"Romanian","ru":"Russian","sr":"Serbian","sk":"Slovak","sl":"Slovenian","sw":"Swahili","tl":"Tagalog","tg":"Tajik","th":"Thai","tt":"Tatar","tr":"Turkish","udm":"Udmurt","uz":"Uzbek","uk":"Ukrainian","ur":"Urdu","fi":"Finnish","fr":"French","hr":"Croatian","hi":"Hindi","cs":"Czech","sv":"Swedish","sjn":"Elven (Sindarin)","et":"Estonian","ja":"Japanese"};

    public languages_description_ru = {"az":"Азербайджанский","sq":"Албанский","en":"Английский","ar":"Арабский","hy":"Армянский","af":"Африкаанс","eu":"Баскский","ba":"Башкирский","be":"Белорусский","bg":"Болгарский","bs":"Боснийский","cy":"Валлийский","hu":"Венгерский","vi":"Вьетнамский","ht":"Гаитянский","gl":"Галисийский","nl":"Голландский","el":"Греческий","ka":"Грузинский","da":"Датский","he":"Иврит","id":"Индонезийский","ga":"Ирландский","is":"Исландский","es":"Испанский","it":"Итальянский","kk":"Казахский","ca":"Каталанский","ky":"Киргизский","zh":"Китайский","ko":"Корейский","la":"Латынь","lv":"Латышский","lt":"Литовский","mk":"Македонский","mg":"Малагасийский","ms":"Малайский","mt":"Мальтийский","mn":"Монгольский","de":"Немецкий","no":"Норвежский","fa":"Персидский","pl":"Польский","pt":"Португальский","ro":"Румынский","ru":"Русский","sr":"Сербский","sk":"Словацкий","sl":"Словенский","sw":"Суахили","tl":"Тагальский","tg":"Таджикский","th":"Тайский","tt":"Татарский","tr":"Турецкий","udm":"Удмуртский","uz":"Узбекский","uk":"Украинский","ur":"Урду","fi":"Финский","fr":"Французский","hr":"Хорватский","hi":"Хинди","cs":"Чешский","sv":"Шведский","sjn":"Эльфийский (cиндарин)","et":"Эстонский","ja":"Японский"};

    public combinations = ["en-ru","ru-en","en-uk","uk-en","uk-ru","ru-uk","en-es","en-it","tr-en","tr-ru","be-ru","bg-ru","cs-en","cs-ru","da-en","da-ru","de-en","de-ru","de-tr","el-en","el-ru","en-cs","en-da","en-de","en-el", "en-et","en-fi","en-fr","en-ja","en-lt","en-lv","en-nl","en-no","en-pt","en-sk","en-sv","en-tr","es-en","es-ru","et-en","et-ru","fi-en","fi-ru","fr-en","fr-ru","it-en","it-ru","ja-en","lt-en","lt-ru","lv-en","lv-ru","nl-en","nl-ru","no-en","no-ru","pl-ru","pt-en","pt-ru","ru-be","ru-bg","ru-cs","ru-da","ru-de","ru-el","ru-es","ru-et","ru-fi","ru-fr","ru-it","ru-lt","ru-lv","ru-nl","ru-no","ru-pl","ru-pt","ru-sk","ru-sv","ru-tr","ru-tt","sk-en","sk-ru","sv-en","sv-ru","tr-de","tt-ru"];
    
    public getFrom()  {
        return this.from;
    }
    
    public getTo()  {
        return this.to;
    }
    
    public setFrom(value) {
        this.from = value;
    }
    
    public setTo(value) {
        this.to = value;
        
    }
    
    public getApiKey() {
        return this.key;
    }    
    
    public setApiKey(value) {
        this.key = value;
    }
}
