# `@shoprag/rag-dir`

**@shoprag/rag-dir** is a RAG plugin for the [ShopRAG](https://github.com/shoprag/core) ecosystem. It enables you to store normalized data fetched by ShopRAG's Shops as plain text (`.txt`) files in a specified local directory. This plugin is perfect for users seeking a straightforward, file-based storage solution for their ShopRAG projects.

## Installation

The `@shoprag/rag-dir` plugin is automatically installed by ShopRAG when you run the `shoprag` command, provided it’s specified in your `shoprag.json` and not already installed. Alternatively, you can install it manually using npm:

```bash
npm install -g @shoprag/rag-dir
```

Manual installation ensures the plugin is available globally, but ShopRAG’s automatic installation should suffice for most use cases.

## Usage

To integrate `@shoprag/rag-dir` into your ShopRAG project, add it to the `RAGs` array in your `shoprag.json` configuration file.

### Configuration

Add the following to your `shoprag.json`:

```json
{
  "RAGs": [
    {
      "to": "dir",
      "config": {
        "outputDir": "./data"
      }
    }
  ]
}
```

- **`to`**: Set this to `"dir"` to specify the `@shoprag/rag-dir` plugin.
- **`config.outputDir`**: Defines the local directory where `.txt` files will be stored. The path is relative to the current working directory.

### Example

Here’s a complete `shoprag.json` example that pairs a Shop with the `@shoprag/rag-dir` RAG:

```json
{
  "Project_Name": "MyProject",
  "ShopRAG": "1.0",
  "Shops": [
    {
      "from": "github-repo",
      "config": {
        "repoUrl": "https://github.com/user/repo",
        "branch": "main"
      }
    }
  ],
  "RAGs": [
    {
      "to": "dir",
      "config": {
        "outputDir": "./data"
      }
    }
  ]
}
```

Running `shoprag` with this configuration will fetch data from the specified GitHub repository and save it as `.txt` files in the `./data` directory.

## Features

- **Local Directory Storage**: Saves data to a user-defined local directory.
- **File Naming**: Generates safe file names using sanitized `fileId`s, preventing directory traversal and maintaining a flat structure.
- **Operations Supported**: Manages file addition, updates, and deletion as directed by ShopRAG.
- **No Credentials Required**: Operates directly on the local file system, eliminating the need for authentication.

## Testing

To verify the plugin works as expected:

1. Set up a new or existing ShopRAG project.
2. Configure the `@shoprag/rag-dir` RAG in your `shoprag.json` (see the [Usage](#usage) section).
3. Add at least one Shop to fetch data (e.g., from a GitHub repository).
4. Execute the `shoprag` command.
5. Inspect the `outputDir` specified in your configuration for `.txt` files containing the fetched data.

For instance, if your Shop retrieves files from a GitHub repository, each file will appear as a separate `.txt` file in the output directory.

## Contributing

Found a bug or have an idea to improve the plugin? Please open an issue on the [GitHub repository](https://github.com/shoprag/rag-dir). We welcome contributions via pull requests—feel free to submit enhancements or fixes!

## License

This project is licensed under the MIT License.
