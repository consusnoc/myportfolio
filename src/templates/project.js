import React from 'react'
import { Link , graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


import arrow from '../../static/icons/left-arrow.png'
import projStyles from './project.module.scss'

import Layout from '../components/layout'

import { Button } from '../components/button'

export const query = graphql`
    query($slug: String!) {
        contentfulBlogPost( slug: { eq: $slug } ) {
            title
            publishedDate(formatString: "MMMM Do, YYYY")
            body {
                json
            }
        }
    }
` 



const Project = ( props ) =>  {
    const options = {
        renderNode : {
            "embedded-asset-block": (node) => {
                if(node.data.target.fields.title['en-US'] === "video carpool light") {
                    const videoUrl = node.data.target.fields.file['en-US'].url
                    return <video width="900" height="auto" controls><source src={videoUrl} type="video/mp4" /></video>
                }
                const alt = node.data.target.fields.title['en-US']
                const url = node.data.target.fields.file['en-US'].url
                return <img alt={alt} src={url} />
            }
        }
    }
    return(
        <Layout>
            <div className={projStyles.projContainer}>
                <Link to='/projects' className={projStyles.backLink}><img src={arrow} alt="arrow"/> Volver</Link>
                <h1 className={projStyles.title}>{props.data.contentfulBlogPost.title}</h1>
                <p className={projStyles.published}>Published date: {props.data.contentfulBlogPost.publishedDate}</p>
                {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
                <Link to="/projects/" className={projStyles.centerButton}>
                    <Button>Back to Projects</Button>
                </Link>
            </div>
        </Layout>
    )
}

export default Project