#!/bin/bash

# Find all .tsx files under src/admin recursively
find src/shared -type f -name "*.svg" | while read file; do
  # Remove "src/" prefix so path starts from admin/
  rel_path="${file#src/}"
  echo "Running keycloakify for: $rel_path"
  npx keycloakify own --path "$rel_path"
done

