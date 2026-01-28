---
title: Intelligent Reporting System
date: "2025-10-01"
description: Architected a multi-agent EDA system to automate analysis and reporting using Python, LangChain, and Azure AI.
image: "/images/intelligent-reporting.png"
tags: ["Python", "LangChain", "Azure AI", "Docker", "Polars"]
demoUrl: ""
repoUrl: "https://github.com/boubker98/intelligent-reporting"
---

## Project Overview

Architected a multi-agent Exploratory Data Analysis (EDA) system using the Factory pattern to automate metadata extraction, analysis planning, and insight generation from tabular datasets. This system leverages a team of specialized agents to perform end-to-end data analysis autonomously.

## Key Features

*   **Multi-Agent Architecture**: Orchestrated 4 specialized agents (Metadata, Planner, Analyst, Reviewer) using LangGraph to handle complex analytical tasks.
*   **Hybrid Inference**: Built a pipeline with Azure AI Foundry for cloud-based reasoning and local GGUF quantized models (LlamaCPP) for cost-effective, offline-capable inference with automatic fallback.
*   **Sandboxed Execution**: Containerized the system on a Linux VM using Docker, including a secure sandboxed Python environment for executing agent-generated code and rendering charts safely.
*   **Performance**: Utilized Polars for high-performance data manipulation, enabling rapid processing of large datasets.

The system transforms raw data into comprehensive reports, complete with visualizations and actionable insights, significantly reducing the time required for initial data assessment.
