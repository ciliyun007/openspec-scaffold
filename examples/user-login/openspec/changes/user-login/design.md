# Design: user-login

## Context
Users can sign in with email and a one-time code, no password. State where this sits inside acme-web and what it depends on.

## Goals / Non-Goals

**Goals**
- Make the Users can sign in with email and a one-time code, no password path work end to end

**Non-Goals**
- No rebuild of the permissions model in this change
- No performance work in this change

## Decisions

1. **Decision**: (what you chose)
   - Why:
   - Alternatives rejected:
