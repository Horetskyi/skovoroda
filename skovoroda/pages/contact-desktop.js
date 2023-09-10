import { Container, Space, Text } from "@mantine/core";
import SkH1Desktop from "../components/shared/skH1Desktop";
import SkColoredContainerDesktop from "../components/shared/skColoredContainerDesktop";
import { getContactPageProps } from "../lib/pagesContent/contactStatic";

export default function ContactPage(props) {
  return <>
    <SkH1Desktop text="Контакти" mt={"lg"} />
    <SkColoredContainerDesktop>
      <Text className="normalContentText normalContentText_withoutIndent">
        <span>Для звязку пишіть в телеграм: </span>
        <a href="https://t.me/Horetskyi_Dima" title="Телеграм для звязку">https://t.me/Horetskyi_Dima</a>
      </Text>
    </SkColoredContainerDesktop>
  </>
}

export async function getStaticProps({ params }) {
  return getContactPageProps();
}