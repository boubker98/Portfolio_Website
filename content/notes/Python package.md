---
title: Python package
date: 2024-03-24
tags: [Python, Software Engineering]
---

## What's a python package?

A collection of python modules bundled under a directory with an `__init__.py` file. It allows reusable, importable components.
See also [[Reproducible environments]] for how to manage dependencies.

## Why?

- Promote modular code reuse across multiple projects
- Standardize your ML pipeline
- Improve modularity and testability
- Share your tools with others

## When?

- when your pipeline functions become stable and reusable 
- when collabing with multiple engineers or teams
- when deploying to airflow, kubeflow or mlflow
- when preparing for CI/C, deployment or testing

## How?

### Typical structure

reco_pipeline
	reco_pipeline
		__init__.py
		cleaning.py
		features.py
		validation.py
	tests
		test_cleaning.py
	setup.py
	pyproject.toml(optional)
		requirements.txt

### setup.py(minimal)

```python
from setuptools import setup, find_packages

setup(
	name = "reco_pipeline",
	version = "0.1",
	packages = find_packages(),
	install_requires=[
		"pandas>=1.5",
		"numpy>=1.23"
		]
)
```

![[Screenshot 2025-07-28 at 15.08.49.png]]

## analogy

let's think of a package as a toolbox
- each tool inside is a module
- the label on the box is your package name
- you can take this toolbox with you anywhere, reuse it, version it and even give it to other people