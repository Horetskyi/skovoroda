import { useState, useEffect } from 'react';

function useTreatiseFilter(treatises, inputFilters) {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState(inputFilters);
  const [filteredTreatises, setFilteredTreatises] = useState(treatises);

  function setFilterChecked(filterKey, checked) {
    const newFilters = [...filters];
    const index = newFilters.findIndex(filter => filter.key === filterKey);
    newFilters[index] = { ...newFilters[index], checked: checked };
    setFilters(newFilters);
  }

  useEffect(() => {
    const filteredTreatiseKeys = filters.filter(f => f.checked).map(f => f.key);
    let filtered = !filteredTreatiseKeys.length
      ? treatises
      : treatises.filter(treatise =>
          filteredTreatiseKeys.includes(treatise.treatiseType)
        );
      
    if (searchText && searchText.length) {
      const searchTextLowerCase = searchText.toLowerCase();
      filtered = filtered.filter(treatise =>
        treatise.versions.some(version => 
          version.title.toLowerCase().includes(searchTextLowerCase))
      );
    }

    filtered.sort((a, b) => a.orderNumber - b.orderNumber);

    setFilteredTreatises(filtered);
  }, [searchText, filters, treatises]);

  return {
    searchText,
    setSearchText,
    filters,
    setFilterChecked,
    filteredTreatises,
  };
}

export default useTreatiseFilter;