---
title: Album Data Scraper
date: "2025-01-20"
description: Automated scraping pipeline for music data using Selenium, Prefect, and DuckDB.
image: "/images/aoty-scraper.png"
tags: ["Python", "Selenium", "DuckDB", "Prefect", "Click"]
repoUrl: "https://github.com/boubker98/aoty-scraper"
---

## Project Overview

An automated data collection pipeline designed to aggregate album records and user reviews from multiple web sources, facilitating music trend analysis.

## Key Features

*   **Robust Scraping**: Developed a pipeline using **Selenium** and **BeautifulSoup** to collect thousands of album records. Implemented retry logic, modular extractors, and failure handling to increase scrape success rate and stability.
*   **Orchestration**: Orchestrated scraping, parsing, and persistence tasks with **Prefect**, ensuring reliable execution and observability.
*   **High-Performance Storage**: Stored results in **DuckDB**, enabling fast analytical queries on the collected structured data.
*   **CLI Interface**: Exposed the pipeline via a Command Line Interface (CLI) using **Click** to enable repeatable runs and parameterized data collection.

This tool transforms unstructured web data into a structured dataset ready for analysis.
