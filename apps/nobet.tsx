import React, { useState, useEffect, ReactNode } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  Home,
  Book,
  Activity,
  HelpCircle,
  Check,
  ArrowLeft,
  ChevronRight,
} from "lucide-react-native";

// --- TİP TANIMLAMALARI (TypeScript) ---
type EgitimModulu = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  content: ReactNode;
};

type QuizSoru = {
  soru: string;
  secenekler: string[];
  cevap: number;
  aciklama: string;
};

type VakaSecenek = {
  text: string;
  isCorrect: boolean;
  feedback: string;
};

type VakaAdim = {
  text: string;
  options: VakaSecenek[];
};

type Vaka = {
  id: number;
  title: string;
  desc: string;
  steps: VakaAdim[];
};

type QuizFeedback = {
  isCorrect: boolean;
  text: string;
};

// --- KAPSAMLI EĞİTİM VERİLERİ (PDÖ FÖYÜNÜN TAMAMI) ---
const egitimModulleri: EgitimModulu[] = [
  {
    id: "acil",
    icon: "🚨",
    title: "1. Acil Nöbet Yönetimi",
    desc: "Aktif nöbet geçiren hastada ilk adımlar ve algoritmalar.",
    content: (
      <View className="gap-4">
        <View className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <Text className="font-bold text-red-700 mb-2">
            İlk ve Acil Yapılacaklar (ABC)
          </Text>
          <View className="gap-2 pl-2">
            <Text className="text-sm text-gray-800">
              <Text className="font-bold">• Hava Yolu (Airway):</Text> Açık
              olmalı, aspirasyon yapılmalı.
            </Text>
            <Text className="text-sm text-gray-800">
              <Text className="font-bold">• Solunum (Breathing):</Text> Solunum
              kontrolü, nazal kanül/maske ile Oksijen, gerekirse entübasyon.
            </Text>
            <Text className="text-sm text-gray-800">
              <Text className="font-bold">• Dolaşım (Circulation):</Text> Nabız,
              KB takibi. EKG monitorizasyonu.
            </Text>
            <Text className="text-sm text-gray-800">
              <Text className="font-bold">• Zaman Takibi:</Text> Nöbetin
              başlangıcından geçen süre kaydedilmeli.
            </Text>
          </View>
        </View>

        <View className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
          <Text className="font-bold text-blue-800 mb-2">
            Acil Laboratuvar & İlaçlar
          </Text>
          <View className="gap-2 pl-2">
            <Text className="text-sm text-gray-800">
              <Text className="font-bold">1. Kan Şekeri:</Text> Parmak ucundan
              bak.{" "}
              <Text className="font-bold">
                &lt;60 mg/dl ise 5 ml/kg %10 Dekstroz IV
              </Text>{" "}
              ver.
            </Text>
            <Text className="text-sm text-gray-800">
              <Text className="font-bold">2. Damar Yolu:</Text> Aç ve kan al
              (Elektrolitler, Kalsiyum, Kan sayımı, Toksikoloji, Kan gazı).
            </Text>
            <Text className="text-sm text-gray-800">
              <Text className="font-bold">3. Nöbet Durdurma:</Text> Nöbet devam
              ediyorsa{" "}
              <Text className="font-bold">0.15 - 0.2 mg/kg Diazepam IV</Text>{" "}
              (yavaş infüzyon).
            </Text>
          </View>
        </View>

        <View className="bg-orange-50 border border-orange-100 p-4 rounded-lg">
          <Text className="font-bold text-orange-800 mb-2">
            Hipokalsemik Nöbet Tedavisi
          </Text>
          <Text className="mb-2 text-sm text-gray-800">
            Afebril, raşitizm bulguları olan (geniş el bileği vb.) çocukta nöbet
            devam ediyorsa:
          </Text>
          <View className="gap-1 pl-2">
            <Text className="text-sm text-gray-800">
              • <Text className="font-bold">İlaç:</Text> %10'luk Kalsiyum
              Glukonat solüsyonu
            </Text>
            <Text className="text-sm text-gray-800">
              • <Text className="font-bold">Doz:</Text> 1-2 ml/kg
            </Text>
            <Text className="text-sm text-gray-800">
              • <Text className="font-bold">Uygulama:</Text> 1/1 oranında SF ile
              sulandırılır.
            </Text>
            <Text className="text-sm text-gray-800">
              • <Text className="font-bold text-red-600">DİKKAT:</Text> Kalp
              hızı takip edilerek çok yavaş (yaklaşık 10 dakikada) IV verilir.
              Hızlı verilirse kardiyak arrest yapabilir!
            </Text>
          </View>
        </View>
      </View>
    ),
  },
  {
    id: "siniflama",
    icon: "📊",
    title: "2. Nöbet Sınıflaması (ILAE)",
    desc: "Güncel ILAE nöbet sınıflaması.",
    content: (
      <View className="gap-4">
        <Text className="mb-2 text-sm text-gray-800">
          <Text className="font-bold">Epilepsi Tanımı:</Text> Aralarında en az
          24 saat olan, provokasyonsuz ≥2 nöbet. VEYA tek nöbet olup, nöbet
          tekrar riski {">"} %60 ise.
        </Text>

        <View className="gap-4">
          <View className="border border-gray-200 rounded-lg p-3">
            <Text className="font-bold text-blue-700 border-b border-gray-200 pb-1 mb-2">
              1. Fokal Başlangıçlı
            </Text>
            <Text className="text-xs text-gray-500 mb-2">
              Farkındalık korunan / bozulan
            </Text>
            <Text className="text-xs text-gray-800">
              • <Text className="font-bold">Motor:</Text> Otomatizmalar, Atonik,
              Klonik, Ep. Spazm, Hiperkinetik, Miyoklonik, Tonik
            </Text>
            <Text className="text-xs text-gray-800 mt-1">
              • <Text className="font-bold">Motor Olmayan:</Text> Otonomik,
              Davranış durması, Kognitif, Emosyonel, Sensoriyel
            </Text>
          </View>

          <View className="border border-gray-200 rounded-lg p-3">
            <Text className="font-bold text-green-700 border-b border-gray-200 pb-1 mb-2">
              2. Jeneralize Başlangıçlı
            </Text>
            <Text className="text-xs text-gray-800">
              • <Text className="font-bold">Motor:</Text> Tonik-klonik, Klonik,
              Tonik, Miyoklonik, Miyoklonik-Tonik-Klonik, Miyoklonik-Atonik,
              Atonik, Ep. Spazm
            </Text>
            <Text className="text-xs text-gray-800 mt-1">
              • <Text className="font-bold">Motor Olmayan (Absans):</Text>{" "}
              Tipik, Atipik, Miyoklonik absans, Göz kapağı miyoklonisi
            </Text>
          </View>
        </View>
      </View>
    ),
  },
  {
    id: "febril",
    icon: "🔥",
    title: "3. Febril Nöbetler",
    desc: "Basit/Komplike ayırımı, LP endikasyonları ve tedavi.",
    content: (
      <View className="gap-4">
        <View className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <Text className="text-sm text-gray-800">
            <Text className="font-bold">Tanım:</Text> 6 ay - 5 yaş arası,
            santral sinir sistemi dışı enfeksiyon kaynaklı ateşle ortaya çıkan
            nöbetlerdir. Öncesinde nörolojik problemi olan hastanın ateşli
            nöbeti "Febril Nöbet" <Text className="font-bold">sayılmaz</Text>.
          </Text>
        </View>

        <View className="flex-row gap-2">
          <View className="flex-1 bg-white border border-gray-300 p-3 rounded-lg shadow-sm">
            <Text className="font-bold text-blue-700 text-center mb-2">
              Basit Febril Nöbet
            </Text>
            <Text className="text-xs text-gray-800">• Jeneralize nöbet</Text>
            <Text className="text-xs text-gray-800">• Süre ≤ 15 dk</Text>
            <Text className="text-xs text-gray-800">• 24 saatte tek nöbet</Text>
            <Text className="text-xs text-gray-800">
              • Post-iktal fokal bulgu YOK
            </Text>
          </View>
          <View className="flex-1 bg-white border border-gray-300 p-3 rounded-lg shadow-sm">
            <Text className="font-bold text-red-700 text-center mb-2">
              Komplike Febril Nöbet
            </Text>
            <Text className="text-xs text-gray-800">• Fokal nöbet</Text>
            <Text className="text-xs text-gray-800">• Süre ≥ 15 dk</Text>
            <Text className="text-xs text-gray-800">
              • 24 saatte tekrar eder
            </Text>
            <Text className="text-xs text-gray-800">
              • Post-iktal bulgu olabilir
            </Text>
          </View>
        </View>

        <View>
          <Text className="font-bold text-lg border-b border-gray-200 pb-1 text-gray-800">
            Lomber Ponksiyon (LP) Ne Zaman Yapılmalı?
          </Text>
          <View className="gap-2 mt-2">
            <Text className="text-sm text-gray-800">
              • Meningeal irritasyon bulgusu varsa.
            </Text>
            <Text className="text-sm text-gray-800">
              • <Text className="font-bold">6-12 ay arası:</Text> Hib ve
              Pnömokok aşıları eksik/bilinmiyorsa.
            </Text>
            <Text className="text-sm text-gray-800">
              •{" "}
              <Text className="font-bold">Önceden antibiyotik kullanımı:</Text>{" "}
              Menenjit bulgularını maskeleyebileceği için.
            </Text>
            <Text className="text-sm text-gray-800">
              • <Text className="text-red-600 font-bold">Kural:</Text> Aşıları
              tam, genel durumu iyi çocukta rutin LP önerilmez.
            </Text>
          </View>
        </View>
      </View>
    ),
  },
  {
    id: "afebril",
    icon: "🧠",
    title: "4. Afebril Nöbetler",
    desc: "Bebek ve çocuklarda afebril nöbet etiyolojisi ve ipuçları.",
    content: (
      <View className="gap-4">
        <Text className="text-sm text-gray-800">
          Ateşsiz nöbetle gelen bir çocukta etiyolojiyi bulmak için detaylı
          sistemik ve nörolojik muayene şarttır.
        </Text>

        {/* Tablo yerine mobil uyumlu Grid (Flex) yapı */}
        <View className="border border-gray-200 rounded-lg overflow-hidden">
          <View className="bg-gray-100 p-2">
            <Text className="font-bold text-center text-gray-800">
              Fizik Muayene İpuçları & Etiyoloji
            </Text>
          </View>
          <View className="flex-row border-b border-gray-200">
            <Text className="p-2 font-bold bg-gray-50 flex-1 text-xs text-gray-800">
              Deri (Hipopigmente Leke)
            </Text>
            <Text className="p-2 flex-1 text-xs text-gray-800">
              Tüberoskleroz
            </Text>
          </View>
          <View className="flex-row border-b border-gray-200">
            <Text className="p-2 font-bold bg-gray-50 flex-1 text-xs text-gray-800">
              Baş Çevresi ({">"}97p)
            </Text>
            <Text className="p-2 flex-1 text-xs text-gray-800">
              Hidrosefali, Makrosefali
            </Text>
          </View>
          <View className="flex-row border-b border-gray-200">
            <Text className="p-2 font-bold bg-gray-50 flex-1 text-xs text-gray-800">
              Hepatomegali
            </Text>
            <Text className="p-2 flex-1 text-xs text-gray-800">
              Metabolik/Depo hastalıkları
            </Text>
          </View>
          <View className="flex-row">
            <Text className="p-2 font-bold bg-gray-50 flex-1 text-xs text-gray-800">
              Geniş El Bileği
            </Text>
            <Text className="p-2 flex-1 text-xs text-gray-800">
              Raşitizm (Akut hipokalsemik nöbet)
            </Text>
          </View>
        </View>

        <View className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
          <Text className="font-bold text-indigo-800 mb-2">
            İlk Nöbete Yaklaşım ve Tedavi Kararı
          </Text>
          <Text className="text-sm text-gray-800">
            1. Gerçek bir nöbet mi yoksa "Paroksismal olay" (senkop vb.) mı
            ayırt et.
          </Text>
          <Text className="text-sm text-gray-800 mt-1">
            2. Muayene/Gelişim normal, tetikleyici yok,{" "}
            <Text className="font-bold">
              EEG normalse İLK NÖBETTE İLAÇ BAŞLANMAZ.
            </Text>
          </Text>
        </View>
      </View>
    ),
  },
];

