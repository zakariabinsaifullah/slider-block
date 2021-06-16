const attributes = {
	sectionId: {
		type: 'string',
		default: null,
	},
	sectionBg: {
		type: 'string',
		default: null,
	},
	paddingTB: {
		type: 'number',
		default: 70
	},
	paddingLR: {
		type: 'number',
		default: 0
	},
	sliderPosition:{
		type: 'boolean',
		default: false
	},
	images: {
		type: 'array',
		source: 'query',
		selector: 'img',
		query: {
			url: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
			},
			alt: {
				type: 'string',
				source: 'attribute',
				attribute: 'alt',
			},
		},
	},
	showContent: {
		type: 'boolean',
		default: true
	},
	heading: {
		type: 'string',
		default: 'Morning Dew'
	},
	paragraph: {
		type: 'string',
		default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus iusto, voluptatum maxime nisi culpa amet eveniet quia tempore labore, voluptatem.'
	},
	headingTag: {
		type: 'string',
		default: 'h2'
	},
	showBtn: {
		type: 'boolean',
		default: true
	},
	btnLabel: {
		type: 'string',
		default: 'Read More'
	},
	btnLink: {
		type: 'string',
		default: '#'
	},
	newTab: {
		type: 'boolean',
		default: false
	},
	tab: {
		type: 'string',
		default: 'self'
	}
};
export default attributes;
