# Tinybird Templates

Pre-built templates created by the Tinybird community

## Contributing

Fork this repo and create a PR which:

- Adds a folder with the template assets: header image (1431×973) and TEMPLATE.md
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
      "image": "<url-to-header-image-1431×973>",
      "readme": "<url-to-TEMPLATE.md>"
}
```
- `TEMPLATE.md` is rendered on your template page (https://tinybird.co/templates/template-slug-id), use simple markdown: headers, bullet points, links and code snippets.

Once the PR is approved and merged it'll show up in: https://www.tinybird.co/templates
