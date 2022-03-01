/**
 * Argument.
 */
export type GraphqlArgument = GraphqlArgument[] | GraphqlArguments | string | number

/**
 * Args container.
 */
export type GraphqlArguments = { [_: string]: GraphqlArgument }

/**
 * Fields container.
 */
export type GraphqlFields =
    { [_: string]: boolean | GraphqlFields | [GraphqlArguments, GraphqlFields] } |
    (string | [string, GraphqlFields] | [string, GraphqlArguments, GraphqlFields])[]

/**
 * Compose a new graphql argument from the given arg.
 */
export function formatGraphqlArgument(arg: GraphqlArgument): string {
    if (typeof arg === 'string') return `"${arg}"`
    if (typeof arg === 'number') return `${arg}`
    if (Array.isArray(arg)) return `[${arg.map(formatGraphqlArgument).join(',')}]`
    return `{${Object.entries(arg).map(([name, value]) =>
        `${name}:${formatGraphqlArgument(value)}`).join(' ')
    }}`
}

/**
 * Compose a new graphql query arguments from the given args object.
 */
export function formatGraphqlArguments(args: GraphqlArguments): string {
    // runtime type check
    if (typeof args !== 'object' || Array.isArray(args))
        throw `Invalid args: ${JSON.stringify(args)}`

    if (!Object.keys(args).length)
        // args: {}
        return ''

    // args: { [_: string]: string }
    return `(${Object.entries(args).map(([name, value]) =>
        `${name}:${formatGraphqlArgument(value)}`
    ).join(' ')})`
}

/**
 * Compose a new graphql query from the given fields.
 */
export function formatGraphqlQuery(fields: GraphqlFields): string {
    // runtime type check
    if (typeof fields !== 'object')
        throw `Invalid fields: ${JSON.stringify(fields)}`

    if (!Object.keys(fields).length)
        // fields: {} | []
        return ''

    if (Array.isArray(fields))
        // fields: (string | [string, Fields] | [string, Args, Fields])[]
        return `{${fields.map(item => {
            // runtime type check
            if (typeof item !== 'string' && !Array.isArray(item))
                throw `Invalid array-field item: ${JSON.stringify(item)}`

            if (typeof item === 'string')
                // item: string
                return item

            if (item.length == 3)
                // item: [string, Arguments, Fields]
                return `${item[0]}${formatGraphqlArguments(item[1])}${formatGraphqlQuery(item[2])}`

            // item: [string, Arguments]
            return `${item[0]}${formatGraphqlQuery(item[1])}`
        }).join(' ')}}`

    // fields: { [_: string]: boolean | Fields | [Args, Fields] }
    return `{${Object.entries(fields).map(([name, value]) => {
        // runtime type check
        if (typeof value !== 'boolean' && typeof value !== 'object')
            throw `Invalid object-field value: ${value}`

        if (typeof value === 'boolean')
            // name: string // value: boolean
            return value ? name : ''

        if (Array.isArray(value) && typeof value[0] === 'object' && !Array.isArray(value[0]))
            // name: string // value: [Arguments, Fields]
            // @ts-ignore
            return `${name}${formatGraphqlArguments(value[0])}${formatGraphqlQuery(value[1])}`

        // name: string // value: Fields
        // @ts-ignore
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
