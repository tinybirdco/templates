# Tinybird Templates

Pre-built templates created by the Tinybird community

## Contributing

Fork this repo and create a PR which:

- Adds a folder with the template assets: header image, TEMPLATE.md
- Modifies `template.json` including these fields:

```
{
      "id": "<template-slug-id>",
      "title": "<card-title>",
      "description": "<card-description>",
      "repoUrl": "<url-to-your-github-repo>",
      "deployUrl": "<url-to-your-tinybird-folder-in-github-repo>",
      "demoUrl": "<url-to-public-demo>",
      "categories": ["category1", "category2"],
      "author": "<your-org-name>",
      "image": "<url-to-header-image>",
      "readme": "<url-to-TEMPLATE.md>"
}
```

Once the PR is approved and merged it'll show up in: https://www.tinybird.co/templates
