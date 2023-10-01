import { getLinkTitle } from "../../lib/skovorodaPath";

export default function SkLinkButtonDesktop({ href, text }) {
  const linkTitle = getLinkTitle(href);
  return <>
    <Link key={"href-"+href} href={href} title={linkTitle}>
      <Button 
        radius={"md"} 
        variant="light"
        w={180}
        h={52}
        color="indigo"
      >
        <Text className="normalContentText normalContentText_withoutIndent">{text}</Text>
      </Button>
    </Link>
  </>
}