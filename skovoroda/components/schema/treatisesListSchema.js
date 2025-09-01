export function getTreatisesListSchemaOrg() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.skovoroda.club/#organization",
        "name": "Skovoroda Club",
        "url": "https://www.skovoroda.club/"
      },
      {
        "@type": "WebSite",
        "@id": "https://www.skovoroda.club/#website",
        "url": "https://www.skovoroda.club/",
        "name": "Skovoroda Club",
        "publisher": { "@id": "https://www.skovoroda.club/#organization" },
        "inLanguage": "uk"
      },
      {
        "@type": "Person",
        "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda",
        "name": "Григорій Сковорода",
        "sameAs": [
          "https://uk.wikipedia.org/wiki/Сковорода_Григорій_Савич"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://www.skovoroda.club/texts/treatise#webpage",
        "url": "https://www.skovoroda.club/texts/treatise",
        "name": "Трактати Григорія Сковороди — рекомендації та повний список",
        "isPartOf": { "@id": "https://www.skovoroda.club/#website" },
        "about": { "@id": "https://www.skovoroda.club/#organization" },
        "inLanguage": "uk",
        "description": "Рекомендований порядок читання трактатів Сковороди та повний список творів у хронологічному порядку.",
        "breadcrumb": { "@id": "https://www.skovoroda.club/texts/treatise#breadcrums" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.skovoroda.club/texts/treatise#breadcrums",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Головна",
            "item": "https://www.skovoroda.club/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Трактати",
            "item": "https://www.skovoroda.club/texts/treatise"
          }
        ]
      },
      {
        "@type":"CollectionPage",
        "@id":"https://www.skovoroda.club/texts/treatise#collectionpage",
        "url":"https://www.skovoroda.club/texts/treatise",
        "name":"Трактати Григорія Сковороди — рекомендації та повний список",
        "inLanguage":"uk"
      },
      {
        "@type": ["ItemList", "CreativeWork"],
        "@id": "https://www.skovoroda.club/texts/treatise#full-list-chronology",
        "name": "Повний список трактатів Сковороди в порядку дати написання",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
        "numberOfItems": 19,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/prokynuvshys_pobachyly_slavu_yoho",
              "url": "https://www.skovoroda.club/texts/treatise/prokynuvshys_pobachyly_slavu_yoho",
              "name": "Назва твору 1",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "dateCreated": "1750-01-01",
              "inLanguage": "uk"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/khai_tsiluie_mene_potsilunkamy_ust_svoikh",
              "url": "https://www.skovoroda.club/texts/treatise/khai_tsiluie_mene_potsilunkamy_ust_svoikh",
              "name": "Хай цілує мене поцілунками уст своїх",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "dateCreated": "1750-01-01",
              "inLanguage": "uk"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/vstupni_dveri_do_khrystyianskoi_dobronravnosti",
              "url": "https://www.skovoroda.club/texts/treatise/vstupni_dveri_do_khrystyianskoi_dobronravnosti",
              "name": "Вступні двері до християнської добронравності",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "dateCreated": "1766-01-01",
              "inLanguage": "uk"
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/narcis",
              "url": "https://www.skovoroda.club/texts/treatise/narcis",
              "name": "Наркіс. Розмова про те: Пізнай себе",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1769-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/rozmova_pyiaty_podoroznih_pro_shasta",
              "url": "https://www.skovoroda.club/texts/treatise/rozmova_pyiaty_podoroznih_pro_shasta",
              "name": "Розмова п'яти подорожніх про справжнє щастя в житті",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1770-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/askhan",
              "url": "https://www.skovoroda.club/texts/treatise/askhan",
              "name": "Симфонія, названа книга Асхань, про пізнання самого себе",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1770-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 7,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/besida_1sha_nazvana_observatorium_sion",
              "url": "https://www.skovoroda.club/texts/treatise/besida_1sha_nazvana_observatorium_sion",
              "name": "Бесіда 1-ша, названа Observatorium (Сіон)",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1770-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 8,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/besida_2ha_nazvana_observatorium_sion",
              "url": "https://www.skovoroda.club/texts/treatise/besida_2ha_nazvana_observatorium_sion",
              "name": "Бесіда 2-га, названа Observatorium Specula, по-єврейськи Сіон",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1770-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 9,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/dialog_pro_davnyi_svit",
              "url": "https://www.skovoroda.club/texts/treatise/dialog_pro_davnyi_svit",
              "name": "Діалог, або Розмова про давній світ",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1772-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 10,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/kilce",
              "url": "https://www.skovoroda.club/texts/treatise/kilce",
              "name": "Кільце",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1773-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 11,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/bukvar_myru",
              "url": "https://www.skovoroda.club/texts/treatise/bukvar_myru",
              "name": "Розмова, названа Алфавіт, або Буквар миру",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1775-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 12,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/ikona_alkiviadska",
              "url": "https://www.skovoroda.club/texts/treatise/ikona_alkiviadska",
              "name": "Книжечка, що називається Silenus Alcibiadis, тобто Ікона Алківіадська (Ізраїльський змій)",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1776-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 13,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/zhinka_lotova",
              "url": "https://www.skovoroda.club/texts/treatise/zhinka_lotova",
              "name": "Книжечка про читання Святого Письма, названа Жінка Лотова",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1780-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 14,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/besida_nazvana_dvoie",
              "url": "https://www.skovoroda.club/texts/treatise/besida_nazvana_dvoie",
              "name": "Бесіда, названа Двоє, про те, що легко бути блаженним",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1781-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 15,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/borotba_arhystratiha_mihaila_s_satanoyu",
              "url": "https://www.skovoroda.club/texts/treatise/borotba_arhystratiha_mihaila_s_satanoyu",
              "name": "Боротьба Архистратига Михаїла зі Сатаною про те: легко бути добрим",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1783-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 16,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/superechka_bisa_s_varsavoyu",
              "url": "https://www.skovoroda.club/texts/treatise/superechka_bisa_s_varsavoyu",
              "name": "Суперечка Біса з Варсавою",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1783-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 17,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/blahodarnyi_erodii",
              "url": "https://www.skovoroda.club/texts/treatise/blahodarnyi_erodii",
              "name": "Вдячний Еродій",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1787-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 18,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/ubohii_zhaivoronok",
              "url": "https://www.skovoroda.club/texts/treatise/ubohii_zhaivoronok",
              "name": "Убогий Жайворонок",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1787-01-01"
            }
          },
          {
            "@type": "ListItem",
            "position": 19,
            "item": {
              "@type": "CreativeWork",
              "@id": "https://www.skovoroda.club/texts/treatise/dialoh_ymia_emu_potop_zmiyn",
              "url": "https://www.skovoroda.club/texts/treatise/dialoh_ymia_emu_potop_zmiyn",
              "name": "Діалог. Назва його — Потоп зміїний",
              "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
              "inLanguage": "uk",
              "dateCreated": "1791-01-01"
            }
          }
        ]
      }
    ]
  };
}

