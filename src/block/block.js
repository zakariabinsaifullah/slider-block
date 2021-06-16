import { InnerBlocks, RichText } from '@wordpress/block-editor';
import attributes from './attributes';
import edit from './edit';
import './editor.scss';
import './style.scss';
const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'gsb/slider-block', {
	title: __( 'slider-block' ),
	icon: 'slides',
	category: 'slider-block', 
	keywords: [
		__( 'slider block' )
	],
	attributes,
	edit,
	save: ( { attributes } ) => {
		const { className, images, heading, paragraph, showContent, showBtn, btnLabel, btnLink, headingTag, sectionId, sectionBg, sliderPosition, paddingTB, paddingLR, tab } = attributes;
		return (
            <section className={ `paragraph-img ${className}` } id={ sectionId } style={{ 
                backgroundColor: sectionBg,
                padding: `${paddingTB}px ${paddingLR}px`,
            }}>
                <div className="container">
                    <div className="row align-items-center box-cont">
                        {
                            showContent ? 
                            <Fragment>
                                {
                                    sliderPosition ?
                                    <Fragment>
                                        <div className="col col-md-5">
                                            <div className="swiper-container box-image">
                                                <div className="swiper-wrapper">
                                                {
                                                    images &&
                                                    images.map( (item, index) => {
                                                        return(
                                                            <div className="swiper-slide">
                                                                <a href={item.url} data-fancybox rel="nofollow noopener noreferrer">
                                                                    <img src={item.url} alt={item.alt} />
                                                                </a>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                </div>
                                                <div className="swiper-pagination"></div> 
                                            </div> 
                                        </div>
                                        <div className="col col-md-7">
                                            <div className="box-detail detail-right">
                                                <RichText.Content 
                                                    tagName={ headingTag }
                                                    value={ heading }
                                                />
                                                <RichText.Content
                                                    tagName="p"
                                                    value={ paragraph }
                                                />
                                                <InnerBlocks.Content />
                                                {
                                                    showBtn &&
                                                    <a href={btnLink} target={`_${tab}`} rel="nofollow noopener noreferrer" className="btn btn-icon">
                                                        <RichText.Content
                                                            value={ btnLabel }
                                                        />
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <div className="col col-md-7">
                                            <div className="box-detail detail-left">
                                                <RichText.Content
                                                    tagName={ headingTag }
                                                    value={ heading }
                                                />
                                                <RichText.Content
                                                    tagName="p"
                                                    value={ paragraph }
                                                />
                                                <InnerBlocks.Content />
                                                {
                                                    showBtn &&
                                                    <a href={btnLink} target={`_${tab}`} rel="nofollow noopener noreferrer" className="btn btn-icon">
                                                        <RichText.Content
                                                            value={ btnLabel }
                                                        />
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                        <div className="col col-md-5">
                                            <div className="swiper-container box-image">
                                                <div className="swiper-wrapper">
                                                {
                                                    images &&
                                                    images.map( (item, index) => {
                                                        return(
                                                            <div className="swiper-slide">
                                                                <a href={item.url} data-fancybox rel="nofollow noopener noreferrer">
                                                                    <img src={item.url} alt={item.alt} />
                                                                </a>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                </div>
                                                <div className="swiper-pagination"></div>  
                                            </div> 
                                        </div>
                                    </Fragment>
                                }
                            </Fragment>
                            :
                            // Only Content area
                            <div className="col col-md-12">
                                <div className="swiper-container box-image">
                                    <div className="swiper-wrapper">
                                    {
                                        images &&
                                        images.map( (item, index) => {
                                            return(
                                                <div className="swiper-slide">
                                                    <a href={item.url} data-fancybox rel="nofollow noopener noreferrer">
                                                        <img src={item.url} alt={item.alt} />
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                    <div className="swiper-pagination"></div> 
                                </div>
                            </div>
                            // End only Content area 
                        }
                    </div>
                </div>
            </section>
		);
	},
} );
