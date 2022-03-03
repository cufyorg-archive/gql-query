/**
 * Argument.
 */
export type GraphqlArgument = GraphqlArgument[] | GraphqlArguments | string | number | null

/**
 * Field.
 */
export type GraphqlField = boolean | GraphqlFields | [GraphqlArguments, GraphqlFields]

/**
 * Args container.
 */
export type GraphqlArguments = Record<`$${string}`, any> | { [_: string]: GraphqlArgument }

/**
 * Fields container.
 */
export type GraphqlFields = Record<`$${string}`, any> | { [_: string]: GraphqlField }

/**
 * Compose a new graphql argument from the given arg.
 */
export function formatGraphqlArgument(argument: GraphqlArgument): string {
    if (!argument)
        // argument: null
        return 'null'
    if (typeof argument === 'string')
        // argument: string
        return `"${argument}"`
    if (typeof argument === 'number')
        // argument: number
        return `${argument}`
    if (Array.isArray(argument))
        // argument: GraphqlArgument[]
        return `[${argument.map(formatGraphqlArgument).join(' ')}]`
    // argument: GraphqlArguments
    return `{${Object.entries(argument).map(([name, value]) =>
        name.startsWith('$') ?
            // value: any
            `${name.substring(1)}:${value}` :
            // value: GraphqlArgument
            `${name}:${formatGraphqlArgument(value)}`
    ).join(' ')}}`
}

/**
 * Compose a new graphql query arguments from the given args object.
 */
export function formatGraphqlArguments(_arguments: GraphqlArguments): string {
    if (!Object.keys(_arguments).length) return ''
    return `(${Object.entries(_arguments).map(([name, value]) =>
        name.startsWith('$') ?
            // value: any
            `${name.substring(1)}:${value}` :
            // value: GraphqlArgument
            `${name}:${formatGraphqlArgument(value)}`
    ).join(' ')})`
}

/**
 * Compose a new graphql query from the given fields.
 */
export function formatGraphqlQuery(fields: GraphqlFields): string {
    if (!Object.keys(fields).length) return ''
    return `{${Object.entries(fields).map(([name, value]) => {
        if (name.startsWith('$'))
            // value: any
            return `${name}:${value}`
        if (typeof value === 'boolean')
            // value: boolean
            return value ? name : ''
        if (Array.isArray(value))
            // value: [GraphqlArguments, GraphqlFields]
            return `${name}${formatGraphqlArguments(value[0])}${formatGraphqlQuery(value[1])}`
        // value: GraphqlFields
        return `${name}${formatGraphqlQuery(value)}`
    }).join(' ')}}`
}

// browser compatibility
if (typeof window !== 'undefined') {
    // @ts-ignore
    window.fromatGraphqlArguments = formatGraphqlArguments
    // @ts-ignore
    window.formatGraphqlQuery = formatGraphqlQuery
}
