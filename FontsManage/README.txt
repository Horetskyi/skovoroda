pip install fonttools brotli

pyftsubset Ysabeau-VariableFont_wght.ttf --unicodes="U+0000-00FF,U+0100-017F,U+0300-036F,U+0370-03FF,U+1F00-1FFF,U+0400-052F,U+2000-206F,U+20AC,U+2122" --flavor=woff2 --output-file="Ysabeau-Subset.woff2"

pyftsubset Ysabeau-Italic-VariableFont_wght.ttf --unicodes="U+0000-00FF,U+0100-017F,U+0300-036F,U+0370-03FF,U+1F00-1FFF,U+0400-052F,U+2000-206F,U+20AC,U+2122" --flavor=woff2 --output-file="Ysabeau-ItalicSubset.woff2"

pyftsubset Oswald-VariableFont_wght.ttf --unicodes="U+0000-00FF,U+0100-017F,U+0300-036F,U+0370-03FF,U+1F00-1FFF,U+0400-052F,U+2000-206F,U+20AC,U+2122" --flavor=woff2 --output-file="Oswald-Subset.woff2"
