import {WorkspaceConfiguration} from 'vscode';

export class Configuration {
    private from = "en";
    private to = "ru";

    private keys = [
      "trnsl.1.1.20190216T125947Z.6a9d672f0af1c6c2.821ec9f76fc6c574690a8036d57ab608dad8a026",
      "trnsl.1.1.20190216T130020Z.400d621220eb7057.0e0bce571b6b1de87d3a20a6ded9eadf3fe3db81", 
      "trnsl.1.1.20190216T130111Z.dd4ac6be24415cc5.da1cd07a3a5be22a9854f736fb8bbc6de2214c40", 
      "trnsl.1.1.20190216T130137Z.e1010de1f114132e.097fb61c52ea3b2c77bd4b763acf1729bc47d2bb",
      "trnsl.1.1.20190216T130202Z.cb3fa67379e3a2d9.2b18f7a66c151a1a7f8bc3229656fa7e49bb4738", 
      "trnsl.1.1.20190216T130233Z.3dfb820d6a033a6f.62f7647b538b29310a1e03b9a176599802c98588", 
      "trnsl.1.1.20190216T131913Z.a1c829458b32545e.b9815cfeeacabaa856a4ae6a2e3e2c8aae03c84f",
      "trnsl.1.1.20190216T132123Z.51c4f87645cc60c2.e3dd0f9e36b58e18da2271592ba04f50243fa965",
      "trnsl.1.1.20190216T132151Z.e527ec1888c4a934.65cf7c05e37922819443a53a15e743dfadcec034",
      "trnsl.1.1.20190216T132220Z.4d6bcf5f392054f7.08a5c8058aec9f2ffd845c2fd1dd9fc6798f3ad7",
      "trnsl.1.1.20190216T132248Z.8cc07112ad068ffe.5de150f38cb3cdcf5aea34f4e7415363dc6eedff",
      "trnsl.1.1.20190216T132313Z.ff4377d3360bc455.a98a084521efddcb3dad713418020ea39dfb2d02",
      "trnsl.1.1.20190216T132412Z.16875783804b0512.1fe0bcdfc3b575605ba2f841b4ff7f70732f116c",
      "trnsl.1.1.20190216T132444Z.51f3ec015e355a3d.e2ec9864d13d44dcb8171b8cbf5a70e31039eb6c",
      "trnsl.1.1.20190216T132508Z.f1854d20e242d1e3.92c6cb5a77545e536733b937079ba848f7017418",
      "trnsl.1.1.20190419T144929Z.9a7ce55bcbc0ab3a.7b061e1931fe57955befd67ab7151772bed63f0f"
    ]
    
    public languages = ["af","ar","az","be","bg","bs","ca","cs","cy","da","de","el","en","es","et","eu","fi","fr","ga","gl","he","hr","ht","hu","hy","id","is","it","ja","ka","kk","ky","la","lt","lv","mg","mk","mn","ms","mt","nl","no","pl","pt","ro","ru","sk","sl","sq","sr","sv","sw","tg","tl","tr","tt","udm","uk","uz","vi"];

    public languages_description = {"az":"Azerbaijan","sq":"Albanian","en":"English","ar":"Arab","hy":"Armenian","af":"Afrikaans","eu":"Basque","ba":"Bashkir","be":"Belarusian","bg":"Bulgarian","bs":"Bosnian","cy":"Welsh","hu":"Hungarian","vi":"Vietnamese","ht":"Haitian","gl":"Galician","nl":"Dutch","el":"Greek","ka":"Georgian","da":"Danish","he":"Hebrew","id":"Indonesian","ga":"Irish","is":"Icelandic","es":"Spanish","it":"Italian","kk":"Kazakh","ca":"Catalan","ky":"Kyrgyz","zh":"Chinese","ko":"Korean","la":"Latin","lv":"Latvian","lt":"Lithuanian","mk":"Macedonian","mg":"Malagasy","ms":"Malay","mt":"Maltese","mn":"Mongolian","de":"German","no":"Norwegian","fa":"Persian","pl":"Polish","pt":"Portuguese","ro":"Romanian","ru":"Russian","sr":"Serbian","sk":"Slovak","sl":"Slovenian","sw":"Swahili","tl":"Tagalog","tg":"Tajik","th":"Thai","tt":"Tatar","tr":"Turkish","udm":"Udmurt","uz":"Uzbek","uk":"Ukrainian","ur":"Urdu","fi":"Finnish","fr":"French","hr":"Croatian","hi":"Hindi","cs":"Czech","sv":"Swedish","sjn":"Elven (Sindarin)","et":"Estonian","ja":"Japanese"};

