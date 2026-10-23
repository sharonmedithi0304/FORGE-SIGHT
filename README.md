 <div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=260&text=FORGESIGHT&fontSize=64&fontColor=EAFBFF&fontAlignY=38&desc=INDUSTRIAL%20INTELLIGENCE%20%2F%20QUALITY%20INVESTIGATION&descSize=14&descAlignY=58&animation=fadeIn&color=0:080D12,45:12242C,75:087E8B,100:17242B" width="100%" alt="ForgeSight — Industrial Intelligence and Quality Investigation" />

<br/>

<img src="https://img.shields.io/badge/INDUSTRIAL-INTELLIGENCE-00D9F5?style=for-the-badge&labelColor=101820" alt="Industrial Intelligence" />
<img src="https://img.shields.io/badge/QUALITY-INVESTIGATION-F5A623?style=for-the-badge&labelColor=101820" alt="Quality Investigation" />
<img src="https://img.shields.io/badge/SOFTWARE-ONLY-C9D1D9?style=for-the-badge&labelColor=101820" alt="Software Only" />

### From quality signals to defensible decisions.

**ForgeSight is a software-only industrial decision-support system for investigating quality issues across defect patterns, process context, operational bottlenecks, and economic impact.**

[Explore the Code](#-inside-the-system) · [Get Started](#-get-started) · [Project Structure](#-project-structure)

</div>

---

## `01` — The problem

A defect is a signal. Understanding why it happened is the harder part.

Quality data, process information, bottleneck indicators, and financial consequences can tell different parts of the same story. When those pieces are disconnected, investigating a problem becomes slower and decision-making becomes harder to justify.

**ForgeSight brings these perspectives into one investigation workflow.**

- **Connect the evidence** — examine quality signals alongside relevant process context.
- **Investigate patterns** — explore defect trends and potential areas of concern.
- **Understand operational impact** — examine bottlenecks and process performance.
- **Quantify consequences** — connect quality issues to their potential economic impact.

The objective is not to replace engineering judgement. It is to give that judgement a clearer, more structured starting point.

## `02` — Inside the system

<div align="center">

<table>
<tr>
<td width="50%" valign="top">

### ◈ Quality intelligence

Explore defect patterns and quality signals to identify where investigation may be needed.

<img src="https://img.shields.io/badge/MODULE-01-00D9F5?style=flat-square&labelColor=101820" alt="Module 01" />

</td>
<td width="50%" valign="top">

### ◈ Investigation workspace

Bring relevant evidence and process context together to support structured root-cause investigation.

<img src="https://img.shields.io/badge/MODULE-02-7C9CFF?style=flat-square&labelColor=101820" alt="Module 02" />

</td>
</tr>
<tr>
<td width="50%" valign="top">

### ◈ Process intelligence

Examine process conditions and operational bottlenecks that may help explain observed quality issues.

<img src="https://img.shields.io/badge/MODULE-03-F5A623?style=flat-square&labelColor=101820" alt="Module 03" />

</td>
<td width="50%" valign="top">

### ◈ Economic impact

Assess the potential business consequences of quality issues through an economic-impact perspective.

<img src="https://img.shields.io/badge/MODULE-04-FF6B8A?style=flat-square&labelColor=101820" alt="Module 04" />

</td>
</tr>
</table>

</div>

## `03` — The investigation loop

<div align="center">

<img src="https://img.shields.io/badge/01-OBSERVE-00D9F5?style=for-the-badge&labelColor=101820" alt="Observe" />
&nbsp; → &nbsp;
<img src="https://img.shields.io/badge/02-INVESTIGATE-7C9CFF?style=for-the-badge&labelColor=101820" alt="Investigate" />
&nbsp; → &nbsp;
<img src="https://img.shields.io/badge/03-CONTEXTUALIZE-F5A623?style=for-the-badge&labelColor=101820" alt="Contextualize" />
&nbsp; → &nbsp;
<img src="https://img.shields.io/badge/04-ASSESS-FF6B8A?style=for-the-badge&labelColor=101820" alt="Assess" />

</div>

1. **Observe** — identify a quality signal or pattern that warrants attention.
2. **Investigate** — examine the available evidence and relevant relationships.
3. **Contextualize** — consider process conditions and operational constraints.
4. **Assess** — evaluate potential economic implications and determine what needs further validation.

This is a decision-support workflow, not an automatic proof of causation. A pattern can suggest a hypothesis; the available evidence must support any conclusion.

## `04` — Engineering principles

| Principle | How ForgeSight approaches it |
|---|---|
| **Evidence first** | Keep investigation grounded in available signals and supporting context. |
| **Traceable reasoning** | Distinguish observed information from interpretations and hypotheses. |
| **Operational relevance** | Connect quality analysis with process constraints and business impact. |
| **Human judgement** | Support investigation rather than presenting every inference as fact. |
| **Software-only scope** | Focus on analysis and decision support, not direct control of industrial machinery. |

## `05` — Technology

<div align="center">

<img src="https://skillicons.dev/icons?i=typescript,react,vite,css,git,github&theme=dark" alt="TypeScript, React, Vite, CSS, Git, and GitHub" />

</div>

The repository includes a TypeScript frontend, a dedicated application stylesheet, and separate areas for investigation, quality, process, and economic-impact workflows.

> **Note:** This technology overview reflects the identified frontend structure. Add backend, database, or analytics technologies only after confirming them in the repository.

## `06` — Project structure

The frontend is the main application entry point.

```text
FORGE-SIGHT/
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── App.css
    │   ├── components/
    │   └── pages/
    └── package.json
```

The layout above is intentionally simplified. Consult the repository for the complete and current file structure.

## `07` — Get started

### Prerequisites

- Node.js and npm
- Git

### Run locally

```bash
git clone https://github.com/sharonmedithi0304/FORGE-SIGHT.git
cd FORGE-SIGHT/frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

For production builds, use the scripts defined in `frontend/package.json`:

```bash
npm run build
```

If the project requires environment variables or additional services, configure those according to the repository's implementation before running it.

## `08` — Current scope

ForgeSight is designed as a **software-only investigation and decision-support experience**.

- It is not a camera-based inspection system.
- It does not directly control PLCs, robots, or factory machinery.
- Root-cause candidates should be treated as hypotheses unless supported by validated evidence.
- Economic-impact outputs should be interpreted in the context of their underlying assumptions and input data.

Observed evidence, estimated values, predicted outcomes, and simulated scenarios should remain clearly distinguishable wherever applicable.

## `09` — Road ahead

The next stage of a project like ForgeSight is to strengthen the link between evidence and decisions:

- Make the path from an observed signal to an investigation hypothesis easier to follow.
- Improve traceability between quality patterns, process context, and economic assumptions.
- Validate calculations and analytical outputs against representative datasets.
- Add clear explanations of confidence, limitations, and data provenance.
- Document reproducible setup and testing procedures.

These are development directions, not claims that every capability is already implemented.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:101820,50:087E8B,100:101820&height=3" width="100%" alt="" />

### SEE THE SIGNAL. FOLLOW THE EVIDENCE. UNDERSTAND THE IMPACT.

**ForgeSight** · Industrial Intelligence · Software-Only Decision Support

[Repository](https://github.com/sharonmedithi0304/FORGE-SIGHT) · [Developer Portfolio](https://sharonmedithi0304.github.io/-sharon-portfolio/)

</div>
