/* eslint-disable @typescript-eslint/no-explicit-any */
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Routers from 'js/routes'

import './style.css'

const root = document.createElement('div')
document.body.appendChild(root)

render(<Routers />, root)

if ((module as any).hot) {
  ;(module as any).hot.accept('./js/routes', () => {
    const NextRootRouter = require('./js/routes').default
    render(<NextRootRouter />, root)
  })
}
