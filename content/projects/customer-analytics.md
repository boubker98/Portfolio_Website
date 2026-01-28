---
title: Customer Analytics Pipeline
date: "2024-06-15"
description: Built a chunked processing pipeline for 10M+ records with schema validation and robust error handling.
image: "/images/customer-analytics.png"
tags: ["Python", "Pandas", "Pandera", "Pytest", "Data Quality"]
demoUrl: ""
repoUrl: "https://github.com/boubker98/customer-analytics"
---

## Project Overview

High-performance data pipeline designed to process over 10 million purchase records with strict memory constraints and rigorous data quality checks.

## Key Implementations

*   **Optimized Processing**: Built a chunked data processing pipeline to analyze 10M+ purchase records with bounded memory usage, ensuring stability on constrained resources.
*   **Schema Validation**: Implemented schema validation and business rules using **Pandera**, systematically catching missing, malformed, and inconsistent records before aggregation.
*   **Data Normalization**: Performed country normalization (using PyCountry), cleaning, and complex aggregations to produce accurate customer-level and regional metrics.
*   **Robustness**: Added comprehensive unit tests and structured logging, ensuring deterministic results and enabling safe refactoring as data volume scales.

This project demonstrates a focus on production-grade data engineering practices, emphasizing reliability, testability, and efficiency.
