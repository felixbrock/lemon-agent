/*
Heavily borrowed from https://github.com/n8n-io/n8n.
*/

export default {
  blockAppendParamDescriptions: {
      blockId: "The Notion Block to append blocks to",
      blockUi: {
          blockValues: {
              type: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
              text: {
                  text: {
                      textType: "equation | mention | text",
                      text: "Text content. This field contains the actual content of your text and is probably the field you'll use most often.",
                      textLink: "The URL that this link points to",
                      mentionType: "database | date | page | user",
                      user: "The ID of the user being mentioned. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                      page: "The ID of the page being mentioned",
                      database: "The Notion Database being mentioned",
                      range: "Whether or not you want to define a date range",
                      date: "An ISO 8601 format date, with optional time",
                      dateStart: "An ISO 8601 format date, with optional time",
                      dateEnd: "An ISO 8601 formatted date, with optional time. Represents the end of a date range.",
                      annotationUi: {
                          bold: "Whether the text is bolded",
                          italic: "Whether the text is italicized",
                          strikethrough: "Whether the text is struck through",
                          underline: "Whether the text is underlined",
                          code: "Whether the text is code style",
                          color: "default | gray | brown | orange | yellow | green | blue | purple | pink | red | gray_background | brown_background | orange_background | yellow_background | green_background | blue_background | purple_background | pink_background | red_background"
                      }
                  }
              },
              checked: "Whether the to_do is checked or not",
              title: "Plain text of page title",
              url: "Image file reference"
          }
      }
  },
  blockGetAllParamDescriptions: {
      blockId: "The Notion Block to get all children from",
      returnAll: "Whether to return all results or only up to a given limit",
      limit: "Max number of results to return"
  },
  databaseGetParamDescriptions: {
      databaseId: "The Notion Database to get",
      simple: "Whether to return a simplified version of the response instead of the raw data"
  },
  databaseGetAllParamDescriptions: {
      returnAll: "Whether to return all results or only up to a given limit",
      limit: "Max number of results to return",
      simple: "Whether to return a simplified version of the response instead of the raw data"
  },
  databaseSearchParamDescriptions: {
      text: "The text to search for",
      returnAll: "Whether to return all results or only up to a given limit",
      limit: "Max number of results to return",
      simple: "Whether to return a simplified version of the response instead of the raw data",
      options: {
          sort: {
              sortValue: {
                  direction: "ascending | descending",
                  timestamp: "last_edited_time"
              }
          }
      }
  },
  databasePageCreateParamDescriptions: {
      databaseId: "The Notion Database to operate on",
      title: "Page title. Appears at the top of the page and can be found via Quick Find.",
      simple: "Whether to return a simplified version of the response instead of the raw data",
      propertiesUi: {
          propertyValues: {
              key: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
              text: {
                  text: {
                      textType: "equation | mention | text",
                      text: "Text content. This field contains the actual content of your text and is probably the field you'll use most often.",
                      textLink: "The URL that this link points to",
                      mentionType: "database | date | page | user",
                      user: "The ID of the user being mentioned. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                      page: "The ID of the page being mentioned",
                      database: "The Notion Database being mentioned",
                      range: "Whether or not you want to define a date range",
                      date: "An ISO 8601 format date, with optional time",
                      dateStart: "An ISO 8601 format date, with optional time",
                      dateEnd: "An ISO 8601 formatted date, with optional time. Represents the end of a date range.",
                      annotationUi: {
                          bold: "Whether the text is bolded",
                          italic: "Whether the text is italicized",
                          strikethrough: "Whether the text is struck through",
                          underline: "Whether the text is underlined",
                          code: "Whether the text is code style",
                          color: "default | gray | brown | orange | yellow | green | blue | purple | pink | red | gray_background | brown_background | orange_background | yellow_background | green_background | blue_background | purple_background | pink_background | red_background"
                      }
                  }
              },
              phoneValue: "Phone number. No structure is enforced.",
              multiSelectValue: "Name of the options you want to set. Multiples can be defined separated by comma. Choose from the list, or specify IDs using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              selectValue: "Name of the option you want to set. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              statusValue: "Name of the option you want to set. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              emailValue: "Email address",
              urlValue: "Web address",
              peopleValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify IDs using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              relationValue: "List of databases that belong to another database. Multiples can be defined separated by comma.",
              checkboxValue: "Whether or not the checkbox is checked. <code>true</code> represents checked. <code>false</code> represents unchecked.",
              numberValue: "Number value",
              range: "Whether or not you want to define a date range",
              includeTime: "Whether or not to include the time in the date",
              date: "An ISO 8601 format date, with optional time",
              dateStart: "An ISO 8601 format date, with optional time",
              dateEnd: "An ISO 8601 formatted date, with optional time. Represents the end of a date range.",
              timezone: "Time zone to use. By default n8n timezone is used. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              fileUrls: {
                  fileUrl: {
                      url: "Link to externally hosted file"
                  }
              }
          }
      },
      blockUi: {
          blockValues: {
              type: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
              text: {
                  text: {
                      textType: "equation | mention | text",
                      text: "Text content. This field contains the actual content of your text and is probably the field you'll use most often.",
                      textLink: "The URL that this link points to",
                      mentionType: "database | date | page | user",
                      user: "The ID of the user being mentioned. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                      page: "The ID of the page being mentioned",
                      database: "The Notion Database being mentioned",
                      range: "Whether or not you want to define a date range",
                      date: "An ISO 8601 format date, with optional time",
                      dateStart: "An ISO 8601 format date, with optional time",
                      dateEnd: "An ISO 8601 formatted date, with optional time. Represents the end of a date range.",
                      annotationUi: {
                          bold: "Whether the text is bolded",
                          italic: "Whether the text is italicized",
                          strikethrough: "Whether the text is struck through",
                          underline: "Whether the text is underlined",
                          code: "Whether the text is code style",
                          color: "default | gray | brown | orange | yellow | green | blue | purple | pink | red | gray_background | brown_background | orange_background | yellow_background | green_background | blue_background | purple_background | pink_background | red_background"
                      }
                  }
              },
              checked: "Whether the to_do is checked or not",
              title: "Plain text of page title",
              url: "Image file reference"
          }
      },
      options: {
          iconType: "emoji | file",
          icon: "Emoji or File URL to use as the icon"
      }
  },
  databasePageUpdateParamDescriptions: {
      pageId: "The Notion Database Page to update",
      simple: "Whether to return a simplified version of the response instead of the raw data",
      propertiesUi: {
          propertyValues: {
              key: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
              text: {
                  text: {
                      textType: "equation | mention | text",
                      text: "Text content. This field contains the actual content of your text and is probably the field you'll use most often.",
                      textLink: "The URL that this link points to",
                      mentionType: "database | date | page | user",
                      user: "The ID of the user being mentioned. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                      page: "The ID of the page being mentioned",
                      database: "The Notion Database being mentioned",
                      range: "Whether or not you want to define a date range",
                      date: "An ISO 8601 format date, with optional time",
                      dateStart: "An ISO 8601 format date, with optional time",
                      dateEnd: "An ISO 8601 formatted date, with optional time. Represents the end of a date range.",
                      annotationUi: {
                          bold: "Whether the text is bolded",
                          italic: "Whether the text is italicized",
                          strikethrough: "Whether the text is struck through",
                          underline: "Whether the text is underlined",
                          code: "Whether the text is code style",
                          color: "default | gray | brown | orange | yellow | green | blue | purple | pink | red | gray_background | brown_background | orange_background | yellow_background | green_background | blue_background | purple_background | pink_background | red_background"
                      }
                  }
              },
              phoneValue: "Phone number. No structure is enforced.",
              multiSelectValue: "Choose from the list, or specify IDs using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
              selectValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
              statusValue: "Name of the option you want to set. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              urlValue: "Web address",
              peopleValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify IDs using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              relationValue: "List of databases that belong to another database. Multiples can be defined separated by comma.",
              checkboxValue: "Whether or not the checkbox is checked. <code>true</code> represents checked. <code>false</code> represents unchecked.",
              numberValue: "Number value",
              range: "Whether or not you want to define a date range",
              includeTime: "Whether or not to include the time in the date",
              date: "An ISO 8601 format date, with optional time",
              dateStart: "An ISO 8601 format date, with optional time",
              dateEnd: "An ISO 8601 formatted date, with optional time. Represents the end of a date range.",
              timezone: "Time zone to use. By default n8n timezone is used. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              fileUrls: {
                  fileUrl: {
                      url: "Link to externally hosted file"
                  }
              }
          }
      }
  },
  databasePageGetParamDescriptions: {
      pageId: "The Notion Database Page to get",
      simple: "Whether to return a simplified version of the response instead of the raw data"
  },
  databasePageGetAllParamDescriptions: {
      databaseId: "The Notion Database to operate on",
      returnAll: "Whether to return all results or only up to a given limit",
      limit: "Max number of results to return",
      simple: "Whether to return a simplified version of the response instead of the raw data",
      filterType: "none | manual | json",
      matchType: "anyFilter | allFilters",
      filters: {
          conditions: {
              key: "The name of the property to filter by. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              condition: "equals | before | after | on_or_before | is_empty | is_not_empty | on_or_after | past_week | past_month | past_year | next_week | next_month | next_year",
              returnType: "text | checkbox | number | date",
              phoneNumberValue: "Phone number. No structure is enforced.",
              multiSelectValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
              selectValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
              statusValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
              peopleValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              createdByValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              lastEditedByValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
              checkboxValue: "Whether or not the checkbox is checked. <code>true</code> represents checked. <code>false</code> represents unchecked",
              numberValue: "Number value",
              date: "An ISO 8601 format date, with optional time",
              createdTimeValue: "An ISO 8601 format date, with optional time",
              lastEditedTime: "An ISO 8601 format date, with optional time",
              dateValue: "An ISO 8601 format date, with optional time"
          }
      },
      options: {
          downloadFiles: "Whether to download a file if a database's field contains it",
          filter: {
              singleCondition: {
                  key: "The name of the property to filter by. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                  condition: "equals | before | after | on_or_before | is_empty | is_not_empty | on_or_after | past_week | past_month | past_year | next_week | next_month | next_year",
                  returnType: "text | checkbox | number | date",
                  phoneNumberValue: "Phone number. No structure is enforced.",
                  multiSelectValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
                  selectValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
                  statusValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
                  peopleValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                  createdByValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                  lastEditedByValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                  checkboxValue: "Whether or not the checkbox is checked. <code>true</code> represents checked. <code>false</code> represents unchecked",
                  numberValue: "Number value",
                  date: "An ISO 8601 format date, with optional time",
                  createdTimeValue: "An ISO 8601 format date, with optional time",
                  lastEditedTime: "An ISO 8601 format date, with optional time",
                  dateValue: "An ISO 8601 format date, with optional time"
              },
              multipleCondition: {
                  condition: {
                      or: {
                          key: "The name of the property to filter by. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                          condition: "equals | before | after | on_or_before | is_empty | is_not_empty | on_or_after | past_week | past_month | past_year | next_week | next_month | next_year",
                          returnType: "text | checkbox | number | date",
                          phoneNumberValue: "Phone number. No structure is enforced.",
                          multiSelectValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
                          selectValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
                          statusValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
                          peopleValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                          createdByValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                          lastEditedByValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                          checkboxValue: "Whether or not the checkbox is checked. <code>true</code> represents checked. <code>false</code> represents unchecked",
                          numberValue: "Number value",
                          date: "An ISO 8601 format date, with optional time",
                          createdTimeValue: "An ISO 8601 format date, with optional time",
                          lastEditedTime: "An ISO 8601 format date, with optional time",
                          dateValue: "An ISO 8601 format date, with optional time"
                      },
                      and: {
                          key: "The name of the property to filter by. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                          condition: "equals | before | after | on_or_before | is_empty | is_not_empty | on_or_after | past_week | past_month | past_year | next_week | next_month | next_year",
                          returnType: "text | checkbox | number | date",
                          phoneNumberValue: "Phone number. No structure is enforced.",
                          multiSelectValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
                          selectValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
                          statusValue: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
                          peopleValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                          createdByValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                          lastEditedByValue: "List of users. Multiples can be defined separated by comma. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                          checkboxValue: "Whether or not the checkbox is checked. <code>true</code> represents checked. <code>false</code> represents unchecked",
                          numberValue: "Number value",
                          date: "An ISO 8601 format date, with optional time",
                          createdTimeValue: "An ISO 8601 format date, with optional time",
                          lastEditedTime: "An ISO 8601 format date, with optional time",
                          dateValue: "An ISO 8601 format date, with optional time"
                      }
                  }
              }
          },
          sort: {
              sortValue: {
                  timestamp: "Whether or not to use the record's timestamp to sort the response",
                  key: "created_time | last_edited_time",
                  direction: "ascending | descending"
              }
          }
      }
  },
  pageArchiveParamDescriptions: {
      pageId: "The Notion Page to archive",
      simple: "Whether to return a simplified version of the response instead of the raw data"
  },
  pageCreateParamDescriptions: {
      pageId: "The Notion Database Page to create a child page for",
      title: "Page title. Appears at the top of the page and can be found via Quick Find.",
      simple: "Whether to return a simplified version of the response instead of the raw data",
      blockUi: {
          blockValues: {
              type: "Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>",
              text: {
                  text: {
                      textType: "equation | mention | text",
                      text: "Text content. This field contains the actual content of your text and is probably the field you'll use most often.",
                      textLink: "The URL that this link points to",
                      mentionType: "database | date | page | user",
                      user: "The ID of the user being mentioned. Choose from the list, or specify an ID using an <a href=\"https://docs.n8n.io/code-examples/expressions/\">expression</a>.",
                      page: "The ID of the page being mentioned",
                      database: "The Notion Database being mentioned",
                      range: "Whether or not you want to define a date range",
                      date: "An ISO 8601 format date, with optional time",
                      dateStart: "An ISO 8601 format date, with optional time",
                      dateEnd: "An ISO 8601 formatted date, with optional time. Represents the end of a date range.",
                      annotationUi: {
                          bold: "Whether the text is bolded",
                          italic: "Whether the text is italicized",
                          strikethrough: "Whether the text is struck through",
                          underline: "Whether the text is underlined",
                          code: "Whether the text is code style",
                          color: "default | gray | brown | orange | yellow | green | blue | purple | pink | red | gray_background | brown_background | orange_background | yellow_background | green_background | blue_background | purple_background | pink_background | red_background"
                      }
                  }
              },
              checked: "Whether the to_do is checked or not",
              title: "Plain text of page title",
              url: "Image file reference"
          }
      },
      options: {
          iconType: "emoji | file",
          icon: "Emoji or File URL to use as the icon"
      }
  },
  pageGetParamDescriptions: {
      pageId: "The Page URL from Notion's 'copy link' functionality (or just the ID contained within the URL)",
      simple: "Whether to return a simplified version of the response instead of the raw data"
  },
  pageSearchParamDescriptions: {
      text: "The text to search for",
      returnAll: "Whether to return all results or only up to a given limit",
      limit: "Max number of results to return",
      simple: "Whether to return a simplified version of the response instead of the raw data",
      options: {
          filter: {
              filters: {
                  property: "object",
                  value: "database | page"
              }
          },
          sort: {
              sortValue: {
                  direction: "ascending | descending",
                  timestamp: "last_edited_time"
              }
          }
      }
  },
  userGetParamDescriptions: {},
  userGetAllParamDescriptions: {
      returnAll: "Whether to return all results or only up to a given limit",
      limit: "Max number of results to return"
  }
}
