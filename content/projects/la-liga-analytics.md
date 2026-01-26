---
title: La Liga Analytics
date: 2024-03-24
description: End-to-end data pipeline ingesting multiple sources to produce analytics and visualizations for teams and players.
tags: [Python, Power BI, Azure, Airflow]
---

# La Liga Analytics (WIP)

**La Liga Analytics** is an end-to-end data consolidation pipeline designed to fetch, merge, and analyze football data from multiple disparate sources to provide a unified view of team and player performance.

## Data Pipeline Architecture

The system orchestrates a complex workflow to ingest data from public APIs and unstructured CSVs, standardizing it for analytical consumption.

## Key Features

- **Data Orchestration**: Uses **Apache Airflow** to schedule and manage ETL jobs reliably.
- **Cloud Storage**: centralized data lake using **Azure Data Lake Storage Gen2 (DLS2)** for scalable storage of raw and processed data.
- **Analytics Engine**: Merges and aggregates statistics on players, teams, and matches to derive meaningful insights.
- **Interactive Visualization**: Delivers comprehensive dashboards via **Power BI**, allowing for deep-dive trend tracking and performance analysis.

## Tech Stack

- **Pipeline**: Python, Pandas, Apache Airflow
- **Cloud Infrastructure**: Azure Data Lake Storage Gen2 (ADLS Gen2)
- **Visualization**: Power BI, Matplotlib
