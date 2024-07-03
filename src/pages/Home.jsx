import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux'
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchPostsByTag, fetchSortedPosts, fetchSortedPostsByTag, fetchTags } from '../redux/slices/posts'
import { useNavigate, useLocation, useParams } from 'react-router-dom';

export const Home = () => {
  const { tag } = useParams()
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const { posts, tags } = useSelector(state => state.posts)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    const sort = newValue === 0 ? 'newest' : 'popular';
    setTabIndex(newValue);
    navigate(`?sort=${sort}`);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sort = queryParams.get('sort') || 'newest';

    if (sort === 'popular') {
      setTabIndex(1);
    } else {
      setTabIndex(0);
    }

    if (tag) {
      dispatch(fetchSortedPostsByTag({ tag, sortType: sort }));
    } else {
      dispatch(fetchSortedPosts(sort));
    }
    dispatch(fetchTags());
  }, [tag, location.search, dispatch]);

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
        <Tab label="Newest" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )
          }
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Logen',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'test text',
              },
              {
                user: {
                  fullName: 'Murcato',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'test text',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
