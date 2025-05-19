import gql from 'gql-tag'

export const CartFragment = gql`
	fragment CartFragment on Cart {
		id
		cost {
			totalAmount {
				amount
				currencyCode
			}
			subtotalAmount {
				amount
				currencyCode
			}
			totalTaxAmount {
				amount
				currencyCode
			}
			totalDutyAmount {
				amount
				currencyCode
			}
		}
		discountCodes {
			applicable
			code
		}
		createdAt
		updatedAt
    discountAllocations {
      ... on CartAutomaticDiscountAllocation {
        discountedAmount {
          amount
          currencyCode
        }
        title
      }
      ... on CartCustomDiscountAllocation {
        discountedAmount {
          amount
          currencyCode
        }
        title
      }
      ... on CartCodeDiscountAllocation {
        discountedAmount {
          amount
          currencyCode
        }
        code
      }
      discountedAmount {
        amount
        currencyCode
      }
    }
		lines(first: 50) {
			edges {
				node {
					id
					quantity
					merchandise {
						... on ProductVariant {
							id
							title
							sku
							price {
								amount
								currencyCode
							}
              compareAtPrice {
                amount
                currencyCode
              }
							image {
								url
								altText
								width
								height
							}
							selectedOptions {
								name
								value
							}
							product {
								id
								title
								handle
								productType
								vendor
							}
						}
					}
					sellingPlanAllocation {
						priceAdjustments {
							price {
								amount
								currencyCode
							}
							compareAtPrice {
								amount
								currencyCode
							}
							unitPrice {
								amount
								currencyCode
							}
							perDeliveryPrice {
								amount
								currencyCode
							}
						}
						sellingPlan {
							id
              name
						}
					}
				}
			}
		}    
    metafields(identifiers: []) {
			id
			key
			value
			namespace
			description
			reference {
				... on ProductVariant {
					id
					title
					sku
					availableForSale
				}
				... on MediaImage {
					image {
						id
						altText
						url
					}
				}
			}
			references(first: 250) {
				edges {
					node {
						... on Metaobject {
							id
							handle
							type
							updatedAt
							fields {
								key
								type
								value
								reference {
									... on Product {
										id
										handle
										title
										variants(first: 20) {
											edges {
												node {
													id
													sku
													title
													price {
														amount
														currencyCode
													}
													image {
														url
													}
													availableForSale
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		attributes {
			key
			value
		}
    note
    updatedAt 
		checkoutUrl
    totalQuantity
	}
`

export const QUERY_CART = gql`
	query cart($id: ID!) {
		cart(id: $id) {
			...CartFragment
		}
	}
	${CartFragment}
`

export const CART_CREATE = gql`
	mutation cartCreate($input: CartInput!) {
		cartCreate(input: $input) {
			userErrors {
				message
				field
			}
			cart {
				...CartFragment
			}
		}
	}
	${CartFragment}
`

export const CART_LINES_ADD = gql`
	mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
		cartLinesAdd(cartId: $cartId, lines: $lines) {
			userErrors {
				message
				field
			}
			cart {
				...CartFragment
			}
		}
	}
	${CartFragment}
`

export const CART_LINES_UPDATE = gql`
	mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
		cartLinesUpdate(cartId: $cartId, lines: $lines) {
			userErrors {
				message
				field
			}
			cart {
				...CartFragment
			}
		}
	}
	${CartFragment}
`

export const CART_LINES_REMOVE = gql`
	mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
		cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
			userErrors {
				message
				field
			}
			cart {
				...CartFragment
			}
		}
	}
	${CartFragment}
`

export const CART_BUYER_IDENTITY_UPDATE = gql`
	query cartBuyerIdentityUpdate(
		$cartId: ID!
		$buyerIdentity: CartBuyerIdentityInput!
	) {
		cartBuyerIdentityUpdate(
			cartId: $cartId
			buyerIdentity: $buyerIdentity
			countryCode: "US"
		) {
			userErrors {
				message
				field
			}
			cart {
				...CartFragment
			}
		}
	}
	${CartFragment}
`

export const CART_DISCOUNT_CODES_UPDATE = gql`
	mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
		cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
			userErrors {
				code
				field
				message
			}
			cart {
				...CartFragment
			}
		}
	}
	${CartFragment}
`