const recommendedList = {
  "@type": ["ItemList", "CreativeWork"],
  "@id": "https://www.skovoroda.club/texts/treatise#recommended",
  "name": "Рекомендований порядок читання трактатів Сковороди",
  "itemListOrder": "https://schema.org/ItemListOrderAscending",
  "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
  "numberOfItems": 7,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "CreativeWork",
        "@id": "https://www.skovoroda.club/texts/treatise/vstupni_dveri_do_khrystyianskoi_dobronravnosti",
        "url": "https://www.skovoroda.club/texts/treatise/vstupni_dveri_do_khrystyianskoi_dobronravnosti",
        "name": "Вступні двері до християнської добронравності",
        "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
        "inLanguage": "uk"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "CreativeWork",
        "@id": "https://www.skovoroda.club/texts/treatise/blahodarnyi_erodii",
        "url": "https://www.skovoroda.club/texts/treatise/blahodarnyi_erodii",
        "name": "Вдячний Еродій",
        "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
        "inLanguage": "uk"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "CreativeWork",
        "@id": "https://www.skovoroda.club/texts/treatise/ubohii_zhaivoronok",
        "url": "https://www.skovoroda.club/texts/treatise/ubohii_zhaivoronok",
        "name": "Убогий жайворонок",
        "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
        "inLanguage": "uk"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "CreativeWork",
        "@id": "https://www.skovoroda.club/texts/treatise/rozmova_pyiaty_podoroznih_pro_shasta",
        "url": "https://www.skovoroda.club/texts/treatise/rozmova_pyiaty_podoroznih_pro_shasta",
        "name": "Розмова п'яти подорожніх про справжнє щастя в житті",
        "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
        "inLanguage": "uk"
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "CreativeWork",
        "@id": "https://www.skovoroda.club/texts/treatise/narcis",
        "url": "https://www.skovoroda.club/texts/treatise/narcis",
        "name": "Наркіс. Розмова про те: Пізнай себе",
        "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
        "inLanguage": "uk"
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "CreativeWork",
        "@id": "https://www.skovoroda.club/texts/treatise/bukvar_myru",
        "url": "https://www.skovoroda.club/texts/treatise/bukvar_myru",
        "name": "Розмова, названа Алфавіт, або Буквар миру",
        "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
        "inLanguage": "uk"
      }
    },
    {
      "@type": "ListItem",
      "position": 7,
      "item": {
        "@type": "CreativeWork",
        "@id": "https://www.skovoroda.club/texts/treatise/ikona_alkiviadska",
        "url": "https://www.skovoroda.club/texts/treatise/ikona_alkiviadska",
        "name": "Книжечка, що називається Silenus Alcibiadis, тобто Ікона Алківіадська (Ізраїльський змій)",
        "author": { "@id": "https://www.skovoroda.club/#hryhoryi_skovoroda" },
        "inLanguage": "uk"
      }
    }
  ]
};