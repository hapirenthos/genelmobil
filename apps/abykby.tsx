import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView } from "react-native";
import {
  Activity,
  BookOpen,
  Brain,
  ChevronRight,
  ListChecks,
  Menu,
  Stethoscope,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Syringe,
  Image as ImageIcon,
  FileText,
} from "lucide-react-native";

// --- TİP TANIMLAMALARI ---
type Tab = "abh" | "kbh" | "quiz_abh" | "quiz_kbh" | "pdo" | "references";

interface Question {
  id: number;
  q: string;
  options: string[];
  correct: string;
  explanation: string;
}

interface CaseStep {
  title: string;
  text: string;
  options: string[];
  correctLabel: string;
  explanation: string;
}

interface Case {
  id: number;
  title: string;
  intro: string;
  steps: CaseStep[];
}

// --- VERİLER: TABLOLAR ---
const prifleTable = {
  headers: ["pRIFLE Evresi", "Tahmini Kreatinin Klerensi (eCCl) Değişimi", "İdrar Çıkışı Kriteri"],
  rows: [
    ["Risk (R)", "eCCl'de %25 azalma", "<0.5 mL/kg/saat (8 saat boyunca)"],
    ["Injury (I)", "eCCl'de %50 azalma", "<0.5 mL/kg/saat (16 saat boyunca)"],
    ["Failure (F)", "eCCl'de %75 azalma VEYA eCCl < 35", "<0.3 mL/kg/saat (24 saat) VEYA 12 saat anüri"],
    ["Loss (L)", "Persistan böbrek yetmezliği > 4 hafta", "Uygulanamaz"],
    ["End Stage (E)", "Son Dönem Böbrek Hastalığı (> 3 ay)", "Uygulanamaz"],
  ],
};

const kdigoTable = {
  headers: ["KDIGO Evresi", "Serum Kreatinin (SCr) Kriteri", "İdrar Çıkışı (UO) Kriteri"],
  rows: [
    ["Evre 1", "48 saat içinde ≥0.3 mg/dL artış VEYA 7 gün içinde 1.5-1.9 kat artış", "<0.5 mL/kg/saat (6-12 saat)"],
    ["Evre 2", "Bazale göre 2.0 - 2.9 kat artış", "< 0.5 mL/kg/saat (≥ 12 saat)"],
    ["Evre 3", "Bazale göre 3 kat artış VEYA SCr ≥ 4 VEYA diyaliz VEYA eGFH < 35", "< 0.3 mL/kg/saat (≥ 24 saat) VEYA anüri"],
  ],
};

const kbhKdigoTable = {
  headers: ["KBH Evresi (KDIGO)", "Klinik Tanımlama", "Tahmini GFH"],
  rows: [
    ["G1", "Normal veya artmış GFH (hasar mevcut)", "≥ 90"],
    ["G2", "GFH'de hafif düzeyde azalma", "60-89"],
    ["G3a", "GFH'de hafif-orta düzeyde azalma", "45-59"],
    ["G3b", "GFH'de orta-şiddetli düzeyde azalma", "30-44"],
    ["G4", "GFH'de şiddetli düzeyde azalma", "15-29"],
    ["G5", "Son Dönem Böbrek Hastalığı", "< 15"],
  ],
};

