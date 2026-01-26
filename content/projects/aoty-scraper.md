---
title: AOTY Web Scraper
date: 2024-03-24
description: Album of the Year web scraper and data pipeline.
repoUrl: https://github.com/boubker98/AOTY-Web-Scraper
tags: [Python, Scraping, Data Engineering]
---

# AOTY Web Scraper

**AOTY Web Scraper** is a targeted data collection tool built to extract music reviews and scores from the *Album of the Year* website. It serves as the ingestion layer for downstream music analytics projects.

## Key Features

- **Automated Collection**: Robustly scrapes album reviews, user scores, and critic ratings.
- **Data Engineering Pipeline**: Implements cleaning and normalization logic to transform raw HTML into structured datasets.
- **Rate Limiting**: Includes respectful scraping delays to avoid IP bans and server overload.
- **Error Handling**: Graceful failure management for missing data or collecting partial records.

## Tech Stack

- **Language**: Python
- **Core Libraries**: BeautifulSoup4 (BS4), Requests
- **Data Handling**: Pandas, JSON