// --- ÇALIŞMA SORULARI ---
const quizSorulari: QuizSoru[] = [
  {
    soru: "11 aylık bir bebek ilk kez 5 dakika süren, jeneralize özellikli bir febril nöbet geçiriyor. Hib ve Pnömokok aşılarının yapılmadığı öğreniliyor. Yaklaşımda hangisi en doğrudur?",
    secenekler: [
      "Sadece ateş düşürücü verip eve yollamak",
      "Lomber ponksiyon (LP) yapmak",
      "Rutin EEG ve Kranial MR çekmek",
      "Koruyucu amaçlı günlük fenobarbital başlamak",
    ],
    cevap: 1,
    aciklama:
      "Aşıları eksik/bilinmeyen 6-12 ay arası bebeklerde meningeal bulgular belirgin olmayabileceği için santral sinir sistemi enfeksiyonunu dışlamak amacıyla LP yapılması önerilir.",
  },
  {
    soru: "Aşağıdakilerden hangisi 'Komplike Febril Nöbet' kriterlerinden biridir?",
    secenekler: [
      "Nöbetin 5 dakika sürmesi",
      "Nöbetin jeneralize karakterde olması",
      "24 saat içinde nöbetin tekrar etmesi",
      "Post-iktal dönemde hastanın hemen uyanması",
    ],
    cevap: 2,
    aciklama:
      "Fokal başlangıç, 15 dakikadan uzun sürmesi veya 24 saat içinde tekrar etmesi komplike febril nöbet kriterleridir.",
  },
];

