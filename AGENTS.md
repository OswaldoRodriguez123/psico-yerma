# AGENTS.md

## Project Context

This is a professional website for a psychologist.

The project has two purposes:

1. Provide a useful, professional website for the psychologist.
2. Serve as a real-world learning project for the developer.

The developer wants to progressively learn modern full-stack development through this project.

The developer already has professional experience with:

* TypeScript
* Vue
* React

Do not explain basic programming concepts unless explicitly requested.

The main learning goals are:

* React
* Next.js
* Full-stack TypeScript
* API design
* PostgreSQL
* Modern web architecture
* Cloud deployment

The project should remain small, understandable, maintainable, and easy to evolve.

Do not over-engineer the application.

---

## Development Philosophy

This project is intentionally incremental.

Do NOT attempt to build the entire application at once.

Features should be implemented progressively as real requirements appear.

For each feature:

1. Inspect the relevant existing code.
2. Briefly explain the intended approach.
3. Make the smallest reasonable change.
4. Run appropriate checks.
5. Explain important decisions and concepts introduced.
6. Show what changed.
7. Wait for the next task.

The developer wants to understand the code rather than simply having an AI generate everything.

The agent should therefore:

* Explain important architectural decisions.
* Explain relevant Next.js concepts when they are introduced.
* Explain important tradeoffs.
* Prefer simple solutions.
* Avoid unnecessary abstractions.
* Avoid unnecessary dependencies.
* Avoid unrelated changes.

Do not blindly implement large amounts of code.

If there are multiple reasonable approaches, explain the tradeoffs and recommend one rather than silently choosing.

Never rewrite or restructure unrelated parts of the project without a concrete reason.

When an implementation introduces an important framework concept, briefly explain that concept after implementing it.

Do not provide lengthy explanations of basic JavaScript, TypeScript, Git, or programming concepts unless explicitly requested.

---

## Stack

The initial stack should be:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Next.js Route Handlers
* Supabase PostgreSQL
* Zod
* Git
* GitHub

Prefer native Next.js functionality over introducing additional frameworks or services.

The application should initially be a simple monolithic Next.js application.

Do NOT introduce:

* Express
* NestJS
* A separate backend repository
* Microservices
* Docker
* Kubernetes
* Redis
* A separate API server

unless there is a concrete requirement that justifies doing so.

---

## Architecture

Initial architecture:

```text
Next.js
├── React frontend
├── TypeScript
├── Tailwind CSS
│
├── Route Handlers
│   └── API endpoints
│
└── Supabase
    └── PostgreSQL
```

The frontend and backend should initially live in the same Next.js project.

Use Next.js Route Handlers for server-side API endpoints.

Use Supabase PostgreSQL for persistent data.

Use Zod for server-side request validation.

Keep the architecture straightforward and easy to understand.

Do not introduce architectural patterns simply because they are considered "best practice" in large applications.

The architecture should match the actual size and requirements of the project.

---

# V1 Scope

The first version should remain intentionally small.

The website should contain:

* Home
* About
* Services
* FAQ
* Contact

The site should be:

* Responsive
* Accessible
* Professional
* Fast
* SEO-friendly
* Simple
* Trustworthy

Avoid unnecessary animations, visual complexity, and UI features that do not provide meaningful value.

---

## Contact Form

The Contact page must contain a real working form.

The form should submit to:

```text
POST /api/contact
```

The API should:

1. Receive the request.
2. Validate the input with Zod.
3. Reject invalid requests.
4. Store the contact in PostgreSQL.
5. Return an appropriate HTTP response.

Initial fields:

```text
id
name
email
phone
reason
message
created_at
status
```

`phone` should be optional.

`status` can initially represent a simple state such as:

```text
new
contacted
closed
```

Do not introduce a complex CRM system in V1.

---

## Privacy and Sensitive Information

This is a psychologist's website.

Do NOT collect or store:

* Clinical histories
* Diagnoses
* Medical records
* Detailed descriptions of mental-health conditions
* Therapy session notes
* Other unnecessary sensitive health information

The contact form should request only the minimum information required to respond to an inquiry.

Use terminology such as:

* contacts
* inquiries
* leads

Do NOT use "patients" as the database entity for website inquiries.

