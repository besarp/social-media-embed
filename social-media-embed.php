<?php

/**
 * Plugin Name:       Social Media Embed Block
 * Description:       A Gutenberg block for embedding social media posts.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Besar
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       social-media-embed
 *
 * @package SocialMediaEmbed
 */

if (!defined('ABSPATH')) {
	exit;
}

function social_media_embed_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'social_media_embed_block_init');

// Register the REST API endpoint
function register_fetch_youtube_endpoint()
{
	register_rest_route('social-media-embed/v1', '/fetch-youtube', array(
		'methods' => 'GET',
		'callback' => 'fetch_youtube_post',
		'permission_callback' => '__return_true',
	));
}
add_action('rest_api_init', 'register_fetch_youtube_endpoint');

function fetch_youtube_post($data)
{
	$url = esc_url_raw($data['url']);

	// Validate and format the YouTube URL
	if (!preg_match('/^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/', $url, $matches)) {
		return new WP_Error('youtube_error', 'Invalid YouTube URL', array('status' => 400));
	}
	$video_id = $matches[1];

	$oembed_url = 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' . $video_id . '&format=json';

	$response = wp_remote_get($oembed_url);

	if (is_wp_error($response)) {
		return new WP_Error('youtube_error', 'Failed to fetch YouTube post', array('status' => 500));
	}

	$body = wp_remote_retrieve_body($response);
	$data = json_decode($body);

	if (isset($data->html)) {
		return array('html' => $data->html);
	} else {
		return new WP_Error('youtube_error', 'Failed to retrieve YouTube post data', array('status' => 500));
	}
}
