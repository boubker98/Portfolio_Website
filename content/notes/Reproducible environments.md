---
title: Reproducible environments
date: 2024-03-24
tags: [Python, DevOps, Best Practices]
---

## Virtual Environment

An isolated working copy of python that allows the user to install packages and dependencies separately from the system python or other projects (a python sandbox if you will).
Essential for building a robust [[Python package]].

You get to:
- Control which packages are installed
- Avoid conflicts between projects
- Ensure your projects behaves the same on another machine

## Why

IRL pipelines:
+ Avoid "it works on my machine" problems
+ Enable version control for dependencies
+ Deploying ML pipelines or workflows without isolation leads to bugs that only show up in production
+ Global installations lead to dependency hell

## When

Always.

## How

- A new folder is created called venv or .venv
- The folder contains a local python interpreter and its own version of pip
- Activating the environments tells python and pip to use that isolated setup
 ![[Screenshot 2025-07-28 at 12.10.42.png]]

### Creating and using a venv

step 1: creating the env
`python -m venv .venv`
step 2: activate venv
`source .venv/bin/activate`
step 3: install dependencies
`pip install pandas flask`
step 4: deactivate
`deactivate`

## What is reproducibility

Reproducibility means that anyone can run the code and get the same result with the same dependencies

![[Screenshot 2025-07-28 at 12.47.43.png]]

### Tools for reproducibility
requirements.txt
generate a txt file that has the version of each dependency
`pip freeze > requirements.txt`
the requirements.txt freezes the exact versions
anyone can reproduce the env by simply running 
`pip install -r requirements.txt`

pyproject.toml (more modern)
used in modern packaging systems like poetry, it defines:
+ project metadata
+ exact dependencies
+ build backend
![[Screenshot 2025-07-28 at 12.56.10.png]]

