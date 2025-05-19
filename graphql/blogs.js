import gql from 'gql-tag'

const BlogFragment = gql`
	fragment BlogFragment on Blog {
		articles(first: 10) {
			edges {
				node {
					id
					handle
					image {
						altText
						id
						url
						height
						width
					}
					blog {
						id
						handle
					}
					title
					tags
					publishedAt
					authorV2 {
						bio
						email
						firstName
						lastName
						name
					}
					content
					contentHtml
					excerpt
					excerptHtml
				}
			}
		}
		handle
		id
		seo {
			title
			description
		}
		title
	}
`

export const QUERY_BLOG_BY_HANDLE = gql`
	query Blog($handle: String!) {
		blog(handle: $handle) {
			...BlogFragment
		}
	}
	${BlogFragment}
`

export const QUERY_BLOGS = gql`
	query Blogs($first: Int!, $query: String) {
		blogs(first: $first, query: $query) {
			edges {
				node {
					...BlogFragment
				}
			}
		}
	}
	${BlogFragment}
`
