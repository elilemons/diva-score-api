import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'
import inlineCSS from 'inline-css'

const template = fs.readFileSync
  ? fs.readFileSync(path.join(__dirname, './template.html'), 'utf8')
  : ''
const getHTML = Handlebars.compile(template)

type DataType = {
  headline: string
  content: string
  cta?: {
    url: string
    buttonLabel: string
  }
}

const generateEmailHTML = async (data: DataType): Promise<string> => {
  const preInlinedCSS = getHTML({
    ...data,
    apiURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  })

  const html = await inlineCSS(preInlinedCSS, {
    url: ' ',
    removeStyleTags: false,
  })

  return html
}

export default generateEmailHTML
