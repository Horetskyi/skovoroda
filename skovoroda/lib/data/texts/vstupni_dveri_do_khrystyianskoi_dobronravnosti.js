import { SkovorodaFiles } from "../skovorodaFiles";
import { SkovorodaSources } from "../skovorodaSources";
import { SkovorodaTranslators } from "../skovorodaTranslators";

export const vstupni_dveri_do_khrystyianskoi_dobronravnosti = {
  id: "vstupni_dveri_do_khrystyianskoi_dobronravnosti",
  writtenDateInfo: {
    dates: [
      {
        text: "написаний 1766 р.",
        source: SkovorodaSources.lovytva,
        page: "259 с."
      },
      {
        text: "дописаний вступ 1780 р.",
        source: SkovorodaSources.povna_akademichna_zbirka_2011,
        page: "222 c."
      },
    ],
  },
  manuscriptCover: "vstupni_dveri_do_khrystyianskoi_dobronravnosti.jpg",
  original: {
    source: SkovorodaSources.povna_akademichna_zbirka_2011,
    originalName: "Начальная Дверь ко Христіанскому Добронравію",
    files: [
      SkovorodaFiles.vstupni_dveri_do_khrystyianskoi_dobronravnosti.original_pdf,
    ]
  },
  translations: [
    {
      source: SkovorodaSources.tvory_u_dvox_tomax_tom_1_1994,
      translator: SkovorodaTranslators.v_shevchuk, 
      translatedName: "Вступні двері до християнської добронравності",
      files: [
        SkovorodaFiles.vstupni_dveri_do_khrystyianskoi_dobronravnosti.shevchuk_pdf,
        SkovorodaFiles.vstupni_dveri_do_khrystyianskoi_dobronravnosti.shevchuk_doc,
      ]
    },
    {
      source: SkovorodaSources.philosophska_dumka_2014_nomer_5,
      translator: SkovorodaTranslators.v_shevchenko, 
      translatedName: "Вступні двері до християнської доброчесності",
      files: [
        SkovorodaFiles.vstupni_dveri_do_khrystyianskoi_dobronravnosti.shevchenko_pdf,
        SkovorodaFiles.vstupni_dveri_do_khrystyianskoi_dobronravnosti.shevchenko_doc,
      ]
    },
  ],
}

// KeyIdeas:
// Як бути Щасливим?

/*

original:
Благодаренїе Блаженному Богу ο том, что Нужное здѣлал нетрудным, а трудное ненужным.
more:
Нѣт Слаже для Человѣка и нѣт Нужнѣе, как Щастїе, нѣт же ничего и легоче сего. Благодаренїе Блаженному Богу.
more:
Царствїе Божїе внутрь нас, Щастїе в Сердцѣ, Сердце в Любви, Любовь же в Законѣ вѣчнаго.
more:
Сїе есть непрестающее ведро и незаходящее Солнце, Тму Сердечныя Бездны просвѣщающее.

translation:


*/