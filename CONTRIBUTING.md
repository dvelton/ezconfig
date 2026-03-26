# Contributing to EZConfig

Want to add a deployment vehicle? Great. Here's how.

## Adding a Vehicle

1. Open `vehicles.json`
2. Find the right category (or suggest a new one)
3. Add your vehicle entry following this format:

```json
{
    "id": "your-vehicle-id",
    "name": "Your Vehicle Name",
    "description": "A plain-English description of what this is. Write it for someone who has never heard of it. No jargon without explanation.",
    "cost": "free",
    "costDetail": "Optional detail about pricing or limits",
    "complexity": "low",
    "bestFor": "What kinds of projects or goals this is best for",
    "platform": ["web"],
    "promptTemplate": null,
    "example": null,
    "tags": ["relevant", "tags"]
}
```

4. Optionally, add a prompt template in `prompts/your-vehicle-id.md`
5. Submit a pull request

## Field Reference

**cost**: `"free"`, `"free-tier"`, `"freemium"`, or `"paid"`

**complexity**: `"very-low"`, `"low"`, `"medium"`, or `"high"`

**platform**: Array of `"web"`, `"mac"`, `"windows"`, `"linux"`, `"ios"`, `"android"`, `"cross-platform"`

**promptTemplate**: The filename (without .md) of a prompt in the `prompts/` folder, or `null`

**example**: An object with `name`, `url`, `repo`, and `note` — or `null` if you don't have one

## Writing Descriptions

The audience is non-developers. Lawyers, teachers, doctors, coaches — people who build things with AI but don't have a CS background. Write like you're explaining it to a smart friend who doesn't know the terminology.

Bad: "Serverless edge-native runtime for V8 isolates"
Good: "Run JavaScript code on servers around the world, close to your users, without managing any infrastructure. Free tier is generous."

## Writing Prompt Templates

Prompt templates go in `prompts/your-vehicle-id.md`. They should:

1. Start with a title and one-line intro
2. Have a `---` separator
3. Then the actual prompt the user will copy-paste into their AI tool

The prompt should:
- Be written for non-developers
- Include specific steps (not just "deploy to X")
- Work with any AI tool (Copilot CLI, ChatGPT, Claude, Cursor, etc.)
- Include `[placeholders]` where the user needs to fill in their own details

## Questions?

Open an issue. We're friendly.
