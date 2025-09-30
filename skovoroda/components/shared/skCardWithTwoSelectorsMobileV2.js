import { Card, Select, Text } from "@mantine/core";
import classes from './skCardWithTwoSelectorsMobileV2.module.scss'; 
import { memo } from "react";
import { getLeftSectionIcon } from "./icons/languageIcons";

const SkCardWithTwoSelectorsMobileV2 = memo(function SkCardWithTwoSelectorsMobileV2({ dropdown1, dropdown2, idSuffix, language}) {
  
  if (!idSuffix || !idSuffix.length) {
    idSuffix = "normal";
  }

  const renderSelectOption = ({ option }) => (
    <div className={classes.selectorOption}>
      {getLeftSectionIcon(option.label, false)}
      {option.label}
    </div>
  );

  const HiddenLinksDisplay = function ({data}) {
    if (!data || !data.length) return null;
    return <div className="kind-of-menu" style={{ visibility: "hidden", position: "absolute" }}>
      { data
        .map(item => {
          if (!item.absoluteUrl) return null;
          const label = item.linkTitle ? item.linkTitle : (item.label ? item.label : item.absoluteUrl);
          return <a key={item.id} href={item.absoluteUrl}>{label}</a>;
        })
        .filter(x => x) }
    </div>;
  }

  const styles = {
    section: { width: 'auto' }
  };
  if (language === 'oldua') {
    styles.input = { paddingLeft: 40 };
  } else if (language === 'ua') {
    styles.input = { paddingLeft: 30 };
    styles.section.marginLeft = 6;
  }

  return <Card withBorder={false} w="100%" px="md" py="0" m="0" >

    <Text mb="xs" className={classes.labelText}>{dropdown1.label}</Text>
    <Select 
      id={"dropdown1-"+idSuffix}
      size="xs"
      searchable={false}
      mb="sm"
      data={dropdown1.data} 
      value={dropdown1.selectedValue}
      leftSection={getLeftSectionIcon(language, true)}
      classNames={{
        input: `${classes.mantineSelectInput} firstFont`,
        option: 'firstFont',
        dropdown: 'firstFont',
      }}
      styles={styles}
      onChange={dropdown1.onChange}
      comboboxProps={{ keepMounted: true, middlewares: { flip: false, shift: false } }}
      renderOption={renderSelectOption}
      aria-label={dropdown1.label}>
    </Select>
    <HiddenLinksDisplay data={dropdown1.data} />

    <Text mb="xs" className={classes.labelText}>{dropdown2.label}</Text>
    <Select 
      id={"dropdown2-"+idSuffix}
      size="xs"
      searchable={false}
      data={dropdown2.data} 
      value={dropdown2.selectedValue}
      classNames={{
        input: `${classes.mantineSelectInput} firstFont`,
        option: 'firstFont',
        dropdown: 'firstFont',
      }}
      onChange={dropdown2.onChange}
      comboboxProps={{ keepMounted: true, middlewares: { flip: false, shift: false } }}
      aria-label={dropdown2.label}>
    </Select>
    <HiddenLinksDisplay data={dropdown2.data} />

  </Card>
});
export default SkCardWithTwoSelectorsMobileV2;