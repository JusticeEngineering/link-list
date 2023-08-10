/* global customElements */
/* eslint-env browser, webextensions */

import browser from 'webextension-polyfill'
import { createRequestModifier } from "./ipfs-request"
import generateFullListHTML from './wrapper-template'

const apiURL = new URL('http://localhost:45004')

const modifyRequest = createRequestModifier(browser)

const onBeforeSendInfoSpec = ['blocking', 'requestHeaders']
if (browser.webRequest.OnBeforeSendHeadersOptions && 'EXTRA_HEADERS' in browser.webRequest.OnBeforeSendHeadersOptions) {
    // Chrome 72+  requires 'extraHeaders' for accessing all headers
    // Note: we need this for code ensuring kubo-rpc-client can talk to API without setting CORS
    onBeforeSendInfoSpec.push('extraHeaders')
}
browser.webRequest.onBeforeSendHeaders.addListener(modifyRequest.onBeforeSendHeaders, { urls: ['<all_urls>'] }, onBeforeSendInfoSpec)

// input for url and title
// reorderable
// removable
// button for adding new
// button for saving
// input for List title
// input for list description

// preview section

// json store
// export/save as html page

function resetForm() {
    document.querySelector('#link-title').value = null
    document.querySelector('#link-url').value = null
}

document.querySelector('#new-item').addEventListener('submit', (ev) => {
  ev.preventDefault()
  const title = document.querySelector('#link-title').value
  const url = document.querySelector('#link-url').value
  const link = `<li class="m-1 rounded-full bg-stone-800 border-neutral-700 border-2 p-1 text-white text-center"><a href="${url}">${title}</a></li>`
  document.querySelector('#link-list ul').innerHTML += link
  document.querySelector('#link-list h2').innerHTML = listTitle

  resetForm()
})

const uploadFile = async (file) => {
  const apiCall = `${apiURL}/api/v0/add`
  const xhr = new XMLHttpRequest() // older XHR API us used because window.fetch appends Origin which causes error 403 in go-ipfs
  // synchronous mode with small timeout
  // (it is okay, because we do it only once, then it is cached and read via readAndCacheDnslink)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (confirm(`Copy ipfs://${JSON.parse(xhr.response)['Hash']}/ to clipboard?`)) {
        navigator.clipboard.writeText(`ipfs://${JSON.parse(xhr.response)['Hash']}/`)
      }
      // append to DOM
    }
  };
  xhr.open('post', apiCall, true)
  var formData = new FormData();
  formData.append("thefile", file);
  xhr.send(formData);
}

document.querySelector('#export button').addEventListener('click', async (ev) => {
  ev.preventDefault()
  const listEl = document.querySelector('#link-list').outerHTML
  const newListHTML = generateFullListHTML(listEl)
  const title = document.querySelector('#users-link-list-title').value
  console.log('newListHTML: ', newListHTML)
  if (confirm(`Add ${title} to IPFS Node?`)) {
    const blob = new Blob([newListHTML], { type: 'text/html' })
    blob.name = 'index.html'
    await uploadFile(blob)
  }
  /*
    1. Import template wrapper
    2. input exported list into wrapper
    3. prompt user to upload file to IPFS
    4. return ipfs url.
  */
})

/**
 * Handle input of URL from webpage creator
 * 
 * 1. listen for event from webpage creator,
 * 2. Open up fresh link list with passed url in input.
 * 3. prompt user that their url has been input and they can add title and create a fresh list.
 * 
 */


if (window.location.search) {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  const urlInput = params.get('url')
  if (confirm(`Add ${urlInput} to Link List?`)) {
    resetForm()
    document.querySelector('#link-url').value = urlInput
  }
}