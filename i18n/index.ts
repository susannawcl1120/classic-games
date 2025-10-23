import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

const resources = {
  en: { translation: en },
  zh: { translation: zh },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage || "zh",
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
