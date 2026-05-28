# Robin Clinic Site — Agent Notes

## Project Overview

This is a static single-page brochure website for Robin Clinic at `robinclinic.co.uk`.

## Observability

Tier 0. This is a static GitHub Pages site with no runtime application server, database, or backend logging surface.

## Julie Registration

This project is registered with Julie (`~/julie`). Julie and all subagents (planner, coder, verify, explorer, etc.) have full permission to read, edit, and run commands within this project directory. See `opencode.json` for the exact permission set.

- **Cache:** `~/julie/agent-memory/projects/robinclinic-co-uk/project.json`
- **Context:** `~/julie/agent-memory/projects/robinclinic-co-uk/context.md`
- **Switch index:** `~/julie/agent-memory/project-index.json` -> `projects.robinclinic-co-uk`
- **Init commands:** `/robinclinic-co-uk-init`, `/rck-init`
- **Command files:** `/Users/charlesbannister/projects/robinclinic.co.uk/.opencode/commands/robinclinic-co-uk-init.md`, `/Users/charlesbannister/projects/robinclinic.co.uk/.opencode/commands/rck-init.md`
- **Plans:** `~/julie/agent-memory/plans/<plan_id>/`
- **Run artifacts:** `/Users/charlesbannister/projects/robinclinic.co.uk/.agent-runs/`

Agents should load the context file before working on this project.
