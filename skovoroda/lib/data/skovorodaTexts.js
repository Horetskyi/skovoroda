import { vstupni_dveri_do_khrystyianskoi_dobronravnosti } from "./texts/vstupni_dveri_do_khrystyianskoi_dobronravnosti";
import { prokynuvshys_pobachyly_slavu_yoho } from "./texts/prokynuvshys_pobachyly_slavu_yoho";
import { khai_tsiluie_mene_potsilunkamy_ust_svoikh } from "./texts/khai_tsiluie_mene_potsilunkamy_ust_svoikh";
import { narcis } from "./texts/narcis";
import { askhan } from "./texts/askhan";
import { besida_nazvana_dvoie } from "./texts/besida_nazvana_dvoie";
import { besida_1sha_nazvana_observatorium_sion } from "./texts/besida_1sha_nazvana_observatorium_sion";
import { besida_2ha_nazvana_observatorium_specula_poievreisky_sion } from "./texts/besida_2ha_nazvana_observatorium_specula_poievreisky_sion";
import { dialoh_ymia_emu_potop_zmiyn } from "./texts/dialoh_ymia_emu_potop_zmiyn";
import { ubohii_zhaivoronok } from "./texts/ubohii_zhaivoronok";
import { blahodarnyi_erodii } from "./texts/blahodarnyi_erodii";

const skovorodaTexts = {
  prokynuvshys_pobachyly_slavu_yoho,
  khai_tsiluie_mene_potsilunkamy_ust_svoikh,
  vstupni_dveri_do_khrystyianskoi_dobronravnosti,
  narcis,
  askhan,
  besida_nazvana_dvoie,
  besida_1sha_nazvana_observatorium_sion,
  besida_2ha_nazvana_observatorium_specula_poievreisky_sion,
  blahodarnyi_erodii,
  ubohii_zhaivoronok,
  dialoh_ymia_emu_potop_zmiyn,
}

const textsArray = Object.values(skovorodaTexts);
textsArray.forEach(textData => {
  textData.manuscriptCoverImageSrc = !textData.manuscriptCover ? "" : "/manuscript-cover/" + textData.manuscriptCover;
});
export const SkovorodaTextsArray = textsArray;
export const SkovorodaTexts = skovorodaTexts;
