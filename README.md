# Graphql Query

A pure library to convert json objects into graphql queries

# Types

## Arguments

It refers to a representation of the parameters that can be passed to an object.

## Fields

It refers to a representation of the fields of an object, and can be presented in two
ways:

- *Object* and can be represented by mapping each field to its arguments and fields
- *Array* and can be represented by listing each filed and its arguments and fields

## Object Fields

A simpler solution so each name mapped to its value. But, fields must be mapped to
something. (empty fields or arguments are ignored btw)

Example:

```javascript
GraphqlQuery({
    field0: true,
    field1: {
        subfield0: true,
        subfield1: {
            // Sub Subfields
        },
        subfield2: [{/* Arguments */}, {
            // Sub Subfields
        }]
    },
    field2: [{/* Arguments */}, {
        subfield0: true,
        subfield1: {
            // Sub Subfields
        },
        subfield2: [{/* Arguments */}, {
            // Sub Subfields
        }]
    }]
})
```

## Array Fields

Another solution for shorter queries. Since you can pass the name of fields without
associating it to something. (empty fields and arguments are ignored here too)

Example:

```javascript
GraphqlQuery([
    'field0',
    ['field1', [
        'subfield0',
        ['subfield1', [
            // Sub subfields
        ]],
        ['subfield2', {/* Arguments */}, [
            // Sub subfields
        ]]
    ]],
    ['field2', {/* Arguments */}, [
        'subfield0',
        ['subfield1', [
            // Sub subfields
        ]],
        ['subfield2', {/* Arguments */}, [
            // Sub subfields
        ]]
    ]]
])
```

## Features

- The two styles are interchangeable, and one style can be nested in another
- Written in typescript
- Natively supports the browser

## Node install

You can install this via NPM with:

```bash
  npm install
```

## Browser Install

You can install it in the browser by adding this tag:

```html

<script src="https://unpkg.com/gql-query@0.0.1/build/index.js" type="module"></script>
```
