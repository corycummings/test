import gql from 'gql-tag'

const ArticleFragment = gql`
	fragment ArticleFragment on Article {
		authorV2 {
			bio
			email
			firstName
			lastName
			name
		}
		blog {
			handle
			id
			seo {
				title
				description
			}
			title
		}
		content
		contentHtml
		excerpt
		excerptHtml
		handle
		id
		image {
			altText
			id
			url
			height
			width
		}
		tags
		title
		publishedAt
		onlineStoreUrl
	}
`

export const QUERY_ARTICLE_BY_HANDLE = gql`
	query Blog($blogHandle: String!, $articleHandle: String!) {
		blog(handle: $blogHandle) {
			id
			title
			seo {
				title
				description
			}
			articleByHandle(handle: $articleHandle) {
				...ArticleFragment
			}
		}
	}
	${ArticleFragment}
`

export const QUERY_ARTICLES = gql`
	query Articles($first: Int!, $query: String) {
		articles(first: $first, query: $query) {
			edges {
				node {
					...ArticleFragment
				}
			}
		}
	}
	${ArticleFragment}
`