// --- VERİLER: SORU BANKALARI ---
const abyQuestions: Question[] = [
  {
    id: 1,
    q: "ABH tanısı konmuş 2 yaşında bir çocuğun etiyolojisini aydınlatmak amacıyla idrar fraksiyone sodyum atılımı (FENa) hesaplanıyor. Hasta daha önce diüretik kullanmamış veya yoğun sıvı tedavisi almamıştır. FENa değerinin %0.4 olarak saptanması aşağıdakilerden hangisini en güçlü şekilde destekler?",
    options: [
      "A) Akut post-streptokokal glomerülonefrit geliştiğini",
      "B) Aminoglikozit kullanımına bağlı akut interstisyel nefrit tablosunu",
      "C) Bilateral posterior üretral valv obstrüksiyonunu",
      "D) Gastroenterit kaynaklı sıvı deplesyonuna bağlı prerenal ABH'yi",
      "E) Uzamış doku iskemisine bağlı gelişen akut tübüler nekrozu (ATN)",
    ],
    correct: "D",
    explanation: "FENa değerinin %1'in altında olması, böbrek tübüllerinin hücresel olarak sağlam olduğunu ve vücuttaki düşük sıvı hacmine (hipoperfüzyon) fizyolojik bir yanıt olarak idrardaki sodyumu maksimum kapasitede geri emdiğini kanıtlar. Bu durum prerenal ABH'nin tipik göstergesidir.",
  },
  {
    id: 2,
    q: "Yenidoğan yoğun bakım ünitesinde izlenen prematüre bebeklerde ABH gelişiminin değerlendirilmesinde, serum kreatinin ölçümlerinin yorumlanması ile ilgili aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "A) Yaşamın ilk haftasında ölçülen serum kreatinin değerleri, annenin kreatinin seviyelerini yansıtır.",
      "B) Klasik KDIGO evrelemesindeki serum kreatinin cut-off değerleri yenidoğanlarda doğrudan kullanılır.",
      "C) Serum kreatinin seviyesi fonksiyon kaybının gecikmeli bir göstergesidir.",
      "D) Yenidoğanlarda Evre 3 ABH eşik değeri >2.5 mg/dL olarak belirlenmiştir.",
      "E) Yenidoğanlarda hidrasyon durumundaki hızlı değişimler ölçüm güvenilirliğini azaltır.",
    ],
    correct: "B",
    explanation: "Klasik KDIGO kriterleri yenidoğanlara doğrudan uygulanamaz. Yenidoğan fizyolojisindeki farklılıklar nedeniyle modifiye nKDIGO geliştirilmiştir ve Evre 3 sınırı >2.5 mg/dL kabul edilir.",
  },
  {
    id: 3,
    q: "Çocuklarda pRIFLE kriterleri kullanılarak böbrek fonksiyonlarındaki gerileme evrelendirilirken, 'Injury (Hasar)' evresi tahmini kreatinin klerensinde (eCCl) yüzde kaçlık bir düşüş ile karakterizedir?",
    options: ["A) %10", "B) %25", "C) %50", "D) %75", "E) %100"],
    correct: "C",
    explanation: "pRIFLE sınıflandırması oransal azalmalara dayanır. Risk (R) %25, Injury (I) %50, Failure (F) ise %75'lik bir azalmayı ifade eder.",
  },
  {
    id: 4,
    q: "Güncel KDIGO Akut Böbrek Hasarı kılavuzlarına göre, bir çocuğun Evre 1 ABH kabul edilebilmesi için 48 saat içerisinde serum kreatinin düzeyinde en az ne kadarlık mutlak bir artış olması gerekmektedir?",
    options: ["A) ≥ 0.1 mg/dL", "B) ≥ 0.3 mg/dL", "C) ≥ 0.5 mg/dL", "D) ≥ 1.0 mg/dL", "E) ≥ 2.0 mg/dL"],
    correct: "B",
    explanation: "KDIGO tanı kriterine göre, Evre 1 ABH tanımı 48 saat içerisinde serum kreatinin değerinde bazale göre ≥0.3 mg/dL mutlak artış olması olarak tanımlanır.",
  },
  {
    id: 5,
    q: "Sağlıklı bir yenidoğanda prerenal ABH lehine olan FENa değeri ile Akut Tübüler Nekroz (ATN) lehine olan FENa değeri sırasıyla aşağıdakilerden hangisinde doğru verilmiştir?",
    options: [
      "A) < %1 prerenal / > %2 ATN",
      "B) < %2 prerenal / > %2.5 ATN",
      "C) < %0.5 prerenal / > %1.5 ATN",
      "D) < %3 prerenal / > %4 ATN",
      "E) < %1.5 prerenal / > %2 ATN",
    ],
    correct: "B",
    explanation: "Normal çocuklarda prerenal hasarda FENa < %1 iken, yenidoğanlarda tübüller tam kapasiteyle çalışamadığından bu eşikler yükseltilmiştir; yenidoğanlarda < %2 prerenal durumu, > %2.5 ise ATN'yi gösterir.",
  },
  {
    id: 6,
    q: "Beş yaşında kız çocuğu, üç gün süren kanlı ishalin ardından solukluk, anüri ve peteşiyel döküntüler ile getiriliyor. Derin trombositopeni ve şiztositler saptanıyor. Bu hastadaki ABH'nin patofizyolojik yerleşimi hangisine aittir?",
    options: [
      "A) Prerenal hasar",
      "B) Postrenal obstrüksiyon",
      "C) Akut interstisyel nefrit",
      "D) İntrinsik (renal) vasküler hasar (HÜS)",
      "E) Sekonder renal iskemi",
    ],
    correct: "D",
    explanation: "Kanlı ishal, anemi, trombositopeni ve ABH triadı, Tipik Hemolitik Üremik Sendrom'un (HÜS) klasik tablosudur. Toksinler doğrudan renal glomerüler endotel hücrelerine zarar verdiği için intrinsik böbrek hasarıdır.",
  },
  {
    id: 7,
    q: "KDIGO evreleme sisteminde, en şiddetli evre olan Evre 3 ABH tanısında idrar çıkışının saatte kaç mL/kg'ın altında ve ne kadar süreyle kalması (veya anüri) kriter olarak belirlenmiştir?",
    options: [
      "A) < 0.5 mL/kg/saat (6 saat)",
      "B) < 0.5 mL/kg/saat (12 saat)",
      "C) < 0.3 mL/kg/saat (≥ 24 saat) VEYA anüri (≥ 12 saat)",
      "D) < 1.0 mL/kg/saat (12 saat)",
      "E) < 0.1 mL/kg/saat (6 saat)",
    ],
    correct: "C",
    explanation: "Evre 3'te tablonun derinleştiğini göstermek üzere sınır < 0.3 mL/kg/saat hıza ve 24 saatlik süreye çekilmiştir veya 12 saatlik anüri (hiç idrar çıkmaması) doğrudan Evre 3 olarak kabul edilir.",
  },
  {
    id: 8,
    q: "ABH tanısında güncel yaklaşımlarda fonksiyonel serum kreatinin ölçümüne yapısal bir alternatif olarak sunulan, tüm çekirdekli hücrelerden sabit hızda üretildiği için kas kütlesinden etkilenmeyen endojen renal belirteç hangisidir?",
    options: ["A) Ürik asit", "B) Kan Üre Azotu (BUN)", "C) Sistatin C", "D) İdrar NGAL düzeyi", "E) Beta-2 mikroglobulin"],
    correct: "C",
    explanation: "Sistatin C, tüm hücrelerde sabit üretilir. Kas kütlesine bağımlı olan kreatinin aksine, GFR'nin çok daha tutarlı ve bağımsız bir göstergesidir.",
  },
  {
    id: 9,
    q: "Böbrek ultrasonografisinde belirgin bilateral hidronefroz ve dilate böbrek pelvisi saptanan, mesanesi distandü olarak palpe edilen 2 haftalık erkek bebekteki ABH tablosu, etiyolojik sınıflamada hangisine uyar?",
    options: [
      "A) Prerenal - Hipo-perfüzyon",
      "B) İntrinsik - Glomerüler yıkım",
      "C) İntrinsik - Tübüler iskemik hasar",
      "D) İntrinsik - İnterstisyel nefrit",
      "E) Postrenal - Obstrüktif üropati",
    ],
    correct: "E",
    explanation: "Erkek bebekte bilateral hidronefroz ve şişmiş bir mesane bulgusu, idrar yolunun mesane altı seviyesinde tıkandığını kanıtlar (Posterior Üretral Valv - PUV). Bu anatomik engel Postrenal sınıftadır.",
  },
  {
    id: 10,
    q: "Şiddetli streptokokal farenjit enfeksiyonu geçirdikten iki hafta sonra aniden makroskopik hematüri ve hipertansiyon gelişen hastadan alınan böbrek biyopsisinin histopatolojisinde hangisinin görülmesi patognomoniktir?",
    options: [
      "A) Subepitelyal hörgüç ('hump') oluşumları",
      "B) Sadece renal proksimal tübüllerde epitel dökülmesi",
      "C) Artmış pelvik kistik dilatasyonlar",
      "D) Glomerüler bazal membranın tamamen incelip ayrılması",
      "E) Masif interstisyel inflamasyon",
    ],
    correct: "A",
    explanation: "Klinik tablo Akut post-streptokokal glomerülonefrittir. Patolojisinde, epitel hücresinin altında elektron yoğun immün birikimlerin oluşturduğu 'hörgüç (hump)' yapıları bu hastalığa özgüdür.",
  },
  {
    id: 11,
    q: "ABH yönetimi sırasında kardiyak ileti sistemini bozarak ölümcül aritmilere yol açtığı için ilk basamakta hızlıca tespit edilip müdahale edilmesi gereken en acil elektrolit anormalliği aşağıdakilerden hangisidir?",
    options: ["A) Hiponatremi", "B) Hiperkalemi", "C) Hiperfosfatemi", "D) Hipokalsemi", "E) Hipomagnezemi"],
    correct: "B",
    explanation: "Hiperkalemi, EKG'de sivri T dalgaları ile başlar ve hızla kardiyak arrest tablosuna gider. Bu nedenle ABH'de en acil yönetilmesi gereken durumdur.",
  },
  {
    id: 12,
    q: "ATN ve Prerenal ABH ayrımı idrar osmolaritesine bakılarak yapılabilir. Bu iki durumdaki beklenen ozmolalite bulguları hangi seçenekte doğru eşleştirilmiştir?",
    options: [
      "A) ATN'de konsantre (>500) / Prerenal'de seyreltik (<350)",
      "B) ATN'de seyreltik (<350) / Prerenal'de konsantre (>500)",
      "C) Her ikisinde de konsantredir.",
      "D) Her ikisinde de seyreltiktir.",
      "E) ATN'de idrar ozmolaritesi her zaman yüksektir.",
    ],
    correct: "B",
    explanation: "Prerenal durumda tübüller sağlamdır, suyu korumak için idrarı maksimum düzeyde konsantre ederler (>500). ATN'de tübüller zedelendiği için suyu geri emme yeteneklerini kaybederler ve idrar seyreltik (<350) atılır.",
  },
  {
    id: 13,
    q: "ABH tablosundaki bir çocuğa akut Hemodiyaliz başlanması kararı verilirken, aşağıdaki durumlardan hangisi diyaliz için kesin bir endikasyon teşkil etmez?",
    options: [
      "A) Medikal tedaviye dirençli hiperkalemi",
      "B) Dirençli sıvı yüklenmesi (pulmoner ödem)",
      "C) Üremik ensefalopati",
      "D) Dirençli derin metabolik asidoz",
      "E) Sadece BUN düzeyinin 40 mg/dL seviyesinde olması",
    ],
    correct: "E",
    explanation: "BUN seviyesinin tek başına artmış olması (özellikle 40 mg/dL gibi ılımlı bir yükseklik), hastanın kliniği stabilse acil diyaliz gerektirmez.",
  },
  {
    id: 14,
    q: "Pediatrik hastalarda tahmini glomerüler filtrasyon hızını (eGFH) hesaplamak için kullanılan Modifiye Schwartz formülü (eGFH=0.413 x Boy/SCr), hangi hasta parametrelerine dayanır?",
    options: [
      "A) Yaş ve Vücut Ağırlığı",
      "B) Boy uzunluğu ve BUN",
      "C) Boy uzunluğu ve Serum Kreatinin",
      "D) Vücut Ağırlığı ve Serum Kreatinin",
      "E) Vücut Yüzey Alanı ve İdrar Sodyumu",
    ],
    correct: "C",
    explanation: "Modifiye Schwartz formülü, çocuğun boy uzunluğunun (cm) 0.413 katsayısı ile çarpılıp, serum kreatinin (mg/dL) düzeyine bölünmesiyle eGFH'yi hesaplar.",
  },
  {
    id: 15,
    q: "pRIFLE sınıflandırmasında hastalığın kalıcı bir yetmezliğe doğru gittiğine işaret eden 'Loss (Kayıp)' kategorisi için hastada hangi klinik durumun gerçekleşmesi şart koşulmuştur?",
    options: [
      "A) Glomerüler filtrasyon hızında %100'lük durma",
      "B) Böbrek yetmezliği tablosunun 4 haftadan uzun süre devam etmesi",
      "C) Hastanın en az 3 gün diyalize bağlı kalması",
      "D) İdrar çıkışının 6 saat boyunca hiç olmaması",
      "E) Kreatinin seviyesinin yatış değerinin 2 katına çıkması",
    ],
    correct: "B",
    explanation: "Böbrek fonksiyon kaybının 4 haftadan uzun sürmesi 'Loss' evresini, 3 aydan uzun sürmesi ise kalıcı böbrek hastalığını ifade eden 'End Stage' evresini tanımlar.",
  },
  {
    id: 16,
    q: "KDIGO kılavuzunun güncellemelerinde erken tanıyı artırmak amacıyla resmi olarak hangi yeni değerlendirme kriteri kategorisi eklenmiştir?",
    options: [
      "A) Vücut kitle indeksi varyasyonları",
      "B) Böbrek ultrasonografisinde kortikal kalınlık değişiklikleri",
      "C) Yapısal böbrek hasarı belirteçleri (Biyomarker elevasyonu ve Sistatin C artışı)",
      "D) Kemik mineral yoğunluğu taramaları",
      "E) Santral venöz basınçtaki dalgalanmalar",
    ],
    correct: "C",
    explanation: "Güncel kılavuzlar, böbrekteki yapısal hasarı daha kreatinin yükselmeden gösteren biyomarkerlar ve Sistatin C artışlarını yapısal tanı kriteri olarak teşvik etmektedir.",
  },
  {
    id: 17,
    q: "Böbrek fonksiyonunda hızlı bir gerileme görülen ve histopatolojisinde 'hilal (kresent)' şeklinde proliferatif yapılar saptanan hastanın durumu hangi klinik tablodur?",
    options: [
      "A) Basit akut prerenal oligüri",
      "B) Hızlı ilerleyen (Kresentik) glomerülonefrit (RPGN)",
      "C) İlaca bağlı akut interstisyel nefrit",
      "D) Minimal değişiklik hastalığı",
      "E) Renal arter trombozu",
    ],
    correct: "B",
    explanation: "Kresent oluşumu, son derece agresif seyreden Hızlı İlerleyen Glomerülonefrit (RPGN) tablosunun patognomonik işaretidir.",
  },
  {
    id: 18,
    q: "Kritik çocuklarda ABH gelişimi açısından bağımsız risk faktörleri arasında aşağıdakilerden hangisi yer almaz?",
    options: [
      "A) Sepsis kaynaklı sistemik inflamasyon",
      "B) Nefrotoksik antibiyotik maruziyeti",
      "C) Vücut sıcaklığının fizyolojik sınırlarda (36.5°C) seyretmesi",
      "D) Perinatal asfiksi",
      "E) Açık kalp ameliyatları geçirmek",
    ],
    correct: "C",
    explanation: "Vücut sıcaklığının normal seyretmesi bir risk faktörü değildir. Diğer seçenekler pediatrik ABH'nin en büyük riskleridir.",
  },
  {
    id: 19,
    q: "İyotlu radyokontrast maddelerin çocuklarda böbrek hasarı oluşturmasındaki ana patofizyolojik mekanizma hangisidir?",
    options: [
      "A) Kresent oluşumunu indüklemesi",
      "B) Böbrek medüllasında iskemi yaratması ve doğrudan tübüler hücre toksisitesi yapması",
      "C) İdrarda kristalleşip üreterleri tıkayarak taş oluşturması",
      "D) Nörojenik sfinkter spazmı yaratması",
      "E) ADH salınımını durdurması",
    ],
    correct: "B",
    explanation: "Radyokontrast ajanlar böbrek medüllasında kan akımını keserek iskemi yaratırlar ve tübül hücrelerine toksik etki yaparak akut tübüler hasara yol açarlar.",
  },
  {
    id: 20,
    q: "Prematüre bir bebekte ABH insidansının zamanında doğan bebeklere göre belirgin artmış olmasının embriyolojik açıklaması hangisidir?",
    options: [
      "A) Üre döngüsü enzimlerinin hızlı sentezlenmesi",
      "B) Mesane kapasitesinin küçük olması",
      "C) Nefron oluşum sürecinin (nefrojenez) erken doğumla kesintiye uğramış olması",
      "D) Anne sütünde sodyumun bulunmaması",
      "E) Oksidatif hasar yapması",
    ],
    correct: "C",
    explanation: "Nefron gelişimi (nefrojenez) ağırlıklı olarak 36. haftaya kadar devam eder. Erken doğumlarda nefron havuzu eksik kalır ve böbrekler hemodinamik streslere karşı kırılgan hale gelir.",
  },
];

