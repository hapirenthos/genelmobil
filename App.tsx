import React, { useState } from "react";
// Web'deki div, p, button yerine Native bileşenleri çağırıyoruz
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
// DİKKAT: lucide-react yerine lucide-react-native kullanıyoruz
import {
  ChevronLeft,
  Plus,
  Stethoscope,
  PillBottle,
  Brain,
  Frown,
  Baby,
  Slice,
  BeanOff,
} from "lucide-react-native";

// ==========================================
// 1. ADIM: İÇ UYGULAMALARIN (Bu dosyaları da çevirmeyi unutma!)
// ==========================================
import nobet from "./apps/nobet";
import ishal from "./apps/ishal";
import aby from "./apps/abykby";

type AppConfig = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  component: React.ElementType;
};

// ==========================================
// 2. ADIM: SİSTEME KAYIT
// ==========================================
const APPS: AppConfig[] = [
  {
    id: "nobet",
    name: "Nöbet",
    icon: Stethoscope,
    color: "bg-indigo-600",
    component: nobet,
  },
  {
    id: "ishal",
    name: "Kronik İshal",
    icon: Frown,
    color: "bg-yellow-900",
    component: ishal,
  },
  {
    id: "aby",
    name: "ABY ve KBY",
    icon: BeanOff,
    color: "bg-amber-500",
    component: aby,
  },
];

export default function App() {
  const [currentAppId, setCurrentAppId] = useState<string | null>(null);

  const ActiveAppConfig = APPS.find((app) => app.id === currentAppId);
  const ActiveComponent = ActiveAppConfig?.component;

  return (
    // SafeAreaView: iPhone'lardaki çentiğin (notch) arkasında kalmasını engeller
    <SafeAreaView className="flex-1 bg-gray-50">
      {currentAppId && ActiveAppConfig ? (
        // ==========================================
        // AKTİF UYGULAMA EKRANI
        // ==========================================
        <View className="flex-1 bg-white">
          {/* Üst Bar (Header) - flex-row ile yatay dizilim yapıyoruz */}
          <View className="h-14 flex-row items-center px-2 border-b border-gray-100 bg-white z-10">
            <TouchableOpacity
              onPress={() => setCurrentAppId(null)}
              className="flex-row items-center p-2"
            >
              <ChevronLeft size={24} color="#2563eb" />
              <Text className="text-base font-medium text-blue-600 ml-1">
                Geri
              </Text>
            </TouchableOpacity>

            {/* flex-1 ile başlığı tam ortaya itiyoruz */}
            <View className="flex-1 items-center pr-16">
              <Text className="font-semibold text-gray-800 text-lg">
                {ActiveAppConfig.name}
              </Text>
            </View>
          </View>

          {/* Uygulama İçeriği - ScrollView ile kaydırılabilir alan */}
          <ScrollView
            className="flex-1 bg-white"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {ActiveComponent && <ActiveComponent />}
          </ScrollView>
        </View>
      ) : (
        // ==========================================
        // ANA EKRAN (HUB)
        // ==========================================
        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerStyle={{ padding: 24, paddingTop: 40 }}
        >
          <View className="mb-10 pl-2">
            <Text className="text-3xl font-bold text-slate-800">Ana Ekran</Text>
            <Text className="text-gray-500 mt-1 text-sm">
              Neye ihtiyacın var?
            </Text>
          </View>

          {/* Mobilde grid sistemi farklıdır, flex-row ve wrap kullanırız */}
          <View className="flex-row flex-wrap justify-between gap-y-6">
            {APPS.map((app) => {
              const Icon = app.icon;
              return (
                <TouchableOpacity
                  key={app.id}
                  className="w-[30%] sm:w-[22%] items-center gap-2 mb-4"
                  onPress={() => setCurrentAppId(app.id as string)}
                >
                  <View
                    className={`w-16 h-16 ${app.color} rounded-2xl shadow-sm items-center justify-center`}
                  >
                    <Icon size={32} color="white" />
                  </View>
                  <Text
                    className="text-xs font-medium text-gray-700 text-center w-full"
                    numberOfLines={1} // Yazının taşmasını engeller (...) koyar
                  >
                    {app.name}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {APPS.length === 0 && (
              <View className="w-full items-center justify-center py-12 opacity-50">
                <View className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-2xl items-center justify-center mb-4">
                  <Plus size={28} color="#6b7280" />
                </View>
                <Text className="text-sm text-gray-600">
                  Henüz uygulama eklenmedi.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
