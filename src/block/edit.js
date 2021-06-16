import { BlockControls, InnerBlocks, InspectorControls, MediaPlaceholder, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button, ColorPalette, PanelBody, RangeControl, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Pagination]);
const { Fragment } = wp.element;

const colors = [
    { 
        name: 'Green', 
        color: '#0e9b75'
    },
    { 
        name: 'Red', 
        color: '#ff0000'
    },
    { 
        name: 'Black', 
        color: '#000000'
    },
    { 
        name: 'White', 
        color: '#ffffff'
    },
    { 
        name: 'Light Yellow', 
        color: '#E9F7CA'
    },
    { 
        name: 'Orange', 
        color: '#f0a83c'
    },
];
const tags = [
    {
        label: 'h1',
        value: 'h1' 
    },
    {
        label: 'h2',
        value: 'h2' 
    },
    {
        label: 'h3',
        value: 'h3' 
    },
    {
        label: 'h4',
        value: 'h4' 
    },
    {
        label: 'h5',
        value: 'h5' 
    },
    {
        label: 'h6',
        value: 'h6' 
    }
];

const edit = ({ attributes, setAttributes }) => {
    const { className, images, heading, paragraph, showContent, showBtn, btnLink, headingTag, btnLabel, sectionId, sectionBg, sliderPosition, paddingTB, paddingLR, newTab, tab } = attributes;
    if( newTab ) {
        setAttributes({ tab: 'blank' })
    }else {
        setAttributes({ tab: 'self' })
    }
    return (
        <div>
            <InspectorControls>        
                <PanelBody 
                    title={__("Section Settings")}
                    initialOpen= { true }
                >
                    <TextControl
                        label="Section ID"
                        value={ sectionId }
                        onChange={ ( sectionId ) => setAttributes( { sectionId } ) }
                    />
                    <ColorPalette 
                        colors={ colors } 
                        value={ sectionBg }
                        onChange={ ( sectionBg ) => setAttributes( { sectionBg } ) } 
                    />
                    <RangeControl
                        label="Setting Padding at Top-Bottom"
                        value={ paddingTB }
                        onChange={ ( paddingTB ) => setAttributes( { paddingTB } ) }
                        min={ 0 }
                        max={ 1000 }
                    />
                    <RangeControl
                        label="Setting Padding at Left-Right"
                        value={ paddingLR }
                        onChange={ ( paddingLR ) => setAttributes( { paddingLR } ) }
                        min={ 0 }
                        max={ 1000 }
                    />
                </PanelBody>
                <PanelBody 
                    title={__("Content Settings")}
                    initialOpen= { false }
                >
                    <ToggleControl
                        label="Show Content"
                        checked={ showContent }
                        onChange={ () => setAttributes({ showContent: !showContent}) }
                    />
                    {
                        showContent &&
                        <Fragment>
                            <SelectControl
                                label="Select Tag for Heading"
                                options={ tags }
                                onChange={ ( headingTag ) =>setAttributes( { headingTag } ) }
                                value={ headingTag }
                            />
                            <ToggleControl
                                label="Show Icon Button"
                                checked={ showBtn }
                                onChange={ () => setAttributes({ showBtn: !showBtn }) }
                            />
                            {
                                showBtn &&
                                <Fragment>
                                    <TextControl
                                        label="Button Link"
                                        value={ btnLink }
                                        onChange={ ( btnLink ) => setAttributes( { btnLink } ) }
                                    />
                                    <ToggleControl
                                        label="Open in New Tab"
                                        checked={ newTab }
                                        onChange={ () => setAttributes({ newTab: !newTab }) }
                                    />
                                </Fragment>
                            }
                        </Fragment>
                    }
                </PanelBody>
                {
                    showContent &&
                    <PanelBody
                        title="Slider Postion"
                        initialOpen={ false }
                    >
                        <ToggleControl
                            label="Show Slider at Left"
                            checked={ sliderPosition }
                            onChange={ () => setAttributes({ sliderPosition: !sliderPosition }) }
                        />
                    </PanelBody>
                }
            </InspectorControls>
            <BlockControls>
                {
                    images &&
                    <toolbar>
                        <MediaUploadCheck>
                            <MediaUpload
                                multiple = { true }
                                onSelect={ media => setAttributes({ images: media })}
                                allowedTypes={["image"]}
                                value={ images }
                                render={({ open }) => {
                                    return (
                                        <Button
                                            className="components-icon-button components-toolbar__control"
                                            label={__(
                                                "Edit Images"
                                            )}
                                            onClick={open}
                                            icon="edit"
                                            style={{ marginTop: '3px' }}
                                        />
                                    );
                                }}
                            />
                        </MediaUploadCheck>
                        <Button
                            className="components-icon-button components-toolbar__control"
                            label={__(
                                "Delete Images"
                            )}
                            onClick={ () => setAttributes({ images: null }) }
                            icon="trash"
                            style={{ marginTop: '3px' }}
                        />
                    </toolbar>
                }
            </BlockControls>
            <div className={ `paragraph-img ${className}` } id={ sectionId } style={{ 
                backgroundColor: sectionBg,
                padding: `${paddingTB}px ${paddingLR}px`
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
                                            {
                                                images ?
                                                    <Swiper
                                                        spaceBetween={0}
                                                        slidesPerView={1}
                                                        pagination={{ clickable: true }}
                                                    >
                                                        {
                                                            images &&
                                                            images.map( (item, index) => {
                                                                return(
                                                                    <SwiperSlide>  
                                                                        <a href={item.url} data-fancybox rel="nofollow noopener noreferrer">
                                                                            <img src={item.url} alt={item.alt} />
                                                                        </a>
                                                                    </SwiperSlide>
                                                                )
                                                            })
                                                        }
                                                    </Swiper>
                                                :
                                                <MediaPlaceholder
                                                    icon="format-image"
                                                    onSelect={ media => setAttributes({ images: media }) }
                                                    // onSelectURL={ url => setAttributes({ url })}
                                                    allowedTypes={["image"]}
                                                    multiple = { true }
                                                    labels = { { title: 'Add Slider Images' } } 
                                                />
                                            }
                                        </div>
                                        <div className="col col-md-7">
                                            <div className="box-detail detail-right">
                                                <RichText
                                                    tagName={ headingTag }
                                                    value={ heading }
                                                    onChange={ ( heading ) => setAttributes( { heading } ) }
                                                />
                                                <RichText
                                                    tagName="p"
                                                    value={ paragraph }
                                                    onChange={ ( paragraph ) => setAttributes( { paragraph } ) }
                                                />
                                                <InnerBlocks 
                                                    allowedBlocks={ ['core/list'] }
                                                />
                                                {
                                                    showBtn &&
                                                    <a href={btnLink} target={`_${tab}`} rel="nofollow noopener noreferrer" className="btn btn-icon">
                                                        <RichText
                                                            value={ btnLabel }
                                                           onChange={ ( btnLabel ) => setAttributes( { btnLabel } ) }
                                                        />
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <div className="col col-md-7">
                                            <div className="box-detail detail-right">
                                                <RichText
                                                    tagName={ headingTag }
                                                    value={ heading }
                                                    onChange={ ( heading ) => setAttributes( { heading } ) }
                                                />
                                                <RichText
                                                    tagName="p"
                                                    value={ paragraph }
                                                    onChange={ ( paragraph ) => setAttributes( { paragraph } ) }
                                                />
                                                <InnerBlocks 
                                                    allowedBlocks={ ['core/list'] }
                                                />
                                                {
                                                    showBtn &&
                                                    <a href={btnLink} target={`_${tab}`} rel="nofollow noopener noreferrer" className="btn btn-icon">
                                                        <RichText
                                                            value={ btnLabel }
                                                           onChange={ ( btnLabel ) => setAttributes( { btnLabel } ) }
                                                        />
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                        <div className="col col-md-5">
                                            {
                                                images ?
                                                    <Swiper
                                                        spaceBetween={0}
                                                        slidesPerView={1}
                                                        pagination={{ clickable: true }}
                                                    >
                                                        {
                                                            images &&
                                                            images.map( (item, index) => {
                                                                return(
                                                                    <SwiperSlide>   
                                                                        <a href={item.url} data-fancybox rel="nofollow noopener noreferrer">
                                                                            <img src={item.url} alt={item.alt} id={ item.id } />
                                                                        </a>
                                                                    </SwiperSlide>
                                                                )
                                                            })
                                                        }
                                                    </Swiper>
                                                :
                                                <MediaPlaceholder
                                                    icon="format-image"
                                                    onSelect={ media => setAttributes({ images: media }) }
                                                    // onSelectURL={ url => setAttributes({ url })}
                                                    allowedTypes={["image"]}
                                                    multiple = { true }
                                                    labels = { { title: 'Add Slider Images' } } 
                                                />
                                            }
                                        </div>
                                    </Fragment>
                                }
                                
                            </Fragment>
                            :
                            // Only Content area
                            <div className="col col-md-12">
                                {
                                    images ?
                                        <Swiper
                                            spaceBetween={0}
                                            slidesPerView={1}
                                            pagination={{ clickable: true }}
                                        >
                                            {
                                                images &&
                                                images.map( (item, index) => {
                                                    return(
                                                        <SwiperSlide>   
                                                            <a href={item.url} data-fancybox rel="nofollow noopener noreferrer">
                                                                <img src={item.url} alt={item.alt} id={ item.id } />
                                                            </a>
                                                        </SwiperSlide>
                                                    )
                                                })
                                            }
                                        </Swiper>
                                    :
                                    <MediaPlaceholder
                                        icon="format-image"
                                        onSelect={ media => setAttributes({ images: media }) }
                                        // onSelectURL={ url => setAttributes({ url })}
                                        allowedTypes={["image"]}
                                        multiple = { true }
                                        labels = { { title: 'Add Slider Images' } } 
                                    />
                                }
                            </div>
                            // End only Content area 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default edit;