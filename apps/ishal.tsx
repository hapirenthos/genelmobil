import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  BookOpen,
  Activity,
  Users,
  ClipboardList,
  TestTube,
  Microscope,
  Stethoscope,
  Lightbulb,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  BookMarked,
} from "lucide-react-native";

// --- TİP VE INTERFACE TANIMLAMALARI ---
interface PblStage {
  title: string;
  text: string;
  reasoning: string;
}

interface PblCase {
  id: string;
  title: string;
  stages: PblStage[];
}

interface SubTab {
  id: string;
  title: string;
  text?: string;
  isTable?: boolean;
  headers?: string[];
  rows?: string[][];
}

interface Section {
  title: string;
  icon: any;
  text?: string;
  intro?: string;
  subTabs?: SubTab[];
  cases?: PblCase[];
  items?: string[];
}

type ContentDataType = Record<string, Section>;

// --- DATA: TAMAMEN KORUNMUŞ İÇERİK ---
const contentData: ContentDataType = {
  intro: {
    title: "İntrodüksiyon ve Tanımsal Çerçeve",
    icon: BookOpen,
    text: `Pediatrik popülasyonda gastrointestinal sistem hastalıkları, tüm dünyada morbidite ve mortalitenin en önde gelen nedenleri arasında yer almaya devam etmektedir. Akut ishal ataklarının büyük bir kısmı kendini sınırlayan viral veya bakteriyel enfeksiyonlara bağlı olarak günler içinde düzelme eğilimi gösterse de, ishalin uzaması ve kronikleşmesi klinisyenler için çok daha karmaşık bir tanısal, terapötik ve nutrisyonel zorluk teşkil eder.\n\nGenel tıbbi literatürde ve pediatrinin temel başvuru kaynaklarında kronik ishal, dışkı kıvamında belirgin azalma ve dışkı miktarında artışın ondört günden daha uzun sürmesi olarak tanımlanmaktadır. Objektif hacimsel parametrelere göre değerlendirildiğinde, yenidoğanlarda ve küçük çocuklarda günlük dışkı miktarının 10 g/kg/gün sınırını, adölesan ve erişkinlerde ise 200 g/gün sınırını aşması ishal olarak kabul edilmektedir.\n\nKronik ve persistan ishal atakları, özellikle büyüme ve gelişmenin en kritik olduğu yaşamın ilk yıllarında ortaya çıktığında, uzun vadeli ve geri dönüşümsüz yıkıcı sonuçlar doğurma potansiyeli taşır. Erken çocukluk döneminde geçirilen tekrarlayan veya uzayan ishal atakları, bağırsak mukozasında yapısal hasara yol açarak besin emilimini bozar; bu durum malnütrisyona, sekonder laktaz eksikliğine, immün yetmezliğe ve sekonder enfeksiyonlara zemin hazırlayan tehlikeli bir hücresel kısır döngü yaratır.`,
  },
  pathophysiology: {
    title: "Kronik İshalin Patofizyolojik Mekanizmaları",
    icon: Activity,
    intro: `Kronik ishalin etiyolojisi genetik mutasyonlardan immünolojik bozukluklara kadar geniş bir yelpazeye yayılsa da, lümende aşırı sıvı birikimine yol açan temel hücresel ve biyokimyasal mekanizmalar dört ana kategori altında incelenir. Bu mekanizmaların tam olarak anlaşılması, tanısal algoritmaların rasyonel bir şekilde uygulanabilmesi için elzemdir.`,
    subTabs: [
      {
        id: "osmotic",
        title: "Ozmotik İshal",
        text: `Ozmotik ishal, bağırsak lümeninde emilemeyen veya yapısal nedenlerle sindirilemeyen osmotik olarak aktif solütlerin varlığına bağlı olarak, osmotik gradiyent boyunca suyun hücre içinden lümene çekilmesi sonucunda meydana gelir. İnce bağırsak mukozasındaki fırçamsı kenar enzimlerinin eksikliği durumunda, sindirilemeyen disakkaritler kolona ulaşır.\n\nKolonda bulunan mikrobiyota, bu sindirilemeyen şekerleri fermente ederek laktik asit ve kısa zincirli yağ asitlerine dönüştürür. Bu biyokimyasal fermantasyon süreci, dışkı pH'sının belirgin şekilde düşmesine (asidik dışkı) ve aşırı hidrojen ile metan gazı üretimine neden olur.\n\nOzmotik ishalin en temel klinik karakteristikleri; hastanın oral alımının kesilmesi (açlık testi) durumunda lümene giren osmotik yük ortadan kalktığı için ishalin dramatik şekilde durması ve dışkı elektrolit analiziyle hesaplanan fekal ozmotik açığın yüksek (genellikle >50-100 mOsm/kg) saptanmasıdır.`,
      },
      {
        id: "secretory",
        title: "Sekretuvar İshal",
        text: `Sekretuvar ishal, intestinal epitel hücrelerinden (özellikle kript hücrelerinden) lümene aktif sıvı ve elektrolit sekresyonunun artması veya fizyolojik absorpsiyon mekanizmalarının bozulması sonucunda gelişir.\n\nSuyun klorürü takip ederek lümene geçmesiyle masif bir dehidratasyon tablosu oluşur. Sekretuvar ishal, hastanın aç bırakılmasına rağmen endojen sekresyon devam ettiği için ishalin durmaması, günlük dışkı hacminin çok yüksek olması ve elektrolit kaybının fazla olması nedeniyle fekal ozmotik açığın düşük (<50 mOsm/kg) olması ile karakterizedir. Dışkı sodyumu sıklıkla 70 mEq/L'nin üzerindedir.`,
      },
      {
        id: "inflammatory",
        title: "İnflamatuvar İshal",
        text: `İnflamatuvar ishal, bağırsak epitelinde mukozal hasara, ülserasyona ve dolayısıyla toplam emilim yüzey alanının dramatik kaybına neden olan patolojik süreçleri tanımlar. İltihaplanan ve bütünlüğü bozulan dokudan bağırsak lümenine protein, kan, mukus ve lökosit sızar.\n\nİnflamatuvar bağırsak hastalıkları (Ülseratif Kolit, Crohn hastalığı), otoimmün enteropatiler, çölyak hastalığı ve invaziv bakteriyel/paraziter enfeksiyonlar bu grubun en belirgin örnekleridir. Dışkı analizinde makroskopik kan ve mukus varlığı, mikroskopik olarak lökosit tespit edilmesi ve nötrofil degranülasyonunu gösteren yüksek fekal kalprotektin seviyeleri bu mekanizmanın en güvenilir biyobelirteçleridir.`,
      },
      {
        id: "dysmotility",
        title: "Dismotilite ve Fonksiyonel",
        text: `Bağırsak geçiş süresinin (transit time) otonom sinir sistemi bozuklukları, tirotoksikoz veya fonksiyonel nedenlerle anormal derecede hızlanması, luminal içerikteki suyun ve besin maddelerinin emilimi için yeterli fizyolojik sürenin tanınmamasına neden olur.\n\nÇocukluk çağının kronik non-spesifik ishali (Toddler's diarrhea) ve daha büyük çocuklarda/adölesanlarda görülen irritabl bağırsak sendromu (IBS), yapısal, biyokimyasal veya inflamatuvar bir doku hasarı olmaksızın gelişen tipik fonksiyonel dismotilite örnekleridir.`,
      },
      {
        id: "table1",
        title: "Karşılaştırma Tablosu",
        isTable: true,
        headers: [
          "Parametre",
          "Ozmotik",
          "Sekretuvar",
          "İnflamatuvar",
          "Dismotilite",
        ],
        rows: [
          [
            "Mekanizma",
            "Emilemeyen solüt",
            "Aktif iyon sekresyonu",
            "Mukozal hasar",
            "Hızlı/Yavaş geçiş",
          ],
          [
            "Açlık Yanıtı",
            "Tamamen durur",
            "Hacimli devam eder",
            "Kısmen devam eder",
            "Gıda ile tetiklenir",
          ],
          [
            "Dışkı Hacmi",
            "<200 mL/gün",
            "Masif, >200 mL/gün",
            "Sık ve az miktar",
            "Değişken",
          ],
          [
            "Ozmotik Açık",
            "Geniş (>50 mOsm/kg)",
            "Dar (<50 mOsm/kg)",
            "Normal",
            "-",
          ],
          ["Lökosit/Kan", "Negatif", "Negatif", "Güçlü Pozitif", "Negatif"],
        ],
      },
    ],
  },
  ageGroups: {
    title: "Yaş Gruplarına Göre Ayırıcı Tanılar",
    icon: Users,
    intro: `Pediatrik kronik ishal vakalarında etiyolojik yelpaze yaşa göre çok büyük farklılıklar gösterir. Hastanın hangi yaş grubunda olduğu, kullanılacak klinik algoritmaların ilk basamağını oluşturur.`,
    subTabs: [
      {
        id: "neonate",
        title: "1. Yenidoğan (0-30 Gün) ve Erken Süt",
        text: `Bu dönemde başlayan kronik ishal atakları son derece ciddidir ve hızlıca hayatı tehdit eden dehidratasyon, elektrolit imbalansı ve ileri derece malnütrisyon tabloları ile seyreder.\n\nKonjenital hastalıklar arasında öne çıkan Mikrovillus İnklüzyon Hastalığı (MVID), doğumdan hemen sonra masif sekretuvar, sulu ishal ile başlar. Hasta enteral beslenmeyi tolere edemez ve total parenteral beslenmeye (TPN) tam bağımlı hale gelir.\n\nElektrolit transport defektleri açısından Konjenital Klorür İshali, lümendeki klorür ile hücre içindeki bikarbonat değişiminin bozulduğu, in utero başlayan nadir bir hastalıktır. Fekal klorür düzeyi çok yüksektir (>90 mEq/L).\n\nKarbonhidrat emilim bozukluklarının en ağır formu olan Konjenital Glikoz-Galaktoz Malabsorbsiyonu (GGM), sodyum bağımlı glikoz transporter defektidir. Fekal pH düşüktür ve indirgeyici maddeler pozitiftir. Çocuğun diyeti fruktoz bazlı özel formüllerle değiştirildiğinde ishal mucizevi bir hızla kesilir.`,
      },
      {
        id: "toddler",
        title: "2. Süt ve Oyun Çocuğu (1 Ay-3 Yaş)",
        text: `Bu dönemin açık ara en sık görülen nedeni Çocukluk Çağının Kronik Non-spesifik İshali (Toddler's Diarrhea) tablosudur. İshal sadece uyanık olunan saatlerde ortaya çıkar, günde 4-10 kez kahverengi, sulu, bazen sindirilmemiş gıda parçaları içerir. Ancak çocuğun kilo alımı ve boy uzaması tamamen normaldir.\n\nBir diğer yaygın neden Post-Gastroenterit İshal durumudur. Akut bir viral veya bakteriyel bağırsak enfeksiyonunu takiben laktaz enzim aktivitesinin azalmasıyla karakterizedir.\n\nDiyete ek gıdaların eklenmesiyle klinik bulgu vermeye başlayan Çölyak Hastalığı, diyete gluten içeren gıdaların eklenmesiyle ortaya çıkan otoimmün aracılı hücresel bir enteropatidir. Kilo alamama, genel malabsorbsiyon (kötü kokulu, yağlı, hacimli dışkı), karın şişliği ve demir eksikliği anemisi ile karakterizedir.`,
      },
      {
        id: "older",
        title: "3. Büyük Çocuklar ve Adölesanlar",
        text: `İnflamatuvar Bağırsak Hastalıkları (IBD), hücresel immünitenin bağırsak florasına karşı uygunsuz reaksiyon vermesiyle oluşur. Karın ağrısı, kronik kanlı ve mukuslu ishal, sistemik ateş, kilo kaybı gibi dramatik belirtiler gösterir.\n\nİrritabl Bağırsak Sendromu (IBS) büyük çocuklarda görülen en yaygın fonksiyonel bir hastalıktır. Genellikle psikosomatik stresörlerle tetiklenen karın ağrısı ile birlikte defekasyon alışkanlığında değişiklikler (ishal ve kabızlık atakları) izlenir. Alarm semptomları kesinlikle yoktur.\n\nPrimer Laktoz İntoleransı (Hipolaktazya), laktaz enzim aktivitesinin yaşla birlikte genetik olarak programlanmış ilerleyici kaybı neticesinde ortaya çıkar. Süt ürünleri alımı sonrası karında şişkinlik, gaz ve şiddetli ozmotik ishal başlar.`,
      },
    ],
  },
  clinicalApproach: {
    title: "Klinik Yaklaşım ve Öykü",
    icon: ClipboardList,
    intro: `Temel hedef, ishalin yapısal bir organ patolojisinden (malabsorbsiyon, inflamasyon, enzim defekti) mi yoksa geçici bir diyet hatası/fonksiyonel bir süreçten (CNSD, IBS) mi kaynaklandığını birbirinden kesin çizgilerle ayırmaktır.`,
    subTabs: [
      {
        id: "anamnesis",
        title: "Anamnez ve Diyet",
        text: `1. Dışkının Rengi, Kıvamı ve İçeriği: Dışkının sulu, fışkırır tarzda olması ozmotik bir ishalin tipik bulgusudur. Dışkının son derece kötü kokulu, macun veya kil kıvamında olması ağır bir yağ malabsorbsiyonunu (steatore) işaret eder. Dışkıda makroskopik kan ve yoğun mukus varlığı tartışmasız bir şekilde inflamatuvar patolojileri düşündürür.\n\n2. Diyet Günlüğü: Ailelerden hastanın üç günlük detaylı diyet günlüğünü tutmaları istenmelidir. Günlük tüketilen karbonhidrat içerikli içeceklerin hacmi, elma, armut suyu gibi içeceklerin miktarı hesaplanmalıdır.\n\n3. Başlangıç Zamanı: Doğumdan hemen sonra başlaması konjenital transport defektlerini, yakın zamanda geçirilmiş seyahati paraziter hastalıkları, yakın zamanlı geniş spektrumlu antibiyotik kullanım öyküsü Clostridium difficile enfeksiyonunu kuvvetle destekler.`,
      },
      {
        id: "redflags",
        title: "Alarm (Red Flag) Bulguları",
        text: `Klinisyenin hızlıca spesifik ve ileri invaziv araştırma yapmasını zorunlu kılan Alarm Semptom ve Bulguları şunlardır:\n\n• İlerleyici kilo kaybı veya boy uzamasında duraklama (Büyüme/Gelişme Geriliği).\n• Geceleri uykudan uyandıran veya uyku sırasında devam eden ishal.\n• Makroskopik kan ve mikroskopik lökosit varlığı.\n• Ateş, şiddetli karın ağrısı, kusma veya dehidratasyon şoku.\n• Perianal Hastalık Bulguları (fissürler veya perianal fistüller).\n• Spesifik Besin Eksikliği Cilt Bulguları (Ağız, anüs ve göz çevresinde soyulmalı döküntüler).\n• Genel Sistemik Bulgular (Ekstremite ödemleri, kas kitlesi kaybı, solukluk).`,
      },
    ],
  },
  tests: {
    title: "Birinci Basamak Tetkikler",
    icon: TestTube,
    intro: `Büyüme geriliği saptanan veya alarm bulguları barındıran çocuklarda tanısal test algoritması genellikle invaziv olmayan dışkı analizleri ile başlar ve ardından kan tetkikleri ile derinleştirilir.`,
    subTabs: [
      {
        id: "stool",
        title: "1. Dışkı (Gaita) Testleri",
        text: `• Fekal Ozmotik Açık: İshalin sekretuvar mı yoksa ozmotik mi olduğunu ayırır. Açığın >50-100 mOsm/kg olması ozmotik ishal tanısını koydurur. Açığın <50 mOsm/kg olması sekretuvar ishal lehine kanıt sunar.\n\n• Dışkı pH'sı ve İndirgeyici Maddeler: pH'nın 5.5'in altına düşmesi ve indirgeyici maddelerin pozitif olması dışkıda glikoz, galaktoz, fruktoz ve laktoz gibi şekerlerin malabsorbe edildiğini gösterir.\n\n• Fekal Kalprotektin: Organik inflamatuvar bağırsak hastalıklarını (IBD), fonksiyonel dismotilite ishallerinden (IBS) ayırmada kullanılan altın standart bir inflamasyon biyobelirteci.\n\n• Fekal Yağ ve Fekal Elastaz: Steatore şüphesi varlığında 72 saatlik dışkıda kantitatif ölçüm yapılır. Pankreatik fonksiyonlar için fekal elastaz seviyesi ölçülür.`,
      },
      {
        id: "blood",
        title: "2. Kan Testleri",
        text: `• Çölyak Serolojisi: Kanda Doku Transglutaminaz (TTG) IgA antikor seviyesi ilk basamak testtir. Yalancı negatifliği önlemek adına her zaman eş zamanlı olarak serum Total IgA seviyesi ölçülmelidir.\n\n• Tam Kan Sayımı: Düşük MCV ile seyreden anemi, kronik kan kaybını veya demir malabsorbsiyonunu gösterir. Yüksek eozinofil alerjik enteropatileri akla getirir. Yüksek ESR ve CRP değerleri sistemik inflamasyonu gösterir.\n\n• Metabolik ve Biyokimyasal Paneller: Konjenital klorür ishalinde kanda derin bir hipokloremik ve hipokalemik alkaloz; sodyum ishalinde ise asidoz gelişir. Albümin ve pre-albümin düzeyleri malnütrisyonu gösterir.`,
      },
    ],
  },
  advancedCare: {
    title: "Kesin Tanı ve İleri Bakım",
    icon: Microscope,
    text: `Birinci basamak testler sonucunda organik, inflamatuvar veya yapısal mukozal bir patolojiden şüpheleniliyorsa hasta zaman kaybetmeden pediatrik gastroenteroloji ünitesine refere edilir.\n\n• Endoskopi ve Biyopsi: İnce bağırsak ve kolon mukozasının direkt olarak gözlenmesi. Duodenum biyopsisinde villöz atrofi, kript hiperplazisi ve lenfosit infiltrasyonu Çölyak hastalığını kanıtlar. Lenfosit artışı olmadan villöz atrofi Otoimmün enteropatiyi doğrular.\n\n• Nefes Testleri: Karbonhidrat emilim kusurlarını ve ince bağırsakta aşırı bakteri üremesi (SIBO) tablosunu kanıtlamak için kullanılır.\n\n• İleri Genetik Testler: Yenidoğan döneminde başlayan inatçı ve hayatı tehdit eden ishallerde (MVID, Tufting enteropati, IPEX sendromu) kesin tanı moleküler genetik analizler ile konur.\n\n• Tedavi Yönetimi: Konjenital epitelial defektlerde hastalar Total Parenteral Beslenme (TPN) rejimine bağlanır ve nihai tedavi ince bağırsak transplantasyonudur. Çölyak hastalığında ise ömür boyu tavizsiz uygulanan katı bir glutensiz diyet tek başına yeterlidir.`,
  },
  pblCases: {
    title: "Probleme Dayalı Öğrenim (PDÖ) Vakaları",
    icon: Stethoscope,
    intro: `Klinik akıl yürütme becerisini geliştirecek vaka senaryoları.`,
    cases: [
      {
        id: "case1",
        title:
          "Vaka 1: Büyüme Geriliği Olmayan Uyanık Saat İshali (Toddler's Diarrhea)",
        stages: [
          {
            title: "Aşama 1: Klinik Prezentasyon",
            text: "Yirmi dört aylık erkek çocuk, yaklaşık 4 aydır devam eden günde ortalama 5-6 kez sulu, zaman zaman içinde tam sindirilmemiş sebze parçacıkları barındıran dışkılama şikayeti ile getiriliyor. Ateş, kusma veya karın ağrısı yok. İshal sadece çocuk uyanıkken gerçekleşiyor, gece uykusunu bölmüyor.",
            reasoning:
              "İshalin 14 günden uzun sürmesi kronik ishal tanısını doğrular. İshalin gece uykuyu bölmemesi durumu organik sekretuvar patolojileri dışlar; fonksiyonel bir dismotilite tablosunu öne çıkarır.",
          },
          {
            title: "Aşama 2: Fiziksel Muayene ve Diyet",
            text: "Vital bulgular ve karın muayenesi tamamen normal. Büyüme eğrisi stabil olarak 50. ile 75. persentil çizgisini takip ediyor, kırılma yok. Çocuğun günde yaklaşık 1.2 litre %100 elma suyu ve şekerli içecek tükettiği, son iki haftada ise aile tarafından diyetten yağın tamamen çıkarıldığı öğreniliyor.",
            reasoning:
              "Büyüme persentillerinin normal olması organik malabsorptif süreçleri dışlar. Yüksek meyve suyu alımı bağırsağa muazzam bir sorbitol ve fruktoz yükü bindirerek ozmotik ishal yaratmaktadır. Yağın kısıtlanması ise bağırsak geçişini daha da hızlandırmıştır.",
          },
          {
            title: "Aşama 3: Tanı ve Tedavi (4 Fs Kuralı)",
            text: "Tam kan sayımı ve basit gaita testi normal dönüyor. Kesin tanı: Çocukluk Çağının Kronik Non-spesifik İshali (Toddler's Diarrhea). Tedavi olarak '4 Fs' konsepti başlatılır: Meyve suyu ve fazla sıvı kısıtlanır (Fluid/Fruit Juice), diyette yağ artırılır (Fat) ve lifli gıdalar eklenir (Fiber).",
            reasoning:
              "Organik hastalık kanıtı olmayan bir çocukta invaziv işlemlerden kaçınılarak, bağırsak motilitesi medikal ilaçlar yerine diyetetik değişikliklerle başarıyla düzenlenmiştir.",
          },
        ],
      },
      {
        id: "case2",
        title:
          "Vaka 2: Ek Gıdaya Geçiş Sonrası Başlayan Malabsorbsiyon (Çölyak)",
        stages: [
          {
            title: "Aşama 1: Klinik Prezentasyon",
            text: "On sekiz aylık kız çocuk, son 6 aydır giderek şiddetlenen iştahsızlık, karın şişliği ve kötü kokulu, soluk renkli ishal şikayetleriyle getiriliyor. İlk 6 ay sadece anne sütü almış ve o periyotta kilo alımı mükemmelmiş. Şikayetler 6. aydan sonra buğday bazlı tahıl mamalarına başlandıktan birkaç ay sonra sinsice ortaya çıkmış.",
            reasoning:
              "Kötü kokulu, çok hacimli ve soluk renkli dışkı yağ malabsorbsiyonunun (steatore) doğrudan kanıtıdır. Şikayetlerin diyete tahıl (buğday proteini) eklenmesiyle başlaması glutene duyarlılığı akla getirir.",
          },
          {
            title: "Aşama 2: Kırmızı Bayrak (Red Flag) Analizi",
            text: "Çocuğun karnı devasa boyutta şiş, el ve bacaklarındaki cilt altı yağ dokusu erimiş. Ağırlık persentili 6. aydan sonra aşağı kırılarak 3. persentilin altına düşmüş (Failure to Thrive).",
            reasoning:
              "Boy ve kilo persentillerindeki dramatik düşüş en ciddi alarm bulgusudur. Yağ dokusu kaybı ve devasa karın şişliği, bağırsak yüzey alanının ciddi yıkıma uğradığını gösterir.",
          },
          {
            title: "Aşama 3: Tetkik ve Kesin Tanı",
            text: "Kanda ağır mikrositik anemi saptanıyor. 72 saatlik dışkı yağında belirgin steatore doğrulanıyor. Kanda Doku Transglutaminaz (TTG) IgA Antikoru aşırı pozitif (>10 katı) saptanıyor. İleri incelemede duodenum biyopsisinde villöz atrofi ve intraepitelyal lenfositoz izleniyor.",
            reasoning:
              "Mikrositik anemi bağırsakta hasarı kanıtlar. TTG IgA yüksekliği ve biyopsideki villöz atrofi tablosu ile Çölyak Hastalığı kesin tanısı konulur. Çözüm, ömür boyu sıkı glutensiz diyettir.",
          },
        ],
      },
    ],
  },
  conclusion: {
    title: "Sonuç",
    icon: CheckCircle,
    text: `"Kırmızı bayrak" olarak adlandırılan alarm bulgularının (kilo kaybı, bağırsak kanaması, gece ishal) tamamen yokluğunda ve büyümesi kusursuz olan bir çocukta ilk etapta fonksiyonel ve diyetetik bozukluklar düşünülmeli, invaziv tetkiklerden kaçınılmalıdır.\n\nAncak büyüme geriliği saptanan veya alarm bulgularına sahip hastalarda durum tam tersidir. Bu profildeki hastalarda hücre içi yapısal hasara yol açan ciddi malabsorbsiyon, genetik transport defektleri veya dokuyu harap eden inflamatuvar hastalıklar hiç vakit kaybedilmeden derinlemesine araştırılmalı ve organlarındaki besin emilim defektlerinin zeka ve fiziksel yapıda kalıcı sekeller bırakması önlenmelidir.`,
  },
};

