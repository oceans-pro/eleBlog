/**
 * 魔法注释
 * 1. log 展示代码 + 执行代码
 * 2. log-after 展示代码 + 执行代码
 * 3. run 不展示代码，将html代码替换到原来的代码显示位置
 */
import {deHighlight} from '@/pages/article/console/util'
import {getSrcList} from '@/pages/article/console/html/function'
import {loadAllScriptWithPromise} from '@/store/app-function/script'

export default function addPreviewAfterHtmlDemo() {
  // why
  // 之所以使用code.xml，是因为博客园一次后台bug，无法显示原md的```html中的html
  const $demos = $('code.language-html, code.xml')
  // -- 遍历所有的代码块
  // that 为 dom对象~code标签
  // index 为当前为第几个代码块
  let otherScriptLength = 0
  $demos.each(function(index, that) {
    let html
    let status = ''
    const comments = $(this).children('.hljs-comment')

    // 遍历该代码块的全部注释节点
    for (let i = 0; i < comments.length; i++) {
      let value = deHighlight(comments[i].innerHTML)
      value = value.replace(/ /g, '')
      if (value === '<!--script-->' || value === '<!--no-script-->') {
        status = 'needLoadNewScriptFirst'
        otherScriptLength++
        if (otherScriptLength > 1) {
          alert('请将所有的script放到一个html代码块中')
        }
        if (value === '<!--no-script-->') {
          status = 'needLoadNewScriptFirstAndHide'
        }
      }
      if (value === '<!--log-->' || value === '<!--log-before-->') {
        status = 'logBefore'
        break
      }
      if (value === '<!--log-after-->') {
        status = 'logAfter'
        break
      }
      if (value === '<!--run-->') {
        status = 'run'
        break
      }
      // 普通代码
    }


    const codeWithTags = that['innerHTML']
    html = deHighlight(codeWithTags)
    const $to = $(this).parents('.copyItem')
    const content = `<div id="html-${index}">${html}</div>`

    if (status.indexOf('needLoadNewScriptFirst') >= 0 && otherScriptLength === 1) {
      let srcList = getSrcList(that)
      loadAllScriptWithPromise(srcList)
        .then(_ => {
          $(document).trigger('loadAllScriptFinish')
          window.g.events.push('loadAllScriptFinish-有新的script')
          if (status === 'needLoadNewScriptFirstAndHide') {
            $(that).parents('.copyItem').remove()
          }
        })
        .catch(err => {
          alert(err)
        })
    }

    if (status === 'logAfter') {
      $to.after(content)
      return
    }
    if (status === 'logBefore') {
      $to.before(content)
      return
    }
    if (status === 'run') {
      $to.replaceWith(content)
    }
  })

  // 没有新的Script标签
  if (otherScriptLength === 0) {
    $(document).trigger('loadAllScriptFinish')
    window.g.events.push('loadAllScriptFinish-没有新的标签')
  }
}
