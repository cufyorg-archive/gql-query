/**
 * Argument.
 */
export declare type GraphqlArgument = GraphqlArgument[] | GraphqlArguments | string | number | null;
/**
 * Field.
 */
export declare type GraphqlField = boolean | GraphqlFields | [GraphqlArguments, GraphqlFields];
/**
 * Args container.
 */
export declare type GraphqlArguments = Record<`$${string}`, any> | {
    [_: string]: GraphqlArgument;
};
/**
 * Fields container.
 */
export declare type GraphqlFields = Record<`$${string}`, any> | {
    [_: string]: GraphqlField;
};
/**
 * Compose a new graphql argument from the given arg.
 */
export declare function formatGraphqlArgument(argument: GraphqlArgument): string;
/**
 * Compose a new graphql query arguments from the given args object.
 */
export declare function formatGraphqlArguments(_arguments: GraphqlArguments): string;
/**
 * Compose a new graphql query from the given fields.
 */
export declare function formatGraphqlQuery(fields: GraphqlFields): string;
