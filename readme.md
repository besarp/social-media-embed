# Custom Gutenberg Block - Embed Social Media Posts

This WordPress plugin provides a custom Gutenberg block that allows users to embed social media posts, such as YouTube videos, into their pages or posts by simply entering the post URL.

## Features

- Embed social media posts (e.g., YouTube videos) by entering the post URL.
- Real-time fetching and display of the post within the editor.

## Installation

Follow these steps to install and use the custom Gutenberg block:

### 1. Download the Plugin

1. Clone the repository or download the ZIP file from GitHub:
```bash
git clone https://github.com/besarp/social-media-embed.git
```
Alternatively, you can download the ZIP file directly from the GitHub repository.

2. Extract the contents of the ZIP file.

2. Upload the Plugin to WordPress
Navigate to your WordPress dashboard.
Go to Plugins > Add New > Upload Plugin.
Choose the ZIP file you downloaded and click Install Now.
After installation, click Activate Plugin.
3. Usage
In the WordPress editor, add the "Custom Gutenberg Block" to your page or post.
Enter the URL of the social media post you want to embed.
Save or publish your content.

### REST API Endpoint
This plugin registers a custom REST API endpoint to fetch YouTube post data:

Endpoint: /wp-json/my-plugin/v1/fetch-youtube
Method: GET
Parameters: url (required) - The URL of the YouTube video.
The endpoint returns the embedded HTML for the provided URL.

Install the necessary dependencies:

```bash
npm install
```
Build the assets:

```bash
npm run build
```
If you want to enable continuous development, use:

```bash
npm run start
```

Changelog
v0.1.0

Made with ❤️ by Besar.