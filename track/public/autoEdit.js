
document.onreadystatechange = function (state) {
  if(state.target.readyState !== 'complete') return;
  window.parent.postMessage(document.querySelector('#root').innerHTML, 'http://easinote-dev.test.seewo.com:3000')
  window.addEventListener('message', (event) => {
    if (!event.origin.includes('http://easinote-dev.test.seewo.com') || !event.data) {
      return
    }
    const id = event.data
    if (id === 'getSelectXpath') {
      let text = ''
      const dom = document.querySelector('.auto-edit-select')
      const className = dom.className
      dom.className = dom.className.replace('auto-edit-select', '')
      let domModuleId = dom.attributes['cvte-track-id'].value
      let selector = window.OptimalSelect.getSingleSelector(dom, {
        priority: ['id', 'class', 'href', 'src', 'data-*'],
        ignore: {
          attribute(name, value) {
            return (/cvte-track-id/).test(name) && value !== domModuleId
          },
        }
      })

      if (dom.childElementCount < 3) {
        text = dom.textContent.substring(0, 10)
      }
      dom.className = className
      selector = encodeURIComponent(selector.replace(/\(\d+\)/g, "").replace(/:nth-of-type/g, ''))
      window.html2canvas(document.querySelector("#root")).then(res => {
        const canvas = res.toDataURL("image/png");
        const param = {
          img: canvas, 
          id: `selectId&&${selector}--${text}`
        }
        window.parent.postMessage(JSON.stringify(param), 'http://easinote-dev.test.seewo.com:3000');
      })
     
      return;
    }
    if (document && typeof id === 'string' && document.querySelector(id)) {
      document.querySelectorAll('.auto-edit-select').forEach(item => {
        item.className = item.className.replace('auto-edit-select', '')
      })
      const className = document.querySelector(id).className
      document.querySelector(id).className = className ? `${className} auto-edit-select` : 'auto-edit-select'
    }
  })
  document.addEventListener('DOMNodeInserted',function(){
    setTimeout(() => {
      window.parent.postMessage(document.querySelector('#root').innerHTML, 'http://easinote-dev.test.seewo.com:3000')
    }, 300)
  },false);
  document.addEventListener('DOMNodeRemoved',function(){
    setTimeout(() => {
      window.parent.postMessage(document.querySelector('#root').innerHTML, 'http://easinote-dev.test.seewo.com:3000')
    }, 300)
  },false);
}