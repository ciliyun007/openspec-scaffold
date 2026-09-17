# user-login Specification

## ADDED Requirements

### Requirement: Users can sign in with email and a one-time code, no password
The system SHALL Users can sign in with email and a one-time code, no password.

#### Scenario: happy path works
- **GIVEN** the user is on the relevant page
- **WHEN** the user performs the expected action
- **THEN** the system returns the expected result

#### Scenario: invalid input
- **GIVEN** the user provides invalid input
- **WHEN** the user submits
- **THEN** the system rejects it with a clear error message