The website should clearly avoid encouraging users to submit sensitive clinical information through the public contact form.

---

# API Design

Keep API design simple.

Initial endpoint:

```text
POST /api/contact
```

Future endpoints may be added only when there is a real requirement.

API handlers should:

* Validate input on the server.
* Return meaningful HTTP status codes.
* Avoid exposing internal errors.
* Avoid leaking secrets.
* Keep database access server-side.
* Use environment variables for credentials.

Do not create a generalized API framework or abstraction layer unless the project actually needs one.

---

# Database

Use Supabase PostgreSQL.

The initial database should contain only what V1 needs.

Initial table:

```text
contacts
```

Suggested structure:

```text
id
name
email
phone
reason
message
created_at
status
```

Avoid adding speculative tables for future features.

Do not create a large schema before there are real requirements.

---

# Security

Security should be considered from the beginning without over-engineering.

Requirements:

* Never commit secrets.
* Use environment variables for credentials.
* Never expose server-side secrets to the client.
* Validate all API input on the server.
* Do not rely only on client-side validation.
* Do not trust user-provided data.
* Avoid unnecessary collection of personal information.
* Handle database errors safely.
* Do not expose stack traces or internal implementation details to users.

Before production, consider:

* Rate limiting
* Spam protection
* CAPTCHA or equivalent protection if necessary
* Appropriate database access policies
* Abuse prevention

Do not add complex security infrastructure to V1 unless there is an actual need.

---

# SEO

The site should have a solid SEO foundation from V1.

Consider:

* Appropriate page titles
* Meta descriptions
* Semantic HTML
* Proper heading hierarchy
* Descriptive URLs
* Open Graph metadata where appropriate
* Sitemap
* Robots configuration
* Appropriate structured metadata when useful

Do not add SEO complexity without understanding its purpose.

---

# UX and Design

The visual direction should be:

* Professional
* Calm
* Trustworthy
* Modern
* Accessible
* Clean

The website should prioritize:

1. Clear information
2. Easy navigation
3. Mobile responsiveness
4. Fast loading
5. Accessibility
6. Clear contact/CTA paths

Avoid:

* Excessive animations
* Unnecessary gradients
* Overly complicated layouts
* UI elements that do not serve a purpose
* Design trends that compromise usability

The design should fit a professional psychology practice rather than looking like a generic developer portfolio.

---

# Deployment

The project should initially use free or very low-cost infrastructure.

Preferred architecture:

```text
GitHub
   ↓
Next.js
   ↓
Cloudflare
   ↓
Supabase PostgreSQL
```

Do not introduce paid services without first explaining:

1. Why the service is needed.
2. What free alternatives exist.
3. What limitations the free alternatives have.
4. Whether the project actually needs the paid service yet.

The goal is to keep V1 essentially free while maintaining a reasonable path to scale.

---

# Future Development

Future functionality may include:

## V2

* Admin dashboard
* Authentication
* Contact/lead management
* Email notifications

## V3

* Appointment requests
* Calendar integration
* Availability management
* Automated email communication

## V4

* Blog
* CMS
* Analytics
* Additional integrations
* AI-assisted functionality

These features are NOT part of V1.

Do not implement future functionality simply because it is mentioned here.

Only implement it when there is an actual requirement.

---

# Learning Goals

The project should progressively expose the developer to concepts relevant to modern full-stack TypeScript development.

Potential learning areas include:

### Frontend

* React components
* Server and client components
* Props
* State
* Forms
* Server actions when appropriate
* Data fetching
* Loading and error states

### Next.js

* App Router
* Routing
* Layouts
* Metadata
* Route Handlers
* Server Components
* Client Components
* Rendering strategies

### Backend

* REST-style API design
* Request validation
* Error handling
* Authentication when eventually needed
* Database access
* Environment variables

### Database

* PostgreSQL
* Tables
* Relationships
* Indexes
* Constraints
* Migrations
* Row Level Security where appropriate

### Deployment

* GitHub
* CI/CD concepts
* Environment configuration
* Cloud deployment
* Domains
* Production debugging

Do not attempt to teach all of these concepts at once.

Introduce them naturally as the project requires them.

---

# Agent Behavior

