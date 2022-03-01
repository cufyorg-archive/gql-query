/**
 * Argument.
 */
export declare type GraphqlArgument = GraphqlArgument[] | GraphqlArguments | string | number;
/**
 * Args container.
 */
export declare type GraphqlArguments = {
    [_: string]: GraphqlArgument;
};
/**
 * Fields container.
 */
export declare type GraphqlFields = {
    [_: string]: boolean | GraphqlFields | [GraphqlArguments, GraphqlFields];
} | (string | [string, GraphqlFields] | [string, GraphqlArguments, GraphqlFields])[];
/**
 * Compose a new graphql argument from the given arg.
 */
export declare function formatGraphqlArgument(arg: GraphqlArgument): string;
/**
 * Compose a new graphql query arguments from the given args object.
 */
export declare function formatGraphqlArguments(args: GraphqlArguments): string;
/**
 * Compose a new graphql query from the given fields.
 */
export declare function formatGraphqlQuery(fields: GraphqlFields): string;
