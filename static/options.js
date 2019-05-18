const page = document.getElementById('buttonDiv')
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1']
function constructOpts (kButtonColors) {
  for (const item of kButtonColors) {
    const btn = document.createElement('button')
    btn.style.backgroundColor = item
    btn.addEventListener('click', function () {
      chrome.storage.sync.set({ color: item }, function () {
        console.log(`Color is ${item}`)
      })
    })
    page.appendChild(btn)
  }
}
constructOpts(kButtonColors)
