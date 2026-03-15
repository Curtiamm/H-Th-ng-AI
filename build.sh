#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt
# SpaCy model download removed because vi_core_news_lg is not in the official repo.
# Fallback to keyword matching in nlp_utils.py
