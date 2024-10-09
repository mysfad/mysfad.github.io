function html(obj) {
    if (Array.isArray(obj)) return obj.map(e => html(e)).join('')
    let el = `<${obj.tag}`
    Object.keys(obj).forEach(at => { if (at !== 'tag' && at !== 'children' && at !== 'textContent') el += ` ${at}="${obj[at]}"` })
    el += '>'
    if (obj.textContent) el += obj.textContent
    if (obj.children && Array.isArray(obj.children)) el += obj.children.map(c => html(c)).join('')
    el += `</${obj.tag}>`
    return el
}