const keys: string[] = Object.keys(contentData);

// --- INTERACTIVE VAKA BİLEŞENİ ---
const InteractiveCase = ({ caseData }: { caseData: PblCase }) => {
  const [stage, setStage] = useState<number>(0);
  const [showReasoning, setShowReasoning] = useState<boolean>(false);

  const nextStage = () => {
    if (stage < caseData.stages.length - 1) {
      setStage((s) => s + 1);
      setShowReasoning(false);
    } else {
      setStage(caseData.stages.length);
    }
  };

  return (
    <View className="bg-white border border-gray-200 rounded-xl shadow-sm mb-8 overflow-hidden">
      <View className="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex-row justify-between items-center">
        <Text className="text-lg font-bold text-indigo-900 flex-1">
          {caseData.title}
        </Text>
        {stage === caseData.stages.length && (
          <TouchableOpacity
            onPress={() => {
              setStage(0);
              setShowReasoning(false);
            }}
          >
            <Text className="text-xs text-indigo-600 font-bold underline">
              Baştan Başlat
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="p-4">
        {caseData.stages.slice(0, stage).map((s, idx) => (
          <View key={idx} className="mb-4 opacity-70">
            <View className="flex-row items-center mb-1">
              <CheckCircle size={16} color="#22c55e" />
              <Text className="font-bold text-gray-700 ml-2">{s.title}</Text>
            </View>
            <Text className="text-sm text-gray-600 ml-6 mb-2">{s.text}</Text>
            <View className="bg-gray-50 border-l-2 border-gray-300 p-2 ml-6">
              <Text className="font-bold text-xs text-gray-600">
                Klinik Akıl Yürütme:
              </Text>
              <Text className="text-xs text-gray-600 mt-1">{s.reasoning}</Text>
            </View>
          </View>
        ))}

        {stage < caseData.stages.length && (
          <View className="border-l-4 border-indigo-500 pl-3 py-1">
            <View className="flex-row items-center mb-2">
              <ArrowRight size={18} color="#4f46e5" />
              <Text className="font-bold text-indigo-900 ml-2">
                {caseData.stages[stage].title}
              </Text>
            </View>
            <Text className="text-sm text-gray-800 mb-4 leading-relaxed">
              {caseData.stages[stage].text}
            </Text>

            {!showReasoning ? (
              <TouchableOpacity
                onPress={() => setShowReasoning(true)}
                className="bg-indigo-600 flex-row items-center justify-center py-3 rounded-lg"
              >
                <Lightbulb size={18} color="white" />
                <Text className="text-white font-bold ml-2 text-sm">
                  Akıl Yürütmeyi Gör
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <View className="flex-row items-center mb-2">
                  <Lightbulb size={16} color="#2563eb" />
                  <Text className="font-bold text-blue-900 ml-2 text-sm">
                    Klinik Akıl Yürütme
                  </Text>
                </View>
                <Text className="text-sm text-blue-900 mb-4">
                  {caseData.stages[stage].reasoning}
                </Text>
                <TouchableOpacity
                  onPress={nextStage}
                  className="bg-blue-600 flex-row justify-center items-center py-3 rounded-lg"
                >
                  <Text className="text-white font-bold mr-2 text-sm">
                    {stage === caseData.stages.length - 1
                      ? "Vakayı Tamamla"
                      : "Sonraki Aşama"}
                  </Text>
                  <ChevronRight size={16} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {stage === caseData.stages.length && (
          <View className="mt-4 bg-green-50 p-4 rounded-lg flex-row items-center justify-center">
            <CheckCircle size={20} color="#16a34a" />
            <Text className="text-green-800 font-bold ml-2">
              Vaka analizi tamamlandı!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

// --- ANA APP BİLEŞENİ ---
export default function IshalApp() {
  const [activeTab, setActiveTab] = useState<string>(keys[0]);
  const [activeSubTabs, setActiveSubTabs] = useState<Record<string, string>>(
    {}
  );

  const currentSection = contentData[activeTab];

  const handleSubTabChange = (tabKey: string, subId: string) => {
    setActiveSubTabs((prev) => ({ ...prev, [tabKey]: subId }));
  };

  const renderTable = (tableData: SubTab) => {
    if (!tableData.headers || !tableData.rows) return null;
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4 border border-gray-200 rounded-lg"
      >
        <View>
          {/* Başlıklar */}
          <View className="flex-row bg-gray-100">
            {tableData.headers.map((h, i) => (
              <View
                key={i}
                className="p-2 border-r border-gray-200 w-28 justify-center"
              >
                <Text className="font-bold text-gray-800 text-[10px] uppercase">
                  {h}
                </Text>
              </View>
            ))}
          </View>
          {/* Satırlar */}
          {tableData.rows.map((row, i) => (
            <View
              key={i}
              className={`flex-row border-t border-gray-200 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {row.map((cell, j) => (
                <View key={j} className="p-2 border-r border-gray-200 w-28">
                  <Text className="text-gray-800 text-[10px]">{cell}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Üst Sekmeler (Yatay Kaydırılabilir Menü) */}
      <View className="bg-white border-b border-gray-200">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 8, paddingRight: 20 }}
        >
          {keys.map((key) => {
            const Icon = contentData[key].icon;
            const isActive = activeTab === key;
            return (
              <TouchableOpacity
                key={key}
                onPress={() => setActiveTab(key)}
                className={`flex-row items-center px-4 py-2 mr-2 rounded-full ${
                  isActive ? "bg-indigo-600" : "bg-gray-100"
                }`}
              >
                <Icon size={16} color={isActive ? "white" : "#4b5563"} />
                <Text
                  className={`font-bold text-xs ml-2 ${
                    isActive ? "text-white" : "text-gray-600"
                  }`}
                >
                  {contentData[key].title.split(" ")[0]}{" "}
                  {/* Sadece ilk kelimeyi al */}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Ana İçerik Alanı */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
      >
        <View className="flex-row items-center mb-4">
          <currentSection.icon size={28} color="#4f46e5" />
          <Text className="text-2xl font-extrabold text-gray-900 ml-3 flex-1">
            {currentSection.title}
          </Text>
        </View>

        {activeTab === "pblCases" && currentSection.cases ? (
          <View>
            <Text className="text-sm text-gray-600 mb-6">
              {currentSection.intro}
            </Text>
            {currentSection.cases.map((caseData) => (
              <InteractiveCase key={caseData.id} caseData={caseData} />
            ))}
          </View>
        ) : (
          <View>
            {currentSection.intro && (
              <Text className="text-sm text-gray-700 leading-relaxed mb-4 font-semibold">
                {currentSection.intro}
              </Text>
            )}
            {currentSection.text && (
              <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <Text className="text-sm text-gray-800 leading-relaxed">
                  {currentSection.text}
                </Text>
              </View>
            )}

            {currentSection.subTabs && (
              <View className="mt-6">
                {/* Alt Sekmeler */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4"
                >
                  {currentSection.subTabs.map((sub) => {
                    const isActive =
                      (activeSubTabs[activeTab] ||
                        currentSection.subTabs![0].id) === sub.id;
                    return (
                      <TouchableOpacity
                        key={sub.id}
                        onPress={() => handleSubTabChange(activeTab, sub.id)}
                        className={`px-4 py-2 mr-2 rounded-lg border ${
                          isActive
                            ? "bg-indigo-50 border-indigo-200"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <Text
                          className={`font-bold text-xs ${
                            isActive ? "text-indigo-700" : "text-gray-600"
                          }`}
                        >
                          {sub.title.split(":")[0]}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                {/* Alt Sekme İçeriği */}
                <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  {currentSection.subTabs.map((sub) => {
                    if (
                      (activeSubTabs[activeTab] ||
                        currentSection.subTabs![0].id) !== sub.id
                    )
                      return null;
                    return (
                      <View key={sub.id}>
                        <Text className="text-lg font-bold text-gray-900 mb-3">
                          {sub.title}
                        </Text>
                        {sub.isTable ? (
                          renderTable(sub)
                        ) : (
                          <Text className="text-sm text-gray-800 leading-relaxed">
                            {sub.text}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
