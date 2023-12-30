export interface RoutesInterface {
    to: string,
    path: string,
    Component: () => JSX.Element,
    name: string
}