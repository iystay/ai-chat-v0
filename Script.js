const userProfile = {name:"Komutanım", mood:"Normal", topicHistory:[], depthPreference:"ileri"};
let conversationDepth = 1;

function safeEval(expr){
    if(!/^[0-9+\-*/().^ xsincoetglrlogsqrtpi]+$/i.test(expr)) throw new Error("Geçersiz karakter tespit!");
    const mathScope={x:0,sin:Math.sin,cos:Math.cos,tan:Math.tan,e:Math.E,ln:Math.log,log:Math.log10,sqrt:Math.sqrt,abs:Math.abs,pi:Math.PI};
    return Function(...Object.keys(mathScope), "use strict"; return (${expr.replace(/\^/g,'**')}))(...Object.values(mathScope));
}

function solveAdvancedCalculus(type, expr){
    expr=expr.replace(/\s+/g,'');
    if(type==='derivative'){if(expr.match(/x\sin\(x\)/)) return 'sin(x) + x*cos(x)'; if(expr.includes('sin(')) return expr.replace(/sin\((.?)\)/g,'cos($1)'); if(expr.includes('cos(')) return expr.replace(/cos\((.?)\)/g,'-sin($1)'); if(expr.includes('x^')) return expr.replace(/(\d)\*?x\^(\d+)/g, (_,a,b)=>${(a||1)*b}*x^${b-1});}
    if(type==='integral'){if(expr.includes('x*e^x')) return 'x*e^x - e^x + C'; if(expr.includes('1/x')) return 'ln|x| + C'; return expr.replace(/(\d*)\*?x\^(\d+)/g, (_,a,b)=>(${(a||1)/(parseInt(b)+1)})*x^${parseInt(b)+1} + C);}
    if(type==='limit') return "Limit analizi (CAS simülasyonu)";
    if(type==='solve'){let match=expr.match(/([+-]?\d*)\?x\^2([+-]\d)\*?x([+-]?\d+)?=0/); if(match){let a=parseFloat(match[1]||1), b=parseFloat(match[2]||0), c=parseFloat(match[3]||0); let delta=b*b-4*a*c; if(delta<0) return "Çözüm reel değil."; let x1=(-b+Math.sqrt(delta))/(2*a), x2=(-b-Math.sqrt(delta))/(2*a); return x1=${x1.toFixed(4)}, x2=${x2.toFixed(4)};} match=expr.match(/([+-]?\d*)\*?x([+-]\d+)?=0/); if(match){let a=parseFloat(match[1]||1), b=parseFloat(match[2]||0); return x=${(-b/a).toFixed(4)};} }
    return "[Karmaşık denklem: CAS tabanlı çözüm gerekli]";
}

function detectTopic(input){
    input=input.toLowerCase();
    const topics={cografya:['cografya','iklim','jeoloji','tektonik','buzul'],tarih:['tarih','osmanlı','roma','savaş','antlaşma','medeniyet'],fizik:['fizik','kuantum','ışık','kütle','görelilik'],kimya:['kimya','tepkime','atom','molekül','bağ'],biyoloji:['biyoloji','dna','hücre','mitokondri','replikasyon'],felsefe:['felsefe','etik','bilinç','kant','epistemoloji'],sanat:['sanat','resim','heykel','müzik','edebiyat'],ekonomi:['ekonomi','piyasa','bütçe','faiz','enflasyon'],matematik:['hesapla','türev','integral','limit','çöz','denklem','matris','vektör']};
    for(let t in topics) for(let k of topics[t]) if(input.includes(k)) return t;
    return null;
}