    public languages_description_ru = {"az":"Азербайджанский","sq":"Албанский","en":"Английский","ar":"Арабский","hy":"Армянский","af":"Африкаанс","eu":"Баскский","ba":"Башкирский","be":"Белорусский","bg":"Болгарский","bs":"Боснийский","cy":"Валлийский","hu":"Венгерский","vi":"Вьетнамский","ht":"Гаитянский","gl":"Галисийский","nl":"Голландский","el":"Греческий","ka":"Грузинский","da":"Датский","he":"Иврит","id":"Индонезийский","ga":"Ирландский","is":"Исландский","es":"Испанский","it":"Итальянский","kk":"Казахский","ca":"Каталанский","ky":"Киргизский","zh":"Китайский","ko":"Корейский","la":"Латынь","lv":"Латышский","lt":"Литовский","mk":"Македонский","mg":"Малагасийский","ms":"Малайский","mt":"Мальтийский","mn":"Монгольский","de":"Немецкий","no":"Норвежский","fa":"Персидский","pl":"Польский","pt":"Португальский","ro":"Румынский","ru":"Русский","sr":"Сербский","sk":"Словацкий","sl":"Словенский","sw":"Суахили","tl":"Тагальский","tg":"Таджикский","th":"Тайский","tt":"Татарский","tr":"Турецкий","udm":"Удмуртский","uz":"Узбекский","uk":"Украинский","ur":"Урду","fi":"Финский","fr":"Французский","hr":"Хорватский","hi":"Хинди","cs":"Чешский","sv":"Шведский","sjn":"Эльфийский (cиндарин)","et":"Эстонский","ja":"Японский"};

    public combinations = ["en-ru","ru-en","en-uk","uk-en","uk-ru","ru-uk","en-es","en-it","en-id","en-zh","tr-en","tr-ru","be-ru","bg-ru","cs-en","cs-ru","da-en","da-ru","de-en","de-ru","de-tr","el-en","el-ru","en-cs","en-da","en-de","en-el", "en-et","en-fi","en-fr","en-ja","en-lt","en-lv","en-nl","en-no","en-pt","en-sk","en-sv","en-tr","es-en","es-ru","et-en","et-ru","fi-en","fi-ru","fr-en","fr-ru","it-en","it-ru","ja-en","lt-en","lt-ru","lv-en","lv-ru","nl-en","nl-ru","no-en","no-ru","pl-ru","pt-en","pt-ru","ru-be","ru-bg","ru-cs","ru-da","ru-de","ru-el","ru-es","ru-et","ru-fi","ru-fr","ru-it","ru-lt","ru-lv","ru-nl","ru-no","ru-pl","ru-pt","ru-sk","ru-sv","ru-tr","ru-tt","sk-en","sk-ru","sv-en","sv-ru","tr-de","tt-ru","zh-en","id-en"];
    
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
        // generate random whole number between (min) and (max) both inclusive
        let randomNumber = (min, max) => {  
          min = Math.ceil(min); 
          max = Math.floor(max); 
          return Math.floor(Math.random() * (max - min + 1)) + min; 
        } 
        let index = randomNumber(0, this.keys.length)
        console.log('key index: ', index)
        return this.keys[index];
    }     
  
    public setApiKey(value) {
        this.key = value;
    }
}
