import gql from 'gql-tag'
import { ProductFragment } from './products'
import { CollectionFragment } from './collections'
import { ShopifyImageTypeFragment } from './media'

const MetaobjectFragment = gql`
	fragment MetaobjectFragment on Metaobject {
		handle
		updatedAt
		fields {
			key
			value
			reference {
				... on Product {
					...ProductFragment
				}
				... on Collection {
					...CollectionFragment
				}
				... on MediaImage {
					image {
						...ShopifyImageTypeFragment
					}
				}
				... on Metaobject {
					handle
					updatedAt
					fields {
						key
						value
						reference {
							... on Product {
								...ProductFragment
							}
							... on Collection {
								...CollectionFragment
							}
							... on MediaImage {
								image {
									...ShopifyImageTypeFragment
								}
							}
							... on Metaobject {
								handle
								id
								updatedAt
								fields {
									key
									value
									reference {
										... on MediaImage {
											image {
												...ShopifyImageTypeFragment
											}
										}
									}
								}
							}
						}
					}
				}
			}
			references(first: 10) {
				edges {
					node {
						... on Product {
							...ProductFragment
						}
						... on Collection {
							...CollectionFragment
						}
						... on MediaImage {
							image {
								...ShopifyImageTypeFragment
							}
						}
						... on Metaobject {
							handle
							id
							updatedAt
							fields {
								key
								value
								reference {
									... on MediaImage {
										image {
											...ShopifyImageTypeFragment
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
	${CollectionFragment}
	${ProductFragment}
	${ShopifyImageTypeFragment}
`

export const QUERY_METAOBJECT_BY_HANDLE = gql`
	query Metaobject($handle: String!, $type: String!) {
		metaobject(handle: { handle: $handle, type: $type }) {
			...MetaobjectFragment
		}
	}
	${MetaobjectFragment}
`

export const QUERY_METAOBJECTS = gql`
	query Metaobjects($first: Int!, $type: String!) {
		metaobjects(first: $first, type: $type) {
			edges {
				node {
					id
					handle
					fields {
						key
						value
						reference {
							... on MediaImage {
								image {
									...ShopifyImageTypeFragment
								}
							}
							... on Product {
								...ProductFragment
							}
							... on ProductVariant {
								id
								title
								price {
									amount
									currencyCode
								}
								image {
									src
								}
							}
						}
					}
				}
			}
		}
	}
	${ShopifyImageTypeFragment}
	${ProductFragment}
`
