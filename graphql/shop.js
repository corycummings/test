import gql from 'gql-tag'

export const QUERY_SHOP = gql`
	query {
		shop {
      id
			name
			description
			brand {
				colors {
					primary {
						background
						foreground
					}
					secondary {
						background
						foreground
					}
				}
				slogan
				logo {
					image {
						id
						altText
						url
						height
						width
					}
				}
				coverImage {
					alt
					id
					image {
						id
						altText
						url
						height
						width
					}
				}
				shortDescription
				squareLogo {
					image {
						id
						altText
						url
						height
						width
					}
				}
			}
			shipsToCountries
			paymentSettings {
				acceptedCardBrands
				countryCode
				currencyCode
				supportedDigitalWallets
			}
			primaryDomain {
				url
				host
			}
			privacyPolicy {
				body
				title
				url
			}
			refundPolicy {
				body
				title
				url
			}
			subscriptionPolicy {
				body
				title
				url
			}
			termsOfService {
				url
				title
				body
			}
		}
	}
`
