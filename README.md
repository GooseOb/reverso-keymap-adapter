# Install

Skip steps which you already have done.

1. Install Reverso Context extension for your browser
2. Open extension
3. Click Settings
4. In hotkeys, pick Ctrl+Alt+R
5. Install a userscript manager like Tampermonkey
6. Install this userscript
   1. GreasyFork (recommended, for automatic updates)
   2. GitHub

# What you get

When you select a text and press Ctrl+C+C, the extension will open a Reverso popup.

## YouTube Captions Integration

For hostname `www.youtube.com`, the script searches for captions element (`.html5-video-player .captions-text > span`). If found, it'll be used. If not, fallbacks to the selection.

# Motivation

Since I switched to Linux, I can't use Reverso Context desktop app. So I created a simple script that converts Ctrl+C+C into Ctrl+Alt+R, then the Reverso Context extension handles it.

# Customization

Currently, no customization is available. If you're interested, please open an issue on GitHub or leave a comment on GreasyFork.
