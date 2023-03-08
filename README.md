# Validate git author email

This action validates that the git author email is in the list of allowed domains.

## Inputs

## `domains`

**Required** The allowed domains that the author email must match.

## Outputs

## `valid`

The output of the pattern matching the author emails.

## Example usage

uses: actions/commit-email-validation-action@v1
with:
domains: 'microsoft.com;github.com'