// --- VAKALAR (Simülasyonlar) ---
const vakaListesi: Vaka[] = [
  {
    id: 1,
    title: "Vaka 1: 11 Aylık Erkek Bebek (Ateşli)",
    desc: "Ateş, boş bakma, kasılma şikayeti ile başvuran süt çocuğu.",
    steps: [
      {
        text: "11 aylık erkek bebek, acile yaklaşık 5 dakika süren boş bakma, el ve kollarda ritmik atımlar nedeniyle ailesi tarafından getirildi. Aile bebeğin ateşinin 38.3°C olduğunu ölçmüş. Eşlik eden kusma, ishal yok. İlk yaklaşımda ne yaparsınız?",
        options: [
          {
            text: "Hemen EEG çekerim ve Valproik asit başlarım.",
            isCorrect: false,
            feedback:
              "Yanlış. Basit febril nöbetlerde akut dönemde rutin EEG önerilmez ve antiepileptik başlanmaz.",
          },
          {
            text: "Öyküyü derinleştirip motor-mental gelişimini, aşı durumunu ve aile öyküsünü sorgularım.",
            isCorrect: true,
            feedback:
              "Doğru! Febril nöbette öncelikle aşılama (S. pneumoniae, Hib), gelişim basamakları ve aile öyküsü sorgulanır.",
          },
        ],
      },
    ],
  },
];

