import { Card, createStyles } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";

const useStyles = createStyles(() => ({
  text: {
    textAlign: "justify",
  }
}));

export default function SkovorodaFomattingInfoBlockDesktop({...others}) {
  const { classes } = useStyles();
  return <>
    <Card bg="blue.0" {...others} className={classes.text}>
      <div>
        <IconInfoCircle size={20} />
      </div>
      Ми намагалися зберегти оригінальне форматування тексту, проте адаптація тексту для електронного читання має побічні ефекти.
      Попереджуємо про можливі відмінності між форматуванням на сайті та форматуванням в оригіналі.
    </Card>
  </>
}