const kbyQuestions: Question[] = [
  {
    id: 1,
    q: "Kronik Böbrek Hastalığının (KBH) evreleri (G1-G5) belirlenirken esas alınan temel fizyolojik ölçüt aşağıdakilerden hangisidir?",
    options: [
      "A) 24 saatlik idrar hacmi",
      "B) Sistemik kan basıncı düzeyi",
      "C) Tahmini Glomerüler Filtrasyon Hızı (eGFH)",
      "D) Serum albümin miktarı",
      "E) Hemoglobin seviyesi",
    ],
    correct: "C",
    explanation: "KBH evreleme sistemi, mutlak surette hastanın eGFH (mL/dk/1.73m²) değerine göre kategorize edilir.",
  },
  {
    id: 2,
    q: "Kronik Böbrek Hastalığı tanısının konulabilmesi için, anormalliklerin aralıksız olarak en az ne kadar süredir devam ediyor olması şart koşulmuştur?",
    options: ["A) 1 hafta", "B) 2 hafta", "C) 1 ay", "D) 3 ay", "E) 1 yıl"],
    correct: "D",
    explanation: "KDIGO kriterlerine göre yapısal veya fonksiyonel anormalliklerin KBH olarak adlandırılabilmesi için >3 ay boyunca persistan olarak devam etmesi gerekir.",
  },
  {
    id: 3,
    q: "Çocuklarda KBH evrelemesi yapılırken, '3 aylık süre' kuralının ve standart GFH eşiklerinin doğrudan uygulanamadığı pediatrik yaş grubu hangisidir?",
    options: [
      "A) 2 yaş altı bebekler ve yenidoğanlar",
      "B) 3-5 yaş arası oyun çocukları",
      "C) 6 - 10 yaş arası okul çocukları",
      "D) 10-15 yaş arası puberte dönemi",
      "E) Sadece adölesanlar",
    ],
    correct: "A",
    explanation: "Yenidoğanların eGFH'si düşüktür ancak bu normaldir. GFH ancak 2 yaşına doğru erişkin seviyesine ulaşır. Bu nedenle evreleme eşikleri <2 yaş grupta geçersizdir.",
  },
  {
    id: 4,
    q: "Evre 4 (G4) KBH olarak sınıflandırılan bir çocuk hastada beklenen tahmini GFH aralığı aşağıdakilerden hangisidir?",
    options: ["A) ≥ 90", "B) 60-89", "C) 45-59", "D) 15-29", "E) < 15"],
    correct: "D",
    explanation: "KDIGO'ya göre Evre 4, diyalizden bir önceki dönem olup eGFH'nin 15-29 mL/dk/1.73m² arasına düştüğünü gösterir.",
  },
  {
    id: 5,
    q: "Pediatrik Kronik Böbrek Hastalığının (KBH) en yaygın görülen majör etiyolojisi aşağıdakilerden hangisidir?",
    options: [
      "A) Diyabetik Nefropati",
      "B) Böbrek ve İdrar Yollarının Doğumsal Anomalileri (CAKUT)",
      "C) Hipertansif nefroskleroz",
      "D) Sistemik Lupus Eritematozus",
      "E) Akut post-streptokokal glomerülonefrit",
    ],
    correct: "B",
    explanation: "Erişkinlerde diyabet öndeyken, çocuklarda KBH ağırlıklı olarak yapısal/embriyolojik kusurlardan (CAKUT yelpazesi) kaynaklanır.",
  },
  {
    id: 6,
    q: "Vezikoüreteral Reflü (VUR) varlığında, tekrarlayan İYE'ler sonucu böbrek parankiminde ilerleyici skar oluşumuyla karakterize duruma ne ad verilir?",
    options: ["A) Akut tübüler nekroz", "B) Reflü nefropatisi", "C) Üremik ensefalopati", "D) Alport Sendromu", "E) Minimal Değişiklik Hastalığı"],
    correct: "B",
    explanation: "Bakteri içeren idrarın yüksek basınçla böbreğe reflüsü sonucu fibrozisle (skarlaşma) ortaya çıkan parankim kaybı 'Reflü Nefropatisi' olarak adlandırılır.",
  },
  {
    id: 7,
    q: "Reflü nefropatisi gelişmiş bir hastada, yıllar içinde en sık saptanan ve KBH progresyonunu hızlandıran komplikasyon hangisidir?",
    options: [
      "A) Ortotastik hipotansiyon",
      "B) İkincil Hipertansiyon ve proteinüri (mikroalbüminüri)",
      "C) Pankreas yetmezliği",
      "D) Karaciğer sirozu",
      "E) Safra taşı oluşumu",
    ],
    correct: "B",
    explanation: "Skarlaşmış böbrek dokusu lokal olarak iskemik kalır ve sistemik sekonder hipertansiyona yol açar. Artan basınç sağlam glomerülleri zedeler ve protein kaçağı başlar.",
  },
  {
    id: 8,
    q: "Kronik Böbrek Hastalığı-Mineral ve Kemik Bozukluğunda (CKD-MBD), hastada beklenen tipik serum laboratuvar bulgusu profili hangisidir?",
    options: [
      "A) Hiperkalsemi, Hipofosfatemi, Düşük PTH",
      "B) Hipokalsemi, Hiperfosfatemi, Yüksek PTH (Sekonder Hiperparatiroidizm)",
      "C) Hipokalsemi, Hipofosfatemi, Normal PTH",
      "D) Hiperkalsemi, Hiperfosfatemi, Düşük PTH",
      "E) Normal Kalsiyum, Düşük Fosfor, Düşük PTH",
    ],
    correct: "B",
    explanation: "Böbrek GFR'si azaldığında fosfor atılamaz (Hiperfosfatemi), D vitamini aktifleştirilemez ve kalsiyum düşer (Hipokalsemi). Vücut kalsiyumu düzeltmek için aşırı PTH salgılar (Sekonder Hiperparatiroidizm).",
  },
  {
    id: 9,
    q: "Renal Osteodistrofi patogenezinde rol oynamayan patofizyolojik faktör aşağıdakilerden hangisidir?",
    options: [
      "A) Aktif D vitamini üretiminin yetersizliği",
      "B) PTH'nin patolojik seviyelere çıkması",
      "C) İdrarla fosfat atılamamasına bağlı hiperfosfatemi",
      "D) Tiroid bezinden tiroksin (T4) salınımının artması",
      "E) Kemik dönüşüm anormallikleri",
    ],
    correct: "D",
    explanation: "Tiroid bezinin veya tiroksin hormonunun CKD-MBD tablosunda hiçbir direkt belirleyici rolü yoktur.",
  },
  {
    id: 10,
    q: "X'e bağlı hipofosfatemik rikets (XLH) hastası bir çocukta tedaviye direncin temel hücresel mekanizması nedir?",
    options: [
      "A) PTH reseptörlerinin genetik yokluğu",
      "B) Karaciğerdeki D vitamini sentezleyen enzim eksikliği",
      "C) PHEX gen mutasyonuna bağlı artmış FGF23'ün böbreklerden fosfat kaybettirmesi",
      "D) Bağırsakta kalsiyum kanal bozukluğu",
      "E) Oksidatif stres",
    ],
    correct: "C",
    explanation: "Kök nedeni PHEX gen mutasyonudur. Bu mutasyon FGF23'ü artırır. Aşırı artan FGF23 böbreklere giderek fosfatın idrarla kaybedilmesine neden olur.",
  },
];

