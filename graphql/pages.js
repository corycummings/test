import gql from 'gql-tag'

const PageFragment = gql`
	fragment PageFragment on Page {
		id
		handle
		title
		body
		bodySummary
		createdAt
		updatedAt
	}
`

export const QUERY_PAGE_BY_HANDLE = gql`
	query Page($handle: String!) {
		pageByHandle(handle: $handle) {
			...PageFragment
		}
	}
	${PageFragment}
`

export const QUERY_PAGES = gql`
	query Pages($first: Int!, $query: String) {
		pages(first: $first, query: $query) {
			edges {
				node {
					...PageFragment
				}
			}
		}
	}
	${PageFragment}
`
