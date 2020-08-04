'use strict'

function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
}

var _createClass = (function() {
  function e(e, t) {
    for (var a = 0; a < t.length; a++) {
      var s = t[a]
      ;(s.enumerable = s.enumerable || !1), (s.configurable = !0), 'value' in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
    }
  }

  return function(t, a, s) {
    return a && e(t.prototype, a), s && e(t, s), t
  }
})()
!(function() {
  var e = (function() {
    function e(t) {
      var a = this
      _classCallCheck(this, e)
      var s = {
        logo: 'OwO琛ㄦ儏',
        container: document.getElementsByClassName('OwO')[0],
        target: document.getElementsByTagName('textarea')[0],
        position: 'down',
        width: '100%',
        maxHeight: '250px',
        api: 'https://api.anotherhome.net/OwO/OwO.json',
      }
      for (var n in s) s.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = s[n])
      ;
      (this.container = t.container), (this.target = t.target), 'up' === t.position && this.container.classList.add('OwO-up')
      var i = new XMLHttpRequest()
      ;(i.onreadystatechange = function() {
        4 === i.readyState &&
        ((i.status >= 200 && i.status < 300) || 304 === i.status
            ? ((a.odata = JSON.parse(i.responseText)), a.init(t))
            : console.log('OwO data request was unsuccessful: ' + i.status))
      }),
          i.open('get', t.api, !0),
          i.send(null)
    }

    return (
        _createClass(e, [
          {
            key: 'init',
            value: function(e) {
              var t = this
              ;(this.area = e.target), (this.packages = Object.keys(this.odata))
              for (
                  var a =
                      '\n            <div class="OwO-logo"><span>' +
                      e.logo +
                      '</span></div>\n            <div class="OwO-body" style="width: ' +
                      e.width +
                      '">',
                      s = 0;
                  s < this.packages.length;
                  s++
              ) {
                a +=
                    '\n                <ul class="OwO-items OwO-items-' +
                    this.odata[this.packages[s]].type +
                    '" style="max-height: ' +
                    (parseInt(e.maxHeight) - 53 + 'px') +
                    ';">'
                for (var n = this.odata[this.packages[s]].container, i = 0; i < n.length; i++)
                  a +=
                      '\n                    <li class="OwO-item" title="' +
                      n[i].text +
                      '">' +
                      n[i].icon +
                      '<span style=\'display:none\'>' +
                      n[i].write +
                      '</span></li>'
                a += '\n                </ul>'
              }
              a += '\n                <div class="OwO-bar">\n                    <ul class="OwO-packages">'
              for (var o = 0; o < this.packages.length; o++) a += '\n                        <li><span>' + this.packages[o] + '</span></li>'
              ;
              (a += '\n                    </ul>\n                </div>\n            </div>\n            '),
                  (this.container.innerHTML = a),
                  (this.logo = this.container.getElementsByClassName('OwO-logo')[0]),
                  this.logo.addEventListener('click', function() {
                    t.toggle()
                  }),
                  this.container.getElementsByClassName('OwO-body')[0].addEventListener('click', function(e) {
                    var a = null
                    if (
                        (e.target.classList.contains('OwO-item')
                            ? (a = e.target)
                            : e.target.parentNode.classList.contains('OwO-item') && (a = e.target.parentNode),
                            a)
                    ) {
                      var s = t.area.selectionEnd,
                          n = t.area.value
                      var num = a.children[0].innerHTML
                      if (num == '') {
                        num = a.children[1].innerHTML
                      }
                      ;(t.area.value = n.slice(0, s) + num + n.slice(s)), t.area.focus(), t.toggle()

                      //console.log(n.slice(0,s)+a.innerHTML+n.slice(s))
                    }
                  }),
                  (this.packagesEle = this.container.getElementsByClassName('OwO-packages')[0])

              for (
                  var c = function(e) {
                        !(function(a) {
                          t.packagesEle.children[e].addEventListener('click', function() {
                            t.tab(a)
                          })
                        })(e)
                      },
                      l = 0;
                  l < this.packagesEle.children.length;
                  l++
              )
                c(l)
              this.tab(0)
            },
          },
          {
            key: 'toggle',
            value: function() {
              this.container.classList.contains('OwO-open') ? this.container.classList.remove('OwO-open') : this.container.classList.add('OwO-open')
            },
          },
          {
            key: 'tab',
            value: function(e) {
              var t = this.container.getElementsByClassName('OwO-items-show')[0]
              t && t.classList.remove('OwO-items-show'), this.container.getElementsByClassName('OwO-items')[e].classList.add('OwO-items-show')
              var a = this.container.getElementsByClassName('OwO-package-active')[0]
              a && a.classList.remove('OwO-package-active'), this.packagesEle.getElementsByTagName('li')[e].classList.add('OwO-package-active')
            },
          },
        ]),
            e
    )
  })()
  'undefined' != typeof module && 'undefined' != typeof module.exports ? (module.exports = e) : (window.OwO = e)
  //console.log("e", e)
})()
//# sourceMappingURL=OwO.min.js.map
