export default {
    boardArchiveParamDescriptions: {
        boardId: "Board unique identifiers. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>."
    },
    boardCreateParamDescriptions: {
        name: "The board's name",
        kind: "share | public | private",
        additionalFields: {
            templateId: "Optional board template ID"
        }
    },
    boardGetParamDescriptions: {
        boardId: "Board unique identifiers. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>."
    },
    boardGetAllParamDescriptions: {
        returnAll: "Whether to return all results or only up to a given limit",
        limit: "Max number of results to return"
    },
    boardColumnCreateParamDescriptions: {
        boardId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
        columnType: "checkbox | country | date | dropdown | email | hour | Link | longText | numbers | people | person | phone | rating | status | tags | team | text | timeline | timezone | week | worldClock",
        additionalFields: {
            defaults: "The new column's defaults"
        }
    },
    boardColumnGetAllParamDescriptions: {
        boardId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>"
    },
    boardGroupCreateParamDescriptions: {
        boardId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
        name: "The group name"
    },
    boardGroupDeleteParamDescriptions: {
        boardId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
        groupId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>"
    },
    boardGroupGetAllParamDescriptions: {
        boardId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>"
    },
    boardItemAddUpdateParamDescriptions: {
        itemId: "The unique identifier of the item to add update to",
        value: "The update text to add"
    },
    boardItemChangeColumnValueParamDescriptions: {
        boardId: "The unique identifier of the board. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
        itemId: "The unique identifier of the item to to change column of",
        columnId: "The column's unique identifier. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
        value: "The column value in JSON format. Documentation can be found <a href=\"https://monday.com/developers/v2#mutations-section-columns-change-column-value\">here</a>."
    },
    boardItemChangeMultipleColumnValuesParamDescriptions: {
        boardId: "The unique identifier of the board. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
        itemId: "Item's ID",
        columnValues: "The column fields and values in JSON format. Documentation can be found <a href=\"https://monday.com/developers/v2#mutations-section-columns-change-multiple-column-values\">here</a>."
    },
    boardItemCreateParamDescriptions: {
        boardId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
        groupId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
        name: "The new item's name",
        additionalFields: {
            columnValues: "The column values of the new item"
        }
    },
    boardItemDeleteParamDescriptions: {
        itemId: "Item's ID"
    },
    boardItemGetParamDescriptions: {
        itemId: "Item's ID (Multiple can be added separated by comma)"
    },
    boardItemGetAllParamDescriptions: {
        boardId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
        groupId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
        returnAll: "Whether to return all results or only up to a given limit",
        limit: "Max number of results to return"
    },
    boardItemGetByColumnValueParamDescriptions: {
        boardId: "The unique identifier of the board. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
        columnId: "The column's unique identifier. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
        columnValue: "The column value to search items by",
        returnAll: "Whether to return all results or only up to a given limit",
        limit: "Max number of results to return"
    },
    boardItemMoveParamDescriptions: {
        boardId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
        itemId: "The item's ID",
        groupId: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>"
    }
}