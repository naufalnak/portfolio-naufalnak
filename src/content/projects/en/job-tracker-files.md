# Overview

Job Tracker Files is a full-stack web app for tracking job applications, built with Next.js 14 and Supabase. Each user has their own account with data fully isolated through database-level Row Level Security, alongside a kanban board for tracking application status from applied to offer.

# The Problem

Tracking job applications with a spreadsheet works fine, but it doesn't scale well for automated follow-up reminders, status history, or progress visualization. This app turns that workflow into an interactive kanban board complete with automated reminders and a metrics dashboard.

# Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database & Auth**: Supabase (PostgreSQL + Row Level Security)
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR
- **Visualization**: Recharts
- **Validation**: Zod

# How It Works

- Users sign up and automatically get a default set of statuses and interview stages
- Applications are added and shown as cards in columns matching their status
- Cards can be dragged between columns to change status
- Every status change is automatically logged through a database trigger
- The system checks each application's follow-up schedule and surfaces the ones that need attention
- The metrics dashboard computes interview callback rate, success rate, and weekly trends directly from the database

# Key Features

- Multi-user authentication with full Row Level Security on every table
- Drag-and-drop kanban board with customizable statuses and interview stages
- Automated follow-up reminders based on a per-status schedule
- Bulk actions to change status or delete multiple applications at once
- CSV export for backing up data
- Metrics dashboard with interactive charts powered by Recharts
- Responsive layout that switches to a list view on small screens

# What I Learned

This project taught me a lot about how database triggers actually behave, including a bug where writing to the status history table inside a BEFORE INSERT trigger failed because the row itself didn't exist yet at that point. The fix was splitting it into a BEFORE trigger (to prepare the row) and an AFTER trigger (to log the history). I also learned the value of pushing heavier aggregations, like metrics and followups, straight into SQL instead of pulling raw rows and processing them in JavaScript, keeping things fast as data grows.
