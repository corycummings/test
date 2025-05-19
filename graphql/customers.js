import gql from 'gql-tag'

export const QUERY_CUSTOMER = gql`
	query GetCustomerData($customerAccessToken: String!) {
		customer(customerAccessToken: $customerAccessToken) {
			id
			displayName
			firstName
			lastName
			email
			phone
			acceptsMarketing
			createdAt
			updatedAt
			defaultAddress {
				id
				firstName
				lastName
				company
				address1
				address2
				city
				province
				country
				zip
				phone
			}
		}
	}
`

export const QUERY_CUSTOMER_ORDERS = gql`
	query GetCustomerData(
		$customerAccessToken: String!
		$first: Int
		$cursor: String
		$query: String
	) {
		customer(customerAccessToken: $customerAccessToken) {
			id
			displayName
			firstName
			lastName
			email
			phone
			acceptsMarketing
			createdAt
			updatedAt
			defaultAddress {
				id
				firstName
				lastName
				company
				address1
				address2
				city
				province
				country
				zip
				phone
			}
			orders(first: $first, after: $cursor, query: $query) {
				edges {
					node {
						id
						email
						name
						phone
						orderNumber
						cancelReason
						canceledAt
						shippingAddress {
							id
							firstName
							lastName
							company
							address1
							address2
							city
							province
							country
							zip
						}
						subtotalPrice {
							amount
							currencyCode
						}
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
						totalTax {
							amount
							currencyCode
						}
						currentTotalTax {
							amount
							currencyCode
						}
						statusUrl
						customerUrl
						lineItems(first: 250) {
							edges {
								node {
									title
									quantity
									variant {
										price {
											amount
											currencyCode
										}
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
					}
				}
				pageInfo {
					hasPreviousPage
					hasNextPage
				}
			}
		}
	}
`

export const QUERY_CUSTOMER_ADDRESSES = gql`
	query GetCustomerData(
		$customerAccessToken: String!
		$first: Int
		$cursor: String
	) {
		customer(customerAccessToken: $customerAccessToken) {
			id
			displayName
			firstName
			lastName
			email
			phone
			acceptsMarketing
			createdAt
			updatedAt
			defaultAddress {
				id
				firstName
				lastName
				company
				address1
				address2
				city
				province
				country
				zip
				phone
			}
			addresses(first: $first, after: $cursor) {
				edges {
					node {
						id
						firstName
						lastName
						company
						address1
						address2
						city
						province
						country
						zip
						phone
					}
				}
				pageInfo {
					hasPreviousPage
					hasNextPage
				}
			}
		}
	}
`

export const MUTATION_CUSTOMER_CREATE = gql`
	mutation customerCreate($input: CustomerCreateInput!) {
		customerCreate(input: $input) {
			customer {
				firstName
				lastName
				email
				phone
				acceptsMarketing
				defaultAddress {
					address1
					address2
					city
					company
					country
					countryCodeV2
					firstName
					formatted
					formattedArea
					id
					lastName
					latitude
					longitude
					name
					phone
					province
					provinceCode
					zip
				}
				displayName
				numberOfOrders
				tags
				updatedAt
				metafields(identifiers: []) {
					id
					namespace
					key
					value
				}
			}
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`

export const MUTATION_CUSTOMER_UPDATE = gql`
	mutation customerUpdate(
		$customerAccessToken: String!
		$customer: CustomerUpdateInput!
	) {
		customerUpdate(
			customerAccessToken: $customerAccessToken
			customer: $customer
		) {
			customer {
				id
				firstName
				lastName
				email
				phone
				acceptsMarketing
			}
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`

export const MUTATION_CUSTOMER_ADDRESS_CREATE = gql`
	mutation customerAddressCreate(
		$customerAccessToken: String!
		$address: MailingAddressInput!
	) {
		customerAddressCreate(
			customerAccessToken: $customerAccessToken
			address: $address
		) {
			customerAddress {
				address1
				address2
				city
				company
				country
				countryCodeV2
				firstName
				formatted
				formattedArea
				id
				lastName
				latitude
				longitude
				name
				phone
				province
				provinceCode
				zip
			}
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`

export const MUTATION_CUSTOMER_ADDRESS_UPDATE = gql`
	mutation customerAddressUpdate(
		$customerAccessToken: String!
		$id: ID!
		$address: MailingAddressInput!
	) {
		customerAddressUpdate(
			customerAccessToken: $customerAccessToken
			id: $id
			address: $address
		) {
			customerAddress {
				id
				firstName
				lastName
				company
				address1
				address2
				city
				province
				country
				zip
				phone
			}
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`

export const MUTATION_CUSTOMER_ADDRESS_DELETE = gql`
	mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
		customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
			deletedCustomerAddressId
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`
