# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5

### Image
![The Great Wave off Kanagawa - Hokusai, 1831](images/hokusai.jpg "By Katsushika Hokusai - Metropolitan Museum of Art: entry 45434, Public Domain, https://commons.wikimedia.org/w/index.php?curid=2798407")

### Bullet list
- level 1
- level 1
  - level 2
    - level 3
    - level 3
  - level 2
- level 1

### Numbered list
1. item 1
1. item 2
2. item 3

### Inline formatting
- relative link [./icons.md](./icons.md)
- relative link [./icons](./icons)
- relative link [icons.md](icons.md)
- relative link [icons](icons)
- relative link [../../](../../)
- external link [https://docs.python.org/3/](https://docs.python.org/3/)
- external link [//docs.python.org/3/](//docs.python.org/3/)
- this is _italic_ inline
- this is **bold** inline
- this is _**bold and italic**_ inline
- this is `code` inline
- this is ~~strikethru~~ inline

### Paragraph
Things were not too simple in this _safari_ because things had changed very much in East Africa. The white hunter had been a close friend of mine for many years. I respected him as I had never respected my father and he trusted me, which was more than I deserved.

### Quoted text
> The table below documents all UMI message types. CMD[4:0] is the UMI opcode defining the type of message being sent. CMD[31:5] are used for message specific options.

### Simple table
| Term        | Meaning    |
|-------------|------------|
| CMD         | Command (type + options)
| DA          | Destination address of message
| SA          | Source address (where to return a response)
| DATA        | Data payload
| OPCODE      | Command opcode


### Wide table
|Message     |DATA|SA|DA|31:27 |26:25|24:22     |21:20|19:16|15:8 |19:16|15:8 |19:16|15:8 |19:16|15:8 |19:16|15:8 |19:16|15:8 |
|------------|:--:|--|--|:----:|:---:|:--------:|:---:|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
|INVALID     |    |  |  |--    |--   |--        |--   |--   |--   |--   |--   |--   |--   |--   |--   |--   |--   |--   |--   |
|REQ_RD      |    |Y |Y |HOSTID|U    |EX,EOF,EOM|PROT |QOS  |LEN  |QOS  |LEN  |QOS  |LEN  |QOS  |LEN  |QOS  |LEN  |QOS  |LEN  |
|REQ_WR      |Y   |Y |Y |HOSTID|U    |EX,EOF,EOM|PROT |QOS  |LEN  |QOS  |LEN  |QOS  |LEN  |QOS  |LEN  |QOS  |LEN  |QOS  |LEN  |

### Javascript code block
```js
let defaultTheme = require('tailwindcss/defaultTheme');

let content = ['./src/**/*.{html,js,svelte,ts}'];

/** @type {import('tailwindcss').Config} */
let config = {
  content,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
        logo: ['Oxanium', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      screens: {
        xs: '400px',
      },
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
```

### Typescript code block
```ts
import { writable } from 'svelte/store';
import type { LoadData } from '$lib/loader';

export interface MarkdownFile extends LoadData {
  filepath?: string;
}

export type MarkdownFiles = {
  files: Array<string>;
  mdHash: { [key: string]: MarkdownFile };
  status: string;
};
export const model = writable<MarkdownFiles>();
```

### Python code block
```py
import sys

def main():
    if len(sys.argv) >= 2 and (sys.argv[1] == '-h' or sys.argv[1] == '--help'):
        print('''\
Usage:
ui [--dev]  Runs server and browse to port 7777.
             '--dev' opens dev server port 5173
ui md       Lists markdown files in the current directory.
''')
        sys.exit(0)
```