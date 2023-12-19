import { renderToString } from 'react-dom/server';
import React from 'react'
import * as reactTools from 'react-tools'
import * as Prelude from './prelude'

function getGlobals() {
  const keys = Object
    .getOwnPropertyNames(Prelude)
    .filter(k => k !== "default")
    .sort();
  const refs = keys.map(k => Prelude[k])
  return [keys, refs]
}

export function compileTemplate() {
  const inputStr = Host.inputString()
  const { name, code } = JSON.parse(inputStr)
  Var.set(`template-${name}`, code)
}

export function render() {
  const { name, props } = JSON.parse(Host.inputString())
  const code = JSON.parse(Var.get(`template-${name}`))
  let view = reactTools.transform(code, {}) + '; return App'
  let [globalKeys, globalRefs] = getGlobals()
  globalKeys.push('React')
  globalRefs.push(React)
  globalKeys.push(view)
  view = (new Function(...globalKeys))(...globalRefs)
  Host.outputString(renderToString(React.createElement(view, props, null)))
}

export function run() {
  let { view, props } = JSON.parse(Host.inputString())
  view = reactTools.transform(view, {}) + '; return App;'
  let [globalKeys, globalRefs] = getGlobals()
  globalKeys.push('React')
  globalRefs.push(React)
  globalKeys.push(view)
  view = (new Function(...globalKeys))(...globalRefs)
  Host.outputString(renderToString(React.createElement(view, props, null)))
}
