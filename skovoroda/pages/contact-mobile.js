import { Container, Space } from "@mantine/core";
import SkH1Mobile from "../components/shared/skH1Mobile";
import { getContactPageProps } from "../lib/pagesContent/contactStatic";

export default function ContactPage(props) {
  return <>
    <Space h={"md"}/>
    <SkH1Mobile text="Контакти" />
    <Container px={"md"}>
      <p className="normalContentText normalContentText_withoutJustify normalContentText_withoutIndent">
        <span>Для звязку пишіть в телеграм: </span>
        <a href="https://t.me/Horetskyi_Dima" title="Телеграм для звязку">https://t.me/Horetskyi_Dima</a>
      </p>
    </Container>
  </>
}

export async function getStaticProps({ params }) {
  return getContactPageProps();
}