The agent should behave as a development partner, not as an autonomous developer attempting to finish the entire project.

Before significant changes:

1. Inspect the relevant files.
2. Understand the existing implementation.
3. State briefly what will change.
4. Explain any important architectural decision.
5. Implement the smallest useful change.

After changes:

1. Run linting.
2. Run TypeScript checks.
3. Run tests if tests exist.
4. Verify the application builds when appropriate.
5. Report any warnings or limitations.

Do not claim that something works without verifying it when verification is possible.

If a command fails:

* Inspect the error.
* Determine the likely cause.
* Fix the underlying issue when appropriate.
* Re-run the relevant check.

Do not hide errors by suppressing them.

---

# Dependency Management

Do not install packages unless they provide clear value.

Before adding a dependency:

1. Determine whether the functionality can reasonably be implemented using the existing stack.
2. If a dependency is necessary, explain why.
3. Prefer well-maintained, widely used packages.
4. Avoid adding multiple packages that solve essentially the same problem.

Do not add libraries merely because they are popular.

---

# Code Quality

Prefer:

* Clear names
* Small components
* Small functions
* Simple control flow
* Strong TypeScript types
* Explicit data structures
* Reusable code only when reuse is real
* Consistent formatting
* Accessible HTML

Avoid:

* Premature abstractions
* Giant components
* Giant utility files
* Generic wrappers without a real purpose
* `any` unless there is a justified reason
* Dead code
* Commenting obvious code excessively

Code should be understandable by a developer who did not write it.

---

# Git

Use small, meaningful commits.

Prefer conventional commit prefixes:

```text
feat:
fix:
refactor:
docs:
chore:
test:
```

Examples:

```text
feat: add contact form
feat: add contact API endpoint
feat: connect contact form to Supabase
fix: handle invalid contact submissions
docs: explain local environment setup
```

Do not make huge commits containing unrelated changes.

Before making significant changes, check Git status.

Do not discard or overwrite existing user work without understanding it first.

---

# Existing Project Safety

Before modifying the project, inspect:

* Repository structure
* `package.json`
* Installed dependencies
* Next.js version
* TypeScript configuration
* Tailwind configuration
* Environment files
* Git status
* Existing source code

Do not assume the repository is empty.

Do not overwrite existing work.

Do not reset Git history.

Do not remove dependencies or files without understanding their purpose.

---

# Environment Variables

Use environment variables for configuration and secrets.

Never hard-code:

* Database credentials
* API keys
* Authentication secrets
* Private tokens
* Service-role keys

Never commit `.env` files containing secrets.

When introducing a new environment variable:

1. Explain what it is used for.
2. Add an appropriate example to `.env.example` when useful.
3. Ensure the real secret remains local.

---

# Error Handling

Errors should be handled intentionally.

For user-facing errors:

* Provide a useful message.
* Do not expose implementation details.
* Do not expose database errors directly.

For development:

* Preserve useful logs.
* Make debugging information available where appropriate.
* Do not silently swallow exceptions.

---

# Testing

V1 does not need an enormous test suite.

Prioritize meaningful tests for important behavior, especially:

* API validation
* Contact submission
* Error handling
* Important business logic

Do not create tests solely to increase test count.

When adding tests, explain what behavior they protect.

---

# First Task

Before implementing website features:

1. Inspect the repository and development environment.
2. Determine whether the project is already initialized.
3. Inspect the existing package configuration.
4. Propose the initial project structure.
5. Initialize or configure the base Next.js project if necessary.
6. Install only dependencies actually required for V1.
7. Configure TypeScript and Tailwind.
8. Configure Git if necessary.
9. Run linting and TypeScript checks.
10. Verify that the application starts successfully.

Do NOT implement the complete website yet.

After completing the initial setup, stop and report:

* What was created
* What dependencies were installed
* The current project structure
* How to run the project locally
* Any decisions that were made
* Any issues encountered

Then wait for the next instruction.

---

# General Rule

When uncertain, prefer:

```text
simple
→ understandable
→ maintainable
→ scalable when necessary
```

rather than:

```text
complex
→ abstract
→ over-engineered
→ scalable for hypothetical requirements
```

Build for the requirements that actually exist today while keeping the architecture clean enough to evolve tomorrow.
