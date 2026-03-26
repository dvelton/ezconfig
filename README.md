# EZConfig

You built something with AI. Now what?

EZConfig is a catalog of deployment vehicles for vibe coders — people who build tools with AI but don't have a background in software engineering. It answers the question that comes after "it works on my laptop": **how do I get this to other people?**

120+ vehicles. 12 categories. Plain English. Each one comes with a copy-paste prompt you can drop into whatever AI tool you're already using.

**[Browse the catalog →](https://dvelton.github.io/ezconfig/)**

## The Problem

Production costs have dropped to near zero. Domain experts — lawyers, doctors, teachers, coaches — can now build working tools with AI. But there's a gap between "I built a thing" and "other people can use it." The configuration and deployment layer is the biggest hurdle, and most people don't even know what options exist.

Every vehicle I discovered came from a coworker who happened to mention it. "Just deploy to GitHub Pages." "Try a Neon database with Vercel." "You know you can make that a menubar app, right?" Each time, a door I didn't know existed opened up.

Not everyone has that coworker. EZConfig is the coworker.

## What's In Here

The catalog is organized by what you're trying to accomplish, not by technology name:

- **I built a website and want to share it** — GitHub Pages, Netlify, Vercel, Surge, and more
- **I need a real backend / database** — Vercel + Neon, Supabase, Railway, PocketBase, Firebase
- **I want a desktop app** — Electron, Tauri, macOS menubar apps, Automator apps
- **I want it on my phone** — PWAs, Expo, Capacitor, iOS Shortcuts, Scriptable
- **I want to automate something** — GitHub Actions, cron jobs, Zapier, Make, LaunchAgents
- **I want to extend my browser** — Chrome extensions, bookmarklets, userscripts, side panels
- **I want to extend a tool I already use** — MCP servers, Raycast, Alfred, Obsidian plugins, Stream Deck
- **I want a tool inside the apps I use for work** — Word/Excel/Outlook add-ins, Teams apps, Google Workspace add-ons, Power Automate, Salesforce, Jira
- **I want to communicate through a bot** — Slack, Teams, Discord, Telegram, WhatsApp, email, SMS
- **I want to distribute a CLI tool** — NPM, PyPI, Homebrew, GitHub Releases
- **I want to share data or content** — RSS feeds, GitHub dashboards, Datasette, Observable
- **I want something weird / creative / delightful** — URL-encoded apps, QR code tools, screensavers, Apple Watch, voice assistants, Figma plugins

Each vehicle includes a plain-English description, cost (most are free), complexity rating, and a generic prompt template you can paste into any AI tool to get started.

## How It Works

1. Visit the site
2. Take the 3-question "Find Your Vehicle" quiz — or browse the full catalog
3. Pick a vehicle
4. Copy the prompt template
5. Paste it into your AI tool (Copilot CLI, ChatGPT, Claude, Cursor, whatever you use)
6. Follow along as it walks you through deployment

## Contributing

Want to add a vehicle? See [CONTRIBUTING.md](CONTRIBUTING.md). The short version: edit `vehicles.json`, optionally add a prompt template, submit a PR.

## License

MIT
