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
    ? <Link href={props.sourceHref}><a color="gray.9" className="grayForText">{props.sourceName}</a></Link>
    : <div color="gray.9" className="grayForText">{props.sourceName}</div>
    }
  </>
}
