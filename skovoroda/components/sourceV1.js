import Link from 'next/link'
import { Text } from '@mantine/core';

/*
props.sourceName
props.sourceHref
*/
export default function SourceV1(props) {
  
  return <>
    <Text size="sm" color="gray.9">
      Джерело
    </Text>
    {props.sourceHref 
    ? <Link href={props.sourceHref} className="blackLink undecoratedLink">{props.sourceName}</Link>
    : <div className="blackLink">{props.sourceName}</div>
    }
  </>
}
