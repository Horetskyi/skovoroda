import { vstupni_dveri_do_khrystyianskoi_dobronravnosti } from "./texts/vstupni_dveri_do_khrystyianskoi_dobronravnosti";
import { prokynuvshys_pobachyly_slavu_yoho } from "./texts/prokynuvshys_pobachyly_slavu_yoho";
import { khai_tsiluie_mene_potsilunkamy_ust_svoikh } from "./texts/khai_tsiluie_mene_potsilunkamy_ust_svoikh";
import { narcis } from "./texts/narcis";
import { askhan } from "./texts/askhan";
import { besida_nazvana_dvoie } from "./texts/besida_nazvana_dvoie";

const skovorodaTexts = {
  prokynuvshys_pobachyly_slavu_yoho,
  khai_tsiluie_mene_potsilunkamy_ust_svoikh,
  vstupni_dveri_do_khrystyianskoi_dobronravnosti,
  narcis,
  askhan,
  besida_nazvana_dvoie,
}

const textsArray = Object.values(skovorodaTexts);
textsArray.forEach(textData => {
  textData.manuscriptCoverImageSrc = !textData.manuscriptCover ? "" : "/manuscript-cover/" + textData.manuscriptCover;
});
export const SkovorodaTextsArray = textsArray;
export const SkovorodaTexts = skovorodaTexts;
