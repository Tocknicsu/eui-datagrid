import React, { FunctionComponent } from 'react'
import { Route, RouteProps } from 'react-router'
import { Switch } from 'react-router-dom'
import _ from 'lodash'

export interface Props {
  routes: Array<RouteProps>
  children?: ReturnType<FunctionComponent>
}

const Router: FunctionComponent<Props> = ({ routes, children }: Props) => (
  <Switch>
    {_.map(routes, (route, index) => (
      <Route key={index} {...route} />
    ))}
    {children}
  </Switch>
)

export default Router
