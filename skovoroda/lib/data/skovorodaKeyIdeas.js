
const colors = [
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
];

export const SkovorodaKeyIdeas = {
  scho_e_spravznya_ludyna: {
    id: "scho_e_spravznya_ludyna",
    name: "Що є справжня людина?",
  },
  voskresinnya: {
    id: "voskresinnya",
    name: "Воскресіння",
  },
  symbolic_language: {
    id: "symbolic_language",
    name: "Символічна мова",
  },
  mova_prytch: {
    id: "mova_prytch",
    name: "Мова притч",
  },
  tin_ludyny: {
    id: "tin_ludyny",
    name: "Тінь людини",
  },
  dvi_natury: {
    id: "dvi_natury",
    name: "Дві натури",
  },
  hto_takyi_philosoph: {
    id: "hto_takyi_philosoph",
    name: "Хто такий філософ?",
  },
  dushevnyi_sum: {
    id: "dushevnyi_sum",
    name: "Душевний сум",
  },
  borotba_pekelnyh_duhiv_z_nebesnymy_sylamy: {
    id: "borotba_pekelnyh_duhiv_z_nebesnymy_sylamy",
    name: "Боротьба пекельних духів з небесними силами",
  },
  bibliya: {
    id: "bibliya",
    name: "Біблія",
  },
  dva_rody_ludski_vyshnyi_nyshnyi: {
    id: "dva_rody_ludski_vyshnyi_nyshnyi",
    name: "Два роди людські: вишній і нижній",
  },
  vira: {
    id: "vira",
    name: "Віра",
  },
  blazenstvo: {
    id: "blazenstvo",
    name: "Блаженство",
  },
  parents_wisdom: { 
    // TODO: Вдячний Еродій, Убогий Жайворонок [16] 22 с.
    id: "parents_wisdom",
    name: "Мудрість батьків",
    details: "Провідна роль батьківської науки в житті розумної людини",
  },
}

export const SkovorodaKeyIdeasArray = Object.values(SkovorodaKeyIdeas);
SkovorodaKeyIdeasArray.forEach((keyIdea, index) => {
  keyIdea.color = colors[index % colors.length];
  keyIdea.index = index;
})

export const SkovorodaKeyIdeasMap = new Map(SkovorodaKeyIdeasArray.map(value => [value.id, value])); 