const pdoCases: Case[] = [
  {
    id: 1,
    title: "Vaka 1: Yenidoğan Yoğun Bakım Ünitesi - Akut Böbrek Hasarı (Perinatal Asfiksi)",
    intro: "38 haftalık miadında, zor doğum öyküsü olan bebek resüsite ediliyor. Hipoksik İskemik Ensefalopati (HİE) tanısıyla hipotermi protokolüne sokuluyor. 2. gün idrar çıkışı <0.4 mL/kg/saat ve ödem saptanıyor.",
    steps: [
      {
        title: "Adım 1: İlk Değerlendirme",
        text: "Serum Kreatinin değeri 1.6 mg/dL geliyor. Böbrek hasarı evrelemesi açısından hangi analitik yaklaşım doğrudur?",
        options: [
          "A) Kreatinin erişkin eşiklerini aştığı için Evre 2 ABH kabul edilir.",
          "B) Kreatinin anneye ait olabilir ancak idrar çıkışı <0.5 mL/kg/saat olması nKDIGO'ya göre Evre 2 ABH'yi gösterir.",
          "C) Asfiktik bebekte kreatinin düşük olmalıdır, tahlil hatalıdır.",
        ],
        correctLabel: "B",
        explanation: "Yenidoğanda ilk hafta kreatinini anneyi yansıtabilir. İdrar çıkışının azalması bebeğin böbrek işlevini anlık olarak gösterir.",
      },
      {
        title: "Adım 2: Hasarın Karakterini Belirleme",
        text: "FENa değeri %3.1 hesaplanıyor. Bu durum prerenal mi yoksa ATN midir?",
        options: [
          "A) FENa > %2.5 olduğu için tübüler parankim hasarı (ATN) gelişmiştir.",
          "B) FENa > %2 olduğu için sıvı açığı (prerenal) vardır.",
          "C) Yenidoğanda FENa hesaplaması işe yaramaz.",
        ],
        correctLabel: "A",
        explanation: "Yenidoğanlar için ATN eşik değeri > %2.5'tir. %3.1 değeri, iskeminin proksimal tübülleri nekroza uğrattığını (ATN) kanıtlar.",
      },
    ],
  },
  {
    id: 2,
    title: "Vaka 2: Okul Çağı Çocuğu - Akut Glomerüler Yıkım (PSGN)",
    intro: "8 yaşında kız, göz kapaklarında şişlik ve çay rengi idrar ile getiriliyor. 15 gün önce ateşli tonsillit geçirmiş. Kan basıncı: 145/95 mmHg.",
    steps: [
      {
        title: "Adım 1: Laboratuvar Seçimi",
        text: "APSGN şüphesiyle hangi laboratuvar panelini öncelikli istersiniz?",
        options: [
          "A) İdrar kültürü ve sintigrafi",
          "B) TİT, elektrolitler, BUN/Kreatinin, C3 kompleman düzeyi ve ASO titresi",
          "C) Abdominal BT ve Karaciğer fonksiyon testleri",
        ],
        correctLabel: "B",
        explanation: "APSGN tanısında hematüri/proteinüri, böbrek fonksiyon testleri, kandaki C3 kompleman düşüklüğü ve ASO titresi yüksekliği klasik beklentidir.",
      },
    ],
  },
];

