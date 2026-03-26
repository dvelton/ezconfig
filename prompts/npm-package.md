# Publish an NPM Package

Paste this into your AI tool when you want to distribute a command-line tool or JavaScript library.

---

I have a tool in this directory that I want to publish as an NPM package so anyone can install it by running `npm install -g my-tool-name` (or `npx my-tool-name`).

Here's what I need you to do:

1. Look at my project and figure out what it does
2. Make sure the package.json is set up correctly for publishing:
   - Good name (check if it's available on npmjs.com)
   - Version number
   - Description
   - bin entry if it's a CLI tool (so it works as a command)
   - Main/module entry if it's a library
3. Add a proper README that explains what the package does and how to use it
4. Walk me through creating an NPM account if I don't have one
5. Walk me through publishing: `npm login` and `npm publish`
6. Test that it works: install it globally and run it
7. Explain how to publish updates (version bumping, re-publishing)

If my tool has dependencies, make sure they're listed properly. If there are any files that shouldn't be published (test files, dev configs), set up an .npmignore or the "files" field in package.json.
