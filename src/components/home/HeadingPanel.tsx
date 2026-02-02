interface Props {
	title: string
	description: string
}

const HeadingPanel = ({ title, description }: Props) => {
	return (
		<div className='max-w-md'>
			<h1 className='font-bold text-[18px] text-black'>{title}</h1>
			<p className='mt-2 text-sm text-[#697696]'>{description}</p>
		</div>
	)
}

export default HeadingPanel
