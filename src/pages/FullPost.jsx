import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";

export const FullPost = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then((res) => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.warn(err)
      })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
          {data.text}
        </p>
      </Post >
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Whirun of Bligh",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "test comment",
          },
          {
            user: {
              fullName: "Bayaz",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "test comment",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
