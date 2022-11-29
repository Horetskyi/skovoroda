import Link from 'next/link'
import { Text } from '@mantine/core';

/*
props.sourceName
props.sourceHref
*/
export default function SourceV1(props) {
  
  return <>
    <Text size="sm" color="dimmed">
      Джерело
    </Text>
    {props.sourceHref 
    ? <Link href={props.sourceHref}><a color="dimmed" className="gray8">{props.sourceName}</a></Link>
    : <div color="dimmed" className="gray8">{props.sourceName}</div>
    }
  </>
}