// --- BİLEŞENLER ---

const EgitimModulIcerik = ({
  modul,
  onBack,
}: {
  modul: EgitimModulu;
  onBack: () => void;
}) => {
  return (
    <View className="flex-1 bg-white absolute inset-0 z-20">
      <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center gap-3 shadow-sm">
        <TouchableOpacity
          onPress={onBack}
          className="p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeft size={20} color="#374151" />
        </TouchableOpacity>
        <Text className="font-bold text-lg text-gray-800">
          {modul.icon} {modul.title}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {modul.content}
      </ScrollView>
    </View>
  );
};

const QuizComponent = () => {
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<QuizFeedback | null>(null);

  const handleAnswer = (index: number) => {
    const isCorrect = index === quizSorulari[currentQ].cevap;
    if (isCorrect) setScore(score + 1);
    setFeedback({ isCorrect, text: quizSorulari[currentQ].aciklama });
  };

  const nextQuestion = () => {
    setFeedback(null);
    if (currentQ + 1 < quizSorulari.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <View className="items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <Text className="text-4xl mb-4">🏆</Text>
        <Text className="text-2xl font-bold text-blue-800 mb-2">
          Test Tamamlandı!
        </Text>
        <Text className="text-lg text-gray-800 mb-6">
          Skorunuz:{" "}
          <Text className="font-bold text-blue-600 text-2xl">{score}</Text> /{" "}
          {quizSorulari.length}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setCurrentQ(0);
            setScore(0);
            setShowResult(false);
            setFeedback(null);
          }}
          className="bg-blue-600 px-6 py-4 rounded-xl shadow-md w-full"
        >
          <Text className="text-white font-bold text-center text-base">
            Testi Tekrar Çöz
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = quizSorulari[currentQ];

  return (
    <View className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Soru {currentQ + 1} / {quizSorulari.length}
        </Text>
        <Text className="text-xs font-bold text-blue-500">Doğru: {score}</Text>
      </View>

      <Text className="text-[15px] font-bold text-gray-800 mb-5 leading-snug">
        {q.soru}
      </Text>

      {!feedback ? (
        <View className="gap-3">
          {q.secenekler.map((secenek, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleAnswer(idx)}
              className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 flex-row"
            >
              <Text className="font-bold text-blue-500 mr-2">
                {String.fromCharCode(65 + idx)}.
              </Text>
              <Text className="text-sm font-medium text-gray-700 flex-1">
                {secenek}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
          <View
            className={`p-4 rounded-xl mb-5 flex-row gap-3 ${
              feedback.isCorrect
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <View className="mt-1">
              {feedback.isCorrect ? (
                <Check size={16} color="#22c55e" />
              ) : (
                <Text>❌</Text>
              )}
            </View>
            <View className="flex-1">
              <Text
                className={`font-bold mb-1 text-sm ${
                  feedback.isCorrect ? "text-green-900" : "text-red-900"
                }`}
              >
                {feedback.isCorrect ? "Tebrikler, Doğru!" : "Yanlış Seçim"}
              </Text>
              <Text
                className={`text-xs ${
                  feedback.isCorrect ? "text-green-800" : "text-red-800"
                }`}
              >
                {feedback.text}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={nextQuestion}
            className="w-full bg-gray-900 py-4 rounded-xl shadow-md"
          >
            <Text className="text-white font-bold text-center">
              {currentQ + 1 < quizSorulari.length
                ? "Sonraki Soru"
                : "Sonuçları Gör"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const VakaSimulasyonu = ({
  vaka,
  onBack,
}: {
  vaka: Vaka;
  onBack: () => void;
}) => {
  const [step, setStep] = useState<number | "completed">(0);
  const [feedback, setFeedback] = useState<VakaSecenek | null>(null);

  const handleNextStep = () => {
    setFeedback(null);
    if (typeof step === "number" && step + 1 < vaka.steps.length)
      setStep(step + 1);
    else setStep("completed");
  };

  if (step === "completed") {
    return (
      <View className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 items-center">
        <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
          <Check size={40} color="#22c55e" />
        </View>
        <Text className="text-xl font-bold text-gray-800 mb-2">
          Simülasyon Başarılı!
        </Text>
        <Text className="text-gray-500 text-sm mb-6 text-center">
          Bu vakadaki tüm klinik adımları doğru yönettiniz.
        </Text>
        <TouchableOpacity
          onPress={onBack}
          className="bg-blue-600 w-full py-4 rounded-xl"
        >
          <Text className="text-white font-bold text-center">Vakalara Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const s = vaka.steps[step as number];

  return (
    <View className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <View className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={onBack}
          className="flex-row items-center gap-1"
        >
          <ArrowLeft size={16} color="#6b7280" />
          <Text className="text-gray-500 font-bold text-sm">Çık</Text>
        </TouchableOpacity>
        <View className="bg-blue-100 px-2 py-1 rounded-md">
          <Text className="text-xs font-bold text-blue-600">
            Adım {(step as number) + 1}/{vaka.steps.length}
          </Text>
        </View>
      </View>

      <View className="p-5">
        <Text className="text-sm text-gray-800 font-medium leading-relaxed mb-6">
          {s.text}
        </Text>

        {!feedback ? (
          <View className="gap-3">
            {s.options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setFeedback(opt)}
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50"
              >
                <Text className="text-sm font-medium text-gray-700">
                  {opt.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View>
            <View
              className={`p-4 rounded-xl mb-6 ${
                feedback.isCorrect
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <View className="flex-row items-center gap-2 mb-1">
                {feedback.isCorrect ? (
                  <Check size={16} color="#166534" />
                ) : (
                  <Text>❌</Text>
                )}
                <Text
                  className={`font-bold ${
                    feedback.isCorrect ? "text-green-900" : "text-red-900"
                  }`}
                >
                  {feedback.isCorrect ? "Doğru Hamle" : "Hatalı Yaklaşım"}
                </Text>
              </View>
              <Text
                className={`text-xs mt-2 ${
                  feedback.isCorrect ? "text-green-800" : "text-red-800"
                }`}
              >
                {feedback.feedback}
              </Text>
            </View>
            <TouchableOpacity
              onPress={
                feedback.isCorrect ? handleNextStep : () => setFeedback(null)
              }
              className={`w-full py-4 rounded-xl shadow-md ${
                feedback.isCorrect ? "bg-blue-600" : "bg-gray-800"
              }`}
            >
              <Text className="text-white font-bold text-center">
                {feedback.isCorrect ? "Devam Et" : "Tekrar Dene"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

// --- ANA UYGULAMA (APP) ---

export default function NobetApp() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [seciliModul, setSeciliModul] = useState<EgitimModulu | null>(null);
  const [seciliVaka, setSeciliVaka] = useState<Vaka | null>(null);

  const renderContent = () => {
    if (activeTab === "home") {
      return (
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-blue-800 rounded-2xl p-6 shadow-lg mb-6 relative overflow-hidden">
            <Text className="text-2xl font-black mb-2 text-white">
              PDÖ: Nöbet / Bilinç Kaybı
            </Text>
            <Text className="text-blue-100 text-sm leading-relaxed">
              Hacettepe Üniversitesi Pediatrik Nöroloji Probleme Dayalı Öğrenim
              Föyünden derlenmiş tam kapsamlı eğitim rehberi.
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between gap-y-3">
            <TouchableOpacity
              onPress={() => setActiveTab("egitim")}
              className="w-[48%] bg-white p-4 rounded-2xl shadow-sm border border-gray-100 items-center justify-center gap-2"
            >
              <View className="bg-blue-50 p-3 rounded-full">
                <Book color="#2563eb" size={24} />
              </View>
              <View className="items-center">
                <Text className="font-bold text-gray-800 text-sm">
                  Konu Anlatımı
                </Text>
                <Text className="text-[10px] text-gray-500">
                  Sınıflama & Algoritma
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("quiz")}
              className="w-[48%] bg-white p-4 rounded-2xl shadow-sm border border-gray-100 items-center justify-center gap-2"
            >
              <View className="bg-purple-50 p-3 rounded-full">
                <HelpCircle color="#9333ea" size={24} />
              </View>
              <View className="items-center">
                <Text className="font-bold text-gray-800 text-sm">
                  Test Çöz
                </Text>
                <Text className="text-[10px] text-gray-500">Bilgini Sına</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("vakalar")}
              className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 items-center justify-center gap-2 mt-2"
            >
              <View className="bg-green-50 p-3 rounded-full">
                <Activity color="#16a34a" size={24} />
              </View>
              <View className="items-center">
                <Text className="font-bold text-gray-800 text-sm">
                  İnteraktif Vakalar
                </Text>
                <Text className="text-[10px] text-gray-500">
                  Karar Verme Simülasyonu
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

    if (activeTab === "egitim") {
      if (seciliModul)
        return (
          <EgitimModulIcerik
            modul={seciliModul}
            onBack={() => setSeciliModul(null)}
          />
        );
      return (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text className="text-xl font-extrabold text-gray-800 mb-4 px-1">
            Eğitim Kütüphanesi
          </Text>
          <View className="gap-3">
            {egitimModulleri.map((mod) => (
              <TouchableOpacity
                key={mod.id}
                onPress={() => setSeciliModul(mod)}
                className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-4 flex-1 pr-2">
                  <Text className="text-2xl">{mod.icon}</Text>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-800">{mod.title}</Text>
                    <Text
                      className="text-xs text-gray-500 mt-1"
                      numberOfLines={1}
                    >
                      {mod.desc}
                    </Text>
                  </View>
                </View>
                <ChevronRight color="#d1d5db" size={20} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      );
    }

    if (activeTab === "quiz") {
      return (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text className="text-xl font-extrabold text-gray-800 mb-4 px-1">
            Çalışma Soruları
          </Text>
          <QuizComponent />
        </ScrollView>
      );
    }

    if (activeTab === "vakalar") {
      if (seciliVaka)
        return (
          <ScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          >
            <VakaSimulasyonu
              vaka={seciliVaka}
              onBack={() => setSeciliVaka(null)}
            />
          </ScrollView>
        );
      return (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text className="text-xl font-extrabold text-gray-800 mb-2 px-1">
            Klinik Vakalar
          </Text>
          <Text className="text-xs text-gray-500 mb-4 px-1">
            Öğrendiklerinizi gerçek vaka senaryoları üzerinde uygulayın.
          </Text>
          <View className="gap-3">
            {vakaListesi.map((vaka) => (
              <TouchableOpacity
                key={vaka.id}
                onPress={() => setSeciliVaka(vaka)}
                className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-200"
              >
                <View className="flex-row justify-between items-start w-full mb-2">
                  <Text className="font-bold text-gray-800 text-sm flex-1">
                    {vaka.title}
                  </Text>
                  <View className="bg-green-100 px-2 py-1 rounded-full">
                    <Text className="text-green-700 text-[10px] font-bold">
                      Simülasyon
                    </Text>
                  </View>
                </View>
                <Text className="text-xs text-gray-500">{vaka.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      );
    }

    return null;
  };

  return (
    <View className="flex-1 bg-gray-50 relative">
      <View className="flex-1">{renderContent()}</View>

      {/* Alt Navigasyon Barı */}
      <View className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex-row justify-around px-2 py-3 pb-8 z-30 shadow-lg">
        <NavButton
          active={activeTab === "home"}
          onClick={() => {
            setActiveTab("home");
            setSeciliModul(null);
            setSeciliVaka(null);
          }}
          icon={
            <Home
              size={24}
              color={activeTab === "home" ? "#2563eb" : "#9ca3af"}
            />
          }
          label="Ana Sayfa"
        />
        <NavButton
          active={activeTab === "egitim"}
          onClick={() => {
            setActiveTab("egitim");
            setSeciliModul(null);
            setSeciliVaka(null);
          }}
          icon={
            <Book
              size={24}
              color={activeTab === "egitim" ? "#2563eb" : "#9ca3af"}
            />
          }
          label="Eğitim"
        />
        <NavButton
          active={activeTab === "quiz"}
          onClick={() => {
            setActiveTab("quiz");
            setSeciliModul(null);
            setSeciliVaka(null);
          }}
          icon={
            <HelpCircle
              size={24}
              color={activeTab === "quiz" ? "#2563eb" : "#9ca3af"}
            />
          }
          label="Sorular"
        />
        <NavButton
          active={activeTab === "vakalar"}
          onClick={() => {
            setActiveTab("vakalar");
            setSeciliModul(null);
            setSeciliVaka(null);
          }}
          icon={
            <Activity
              size={24}
              color={activeTab === "vakalar" ? "#2563eb" : "#9ca3af"}
            />
          }
          label="Vakalar"
        />
      </View>
    </View>
  );
}

// Navigasyon Buton Bileşeni
const NavButton = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) => (
  <TouchableOpacity onPress={onClick} className="items-center p-2 flex-1">
    <View className="mb-1">{icon}</View>
    <Text
      className={`text-[10px] font-bold ${
        active ? "text-blue-600" : "text-gray-400"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);
