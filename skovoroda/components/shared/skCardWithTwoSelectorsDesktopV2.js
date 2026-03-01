import { Card, Select, Text } from "@mantine/core";
import classes from './skCardWithTwoSelectorsDesktopV2.module.scss'; 
import { memo } from "react";
import { getLeftSectionIcon } from "./icons/languageIcons";

const SkCardWithTwoSelectorsDesktopV2 = memo(function SkCardWithTwoSelectorsDesktopV2({ dropdown1, dropdown2, idSuffix, language}) {
  
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

  return <Card withBorder={false} w={"100%"} p="0" m="0" >

    {/* Use Flex for 1/3 and 2/3 layout with gap */}
    <div style={{ display: "flex", width: "100%", gap: 24 }}>
      <div style={{ flex: "1 1 0", minWidth: 0, maxWidth: "33.33%" }}>
        <Text mb="sm" className={classes.labelText}>{dropdown1.label}</Text>
        <Select 
          id={"dropdown1-"+idSuffix}
          size="md"
          searchable
          mb="md"
          data={dropdown1.data} 
          value={dropdown1.selectedValue}
          classNames={{
            input: `${classes.mantineSelectInput} firstFont`,
            option: 'firstFont',
            dropdown: 'firstFont',
          }}
          leftSection={getLeftSectionIcon(language, true)}
          onChange={dropdown1.onChange}
          comboboxProps={{ keepMounted: true, middlewares: { flip: false, shift: false } }}
          renderOption={renderSelectOption}
          aria-label={dropdown1.label}>
        </Select>
        <HiddenLinksDisplay data={dropdown1.data} />
      </div>
      <div style={{ flex: "2 1 0", minWidth: 0, maxWidth: "66.66%", marginRight: 4 }}>
        <Text mb="sm" className={classes.labelText}>{dropdown2.label}</Text>
        <Select 
          id={"dropdown2-"+idSuffix}
          size="md"
          searchable
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
      </div>
    </div>

  </Card>
});

export default SkCardWithTwoSelectorsDesktopV2;
