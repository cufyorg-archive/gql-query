/**
 * Args container.
 */
export type GraphqlArgs = { [_: string]: any }

/**
 * Fields container.
 */
export type GraphqlFields =
    { [_: string]: boolean | GraphqlFields | [GraphqlArgs, GraphqlFields] } |
    (string | [string, GraphqlFields] | [string, GraphqlArgs, GraphqlFields])[]

/**
 * Compose a new graphql query arguments from the given args object.
 */
export function GraphqlArguments(args: GraphqlArgs): string {
    // runtime type check
    if (typeof args !== 'object' || Array.isArray(args))
        throw `Invalid args: ${JSON.stringify(args)}`

    if (!Object.keys(args).length)
        // args: {}
        return ''

    // args: { [_: string]: string }
    return '(' +
        Object.entries(args).map(([name, value]) => {
            // name: string // value: any
            return `${name}:${JSON.stringify(value)}`
        }).join(' ') +
        ')'
}

/**
 * Compose a new graphql query from the given fields.
 */
export function GraphqlQuery(fields: GraphqlFields): string {
    // runtime type check
    if (typeof fields !== 'object')
        throw `Invalid fields: ${JSON.stringify(fields)}`

    if (!Object.keys(fields).length)
        // fields: {} | []
        return ''

    if (Array.isArray(fields))
        // fields: (string | [string, Fields] | [string, Args, Fields])[]
        return '{' +
            fields.map(item => {
                // runtime type check
                if (typeof item !== 'string' && !Array.isArray(item))
                    throw `Invalid array-field item: ${JSON.stringify(item)}`

                if (typeof item === 'string')
                    // item: string
                    return item

                if (item.length == 3)
                    // item: [string, Arguments, Fields]
                    return `${item[0]}${GraphqlArguments(item[1])}${GraphqlQuery(item[2])}`

                // item: [string, Arguments]
                return `${item[0]}${GraphqlQuery(item[1])}`
            }).join(' ') +
            '}'

    // fields: { [_: string]: boolean | Fields | [Args, Fields] }
    return '{' +
        Object.entries(fields).map(([name, value]) => {
            // runtime type check
            if (typeof value !== 'boolean' && typeof value !== 'object')
                throw `Invalid object-field value: ${value}`

            if (typeof value === 'boolean')
                // name: string // value: boolean
                return value ? name : ''

            if (Array.isArray(value) && typeof value[0] === 'object' && !Array.isArray(value[0]))
                // name: string // value: [Arguments, Fields]
                // @ts-ignore
                return `${name}${GraphqlArguments(value[0])}${GraphqlQuery(value[1])}`

            // name: string // value: Fields
            // @ts-ignore
            return `${name}${GraphqlQuery(value)}`
        }).join(' ') +
        '}'
}

// browser compatibility
if (typeof window !== 'undefined') {
    // @ts-ignore
    window.GraphqlArguments = GraphqlArguments
    // @ts-ignore
    window.GraphqlQuery = GraphqlQuery
}
