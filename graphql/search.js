import gql from 'gql-tag'
import { ProductFragment } from './products'

export const QUERY_SEARCH = gql`
	query Search($query: String!, $after: String, $productFilters: [ProductFilter!]) {
		search(
			first: 24
			after: $after
			query: $query
			reverse: false
			sortKey: RELEVANCE
      types: PRODUCT
      productFilters: $productFilters
		) {      
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
			edges {
				node {
					... on Product {
						...ProductFragment
					}
				}
			}
		}
	}
	${ProductFragment}
`
