import gql from 'gql-tag'

export const MUTATION_ACCESS_TOKEN_CREATE = gql`
	mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
		customerAccessTokenCreate(input: $input) {
			customerAccessToken {
				accessToken
				expiresAt
			}
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`

export const MUTATION_ACCESS_TOKEN_RENEW = gql`
	mutation customerAccessTokenRenew($customerAccessToken: String!) {
		customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
			customerAccessToken {
				accessToken
				expiresAt
			}
			userErrors {
				field
				message
			}
		}
	}
`

export const MUTATION_ACCESS_TOKEN_DELETE = gql`
	mutation customerAccessTokenDelete($customerAccessToken: String!) {
		customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
			deletedAccessToken
			deletedCustomerAccessTokenId
			userErrors {
				field
				message
			}
		}
	}
`

export const MUTATION_CUSTOMER_RECOVER = gql`
	mutation customerRecover($email: String!) {
		customerRecover(email: $email) {
			customerUserErrors {
				field
				message
			}
		}
	}
`

export const MUTATION_CUSTOMER_RESET_BY_URL = gql`
	mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
		customerResetByUrl(password: $password, resetUrl: $resetUrl) {
			customerAccessToken {
				accessToken
				expiresAt
			}
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`

export const MUTATION_CUSTOMER_ACTIVATE_BY_URL = gql`
	mutation customerActivateByUrl($password: String!, $activationUrl: URL!) {
		customerActivateByUrl(password: $password, activationUrl: $activationUrl) {
			customer {
				id
				email
				firstName
				lastName
				phone
				acceptsMarketing
			}
			customerAccessToken {
				accessToken
				expiresAt
			}
			customerUserErrors {
				code
				field
				message
			}
		}
	}
`
