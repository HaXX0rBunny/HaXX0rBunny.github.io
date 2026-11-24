# Recycle source examples

C++ examples from Recycle, a three-person Unreal Engine 5.8.4 game submitted to the [2026 Epic AI MegaJam](https://itch.io/jam/2026-epic-ai-megajam/rate/5377919). Jo Sanghyeon worked on gameplay flow, HUD and menus, input and combat feedback. The original Diversion author name for these commits is `Schnee Weiss`.

| Example | Source | Tests | Original Diversion commit |
| --- | --- | --- | --- |
| Health-gauge animation | [Implementation](Source/PROJECT_RECYCLE/Defense/UI/RecycleHealthGaugeAnimation.cpp), [header](Source/PROJECT_RECYCLE/Defense/UI/RecycleHealthGaugeAnimation.h) | [Tests](Source/PROJECT_RECYCLE/Defense/Tests/RecycleHealthGaugeAnimationTest.cpp) | `dv.commit.22` |
| Minimap projection | [Header](Source/PROJECT_RECYCLE/Defense/UI/RecycleMinimapProjection.h) | [Tests](Source/PROJECT_RECYCLE/Defense/Tests/RecycleMinimapTest.cpp) | `dv.commit.31` |
| Input device and language | [Implementation](Source/PROJECT_RECYCLE/Defense/UI/RecycleInterfaceSubsystem.cpp), [header](Source/PROJECT_RECYCLE/Defense/UI/RecycleInterfaceSubsystem.h) | [Tests](Source/PROJECT_RECYCLE/Defense/Tests/RecycleInterfaceTest.cpp) | `dv.commit.89` |
| Controller aim assist | [Header](Source/PROJECT_RECYCLE/Defense/RecycleAimAssist.h) | [Tests](Source/PROJECT_RECYCLE/Defense/Tests/RecycleAimAssistTest.cpp) | `dv.commit.104` |

## Original changes

The files are snapshots from the commits in which they were first added, rather than copies of the latest main branch. [Original patches](patches/) and [file metadata](manifest.json) retain their Diversion references and UTC dates. The Git commit that publishes this collection is a source import; the original development history remains in Diversion.

Each patch compares `dv.commit.1`, where the file does not exist, with its creation commit. It is a complete new-file addition, not a comparison against a claimed parent commit. Text is stored as UTF-8 with LF line endings.

The source and automation tests depend on Unreal Engine and other parts of the original project. These extracts are for code review and do not form a standalone build.

[Project portfolio](https://haxx0rbunny.github.io/recycle.html#code)
