---
title: pokeops
date: 2024-03-24
description: Refactored into a testable Python package with modular structure, CI integration, and packaging for distribution.
repoUrl: https://github.com/boubker98/arkx_hackaton_group_project
tags: [Python, DevOps, CI/CD]
---

# pokeops

**pokeops** is a comprehensive Python package that serves as a reference implementation for modern Python packaging and distribution best practices. It demonstrates how to structure a production-ready library with robust CI/CD integration.

## DevOps & Best Practices

This project encapsulates the "Ops" in DevOps for Python developers, providing a template for building maintainable and shippable code.

## Key Features

- **Modular Structure**: Clean separation of concerns with a src-layout to prevent import errors.
- **CI Integration**: Automated testing and linting pipelines using GitHub Actions to ensure code quality on every commit.
- **Packaging Standard**: Configured with **Poetry** for dependency management and ready for PyPI distribution.
- **Code Quality**: Integrated pre-commit hooks, ruff for linting, and mypy for static type checking.

## Tech Stack

- **Language**: Python
- **Package Manager**: Poetry
- **CI/CD**: GitHub Actions
- **Quality Tools**: Ruff, Mypy, Pre-commit
