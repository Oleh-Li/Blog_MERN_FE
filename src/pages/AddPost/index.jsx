import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth)
  console.log({ isAuth })
  const imageUrl = '';
  const [value, setValue] = React.useState('');

  const handleChangeFile = () => { };

  const onClickRemoveImage = () => { };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text...',
      status: false,
      autosave: {
        enabled: true,
        uniqueId: 'myUniqueId',
        delay: 1000,
      },
    }),
    [],
  );

  if (!isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Load preview
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Remove
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="The title of the article..."
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Tags" fullWidth />
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained">
          Publish
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