function handleMath(input){
    try{
        let expr;
        if(/hesapla:/i.test(input)){expr=input.split(":")[1].trim(); let r=safeEval(expr); return 🧮 Hesaplama sonucu: <strong>${r.toFixed(4)}</strong>;}
        if(/türev/i.test(input)){expr=input.match(/türev (.+)/i)[1].trim(); return <strong>📐 Türev:</strong> f'(x)=${solveAdvancedCalculus('derivative',expr)};}
        if(/integral/i.test(input)){expr=input.match(/integral (.+)/i)[1].trim(); return <strong>∫ İntegral:</strong> ∫f(x)dx=${solveAdvancedCalculus('integral',expr)};}
        if(/limit/i.test(input)) return <strong>📏 Limit Analizi:</strong> ${solveAdvancedCalculus('limit',input)};
        if(/çöz|denklem/i.test(input)){expr=input.match(/çöz (.+)/i)[1].trim(); return <strong>🧩 Çözüm:</strong> ${solveAdvancedCalculus('solve',expr)};}
        return "🤔 Matematiksel ifadeyi anlayamadım.";
    }catch(e){return ❌ İşlem Hatası: ${e.message};}
}

function generateMicroLecture(topic){
    const lectures={
        fizik:{title:"🌌 FİZİK ZİRVESİ", tanim:"Uzay-zaman atomik parçacıklardan oluşur.", prensip:"Kara deliklerdeki tekillikler açıklanabilir.", gorsel:"images/physics.png"},
        kimya:{title:"⚗ KİMYA ZİRVESİ", tanim:"Tepkime anları femtosaniye ölçeğinde incelenir.", prensip:"Geçiş durumları gözlemlenir.", gorsel:"images/chemistry.png"},
        biyoloji:{title:"🧬 BİYOLOJİ ZİRVESİ", tanim:"Yeni biyolojik sistemler tasarlanabilir.", prensip:"Genetik düzenlemeler etik tartışma doğurur.", gorsel:"images/biology.png"},
        felsefe:{title:"🧐 FELSEFE ZİRVESİ", tanim:"Evren bilgisayar simülasyonu olabilir.", prensip:"Varoluşsal riskler tartışılır.", gorsel:"images/philosophy.png"},
        tarih:{title:"📜 TARİH ZİRVESİ", tanim:"Evrenin başlangıcından günümüze bakış.", prensip:"Makro tarih perspektifi sunar.", gorsel:"images/history.png"},
        cografya:{title:"🌍 COĞRAFYA ZİRVESİ", tanim:"Plaka tektoniği kıtaların sürüklenmesini açıklar.", prensip:"Depremler, volkanlar ve dağ oluşumları.", gorsel:"images/geography.png"},
        sanat:{title:"🎨 SANAT ZİRVESİ", tanim:"Sanat eserleri kültürel bağlamda incelenir.", prensip:"Estetik ve teknik analiz yapılır.", gorsel:"images/art.png"},
        ekonomi:{title:"💰 EKONOMİ ZİRVESİ", tanim:"Ekonomik göstergeler ve trendler incelenir.", prensip:"Bütçe, faiz ve enflasyon hesaplanır.", gorsel:"images/economy.png"}
    };
    if(!lectures[topic]) return "Akademik veri bulunamadı.";
    const lec = lectures[topic];
    return ${lec.title} ${userProfile.name}: <div class="definition-block"><strong>1. Tanım:</strong> ${lec.tanim}<br><strong>2. Ana Prensip:</strong> ${lec.prensip}</div><img src="${lec.gorsel}" alt="${topic}" style="max-width:200px; margin-top:5px;">;
}

function generateAIResponse(userText){
    const topic = detectTopic(userText);
    let response="", intro="", stance="Nazik Akademik Odak";
    intro = `[${stance}] Sayın ${userProfile.name}, ${conversationDepth}. bağlam analizi: `;
    
    let shiftWarning="";
    if(userProfile.topicHistory.length>0 && topic && topic!==userProfile.topicHistory[userProfile.topicHistory.length-1])
        shiftWarning=`⚙ Bağlam Kayması: Konu değişimi → ${topic.toUpperCase()}. `;
    
    if(/merhaba|selam/i.test(userText)){
        let moodResp=userProfile.mood==='Yüksek'?"Enerjiniz hissediliyor! ":"";
        response=🤖 Merhaba Sayın ${userProfile.name}! ${moodResp} Size nasıl yardımcı olabilirim?;
    } else {
        switch(topic){
            case 'matematik': response = shiftWarning + intro + handleMath(userText); break;
            case 'fizik': case 'kimya': case 'biyoloji': case 'felsefe': case 'tarih': case 'cografya': case 'sanat': case 'ekonomi':
                response = shiftWarning + intro + generateMicroLecture(topic); break;
            default: response="💬 Lütfen daha spesifik bir konu veya matematiksel işlem belirtin.";
        }
    }
    
    conversationDepth++;
    if(topic) userProfile.topicHistory.push(topic);
    return response;
}