const referencesList = [
  "1. APPROACH TO PEDIATRIC ACUTE KIDNEY INJURY - PedsCases",
  "2. Current Concepts of Pediatric Acute Kidney Injury - PMC",
  "3. Chronic Kidney Disease - Boston Children's Hospital",
  "4. Neonatal AKI profile using KDIGO guidelines - Frontiers",
  "5. KDIGO 2026 CLINICAL PRACTICE GUIDELINE FOR AKI AND AKD",
  "6. CAKUT: A Pediatric Perspective on the Leading Cause of CKD",
  "7. Nelson Textbook of Pediatrics, 22nd Edition",
  "8. Acute Kidney Injury (AKI) and Acute Kidney Disease (AKD) - KDIGO"
];

// --- YENİDEN KULLANILABİLİR BİLEŞENLER ---

const StrictTable = ({ data }: { data: { headers: string[]; rows: string[][] } }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="my-6 border border-slate-200 rounded-lg">
      <View className="bg-white">
        <View className="flex-row bg-slate-100 border-b border-slate-200">
          {data.headers.map((h, i) => (
            <View key={i} className="p-3 w-32 border-r border-slate-200 justify-center">
              <Text className="font-bold text-slate-700 text-xs">{h}</Text>
            </View>
          ))}
        </View>
        {data.rows.map((row, i) => (
          <View key={i} className={`flex-row border-b border-slate-200 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
            {row.map((cell, j) => (
              <View key={j} className="p-3 w-32 border-r border-slate-200 justify-center">
                <Text className="text-slate-600 text-xs leading-relaxed">{cell}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const AlertBox = ({ title, children, type = "info" }: { title: string; children: React.ReactNode; type?: "info" | "warning" }) => {
  const bg = type === "info" ? "bg-indigo-50 border-indigo-200" : "bg-amber-50 border-amber-200";
  const text = type === "info" ? "text-indigo-800" : "text-amber-800";
  const IconComponent = type === "info" ? Info : AlertCircle;

  return (
    <View className={`p-4 my-4 border rounded-lg flex-row space-x-3 ${bg}`}>
      <View className="mt-1 mr-2"><IconComponent size={24} color={type === "info" ? "#3730a3" : "#92400e"} /></View>
      <View className="flex-1">
        <Text className={`font-bold mb-2 ${text}`}>{title}</Text>
        <Text className={`text-sm leading-relaxed ${text}`}>{children}</Text>
      </View>
    </View>
  );
};

const QuizBank = ({ questions, title }: { questions: Question[]; title: string }) => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <View className="space-y-6">
      <View className="flex-row items-center border-b border-slate-200 pb-2 mb-4">
        <ListChecks size={24} color="#4f46e5" />
        <Text className="text-xl font-bold text-slate-800 ml-2">{title}</Text>
      </View>
      <View className="gap-4">
        {questions.map((q, idx) => (
          <View key={q.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
            <Text className="font-semibold text-slate-800 mb-3 text-sm leading-relaxed">
              <Text className="text-indigo-600">{idx + 1}. </Text>{q.q}
            </Text>
            <View className="gap-2 mb-4">
              {q.options.map((opt, i) => (
                <Text key={i} className="text-sm text-slate-600">{opt}</Text>
              ))}
            </View>
            <TouchableOpacity 
              onPress={() => setOpenId(openId === q.id ? null : q.id)}
              className="flex-row items-center"
            >
              <ChevronRight size={16} color="#4f46e5" style={{ transform: [{ rotate: openId === q.id ? '90deg' : '0deg' }] }} />
              <Text className="text-indigo-600 font-medium text-sm ml-1">{openId === q.id ? "Çözümü Gizle" : "Çözümü Göster"}</Text>
            </TouchableOpacity>

            {openId === q.id && (
              <View className="mt-4 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg">
                <Text className="font-bold text-indigo-900 mb-1">Doğru Cevap: {q.correct}</Text>
                <Text className="text-sm text-slate-700">{q.explanation}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const CaseStudyViewer = () => {
  const [activeCaseId, setActiveCaseId] = useState<number>(1);
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);

  const activeCase = pdoCases.find((c) => c.id === activeCaseId)!;
  const currentStep = activeCase.steps[activeStepIdx];
  const isCompleted = selectedOpt !== null;
  const isCorrect = selectedOpt === currentStep.correctLabel;

  return (
    <View className="space-y-6">
      <View className="flex-row items-center border-b border-slate-200 pb-2 mb-4">
        <Stethoscope size={24} color="#4f46e5" />
        <Text className="text-xl font-bold text-slate-800 ml-2">PDÖ Vakaları</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        {pdoCases.map((c) => (
          <TouchableOpacity
            key={c.id}
            onPress={() => { setActiveCaseId(c.id); setActiveStepIdx(0); setSelectedOpt(null); }}
            className={`px-4 py-2 mr-2 rounded-full border ${activeCaseId === c.id ? "bg-indigo-600 border-indigo-600" : "bg-white border-slate-200"}`}
          >
            <Text className={`font-bold text-xs ${activeCaseId === c.id ? "text-white" : "text-slate-600"}`}>Vaka {c.id}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="bg-white rounded-xl shadow-sm border border-slate-200">
        <View className="bg-slate-50 border-b border-slate-200 p-4">
          <Text className="text-lg font-bold text-slate-800 mb-2">{activeCase.title}</Text>
          <Text className="text-sm text-slate-600 leading-relaxed">{activeCase.intro}</Text>
        </View>

        <View className="p-4">
          <Text className="font-semibold text-lg text-slate-800 mb-2">{currentStep.title}</Text>
          <Text className="text-sm text-slate-700 mb-6 leading-relaxed">{currentStep.text}</Text>

          <View className="gap-3">
            {currentStep.options.map((opt, i) => {
              const optLetter = opt.charAt(0);
              let bg = "bg-white border-slate-200";
              let textColor = "text-slate-700";

              if (isCompleted) {
                if (optLetter === currentStep.correctLabel) { bg = "bg-green-50 border-green-500"; textColor = "text-green-800 font-bold"; }
                else if (optLetter === selectedOpt) { bg = "bg-red-50 border-red-500"; textColor = "text-red-800"; }
                else { bg = "bg-slate-50 border-slate-200 opacity-50"; textColor = "text-slate-400"; }
              }

              return (
                <TouchableOpacity
                  key={i}
                  disabled={isCompleted}
                  onPress={() => setSelectedOpt(optLetter)}
                  className={`p-4 border rounded-lg flex-row ${bg}`}
                >
                  <View className="mr-3 mt-1">
                    {isCompleted && optLetter === currentStep.correctLabel ? <CheckCircle size={16} color="#16a34a" /> : null}
                    {isCompleted && optLetter === selectedOpt && optLetter !== currentStep.correctLabel ? <XCircle size={16} color="#dc2626" /> : null}
                    {!isCompleted ? <View className="w-4 h-4 rounded-full border border-slate-300" /> : null}
                  </View>
                  <Text className={`flex-1 text-sm ${textColor}`}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {isCompleted && (
            <View className="mt-6">
              <View className={`p-4 rounded-lg mb-4 border ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                <Text className={`font-bold mb-2 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  {isCorrect ? "Doğru Seçim!" : "Yanlış Seçim!"} (Cevap: {currentStep.correctLabel})
                </Text>
                <Text className="text-sm text-slate-700">{currentStep.explanation}</Text>
              </View>

              {activeStepIdx < activeCase.steps.length - 1 ? (
                <TouchableOpacity
                  onPress={() => { setActiveStepIdx(prev => prev + 1); setSelectedOpt(null); }}
                  className="bg-indigo-600 py-3 rounded-lg flex-row justify-center items-center"
                >
                  <Text className="text-white font-bold mr-2">Sonraki Adım</Text>
                  <ChevronRight size={16} color="white" />
                </TouchableOpacity>
              ) : (
                <View className="bg-slate-800 py-3 rounded-lg flex-row justify-center items-center">
                  <CheckCircle size={16} color="white" />
                  <Text className="text-white font-bold ml-2">Vaka Tamamlandı</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const SectionABH = () => (
  <View className="gap-6">
    <View className="border-b border-slate-200 pb-4">
      <Text className="text-2xl font-bold text-slate-900 mb-2">Akut Böbrek Hasarı (ABH)</Text>
      <Text className="text-slate-500 text-xs leading-relaxed">Pediatrik Nefrolojide Klinik Değerlendirme ve Yönetim</Text>
    </View>

    <Text className="text-sm text-slate-800 leading-relaxed">
      Akut böbrek hasarı, böbreklerin kanı süzme işlevindeki ani ve genellikle geri döndürülebilir bir azalma sonucunda karakterize olan karmaşık bir klinik sendromdur.
    </Text>

    <Text className="text-xl font-bold text-slate-900 mt-4">pRIFLE Kriterleri</Text>
    <StrictTable data={prifleTable} />

    <Text className="text-xl font-bold text-slate-900 mt-4">KDIGO Kriterleri</Text>
    <StrictTable data={kdigoTable} />

    <AlertBox title="Yenidoğanlarda Modifiye KDIGO (nKDIGO)" type="warning">
      Yaşamın ilk haftasında bebeğin serum kreatinin seviyesi maternal kreatinini yansıtır. Bu nedenle Evre 3 ABH tanımı için serum kreatinin eşik değeri, &gt;2.5 mg/dL olarak revize edilmiştir.
    </AlertBox>

    <Text className="text-xl font-bold text-slate-900 mt-4">Etiyolojik Sınıflandırma</Text>
    <View className="gap-4">
      <View className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
        <Text className="font-bold text-indigo-900 mb-1">1. Prerenal ABH</Text>
        <Text className="text-sm text-slate-800">Dehidratasyon en yaygın senaryodur. Böbrek kan akımının (perfüzyonunun) yetersiz kalması yatar.</Text>
      </View>
      <View className="bg-amber-50 p-4 rounded-lg border border-amber-100">
        <Text className="font-bold text-amber-900 mb-1">2. İntrinsik (Renal) ABH</Text>
        <Text className="text-sm text-slate-800">ATN, HÜS veya Akut post-streptokokal glomerülonefrit intrinsik böbrek hasarı yelpazesini oluşturur.</Text>
      </View>
      <View className="bg-slate-100 p-4 rounded-lg border border-slate-200">
        <Text className="font-bold text-slate-800 mb-1">3. Postrenal ABH</Text>
        <Text className="text-sm text-slate-800">İdrar akışının engellenmesine bağlı gelişir. PUV en sık görülen pediatrik nedendir.</Text>
      </View>
    </View>
    
    <AlertBox title="Prerenal ve İntrinsik Hasarın Ayırt Edilmesi (FENa)" type="info">
      Prerenal ABH durumunda FENa &lt; %1 hesaplanır. İntrinsik Hasar (ATN) durumunda ise FENa &gt; %2.0'nin üzerine çıkar. Yenidoğanlarda ise bu sınırlar &lt; %2 ve &gt; %2.5 olarak kabul edilmelidir.
    </AlertBox>
  </View>
);

const SectionKBH = () => (
  <View className="gap-6">
    <View className="border-b border-slate-200 pb-4">
      <Text className="text-2xl font-bold text-slate-900 mb-2">Kronik Böbrek Hastalığı (KBH)</Text>
    </View>

    <Text className="text-sm text-slate-800 leading-relaxed">
      KBH, böbrek yapısındaki veya fonksiyonundaki anormalliklerin üç aydan daha uzun bir süre boyunca devam etmesi durumudur.
    </Text>

    <Text className="text-xl font-bold text-slate-900 mt-4">Evreleme</Text>
    <StrictTable data={kbhKdigoTable} />

    <AlertBox title="Pediatrik Evrelemede Farklar" type="warning">
      Klasik 5 evreli sınıflandırma, 2 yaşından küçük çocuklar için uygulanmaz, zira düşük GFH fizyolojik olabilir.
    </AlertBox>

    <Text className="text-xl font-bold text-slate-900 mt-4">Komplikasyonlar</Text>
    <View className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
      <Text className="font-bold text-slate-800 mb-2">Renal Osteodistrofi</Text>
      <Text className="text-sm text-slate-700">Hiperfosfatemi ve Hipokalsemi paratiroid bezini aşırı uyarır (Sekonder Hiperparatiroidizm). Bu durum ağır iskelet deformitelerine yol açar.</Text>
    </View>
  </View>
);

// --- ANA UYGULAMA BİLEŞENİ ---
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("abh");

  const renderContent = () => {
    switch (activeTab) {
      case "abh": return <SectionABH />;
      case "kbh": return <SectionKBH />;
      case "quiz_abh": return <QuizBank title="ABH Soru Bankası" questions={abyQuestions} />;
      case "quiz_kbh": return <QuizBank title="KBH Soru Bankası" questions={kbyQuestions} />;
      case "pdo": return <CaseStudyViewer />;
      case "references":
        return (
          <View className="gap-4">
            <Text className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">Kaynaklar</Text>
            <View className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm gap-2">
              {referencesList.map((ref, idx) => (
                <View key={idx} className="flex-row border-b border-slate-100 pb-2 mb-2">
                  <FileText size={16} color="#94a3b8" className="mr-2 mt-0.5" />
                  <Text className="text-xs text-slate-600 flex-1">{ref}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      default: return <SectionABH />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      
      {/* Yatay Sekme Menüsü */}
      <View className="bg-slate-900">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 12 }}>
          {[
            { id: "abh", label: "ABH", icon: Activity },
            { id: "kbh", label: "KBH", icon: Syringe },
            { id: "pdo", label: "Vakalar", icon: Stethoscope },
            { id: "quiz_abh", label: "ABH Test", icon: ListChecks },
            { id: "quiz_kbh", label: "KBH Test", icon: ListChecks },
            { id: "references", label: "Kaynaklar", icon: BookOpen }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id as Tab)}
                className={`flex-row items-center px-4 py-2 mr-2 rounded-full ${isActive ? "bg-indigo-600" : "bg-slate-800"}`}
              >
                <Icon size={16} color={isActive ? "white" : "#94a3b8"} />
                <Text className={`font-bold text-xs ml-2 ${isActive ? "text-white" : "text-slate-400"}`}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Ana İçerik */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
