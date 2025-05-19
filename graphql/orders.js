import gql from 'gql-tag'

const OrderFragment = gql`
	fragment OrderFragment on Order {
		id
		name
		statusUrl
		orderNumber
		processedAt
		currencyCode
		totalPrice {
			amount
			currencyCode
		}
		totalRefunded {
			amount
			currencyCode
		}
		totalShippingPrice {
			amount
			currencyCode
		}
		lineItems(first: 250) {
			edges {
				node {
					title
					quantity
					variant {
						price
						image {
							src
						}
						selectedOptions {
							name
							value
						}
						product {
							handle
						}
					}
				}
			}
		}
		shippingAddress {
			firstName
			lastName
			address1
			address2
			city
			province
			zip
			country
			phone
		}
	}
`

export const QUERY_CUSTOMER_ORDERS = gql`
	query GetCustomerPastOrders(
		$customerAccessToken: String!
		$first: Int
		$cursor: String
	) {
		customer(customerAccessToken: $customerAccessToken) {
			orders(first: $first, after: $cursor) {
				edges {
					cursor
					node {
						...OrderFragment
					}
				}
				pageInfo {
					hasPreviousPage
					hasNextPage
				}
			}
		}
	}
	${OrderFragment}
`
