import gql from 'gql-tag'

export const FieldsForMediaTypes = gql`
  fragment FieldsForMediaTypes on Media {
    alt
    mediaContentType
    ... on Video {
      id
      sources {
        format
        height
        mimeType
        url
        width
      }
    }
    ... on ExternalVideo {
      id
      host
      embeddedUrl
    }
    ... on Model3d {
      sources {
        format
        mimeType
        url
      }
    }
    ... on MediaImage {
      id
      image {
        altText
        url
      }
    }
  }
`

export const ShopifyImageTypeFragment = gql`
	fragment ShopifyImageTypeFragment on ShopifyImageType {
		id
		altText
		url
	}
`
