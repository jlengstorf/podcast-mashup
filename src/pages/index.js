import React from 'react';
import { graphql } from 'gatsby';

const sortPodcasts = podcastArr =>
  podcastArr.reduce((acc, podcast) => {
    const image = podcast.rss2Feed.image;
    const title = podcast.rss2Feed.title;
    const items = podcast.rss2Feed.items;

    return [
      ...acc,
      ...items.map(item => ({
        ...item,
        podcast: {
          title,
          image
        }
      }))
    ].sort((a, b) => b.pubDate - a.pubDate);
  }, []);

export default ({ data }) => {
  const items = sortPodcasts([
    data.oneGraph.fehh,
    data.oneGraph.rp,
    data.oneGraph.bbc
  ]);

  return (
    <ul>
      {items.map(item => (
        <li>
          <img
            src={item.podcast.image.uri}
            alt={item.podcast.title}
            style={{ maxWidth: 100 }}
          />
          <h2>
            {new Date(item.pubDate).toLocaleString()}: {item.podcast.title}
          </h2>
          <p>{item.title}</p>
          <audio controls src={item.enclosure.url}>
            Your browser does not support the <code>audio</code> tag.
          </audio>
        </li>
      ))}
    </ul>
  );
};

export const query = graphql`
  {
    oneGraph {
      bbc: rss {
        rss2Feed(url: "http://podcasts.files.bbci.co.uk/p02pc9pj.rss") {
          ...RSSFragment
        }
      }
      fehh: rss {
        rss2Feed(
          url: "http://feeds.soundcloud.com/users/soundcloud:users:206137365/sounds.rss"
        ) {
          ...RSSFragment
        }
      }
      rp: rss {
        rss2Feed(url: "http://rss.simplecast.com/podcasts/6265/rss") {
          ...RSSFragment
        }
      }
    }
  }

  fragment RSSFragment on ONEGRAPH_Rss2Channel {
    image {
      uri
    }
    title
    items {
      pubDate
      title
      link
      enclosure {
        mime
        url
        length
      }
    }
  }
`;
