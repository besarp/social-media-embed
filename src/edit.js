import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, TextControl, Spinner, Notice } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import './editor.scss';

const Edit = ({ attributes, setAttributes }) => {
	const { url, backgroundColor, postContent } = attributes;
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const blockProps = useBlockProps({
		style: { backgroundColor },
	});

	useEffect(() => {
		if (url) {
			setLoading(true);
			fetch(`http://localhost/jmg/wp-json/social-media-embed/v1/fetch-youtube?url=${encodeURIComponent(url)}`)
				.then((response) => response.json())
				.then((data) => {
					if (data.html) {
						setAttributes({ postContent: data.html });
					} else {
						throw new Error('Invalid data format');
					}
					setLoading(false);
				})
				.catch((err) => {
					setError(err);
					setLoading(false);
				});
		}
	}, [url]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'social-media-embed')}>
					<TextControl
						label={__('Post URL', 'social-media-embed')}
						value={url}
						onChange={(newUrl) => setAttributes({ url: newUrl })}
						placeholder={__('Enter social media post URL', 'social-media-embed')}
					/>
					<div>
						<p>{__('Background Color', 'social-media-embed')}</p>
						<ColorPalette
							value={backgroundColor}
							onChange={(color) => setAttributes({ backgroundColor: color })}
						/>
					</div>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<p>{__('Enter the URL you want to embed:', 'social-media-embed')}</p>
				<TextControl
					value={url}
					onChange={(newUrl) => {
						setAttributes({ url: newUrl });
						setAttributes({ postContent: '' }); // Clear content when URL changes
					}}
					placeholder={__('Enter URL', 'social-media-embed')}
				/>
				{loading && <Spinner />}
				{error && <Notice status="error">{__('Error fetching post', 'social-media-embed')}</Notice>}
				<div dangerouslySetInnerHTML={{ __html: postContent }} />
			</div>
		</>
	);
};

export default Edit;
