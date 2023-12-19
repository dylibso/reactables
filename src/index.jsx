import { renderToString } from 'react-dom/server';
import React from 'react'
import * as reactTools from 'react-tools'

export function run() {
  const inp = JSON.parse(Host.inputString())
  let { view, props } = inp
  view = reactTools.transform(view, {}) + '; return App'
  view = (new Function('React', view))(React)
  Host.outputString(renderToString(React.createElement(view, props, null)))
}
