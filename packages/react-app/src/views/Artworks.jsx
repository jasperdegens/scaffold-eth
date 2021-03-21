/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState } from "react";
import "antd/dist/antd.css";
import { Switch, Typography, List, Card, Skeleton, Divider, Badge, Row, Col, Image, Carousel, Button } from "antd";
import { useQuery, gql } from '@apollo/client';
import Blockies from 'react-blockies'
import { useHistory } from 'react-router-dom'
import { formatEther } from "@ethersproject/units";


const { Text, Title } = Typography

const ARTWORKS_QUERY = gql`
  query ($firstArtists: Int!, $firstArtworks: Int!, $offsetArtworks: Int!, $artworkFilter: Artwork_filter) {
    featuredArtworks: artworks(first: $firstArtworks, offset: $offsetArtworks, orderBy: createdAt, orderDirection: desc, where: $artworkFilter) {
      id
      tokenId
      price
      revoked
      name
      desc
      artworkImageUrl
      artworkRevokedImageUrl
      
      artist {
        address
      }
      
      beneficiary {
        name
      }
    }

    # list featured artists
    featuredArtists: artists(first: $firstArtists) {
      id
      address
      artworks(first: 4, orderBy: createdAt, orderDirection: desc) {
        id
        tokenId
        price
        revoked
        name
        desc
        artworkImageUrl
        artworkRevokedImageUrl
        
        artist {
          address
        }
        
        beneficiary {
          name
        }
      }
    }
  }
`

const grid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 4,
}

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

const renderArtworkListing = (artwork, history) => {
  const isForSale = artwork.revoked || (artwork.artist.address === artwork.owner)

  let content = (
    <Card hoverable onClick={() => history.push(`/artworks/${artwork.tokenId}/${string_to_slug(artwork.name)}`)}
      title={
        <Row justify="space-between">
          <Col>
            <Blockies seed={artwork.artist.address} scale={2} />
            <Text type="secondary"> 0x{artwork.artist.address.substr(-4).toUpperCase()}</Text>
          </Col>
          <Col><Text>{formatEther(artwork.price)} ☰</Text></Col>
        </Row>
      }
      cover={<Image src={artwork.artworkImageUrl} />}
    >
      <Row justify="start">
        <Text strong>{artwork.name}</Text> <Text type="secondary">support {artwork.beneficiary.name}</Text>
      </Row>
    </Card>
  )

  if (isForSale || artwork.revoked)
    content = (
      <Badge.Ribbon color={artwork.revoked ? "gold" : "cyan"} text={artwork.revoked ? "Revoked!" : "on sale!"}>
        {content}
      </Badge.Ribbon>
    )

  return (
    <List.Item key={artwork.id}>
      {content}
    </List.Item>
  )
}

const Subgraph = (props) => {
  const variables = {
    firstArtists: 3,
    firstArtworks: 8,
    offsetArtworks: 0
  }

  const history = useHistory()
  const { loading, data, refetch } = useQuery(ARTWORKS_QUERY, { variables }, { pollInterval: 5000 });

  const featuredArtists = (
    <Skeleton loading={!data} active>
      <Carousel>
        {data && data.featuredArtists.map(artist =>
          <List key={artist.id} grid={grid} dataSource={artist.artworks} renderItem={artwork => renderArtworkListing(artwork, history)} />
        )}
      </Carousel>
    </Skeleton>
  )

  const loadMore = (<Button disabled={loading} onClick={()=> refetch(Object.assign(variables, { firstArtworks: data.featuredArtworks.length + 8 })) }>load more artworks</Button>)

  const featuredArtworks = (
    <Skeleton loading={!data} active>
      <List grid={grid} dataSource={data && data.featuredArtworks} renderItem={artwork => renderArtworkListing(artwork, history)} loading={loading} loadMore={loadMore} />
    </Skeleton>
  )

  return (
    <Row direction="vertical">
      <Col span={12} offset={6}>
        <br />
        <Row>
          <Title level={3}>👨‍🎨 Featured artists</Title>
        </Row>
        <br />
        {featuredArtists}

        <Divider plain />

        <br />
        <Row>
          <Title level={3}>🖼️ Featured artworks</Title>
          <Col flex="1">
            <Row justify="end">
              <Text type="secondary">only show revoked works &nbsp;</Text>
              <Switch size="s" onChange={(value) => refetch(Object.assign(variables, { artworkFilter: value ? {revoked: true} : {} }))} />
            </Row>
          </Col>
        </Row>
        <br />

        {featuredArtworks}
      </Col>
    </Row>
  )
}

export default Subgraph;
