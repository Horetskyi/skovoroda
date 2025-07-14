import { Card, Flex, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";

export default function SkovorodaFomattingInfoBlockDesktop({...others}) {
  return <>
    <Card bg="blue.0" {...others} className={'normalContentText_justify'}>
      <Flex>
        <Text mr="md"><IconInfoCircle size={20} /></Text>
        <Text pr="xl">Ми намагалися зберегти оригінальне форматування тексту, проте адаптація тексту для електронного читання має побічні ефекти.
        Попереджуємо про можливі відмінності між форматуванням на сайті та форматуванням в оригіналі.</Text>
      </Flex>
    </Card>
  </>
}