# Build an MCP Server

Paste this into your AI tool when you want to make your data or tools available to AI agents.

---

I want to build an MCP (Model Context Protocol) server so that AI tools like GitHub Copilot CLI, Claude, or other AI agents can access my data or use my custom tools during conversations.

Here's what I want to expose to AI agents:

[Describe what you want — for example: "my company's product catalog so AI can answer questions about our products", "a tool that searches our internal documentation", "access to a database of legal precedents", "a tool that checks the status of support tickets"]

Here's what I need you to do:

1. Explain what an MCP server actually does in plain English (it's like giving AI tools a new set of abilities)
2. Create an MCP server project using the official SDK
3. Define the tools or resources I want to expose — each one should have:
   - A clear name and description (so the AI knows when to use it)
   - Input parameters (what info the AI needs to provide)
   - Logic that does the actual work (API calls, database queries, file reads, etc.)
4. Set up local testing — walk me through running it and connecting it to my AI tool
5. If I want others to use it, explain distribution options:
   - NPM package
   - Docker image
   - Direct installation instructions

Keep it practical. I want something that works, not something architecturally perfect.
