import gql from 'gql-tag'

export const QUERY_MENU_BY_HANDLE = gql`
	query GetMenu($handle: String!) {
		menu(handle: $handle) {
			handle
			id
			title
			items {
				id
				title
				url
				type
				items {
					id
					title
					url
					type
				}
			}
		}
	}
`
