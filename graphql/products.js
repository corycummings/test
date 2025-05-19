import gql from 'gql-tag'
import { FieldsForMediaTypes } from './media'

export const ProductVariantFragment = gql`
  fragment ProductVariantFragment on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      id
      altText
      url
    }
    price {
      amount
      currencyCode
    }
    requiresShipping
    selectedOptions {
      name
      value
    }
    sku
    title
    weight
    weightUnit
  }
`

export const ProductFragment = gql`
	fragment ProductFragment on Product {
		availableForSale
		createdAt
		updatedAt
		description
		descriptionHtml
		handle
		id
    media(first: 250) {
      edges {
        node {
          ... FieldsForMediaTypes
        }
      }      
    }
		images(first: 250) {
			edges {
				node {
					id
					altText
					url
				}
			}
		}		
		onlineStoreUrl
		options {
			id
			name
			values
		}
		priceRange {
			minVariantPrice {
				amount
				currencyCode
			}
			maxVariantPrice {
				amount
				currencyCode
			}
		}
		sellingPlanGroups(first: 10) {
			edges {
				node {
					name
					sellingPlans(first: 10) {
						edges {
							node {
								id
								name
								description
								priceAdjustments {
									adjustmentValue {
										... on SellingPlanFixedAmountPriceAdjustment {
											adjustmentAmount {
												amount
												currencyCode
											}
										}
										... on SellingPlanFixedPriceAdjustment {
											price {
												amount
												currencyCode
											}
										}
										... on SellingPlanPercentagePriceAdjustment {
											adjustmentPercentage
										}
									}
								}
							}
						}
					}
				}
			}
		}
		productType
		publishedAt
		tags
		title
		updatedAt
		variants(first: 250) {
			edges {
				node {
          ...ProductVariantFragment
        }
			}
		}
		vendor
	}
  ${ProductVariantFragment}
  ${FieldsForMediaTypes}
`

export const QUERY_PRODUCT_BY_ID = gql`
	query Product($id: ID!) {
		product(id: $id) {
			...ProductFragment
		}
	}
	${ProductFragment}
`

export const QUERY_PRODUCT_BY_HANDLE = gql`
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
			...ProductFragment
		}
	}
	${ProductFragment}
`

export const QUERY_PRODUCTS = gql`
	query Products(
		$query: String  
		$reverse: Boolean
		$sortKey: ProductSortKeys
		$after: String    
	) {
		products(
			first: 24
			after: $after
			query: $query
			reverse: $reverse
			sortKey: $sortKey
		) {
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
			edges {
				node {
					...ProductFragment
				}
			}
		}
	}
	${ProductFragment}
`

export const QUERY_PRODUCT_RECOMMENDATIONS = gql`
	query ProductRecommendations($productId: ID!) {
		productRecommendations(productId: $productId) {
			...ProductFragment
		}
	}
	${ProductFragment}
`
