# Hurghada Journeys — Stage 15E-1

Pre-build audit and build-readiness fixes are complete. The remaining dependency-backed verification must be run on Windows because this execution environment currently cannot reach the npm registry (`EAI_AGAIN`).

Run:

```cmd
scripts\windows\stage15e-full-check.cmd
```

Then continue with Stage 15E-2 using the command output if any check fails.
