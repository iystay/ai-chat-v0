// -----------------------------
// V37-GORSSEL: GÖRSEL ANLATIMLI YAPAY ZEKA
// -----------------------------

// 0️⃣ Kullanıcı Profili ve Konuşma Bağlamı
const userProfile = {
    name: "Komutanım",
    mood: "Normal",
    topicHistory: []
};
let conversationDepth = 1;

// 1️⃣ Güvenli Matematik Hesaplama
function safeEval(expr) {
    if(!/^[0-9+\-*/().^ xsincoetglr]+$/i.test(expr))
        throw new Error("Geçersiz karakterler tespit edildi!");
    
    const mathScope = {x:0, sin:Math.sin, cos:Math.cos, tan:Math.tan, e:Math.E, ln:Math.log, sqrt:Math.sqrt};
    return Function(...Object.keys(mathScope), `"use strict"; return (${expr.replace(/\^/g,'**')})`)(
        ...Object.values(mathScope)
    );
}

// 2️⃣ Gelişmiş Analitik Matematik
function solveAdvancedCalculus(type, expr, variable="x") {
    if(type==='derivative'){
        if(expr.includes('x*sin(x)')) return 'sin(x)+x*cos(x)';
        if(expr.includes('x*e^x')) return 'e^x+x*e^x';
        return expr.replace(/(\d*)\*?x\^(\d+)
