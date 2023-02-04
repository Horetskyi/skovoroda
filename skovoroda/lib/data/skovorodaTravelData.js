
const skovorodaPlaces = {
  chornuhy: {
    id: "chornuhy"
    // https://uk.wikipedia.org/wiki/%D0%A7%D0%BE%D1%80%D0%BD%D1%83%D1%85%D0%B8
  },
};

const skovorodaStates = {
  child: {
    id: "child",
  },
  child_at_school: {
    id: "child_at_school",
  },
};

function date(year, month, day) {

}

const timePoints = [
  { 
    id: "day-of-birth",
    date: date(1772, 12, 3), 
    state: skovorodaStates.child,
    place: skovorodaPlaces.chornuhy,
    text: "Народився в сотенному містечку Чорнухи Любенського полку.",
    source: 1,
    sourcePage: "29 с.",
    // TODO: 
    // Можна додати про батьків. 
    // Можна додати вірш Сковороди написаний Ковалинському про свій день народження (див. Ловитва 29 с.) 
  },
  {
    id: "go-to-school",
    date: date(1729),
    endDate: date(1734, "summer"),
    state: skovorodaStates.child_at_school,
    place: skovorodaPlaces.chornuhy,
    text: "Батьки віддали Григорія до дяківської школи",
    source: 1,
    sourcePage: "40 с.",
    // Грав на флейті [1] 46 c.
    // З 7 років почав співав у церковному хорі [1] 44 c.
    // З дитинства любив читати [1] 44 c.
  },
  {

  }
];

export const SkovorodaTravelData = {
  timePoints,
};
