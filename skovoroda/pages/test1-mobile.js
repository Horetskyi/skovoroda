import Head from 'next/head'
import Link from 'next/link'

export default function Test1() {
    return (
        <div>
            <Link href="/test2">Link to page 2</Link>
            <p>
                Mobile test 1 content
            </p>
        </div>
    )
}

