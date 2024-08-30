import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { postContent, backgroundColor } = attributes;
	const blockProps = useBlockProps.save({
		style: { backgroundColor },
	});

	return (
		<div {...blockProps}>
			<div dangerouslySetInnerHTML={{ __html: postContent }} />
		</div>
	);
};

export default Save;
