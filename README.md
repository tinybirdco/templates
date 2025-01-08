# Tinybird Templates

Pre-built templates created by the Tinybird community

## Contributing

Fork this repo and create a PR which:

- Adds a folder with the template assets: header image, TEMPLATE.md
- Modifies `template.json` including these fields:

```
{
      "id": "<unique-template-slug-id>",
      "title": "<template-card-title>",
      "description": "<template-card-description>",
      "repoUrl": "<absolute-url-to-your-github-repo>",
      "deployUrl": "<absolute-url-to-your-tinybird-folder-in-github-repo>",
      "demoUrl": "<absolute-url-to-public-demo>",
      "categories": ["category1", "category2"],
      "author": "<your-org-name>",
      "image": "<absolute-url-to-the-image>",
      "readme": "<absolute-url-to-TEMPLATE.md>"
}
```

Once the PR is approved and merged it'll show up in: https://www.tinybird.co/templates
